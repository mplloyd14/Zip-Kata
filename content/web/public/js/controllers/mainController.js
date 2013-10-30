'use strict';

/* Controllers */
angular.module('peControllers', ['cai.services'])
	.controller('MainController', function($rootScope,$scope, $log,$timeout, apiProvider,config) {
        $rootScope.pushToLoggly = false;
        apiProvider.callFunction('timesTwo',{num:2}).then(function(message){
            $log.info("Result of timesTwo is " + message.result);
        });
        //var test = config.get('log');
        //$log.support("value from server is " + test);
        apiProvider.callFunction('callReddit',{num:2}).then(function(message){
            $log.info("Front page of Reddit  is " + message.result);
        });
        $timeout(function(){
            apiProvider.callFunction('timesThree',{num:4}).then(function(message){
                $log.info("Result of timesThree is " + message.result);
            });
        }, 1000);

        $timeout(function(){
            apiProvider.callFunction('timesFour',{num:5}).then(function(message){
                $log.info("Result of timesFour is " + message.result);
            });
        }, 2000);

        $timeout(function(){
            apiProvider.callFunction('announceToAll',{hello: 'world'}).then(function(message){
                $log.info("Called announceToAll.  Will wait for ticketReceived event");
            });
        }, 4000);

		$log.info('Loading web main controller');
		$scope.message = 'Hello world';
        $rootScope.$on("timesTwoRequest",function(event,message){
            $log.info("Event timesTwoRequest fired with : " + message);
        })

        $rootScope.$on("trackerEvent",function(event,message){
            $log.info("Event trackerEvent fired with info about  : " + message.body); //you can access ticket.body to get the POST body
        });

        $rootScope.$on("ticketReceived",function(event,message){
            $log.info("Event ticketReceived fired with info about  : " + message.body); //you can access ticket.body to get the POST body
        })
	});


