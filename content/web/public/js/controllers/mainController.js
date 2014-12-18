'use strict';

/* Controllers */
cai.module('peControllers', ['cai.services'])
	.controller('MainController', ['$rootScope', '$scope', '$log', "$http", "$window", 'user', 'core', 'templates', function($rootScope, $scope, $log, $http, $window, user, core, templates) {
		$log.log('Loading web main controller');

        $scope.firstName = user.data.firstName;
        $scope.lastName = user.data.lastName;

		templates.defaultMissingTemplates([

			//default to nothing when canInput5 permission is missing from user
			{name: 'canInput5Template'},
			//default to template id "canInput6Default" if canInput6 permission is missing from user
			{name: 'canInput6Template', reference: 'canInput6Default' },
			{name: 'canInput7Template', reference: 'canInput7Default'}
		]);

        $scope.logout = function() {
            $log.debug('Logout');
            $http({
                method: 'POST',
                url: core.logoutUrl,
                withCredentials: true
            }).success(function(data, status, headers, config) {
                $window.location.href = core.loginUrl;
            }).error(function(data, status, headers, config) {
                //$log.error('failed to log out');
                $window.location.href = core.loginUrl;
            });
        }
	}]);



