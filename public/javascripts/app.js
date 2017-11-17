angular.module('candidate',[])
  .controller('MainCtrl',[
    '$scope','$http',
    function($scope,$http) {
      $scope.candidates = [];
      $scope.comments = [];
      $scope.commentMap = new Map();
      
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
          console.log("Creating Candidate: " + candidate.name);
          $scope.commentMap.set(candidate.name,[]);
        });
      };
      
      $scope.addCand = function(cand) {
        if(cand === '') { return; }
        console.log("In addCand with "+cand);
        $scope.createCand({
          name: cand,
          upvotes: 0,
        });
//        $scope.formCand = '';
      };
      
      $scope.createComment = function(comment) {
        return $http.post('/response', comment).success(function(data){
          $scope.comments.push(data);
        });
      };
      
      $scope.addComment = function(formContent,candidate) {
        if($scope.formContent === '') { return; }
        console.log("In addComment with "+formContent);
        $scope.commentMap.get(candidate.name).push(
            {name: $scope.username,
            title: formContent,
            upvotes: 0,
            candID: candidate._id});
        $scope.createComment({
            name: $scope.username,
            title: formContent,
            upvotes: 0,
            candID: candidate._id
          });
//        $scope.formContent = '';
      };
      
      $scope.incrementUpvotesCand = function(candidate) {
        candidate.upvote += 1;
        $scope.upvoteCand(candidate);
      };
      $scope.incrementUpvotesCom = function(comment) {
        comment.upvote += 1;
        $scope.upvoteCom(comment);
      };
      
      $scope.getAllcandidates = function() {
        return $http.get('/candidates').success(function(data){
          angular.copy(data, $scope.candidates);
        });
      };
      
      $scope.getAllcandidates(); //create initial candidate list 
      $scope.getComments = function(candidate) {
        return $http.get('/responses/' + candidate._id )
        .success(function(data){
          angular.copy(data, $scope.comments);
        });
      };
      
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
        $scope.getAll();
      };
    }
  ]);