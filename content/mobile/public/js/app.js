'use strict';

// Declare app level module which depends on filters, and services
//cai.module('peApp', ['ionic', 'cai.services', 'peControllers', 'ngCookies']).
evo.module('peApp', ['ionic', 'evo', 'peControllers', 'ngCookies']).

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





