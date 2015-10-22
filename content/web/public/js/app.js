'use strict';

// Declare app level module which depends on filters, and services
evo.module('peApp', ['evo', 'peControllers', 'ngCookies', 'ngRoute', 'evo.common']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
		templateUrl: 'hello',
        controller: 'MainController'
      }).otherwise({redirectTo: '/'})
	;
    $locationProvider.html5Mode(true);
}]);
