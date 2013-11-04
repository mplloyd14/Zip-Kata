'use strict';

/* Controllers */
angular.module('peControllers', ['cai.services'])
	.controller('MainController', function($rootScope,$scope, $log, $timeout, apiProvider, user) {
        apiProvider.callFunction('timesTwo',{num:2}).then(function(message){
            $log.info("Result of timesTwo is " + message.result);
        });

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
            apiProvider.callFunction('gimmeContextData',{}).then(function(message) {
                $log.info("GimmeContextData, Company is "+ message.result.company);
                $log.info("GimmeContextData, Product is "+ message.result.product);
            });
        }, 2000);


		$log.info('Loading web main controller');
		$scope.message = 'Hello world';

        $rootScope.$on("timesTwoRequest",function(event,message){
            $log.info("Event timesTwoRequest fired with : " + message);
        });

        $rootScope.$on("clientReceived",function(event,message){
            $log.info("Event clientReceived fired with info about  : " + message.body.client.name); //you can access ticket.body to get the POST body
        });

        $scope.udata = user.data;

        $scope.companyName = user.context.company;

        $scope.productName = user.context.product;
    });



