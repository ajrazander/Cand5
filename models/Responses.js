var mongoose = require('mongoose');
var ResponseSchema = new mongoose.Schema({
  name: String,
  title: String,
  upvotes: {type: Number, default: 0},
  candID: String
});

mongoose.model('Response', ResponseSchema);

ResponseSchema.methods.upvoteCom = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};