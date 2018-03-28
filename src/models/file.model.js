// Load mongoose package
const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  file: String,
  created_at: { type: Date, default: Date.now },
  deleted: { type: Boolean, default: false },
  imageData: {
    title: String,
    description: String
  }
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;
