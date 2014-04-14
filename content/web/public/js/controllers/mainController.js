'use strict';

/* Controllers */
cai.module('peControllers', ['cai.services'])
	.controller('MainController', function($rootScope, $scope, $log, apiProvider) {
		$log.log('Loading web main controller');
		$scope.message = 'Hello world';
		$scope.userData = {};
		$scope.count = 0;
		$scope.postCount = 0;
		$scope.enteredName = '';

		$scope.submitName = function(){
			apiProvider.callFunction('getPESeedData',{name: $scope.enteredName}).then(function(message){
				console.log("Result of getPESeedData is " + message.result);
				$scope.userData = message.result;
				$scope.message = 'Hello ' + $scope.userData.first;
			});
		};



		$rootScope.$on("dataReceived", function (event, message) {
			console.log("Event dataReceived fired with : " + message);
			$scope.postCount = $scope.postCount + 1;
			$scope.userData = message.data.body;
			$scope.message = 'Post Received: ' + $scope.postCount;

			$scope.$apply();
			console.log("Event dataReceived fired with : " + message);
		});

		$rootScope.$on("dataGot", function (event, message) {
			$scope.userData = JSON.parse(message.data);
			$scope.count = $scope.count + 1;
			$scope.message = 'Event Received: ' + $scope.count;

			$scope.$apply();
			console.log("Event dataGot fired with : " + message);
		});

	});



