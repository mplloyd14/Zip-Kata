'use strict';

/* Controllers */
cai.module('peControllers', ['cai.services'])
	.controller('MainController', function($rootScope, $scope, $log, apiProvider) {
		$log.log('Loading web main controller');
		$scope.message = 'Hello world';
        $scope.createRoom = function(){
            apiProvider.callFunction('createRoom',{id:7}).then(function(message){
                console.log("Result of createRoom is " + message.result);
            });

            $rootScope.$on("testReceived", function (event, message) {
                console.log("Event testReceived fired with : " + message);
            });
        };
        $scope.createVendorRoom = function(){
            apiProvider.callFunction('createVendorRoom',{id:7,vendor:"abc"}).then(function(message){
                console.log("Result of createVendorRoom is " + message.result);
            });

            $rootScope.$on("testReceived", function (event, message) {
                console.log("Event testReceived fired with : " + message);
            });
        };
	});



