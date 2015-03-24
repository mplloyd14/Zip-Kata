'use strict';

/* Controllers */
cai.module('peControllers', ['cai.services'])
	.controller('MainController', ['$scope', '$log', '$location', 'core', function($scope, $log, $location, core) {
		$log.info('Loading web main controller');
        $scope.adminUrl = core.adminUrl;
        //$scope.adminUrl = 'http://www.google.com';
        $log.info($scope.adminUrl);
    }]);



