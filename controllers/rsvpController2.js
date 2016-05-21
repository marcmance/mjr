mjr.controller('rsvpController', ['$scope', '$route', '$rootScope', '$firebaseObject', '$firebaseArray', function ($scope, $route, $rootScope, $firebaseObject, $firebaseArray) {
  $rootScope.nonHome = true;
  var rsvpID = $route.current.params.id;
  var ref = new Firebase("https://marcandjennyromance.firebaseio.com/invitation/" + rsvpID);
  $scope.rsvp = $firebaseObject(ref);
}]);
