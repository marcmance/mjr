mjr.controller('weddingPartyEditController', ['$scope', '$route', '$rootScope', '$firebaseObject', '$firebaseArray', function ($scope, $route, $rootScope, $firebaseObject, $firebaseArray) {
  $rootScope.nonHome = true;

  var ref = new Firebase("https://marcandjennyromance.firebaseio.com/copy/wp/");
  $scope.weddingparty = $firebaseArray(ref);
  console.log($scope.weddingparty);
  $scope.save = function() {
    for(var x = 0; x < 6; x++) {
      var id = $scope.weddingparty[x].$id;
      var why = $scope.weddingparty.$getRecord(id);
      $scope.weddingparty.$save(why);
    }
  }

}]);
