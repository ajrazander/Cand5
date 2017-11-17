angular.module('candidate',[])
  .controller('MainCtrl',[
    '$scope','$http',
    function($scope,$http) {
      $scope.test = "hello world!";
      $scope.candidates = [];
      $scope.comments = [];
      $scope.createComment = function(comment) {
        return $http.post('/comments', comment).success(function(data){
          $scope.comments.push(data);
        });
      };
      $scope.createCand = function(candidate) {
        return $http.post('/candidates', candidate).success(function(data){
          $scope.candidates.push(data);
        });
      };
      
      $scope.login = function() {
        if($scope.formUsername === '') { return; }
        console.log("In login with "+$scope.formUsername);
        $scope.username = $scope.formUsername;
        $scope.isLoggedIn = true;
      };
      
      
      $scope.addCand = function() {
        if($scope.formCand === '') { return; }
        console.log("In addCand with "+$scope.formCand);
        $scope.create({
          name: $scope.formCand,
          upvotes: 0,
        });
        $scope.formUsername = '';
      };
      $scope.addComment = function() {
        if($scope.formContent === '') { return; }
        console.log("In addComment with "+$scope.formContent);
        $scope.createComment({
          name: $scope.formUsername,
          title: $scope.formContent,
          upvotes: 0,
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
      $scope.getAll = function() {
        return $http.get('/candidates').success(function(data){
          angular.copy(data, $scope.candidates);
        });
      };
      $scope.getAll(); //create initial list 
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
    }
  ]);