'use strict';

// Declare app level module which depends on filters, and services
angular.module('peApp', ['ui.bootstrap','ngRoute','cai.services', 'peControllers']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    //$rootScope.pushToLoggly = false;
    $routeProvider.
      when('/', {    
		templateUrl: 'pivotal',
        controller: 'PivotalController'
      });
    $locationProvider.html5Mode(true);
}]);


angular.element(document).ready(function() {
    var key = "1a21ae55-17e2-47d7-9000-3d7c4e317e20";
    var host = "//logs.loggly.com";
    var castor = new loggly.castor({ url: host+'/inputs/'+key, level: 'log'});

});