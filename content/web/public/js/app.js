evo.module('peseed', [
    'ngCookies', 
    'ngRoute',
    'evo', 
    'ionic',
    'peseed.controllers'
  ]).
  config([
    '$routeProvider', 
    '$locationProvider', 
    function($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'main',
          controller: 'MainCtrl'
        })
        .otherwise({redirectTo: '/'});
      $locationProvider.html5Mode(true);
    }
  ]);
