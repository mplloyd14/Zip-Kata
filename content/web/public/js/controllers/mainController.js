'use strict';

/* Controllers */
cai.module('peControllers', ['cai.services'])
	.controller('MainController', ['$rootScope', '$scope', '$log', 'user', 'apiProvider', function($rootScope, $scope, $log, user, apiProvider) {
		$log.info('Loading web main controller');
        $scope.messages = [];
        //$scope.level = '';
        $scope.name = '';

        $scope.sendData = function() {
            //$log.info('Send data: ' + $scope.level + ' ' + $scope.name);
            $log.info('Send data: ' + $scope.name);
            //apiProvider.callFunction('sendData', {level: $scope.level, name: $scope.name})
            apiProvider.callFunction('sendData', {name: $scope.name})
                .then(function(result) {
                    $log.info('Sent data');
                },
                function(err) {
                    $log.error('Failed to send data: ' + (err.result ? err.result.toString() : err.toString()));
                });
        }

        $rootScope.$on("dataReceived", function (event, message) {
            $log.info("Event dataReceived fired with : " + JSON.stringify(message));
            $scope.messages.push(message);

            $scope.$apply();
        });

    }]);



