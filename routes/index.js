var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Candidate = mongoose.model('Candidate');
var Comment = mongoose.model('Comment');

router.get('/comments', function(req, res, next) {
  Comment.find(function(err, comments) {
    if(err) {return next(err);}
    res.json(comments);
  });
});

router.post('/comments', function(req, res, next) {
  var comment = new Comment(req.body);
  comment.save(function(err, comment) {
    if(err) {return next(err);}
    res.json(comment);
  });
});

router.param('comment', function(req, res, next, id) {
  var query = Comment.findById(id);
  query.exec(function (err, comment){
    if (err) {return next(err);}
    if (!comment) {return next(new Error("can't find comment"));}
    req.comment = comment;
    return next();
  });
});

router.param('candidate', function(req, res, next, id) {
  var query = Candidate.find({"candID" : id});
  query.exec(function (err, candidate){
    if (err) {return next(err);}
    if (!candidate) {return next(new Error("can't find comments"));}
    req.candidate = candidate;
    return next();
  });
});

router.get('/comments/:candidate', function(req, res) {
  res.json(req.candidate);
});

router.put('/comments/:comment/upvote', function(req, res, next) {
  req.comment.upvote(function(err, comment){
    if (err) { return next(err); }
    res.json(comment);
  });
});

router.delete('/comments/:comment', function(req, res) {
  console.log("in Delete");
  req.comment.remove();
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
    if (!candidate) {return next(new Error("can't find comment"));}
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


module.exports = router;