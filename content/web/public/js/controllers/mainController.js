'use strict';

/* Controllers */
cai.module('peControllers', ['cai.services'])
	.controller('MainController', function($rootScope, $scope, $log, apiProvider) {
		$log.log('Loading web main controller');
		$scope.message = 'Create Some Rooms';

        $rootScope.$on("testReceived", function (event, message) {
            console.log("Event testReceived fired with : " + message);
        });
        $rootScope.$on("companyReceived", function (event, message) {
            console.log("Event companyReceived fired with : " + message);
        });
        $scope.createRoom = function(){
            apiProvider.callFunction('createRoom',{id:7}).then(function(message){
                console.log("Result of createRoom is " + message.result);
            });
        };
        $scope.createVendorRoom = function(){
            apiProvider.callFunction('createVendorRoom',{id:7,vendor:"abc"}).then(function(message){
                console.log("Result of createVendorRoom is " + message.result);
            });

        };
        $scope.createAnotherRoom = function(){
            apiProvider.callFunction('createAnotherRoom',{id:7}).then(function(message){
                console.log("Result of createAnotherRoom is " + message.result);
            });

        };
        $scope.createCompanyRoom = function(){
            apiProvider.callFunction('createCompanyRoom',{company: 'acme'}).then(function(message){
                console.log("Result of createCompanyRoom is " + message.result);
            });

        };
	});



