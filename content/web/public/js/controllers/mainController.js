'use strict';

/* Controllers */
evo.module('peControllers', ['evo'])
	.controller('MainController', function($rootScope, $scope, $log, evoAPI) {
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

        // evoAPI.callFunction('getFakeData', { id: 7 })
        //     .then(function(message){
        //         console.log(message);
        //     });

        $scope.createUrlRoom = function(){
            console.log('createUrlRoom');
            evoAPI.callFunction('createUrlRoom',{}).then(function(message){
                console.log("Result of createUrlRoom is " + message.result);
            });
        };
        $scope.createPathBegRoom = function(){
            console.log('createPathBegRoom');
            evoAPI.callFunction('createPathBegRoom',{id:7}).then(function(message){
                console.log("Result of createPathBegRoom is " + message.result);
            });
        };
        $scope.createVendorRoom = function(){
            console.log('createVendorRoom');
            evoAPI.callFunction('createVendorRoom',{id:7,vendor:"abc"}).then(function(message){
                console.log("Result of createVendorRoom is " + message.result);
            });

        };
 	});



