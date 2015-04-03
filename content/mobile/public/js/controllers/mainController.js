'use strict';

/* Controllers */
angular.module('peControllers', ['cai.services'])
//cai.module('peControllers', ['cai.services'])
	.controller('MainController', function($scope, $log) {
	//.controller('MobileController', function($scope, $log) {
		$log.log('Loading mobile main controller');
		$scope.message = 'Hello Mobile world';
	});

