'use strict';

/* Controllers */
evo.module('peControllers', ['evo'])
	.controller('MainController', ['$rootScope', '$scope', '$log', 'evoUser', 'evoAPI', function($rootScope, $scope, $log, user, apiProvider) {
		$log.info('Loading web main controller');
        $scope.message = 'Hello world';

		$scope.getSecretMessage = function(){
			$log.info('retrieving secret message ...');
			apiProvider.callFunction('getSecrets', {})
				.then(function(message){
					$log.info('secret message [' + message.result + '] retrieved');	
				});
		};
		
		$scope.getConfidentialMessage = function(){
			$log.info('retrieving confidential message ...');
			apiProvider.callFunction('getConfidentialMsg', {})
				.then(function(message){
					$log.info('confidential message [' + message.result + '] retrieved');	
				});
		};
    }]);
