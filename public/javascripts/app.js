angular.module('candidate', [])
.controller('MainCtrl', [
  '$scope','$http',
  function($scope, $http) {
    $scope.candidates = [];
    $scope.addCand = function() {
      $scope.candidates.push({name:$scope.formContent,votes:0});
      $scope.formContent='';
    };
    $scope.incrementUpvotes = function(candidate) {
      candidate.votes += 1;
    };
  }
]);
