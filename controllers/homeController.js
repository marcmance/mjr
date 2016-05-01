mjr.controller('homeController', ['$scope', '$route', '$rootScope', function ($scope, $route, $rootScope) {
  $rootScope.nonHome = false;
  $scope.test = "?";

  $scope.testFunction();
}]);
