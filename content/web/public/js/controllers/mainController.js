'use strict';

/* Controllers */
evo.module('peControllers', ['evo'])
	.controller('MainController', ['$scope', '$log', '$location', 'evoClientData', function($scope, $log, $location, core) {
		$log.info('Loading web main controller');
        $scope.adminUrl = core.adminUrl;
        $scope.changeUrl = core.changeUrl;
        $scope.logoutUrl = core.logoutUrl;
        //$scope.adminUrl = 'http://www.google.com';
        $log.info($scope.adminUrl);
        $log.info($scope.changeUrl);
        $log.info($scope.logoutUrl);
    }]);



