mjr.controller('rsvpController', ['$scope', '$route', '$rootScope', '$firebaseObject', '$firebaseArray', 'inviteInfo', function ($scope, $route, $rootScope, $firebaseObject, $firebaseArray, inviteInfo) {
  $rootScope.nonHome = true;
  $scope.vars = {
    password: "Please enter your password here",
    clear: true,
    nextSection: false,
    showError: false,
    showThanks: false,
    showRegrets: false,
    showThanksOnce: false,
    guests: {},
    invitations: inviteInfo.invites
  }

  console.log($scope.vars.invitations.length);


  $scope.submit = function() {
    if($scope.vars.password != '') {
      var num = parseInt($scope.vars.password) || 0;

      $scope.vars.invitations.$ref().orderByChild("invitationID").equalTo(num).once("value", function(dataSnapshot){
          if(dataSnapshot.exists()){
            dataSnapshot.forEach(function(childSnapshot) {
              var childData = childSnapshot.val();
              console.log("we're good");
              for(var x = 0; x < childData.guests.length; x++) {
                var id = childData.guests[x];
                var personref = new Firebase("https://marcandjennyromance.firebaseio.com/person/"+id);
                $scope.vars.guests[id] = $firebaseObject(personref);
                $scope.vars.nextSection = true;
              }
            });
          } else {
            $scope.vars.showError = true;
            console.warn("Not found.");
          }
      });
    }
    else {
      $scope.vars.showError = true;
    }
  };

  if($route.current.params.id != undefined) {
    console.log($scope.vars.invitations);
    $scope.vars.password = $route.current.params.id;
    $scope.submit();
  }


  $scope.clearPassword = function() {
    if($scope.vars.clear) {
      $scope.vars.password = "";
      $scope.vars.clear = false;
    }
  }

 /* $scope.verify = function() {

    $scope.vars.invitations.$loaded().then(function(){
      angular.forEach($scope.vars.invitations, function(invite) {
        $scope.submit(invite.invitationID);
      })
    });
  };*/

  $scope.getCurrentDate = function () {
    var d = new Date(Date.now());
    var humanDate =  (d.getMonth()+1) + '/' + d.getDate() + '/' + d.getFullYear();
    return humanDate;
  };

  $scope.yes = function(id) {
    var guest = $scope.vars.guests[id];
    guest.status = 1;
    if(guest.rsvpTime == undefined || guest.rsvpTime == '') {
      guest.rsvpTime = $scope.getCurrentDate();
    }
    else {
      guest.rsvpEdit = guest.rsvpEdit || [];
      guest.rsvpEdit.push($scope.getCurrentDate());
    }

    guest.$save();
    $scope.vars.showThanks = true;
    $scope.vars.showRegrets = false;
  }
  $scope.no = function(id) {
    var guest = $scope.vars.guests[id];
    guest.status = 0;
    if(guest.rsvpTime == undefined || guest.rsvpTime == '') {
      guest.rsvpTime = $scope.getCurrentDate();
    }
    else {
      guest.rsvpEdit = guest.rsvpEdit || [];
      guest.rsvpEdit.push($scope.getCurrentDate());
    }
    guest.$save();
    $scope.vars.showRegrets = true;
    $scope.vars.showThanks = false;
  }

}]);
