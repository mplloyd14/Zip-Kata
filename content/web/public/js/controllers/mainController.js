'use strict';

/* Controllers */
//cai.module('peControllers', ['cai.services'])
evo.module('peControllers', ['evo'])
	.controller('MainController', function($rootScope, $scope, $log, apiProvider) {
		$log.log('Loading web main controller');
		$scope.message = 'Hello world';
	});



