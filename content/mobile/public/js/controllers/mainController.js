'use strict';

/* Controllers */
angular.module('peControllers', ['cai.services'])
	.controller('MainController', function($scope, $log, $timeout, apiProvider) {
		$log.log('Loading mobile main controller');
		$scope.message = 'Hello world';

    $timeout(function(){
      apiProvider.callFunction('gimmeContextData',{}).then(function(message) {
        $log.info("GimmeContextData, Company is "+ message.result.company);
        $log.info("GimmeContextData, Product is "+ message.result.product);
      });
    }, 2000);

	});



