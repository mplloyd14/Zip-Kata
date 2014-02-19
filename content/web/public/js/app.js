'use strict';

// Declare app level module which depends on filters, and services
cai.module('peApp', ['cai.services', 'peControllers', 'ngCookies', 'ngRoute']).
    config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.
            when('/desktop', {
                templateUrl: 'core-ui',
                controller: 'MainController'
            })
            .otherwise({redirectTo: '/desktop'});
        $locationProvider.html5Mode(true);
    }]);