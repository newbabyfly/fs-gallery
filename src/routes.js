// src/routes/index.js
const router = require('express').Router();
const mongoose = require('mongoose');


/**
 * Get a list of all files in the DB
 */
router.get('/image',  function(req, res, next) {
  const Image = mongoose.model('Image');

  Image.find({deleted: {$ne: true}}).sort({created_at: 'desc'}).limit(5).exec( function(err, images) {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json(images);
  });
});

// Gallery page- Show All images
router.get('/gallery',  function(req, res, next) {
  const Image = mongoose.model('Image');

  Image.find({deleted: {$ne: true}}, function(err, images) {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json(images);
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
router.post('/addImage', function(req, res, next) {
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
router.put('/file/:fileId', function(req, res, next) {
  const File = mongoose.model('File');
  const fileId = req.params.fileId;

  File.findById(fileId, function(err, file) {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    if (!file) {
      return res.status(404).json({message: "File not found"});
    }

    file.title = req.body.title;
    file.description = req.body.description;

    file.save(function(err, savedFile) {
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
 router.delete('/file/:fileId', function(req, res, next) {
   const File = mongoose.model('File');
   const fileId = req.params.fileId;

   File.findById(fileId, function(err, file) {
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
