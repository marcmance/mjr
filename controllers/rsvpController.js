mjr.controller('rsvpController', ['$scope', '$route', '$rootScope', '$firebaseObject', '$firebaseArray', 'inviteInfo', function ($scope, $route, $rootScope, $firebaseObject, $firebaseArray, inviteInfo) {
  $rootScope.nonHome = true;
  $scope.vars = {
    password: "Please enter your password here",
    clear: true,
    nextSection: false,
    showError: false,
    showSubmitError: false,
    showThanks: false,
    showRegrets: false,
    showThanksOnce: false,
    submitCheck: false,
    submitted: false,
    guestCount: 0,
    responseCount: 0,
    guests: {},
    invitations: inviteInfo.invites,
    currentInvitation: {}
  }

  $scope.test = function() {
    $scope.vars.submitted = true;
    console.log("?");
  }

  $scope.submit = function() {
    if($scope.vars.password != '') {
      var num = parseInt($scope.vars.password) || 0;

      $scope.vars.invitations.$ref().orderByChild("invitationID").equalTo(num).once("value", function(dataSnapshot){
          if(dataSnapshot.exists()){
            dataSnapshot.forEach(function(childSnapshot) {
              $scope.currentInvitation = childSnapshot;
              console.log("here", $scope.currentInvitation.val());
              if($scope.currentInvitation.val().response) {
                $scope.test();
              }
              for(var x = 0; x < $scope.currentInvitation.val().guests.length; x++) {
                var id = $scope.currentInvitation.val().guests[x];
                var personref = new Firebase("https://marcandjennyromance.firebaseio.com/person/"+id);
                $scope.vars.guests[id] = $firebaseObject(personref);
                $scope.vars.nextSection = true;
                $scope.vars.guestCount++;
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
    if(!$scope.vars.submitted) {
      var guest = $scope.vars.guests[id];
      if(guest.status == 2) {
        $scope.vars.responseCount++;
        if($scope.vars.responseCount == $scope.vars.guestCount) {
          $scope.vars.submitCheck = true;
        }
      }
      guest.status = 1;
      guest.rsvpTime = $scope.getCurrentDate();
      guest.rsvpTimestamp = Date.now();
    }
  }
  $scope.no = function(id) {
    if(!$scope.vars.submitted) {
      var guest = $scope.vars.guests[id];
      if(guest.status == 2) {
        $scope.vars.responseCount++;
        if($scope.vars.responseCount == $scope.vars.guestCount) {
          $scope.vars.submitCheck = true;
        }
      }
      guest.status = 0;
      guest.rsvpTime = $scope.getCurrentDate();
      guest.rsvpTimestamp = Date.now();
    }
  }

  console.log($scope.currentInvitation);

  $scope.submitInvitation = function() {
    if($scope.vars.submitCheck) {
      var confirmed = 0;
      for(g in $scope.vars.guests) {
        var guest = $scope.vars.guests[g];
        guest.$save();
        if(guest.status == 1) {
          confirmed++;
        }
      }
      $scope.vars.showThanks = true;
      $scope.vars.showSubmitError = false;
      $scope.vars.submitted = true;
      var invite = $scope.vars.invitations.$getRecord($scope.currentInvitation.key());
      invite.response = true;
      invite.rsvpTime = $scope.getCurrentDate();
      invite.rsvpTimestamp = Date.now();
      invite.confirmedCount = confirmed;
      $scope.vars.invitations.$save(invite);
    }
    else {
      $scope.vars.showSubmitError = true;
    }
  }

}]);
