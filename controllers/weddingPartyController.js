mjr.controller('weddingPartyController', ['$scope', '$route', '$rootScope', '$firebaseObject', '$firebaseArray', function ($scope, $route, $rootScope, $firebaseObject, $firebaseArray) {
  $rootScope.nonHome = true;

  var ref = new Firebase("https://marcandjennyromance.firebaseio.com/copy/wp");
  $scope.vars = {
    party: $firebaseArray(ref)
  }


}]);
