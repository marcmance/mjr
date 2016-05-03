mjr.controller('homeController', ['$scope', '$route', '$rootScope', function ($scope, $route, $rootScope) {
  $rootScope.nonHome = false;
  $scope.test = "?";

  /*var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
  var d = new Date();
    var n = d.getMonth();
  var firstDate = new Date(d.getYear(), d.getMonth()-1,d.getDay());
  var secondDate = new Date(2016,09,10);
  var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));*/



  today = new Date();

BigDay = new Date("September 10, 2016");
msPerDay = 24 * 60 * 60 * 1000 ;
timeLeft = (BigDay.getTime() - today.getTime());
e_daysLeft = timeLeft / msPerDay;
daysLeft = Math.floor(e_daysLeft);
e_hrsLeft = (e_daysLeft - daysLeft)*24;
hrsLeft = Math.floor(e_hrsLeft);
minsLeft = Math.floor((e_hrsLeft - hrsLeft)*60);
 $scope.countdown = daysLeft;

  //$scope.testFunction();
}]);
