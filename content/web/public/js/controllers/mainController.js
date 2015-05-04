'use strict';

/* Controllers */
angular.module('peControllers', ['evo'])
	.controller('MainController', function($rootScope, $scope, $log) {
		$log.log('Loading web main controller');
		$scope.message = 'Hello world';
	});



