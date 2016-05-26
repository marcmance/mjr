var mjr = angular.module('mjr', ['ngResource', 'ngRoute', 'ngSanitize','firebase'])
.run(['$rootScope',

  function ($rootScope) {
    console.log("9/10/16");
    $rootScope.nonHome = false;

    for (var key in window.localStorage) {
      if (key.indexOf('http://marcandjennyromance.com/css/main.less') === 0) {
        delete window.localStorage[key];
      }
    }
  }
]);
