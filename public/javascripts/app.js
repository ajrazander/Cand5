angular.module('candidate',[])
  .controller('MainCtrl',[
    '$scope','$http',
    function($scope,$http) {
      $scope.test = "hello world!";
      $scope.candidates = [];
      $scope.comments = [];
      $scope.commentMap = new Map();
      $scope.login = function() {
        if($scope.formUsername === '') { return; }
        console.log("In login with "+$scope.formUsername);
        $scope.username = $scope.formUsername;
        $scope.isLoggedIn = true;
      };
      $scope.createCand = function(candidate) {
        return $http.post('/candidates', candidate).success(function(data){
          $scope.candidates.push(data);
          console.log("Creating Candidate: " + candidate.name);
          $scope.commentMap.set(candidate.name,[]);
        });
      };
      $scope.addCand = function() {
        if($scope.formCand === '') { return; }
        console.log("In addCand with "+$scope.formCand);
        $scope.createCand({
          name: $scope.formCand,
          upvotes: 0,
        });
        $scope.formCand = '';
      };
      $scope.createComment = function(comment) {
        return $http.post('/comments', comment).success(function(data){
          $scope.comments.push(data);
        });
      };
      $scope.addComment = function(candidate) {
        if($scope.formContent === '') { return; }
        console.log("In addComment with "+$scope.formContent);
        $scope.createComment({
          name: $scope.formUsername,
          title: $scope.formContent,
          upvotes: 0,
          candID: candidate._id
        });
        $scope.formContent = '';
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
        return $http.get('/comments/' + candidate._id )
        .success(function(data){
          angular.copy(data, $scope.comments);
        });
      };
      $scope.getAllcandidates();
      $scope.upvoteCand = function(candidate) {
        return $http.put('/candidates/' + candidate._id + '/upvote')
        .success(function(data){
          console.log("upvote worked");
          candidate.upvotes += 1;
        });
      };
      $scope.upvoteCom = function(comment) {
        return $http.put('/comments/' + comment._id + '/upvote')
        .success(function(data){
          console.log("upvote worked");
          comment.upvotes += 1;
        });
      };
      $scope.delete = function(comment) {
        $http.delete('/comments/' + comment._id )
          .success(function(data){
            console.log("delete worked");
          });
        $scope.getAll();
      };
    }
  ]);