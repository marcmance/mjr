var mjr = angular.module('mjr', ['ngResource', 'ngRoute', 'ngSanitize','firebase'])
.run(['$rootScope',

  function ($rootScope) {
    console.log("9/10/16");

    $rootScope.nonHome = false;
  }
]);
