'use strict';

// Declare app level module which depends on filters, and services
angular.module('peApp', ['ngRoute','cai.services', 'peControllers']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {    
		templateUrl: 'hello',
        controller: 'MainController'
      });
    $locationProvider.html5Mode(true);
}]);


angular.element(document).ready(function() {
    var scrollables = ['scrollable'];
    var key = "1a21ae55-17e2-47d7-9000-3d7c4e317e20";
    var host = "//logs.loggly.com";
    var castor = new loggly.castor({ url: host+'/inputs/'+key, level: 'log'});

    document.addEventListener('touchmove',function(e){
        e.preventDefault();
    });
    document.body.addEventListener('touchstart',function(e){
        scrollables.forEach(function(allowedClass) {
            if (e.target.scrollTop === 0) {
                e.target.scrollTop = 1;
            } else if (e.target.scrollHeight === e.target.scrollTop + e.target.offsetHeight) {
                e.target.scrollTop -= 1;
            }
        });
    });


    document.body.addEventListener('touchmove',function(e){
      //  alert(e.target.classList);
        scrollables.forEach(function(allowedClass) {
            if(e.target.classList.contains(allowedClass)){
                e.stopPropagation();
            }

        });
    });
});