const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SortAnswers = function(a, b){
  if(a.votes === b.votes) {
    return b.updated - a.updated;
  }
  return b.votes - a.votes;
}

const answerSchema = new Schema({
  text: String,
  created: {type: Date, default: Date.now},
  updated: {type: Date, default: Date.now},
  votes: {type: Number, default: 0}
});

answerSchema.method("update", function(updates, callback){
  Object.assign(this, updates, {updated: new Date()});
  this.parent().save(callback);
});

answerSchema.method("vote", function(vote, callback){
  if(vote === "up") {
    this.votes += 1;
  } else {
    this.votes -= 1;
  }
  this.parent().save(callback);
});

const questionSchema = new Schema({
  text: String,
  created: {type: Date, default: Date.now},
  answers: [answerSchema]
});


questionSchema.pre("save", function(next) {
  this.answers.sort(SortAnswers);
  next();
});

const Question = mongoose.model("Question", questionSchema);

module.exports.Question = Question;
