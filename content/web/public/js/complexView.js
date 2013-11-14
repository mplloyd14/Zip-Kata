cai.module('complexViewApp', ['ngRoute', 'ngCookies', 'cai.services'])
	.controller('complexViewController', function($scope) {
    	$scope.input0 = 'Input 0';
    	$scope.input1 = 'Input 1';
    });