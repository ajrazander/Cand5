angular.module('candidate',[])
  .controller('MainCtrl',[
    '$scope','$http',
    function($scope,$http) {
      $scope.candidates = [];
      $scope.comments = [];
      
      $scope.login = function(uname) {
        if(uname === '') { return; }
        console.log("In login with "+uname);
        $scope.username = uname;
        console.log("In login with "+$scope.username);
        $scope.isLoggedIn = true;
      };
      
      $scope.createCand = function(candidate) {
        return $http.post('/candidates', candidate).success(function(data){
          $scope.candidates.push(data);
          $scope.getAllcandidates();
          console.log("Creating Candidate: " + candidate.name);
        });
      };
      
      $scope.addCand = function(cand) {
        var bool = true;
        if(cand === undefined) {bool = false;}
        console.log("In addCand with "+cand);
       
        for (var i = 0; i < $scope.candidates.length; i++) { 
            console.log("cand: ", cand, "candidates[i].name:", $scope.candidates[i].name);
            if(cand === $scope.candidates[i].name) {bool = false;}
        }
        if(bool){
          $scope.createCand({
            name: cand,
            upvotes: 0,
          });
        }
      };
      
      $scope.createComment = function(comment) {
        return $http.post('/responses', comment).success(function(data){
          $scope.comments.push(data);
        });
      };
      
      $scope.addComment = function(formContent,candidate) {
        if(formContent === '') { return; }
        console.log("In addComment with " + formContent);
        $scope.createComment({
          name: $scope.username,
          title: formContent,
          upvotes: 0,
          candID: candidate.name
        });
//        $scope.formContent = '';
      };
      
      $scope.incrementUpvotesCand = function(candidate) {
        $scope.upvoteCand(candidate);
        $scope.getAllcandidates();
      };
      $scope.incrementUpvotesCom = function(comment) {
        $scope.upvoteCom(comment);
        $scope.getAllComments();
      };
      
      $scope.getAllcandidates = function() {
        return $http.get('/candidates').success(function(data){
          angular.copy(data, $scope.candidates);
        });
      };
      
      $scope.getAllcandidates(); //create initial candidate list 
      $scope.getAllComments = function() {
        return $http.get('/responses/').success(function(data){
          angular.copy(data, $scope.comments);
        });
      };
      $scope.getAllComments(); //create initial candidate list 
      
      $scope.upvoteCand = function(candidate) {
        return $http.put('/candidates/' + candidate._id + '/upvote')
        .success(function(data){
          console.log("upvote worked");
          candidate.upvotes += 1;
        });
      };
      
      $scope.upvoteCom = function(comment) {
        return $http.put('/responses/' + comment._id + '/upvote')
        .success(function(data){
          console.log("upvote worked");
          comment.upvotes += 1;
        });
      };
      
      $scope.delete = function(comment) {
        $http.delete('/responses/' + comment._id )
          .success(function(data){
            console.log("delete worked");
          });
        $scope.getAllComments();
      };
      $scope.deleteAll = function() {
        $http.post('/delete')
          .success(function(data){
            console.log("delete worked");
        }); 
        $scope.getAllcandidates();
      };
    }
  ]);