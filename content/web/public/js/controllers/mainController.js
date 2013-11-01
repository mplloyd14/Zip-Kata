'use strict';

/* Controllers */
angular.module('peControllers', ['cai.services'])
	.controller('PivotalController', function($rootScope,$scope, $log,$timeout, apiProvider,config) {
        $scope.alerts = [];
        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };
        apiProvider.callFunction('getStories',{projects : 785969}).then(function(message){
            $log.info("Result of getStories is " + message.result);
            $scope.stories = JSON.parse(message.result);
        });
        $rootScope.$on("trackerEvent",function(event,message){
            $log.info("Event trackerEvent fired with : " + message.body);
            $scope.update = message.body.message;
            $scope.alerts.push({type: "success", msg: message.body.message})        })

	});



