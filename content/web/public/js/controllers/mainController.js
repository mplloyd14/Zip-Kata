'use strict';

/* Controllers */
evo.module('peControllers', ['evo'])
	.controller('MainController', ['$scope', '$log', '$location', 'evoClientData', function($scope, $log, $location, core) {
		$log.info('Loading web main controller');
        $scope.adminUrl = core.adminUrl;
        //$scope.adminUrl = 'http://www.google.com';
        $log.info($scope.adminUrl);
    }]);



