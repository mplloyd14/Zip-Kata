'use strict';

// Declare app level module which depends on filters, and services
cai.module('peApp', ['cai.services', 'peControllers', 'ngCookies', 'ngRoute'])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/simple', {
		        templateUrl: 'simpleView',
                controller: 'SimpleViewController'
            })
            .when('/complex', {
                templateUrl: 'complexView',
                controller: 'ComplexViewController'
            })
            .when('/table', {
                templateUrl: 'tableView',
                controller: 'TableViewController'
            })
            .when('/:token/restricted', {
                templateUrl: 'restrictedView',
                controller: 'RestrictedViewController'
            })
            .otherwise({redirectTo: '/simple'});

        $locationProvider.html5Mode(true);
    }]);
