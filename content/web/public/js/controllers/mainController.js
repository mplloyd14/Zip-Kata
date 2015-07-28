'use strict';

/* Controllers */
evo.module('peControllers', ['evo'])
	.controller('MainController', function($rootScope, $scope, $log, evoAPI) {
		$log.log('Loading web main controller');
		$scope.message = 'Hello world';
		$scope.data = [];
		$scope.errmsg = null;

		$scope.apiCallDeferred = function() {
			$scope.data = [];
			$scope.errmsg = null;
			evoAPI.callFunction('getInformation')
			.then(function(data) {
				$scope.data = data.result;
			})
			.catch(function(err) {
				$scope.errmsg = err;
			});
		}

		$scope.apiCallNonDeferred = function() {
			$scope.data = [];
			$scope.errmsg = null;
			evoAPI.callFunctionNoDeferred('getInformation')
			.then(function(data) {
				$scope.data = data.result;
			})
			.catch(function(err) {
				$scope.errmsg = err;
			});
		}

	});
