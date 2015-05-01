'use strict';

/* Controllers */
angular.module('peControllers', ['evo'])
	.controller('MainController', function($scope, $log) {
		$log.log('Loading mobile main controller');
		$scope.message = 'Hello world';
	});



