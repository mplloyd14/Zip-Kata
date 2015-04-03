'use strict';

// Declare app level module which depends on filters, and services
//angular.module('peApp', ['cai.services', 'peControllers']).
cai.module('peApp', ['cai.services', 'peControllers', 'ngCookies', 'ngRoute']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
		templateUrl: 'hello',
		controller: 'MobileController'

      });
    $locationProvider.html5Mode(true);
}]);





