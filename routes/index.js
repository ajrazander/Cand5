var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Candidate = mongoose.model('Candidate');
var Response = mongoose.model('Response');

router.get('/responses', function(req, res, next) {
  Response.find(function(err, responses) {
    if(err) {return next(err);}
    res.json(responses);
  });
});

router.post('/responses', function(req, res, next) {
  var response = new Response(req.body);
  response.save(function(err, response) {
    if(err) {return next(err);}
    res.json(response);
  });
});

router.param('response', function(req, res, next, id) {
  var query = Response.findById(id);
  query.exec(function (err, response){
    if (err) {return next(err);}
    if (!response) {return next(new Error("can't find response"));}
    req.response = response;
    return next();
  });
});

router.get('/responses/:response', function(req, res) {
  res.json(req.reponse);
});

router.put('/responses/:response/upvote', function(req, res, next) {
  req.response.upvote(function(err, response){
    if (err) { return next(err); }
    res.json(response);
  });
});

router.delete('/responses/:response', function(req, res) {
  console.log("in Delete");
  req.response.remove();
  res.sendStatus(200);
});

router.get('/candidates', function(req, res, next) {
  Candidate.find(function(err, candidates) {
    if(err) {return next(err);}
    res.json(candidates);
  });
});

router.post('/candidates', function(req, res, next) {
  var candidate = new Candidate(req.body);
  candidate.save(function(err, candidate) {
    if(err) {return next(err);}
    res.json(candidate);
  });
});

router.param('candidate', function(req, res, next, id) {
  var query = Candidate.findById(id);
  query.exec(function (err, candidate){
    if (err) {return next(err);}
    if (!candidate) {return next(new Error("can't find candidate"));}
    req.candidate = candidate;
    return next();
  });
});

router.get('/candidates/:condidate', function(req, res) {
  res.json(req.candidate);
});

router.put('/candidates/:candidate/upvote', function(req, res, next) {
  req.candidate.upvote(function(err, candidate){
    if (err) { return next(err); }
    res.json(candidate);
  });
});

router.delete('/candidates/', function(req, res) {
  console.log("in Delete");
  req.response.remove();
  res.sendStatus(200);
});

//delete all vaules in Comment model
router.post('/delete', function(req,res,next) {
  console.log('in delete');
  Response.remove({}, function(err) {
    if(err) return handleError(err);
  });
  Candidate.remove({}, function(err) {
    if(err) return handleError(err);
  });
});


module.exports = router;