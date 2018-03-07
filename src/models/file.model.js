// Load mongoose package
const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  image: String,
  imageData: {
    title: String,
    description: String,
    created_at: { type: Date, default: Date.now },
  }
});

const File = mongoose.model('File', FileSchema);

File.count({}, function(err, count) {
  if (err) {
    throw err;
  }

  if (count > 0) return ;


});

module.exports = File;
