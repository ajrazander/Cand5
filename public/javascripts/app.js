angular.module('candidate',[])
  .controller('MainCtrl',[
    '$scope','$http',
    function($scope,$http) {
      $scope.test = "hello world!";
      $scope.candidates = [];
      $scope.create = function(candidate) {
        return $http.post('/candidates', candidate).success(function(data){
          $scope.candidates.push(data);
        });
      };
      $scope.addComment = function() {
        if($scope.formContent === '') { return; }
        console.log("In addComment with "+$scope.formContent);
        $scope.create({
          title: $scope.formContent,
          upvotes: 0,
        });
        $scope.formContent = '';
      };
      $scope.incrementUpvotes = function(candidate) {
        candidate.upvotes += 1;
        $scope.upvote(candidate);
      };
      $scope.getAll = function() {
        return $http.get('/candidates').success(function(data){
          angular.copy(data, $scope.candidates);
          });
      };
      $scope.getAll(); //create initial list 
      $scope.upvote = function(candidate) {
        return $http.put('/candidates/' + candidate._id + '/upvote')
        .success(function(data){
          console.log("upvote worked");
          candidate.upvotes += 1;
        });
      };
    }
  ]);