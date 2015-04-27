'use strict';

// Declare app level module which depends on filters, and services
//cai.module('peApp', ['cai.services', 'peControllers', 'ngCookies', 'ngRoute']).
cai.module('peApp', ['ionic', 'cai.services', 'peControllers', 'ngCookies']).
 /* config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
		templateUrl: 'hello',
		controller: 'MainController'

      });
    $locationProvider.html5Mode(true);
}])*/
	config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
		$stateProvider.state('mobileView', {
			url: '/',
			templateUrl: 'login',
			controller: 'MainController'
		}).state('home', {
			url: "/tabs",
			abstract: true,
			templateUrl: 'tabs'
		});

		$urlRouterProvider.otherwise('/');
	}])

;





