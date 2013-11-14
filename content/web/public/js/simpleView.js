cai.module('simpleViewApp', ['ngRoute', 'ngCookies', 'cai.services'])
	.controller('simpleViewController', function($scope) {
    	$scope.input0 = 'Input 0';
    	$scope.input1 = 'Input 1';
    	$scope.input2 = 'Input 2';
    	$scope.input3 = 'Input 3';
    });