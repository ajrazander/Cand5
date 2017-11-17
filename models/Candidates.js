var mongoose = require('mongoose');
var CandSchema = new mongoose.Schema({
  name: String,
  upvotes: {type: Number, default: 0},
});
mongoose.model('Candidate', CandSchema);
