'use strict';

// Declare app level module which depends on filters, and services
var kata = evo.module('peApp', ['evo', 'evo.common', 'kataService', 'peControllers', 'ngCookies', 'ngRoute']);

kata.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
		templateUrl: 'table',
        controller: 'MainController'
      })
        .when('/edit/:id', {
        templateUrl: 'edit',
        controller: 'EditController'
      });
    $locationProvider.html5Mode(true);
}]);

kata.run(['ZipService', function (ZipService) {
    ZipService.GatherZips();
}]);

