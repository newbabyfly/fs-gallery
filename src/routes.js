// src/routes/index.js
const router = require('express').Router();
const mongoose = require('mongoose');


// Get Most recent images
router.get('/image',  function(req, res, next) {
  const Image = mongoose.model('Image');

  Image.find({deleted: {$ne: true}}).sort({created_at: 'desc'})/*.limit(6)*/.exec( function(err, images) {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json(images);
  });
});

// Gallery page- Show All images
router.get('/gallery',  function(req, res) {
  res.sendFile(path.join(__dirname+'/gallery.html'));
});

//get Single file - Not Working?
router.get('/image/:imageID', function(req, res, next) {
  console.log("hello");
  //const {fileId} = req.params;
  const Image = mongoose.model('Image');
  const imageID = req.params.imageId;
  const image = FILES.find(entry => entry.id === imageID);
  if (!file) {
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
 router.put('/image/:imageId', function(req, res, next) {
   const Image = mongoose.model('Image');
   const imageID = req.params.imageId;

   Image.findById(imageID, function(err, image) {
     if (err) {
       console.error(err);
       return res.status(500).json(err);
     }
     if (!image) {
       console.log("It broke here!");
       return res.status(404).json({message: "File not found"});
     }

     image.file = req.body.file;
     image.imageData.title = req.body.title;
     image.imageData.description = req.body.description;

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
       return res.status(404).json({message: "File not found."});
     }

     file.deleted = true;

     file.save(function(err, doomedFile) {
       res.json(doomedFile);
     })

   })
 });


module.exports = router;
