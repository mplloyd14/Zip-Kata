'use strict';

// Declare app level module which depends on filters, and services
cai.module('peApp', ['cai.services', 'peControllers', 'ngCookies', 'ngRoute']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
		templateUrl: 'hello',
		controller: 'MainController'

      });
    $locationProvider.html5Mode(true);
}]);





