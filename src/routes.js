// src/routes/index.js
const router = require('express').Router();
const mongoose = require('mongoose');


/**
 * Get a list of all files in the DB
 */
router.get('/image',  function(req, res, next) {
  const Image = mongoose.model('Image');

  Image.find({deleted: {$ne: true}}).sort({created_at: 'desc'}).limit(6).exec( function(err, images) {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json(images);
  });
});

// Gallery page- Show All images
router.get('/gallery',  function(req, res) {
  const Image = mongoose.model('Image');
  const db = mongoose.connection;
  db.collection('images').find({deleted: {$ne: true}}).toArray(function(err, image) {
  res.json(image)
 });
});

/**
 * Get a single file by passing its id as a URL param
 */
router.get('/image/:imageId', function(req, res, next) {
  const {imageID} = req.params;
  const image = IMAGES.find(entry => entry.id === imageId);

  if (!image) {
    return res.status(404).end(`Could not find file '${imageID}'`);
  }

  res.json(image);
});

/**
 * Create a new file
 */
router.post('/image', function(req, res, next) {

  const Image = mongoose.model('Image');
  const imgData = {
    file: req.body.file,
    imageData: {
      title: req.body.title,
      description: req.body.description
    }
  };
  Image.create(imgData, function(err, newImage) {
    if (err) {

      console.log(err);
      return res.status(500).json(err);
    }
    res.json(newImage);
  });
});

/**
 * Update an existing file
 */
router.put('/image/:imageID', function(req, res, next) {
  const Image = mongoose.model('Image');
  const imageId = req.params.imageId;

  Image.findById(imageId, function(err, image) {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    if (!image) {
      return res.status(404).json({message: "File not found"});
    }

    image.file = req.body.file;
    image.title = req.body.title;
    image.description = req.body.description;

    image.save(function(err, savedFile) {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }
      res.json(savedFile);
    })

  })

});

/**
 * Delete a file
 */
 router.delete('/image/:imageId', function(req, res, next) {
   const Image = mongoose.model('Image');
   const imageId = req.params.imageId;

   Image.findById(imageId, function(err, file) {
     if (err) {
       console.log(err);
       return res.status(500).json(err);
     }
     if (!file) {
       return res.status(404).json({message: "File not found"});
     }

     file.deleted = true;

     file.save(function(err, doomedFile) {
       res.json(doomedFile);
     })

   })
 });


module.exports = router;
