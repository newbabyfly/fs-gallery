// src/routes/index.js
const router = require('express').Router();
const mongoose = require('mongoose');


// Get Most recent images
router.get('/images',  function(req, res, next) {
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

//get Single file - Not Working
router.get('images/:fileId', function(req, res, next) {
  //const {fileId} = req.params;
  const fileId = req.params.fileId

  const file = FILES.find(entry => entry.id === fileId);
  if (!file) {
    return res.status(404).end(`Could not find file '${fileId}'`);
  }

  res.json(file);
});

/**
 * Create a new file
 */
router.post('/images', function(req, res, next) {

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
 router.put('/images/:imageID', function(req, res, next) {
   const Image = mongoose.model('Images');
   const imageID = req.params.fileId;

   Image.findById(fileId, function(err, images) {
     if (err) {
       console.error(err);
       return res.status(500).json(err);
     }
     if (!images) {
       return res.status(404).json({message: "File not found"});
     }

     images.file = req.body.file;
     images.title = req.body.title;
     images.description = req.body.description;

     images.save(function(err, savedFile) {
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
