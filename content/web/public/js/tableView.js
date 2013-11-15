cai.module('tableViewApp', ['ngRoute', 'ngCookies', 'cai.services', 'cai.directives'])
	.controller('tableViewController', function($scope, $http, $window) {
    	$scope.items = [
        	{
            	all: 'A',
            	a: '1',
                b: 1,
                c: 'one'
            },
        	{
            	all: 'B',
            	a: '2',
                b: 2,
                c: 'two'
            },
        	{
            	all: 'C',
            	a: '3',
                b: 3,
                c: 'three'
            }
        ];
    });