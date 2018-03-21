const router = require('express').Router();
const mongoose = require('mongoose');


router.post('/addImage', (req, res, next) => {
  const imageModel = mongoose.model('Image');
  const image = {
    file: req.body.file,
    imageData: {
      title: req.body.title,
      description: req.body.description,
    }
  };

  imageModel.create(image, function(err, newImage) {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }


    console.log('saved to database')
    res.redirect('/')
  });

});

// GET /
router.get('/', function(req, res) {
  const imageGallery = mongoose.model('Image');

    imageGallery.find({}).sort({created_at: 'desc'}).limit(5).exec(function(err, images) {
        if (err) {
          console.log("Error: " + err);
        } else {

           res.render('index', { images: images });
        }
      });


  });



//Render Gallery Page

router.get("/gallery", function(req, res, next){

});



module.exports = router;
