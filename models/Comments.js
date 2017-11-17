var mongoose = require('mongoose');
var CommentSchema = new mongoose.Schema({
  name: String,
  title: String,
  upvotes: {type: Number, default: 0},
});

mongoose.model('Comment', CommentSchema);

CommentSchema.methods.upvoteCom = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};