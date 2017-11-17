var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Candidate = mongoose.model('Candidate');

router.get('/candidates', function(req, res, next) {
  Candidate.find(function(err,candidates) {
    if(err) {return next(err);}
    res.json(candidates);
  });
});

router.post('/candidates', function(req, res, next) {
  var candidate = new Candidate(req.body);
  candidate.save(function(err, candidate){
    if(err){ return next(err); }
    res.json(candidate);
  });
});

module.exports = router;
