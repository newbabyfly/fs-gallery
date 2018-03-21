// Load mongoose package
const mongoose = require('mongoose');


const ImageSchema = new mongoose.Schema({
  file: String,
  created_at: { type: Date, default: Date.now },
  imageData: {
    title: String,
    description: String
  }
});

const Image = mongoose.model('Image', ImageSchema);

/*const sortRecent = function(a, b){
  if(a.created_at === b.created_at) {
    return b.updated - a.updated;
  }
  return b.created_at - a.created_at;
}

ImageSchema.pre("save", function(next) {
  this.images.sort(sortRecent);
  next();
}); */


module.exports = Image;
