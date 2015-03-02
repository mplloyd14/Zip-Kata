'use strict';

/* Controllers */
cai.module('peControllers', ['cai.services'])
	.controller('MainController', function($rootScope, $scope, $log, apiProvider) {
		$log.log('Loading web main controller');
		$scope.message = 'Create Some Rooms';

        $rootScope.$on("urlReceived", function (event, message) {
            console.log("Event urlReceived fired with : " + message);
        });
        $rootScope.$on("pathBegReceived", function (event, message) {
            console.log("Event pathBegReceived fired with : " + message);
        });
        $rootScope.$on("broadcastReceived", function (event, message) {
            console.log("Event broadcastReceived fired with : " + message);
        });
        $scope.createUrlRoom = function(){
            apiProvider.callFunction('createUrlRoom',{}).then(function(message){
                console.log("Result of createUrlRoom is " + message.result);
            });
        };
        $scope.createPathBegRoom = function(){
            apiProvider.callFunction('createPathBegRoom',{id:7}).then(function(message){
                console.log("Result of createPathBegRoom is " + message.result);
            });
        };
        $scope.createVendorRoom = function(){
            apiProvider.callFunction('createVendorRoom',{id:7,vendor:"abc"}).then(function(message){
                console.log("Result of createVendorRoom is " + message.result);
            });

        };
 	});



