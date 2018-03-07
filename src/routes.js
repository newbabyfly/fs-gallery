const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

//Render Home Page
router.get("/", function(req, res, next){
  console.log("index page");
  next();
});

//Render Home Page
router.get("/gallery", function(req, res, next){
  console.log("gallery page");
  next();
});

module.exports = router;
