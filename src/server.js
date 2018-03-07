'use strict';

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const router = require('./routes.js');

// Load mongoose package
const mongoose = require('mongoose');

// Connect to MongoDB and create/use database as configured
//mongoose.connection.openUri(`mongodb://${config.db.username}:${config.db.password}@${config.db.host}/${config.db.dbName}`);
mongoose.connect("mongodb://localhost:27017/fsjsgallery");

// Import all models
require('./models/file.model.js');

const app = express();
const publicPath = path.resolve(__dirname, '../public');

app.use("/", router);
app.use(bodyParser.json());
app.use(express.static(publicPath));


//Catch 404
app.use(function(req, res, next){
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//Error Handler
app.use(function(err, req, res, next){
  res.status(err.status || 500);
  res.json({
      error: {
        message: err.message
      }
  });

});

const port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log("Server running on port ", port)
});
