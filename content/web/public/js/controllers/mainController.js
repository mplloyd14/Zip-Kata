'use strict';

/* Controllers */
angular.module('peControllers', ['cai.services'])
	.controller('MainController', function($rootScope,$scope, $log, apiProvider) {
        apiProvider.callFunction('timesTwo',{num:2}).then(function(message){
            $log.log("Result of timesTwo is " + message.result);
        })

        apiProvider.callFunction('callReddit',{num:2}).then(function(message){
            $log.log("Front page of Reddit  is " + message.result);
        })
		$log.log('Loading web main controller');
		$scope.message = 'Hello world';
        $rootScope.$on("ticketUpdate",function(event,message){
            $log.log("Event ticketUpdated fired with : " + message);
        })

        $rootScope.$on("clientReceived",function(event,message){
            $log.log("Event clientReceived fired with info about  : " + message.body.client.name); //you can access ticket.body to get the POST body
        })
	});



