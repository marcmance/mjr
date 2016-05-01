mjr.config(['$routeProvider',
  function ($routeProvider) {

    $routeProvider.when('/',
    {
      templateUrl: 'views/home.html',
      controller: 'homeController'
    })
    .when('/about',
    {
      templateUrl: 'views/about.html',
      controller: 'aboutController'
    })
    .when('/wedding-party',
    {
      templateUrl: 'views/weddingparty.html',
      controller: 'weddingPartyController'
    })
    .when('/ceremony',
    {
      templateUrl: 'views/ceremony.html',
      controller: 'ceremonyController'
    })
    .when('/reception',
    {
      templateUrl: 'views/reception.html',
      controller: 'receptionController'
    })
    .when('/accommodations',
    {
      templateUrl: 'views/accommodations.html',
      controller: 'accommodationsController'
    })
    .when('/things',
    {
      templateUrl: 'views/things.html',
      controller: 'thingsController'
    })
    .when('/registry',
    {
      templateUrl: 'views/registry.html',
      controller: 'registryController'
    })
    .when('/edit/wedding-party',
    {
      templateUrl: 'views/weddingpartyedit.html',
      controller: 'weddingPartyEditController'
    })

    .otherwise({ redirectTo: '/' });
/*
when('/invitations', {
templateUrl: 'views/invitations.html',
controller: 'InvitationController',
resolve: {
inviteInfo: function($firebaseArray){
var ref = new Firebase("https://marcandjennyromance.firebaseio.com/person");
var people = $firebaseArray(ref);
var ref2 = new Firebase("https://marcandjennyromance.firebaseio.com/address");
var addresses = $firebaseArray(ref2);
return {
people: people,
addresses: addresses
};
}
}
}).*/

}
]);
