'use strict';
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