var mongoose = require('mongoose');
var CandidateSchema = new mongoose.Schema({
  name: String,
  upvotes: {type: Number, default: 0}
});



CandidateSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};

mongoose.model('Candidate', CandidateSchema);