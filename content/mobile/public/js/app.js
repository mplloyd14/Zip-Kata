'use strict';

// Declare app level module which depends on filters, and services
/*
angular.module('peApp', ['cai.services', 'peControllers']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/mobile', {
		templateUrl: 'hello',
        controller: 'MainController'
      });
    $locationProvider.html5Mode(true);
}]);
*/

evo.module('peApp', ['ionic', 'evo', 'peControllers', 'ngCookies']).

	config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
		$stateProvider.state('mobileView', {
			url: '/',
			templateUrl: 'hello',
			controller: 'MainController'
		});

		$urlRouterProvider.otherwise('/');
	}])
;