'use strict';

/* Controllers */
cai.module('peControllers', ['cai.services'])
	.controller('MainController', ['$rootScope', '$scope', '$log', 'i18n', 'user', 'settings', 'apiProvider', function($rootScope, $scope, $log, i18n, user, settings, apiProvider) {
		$log.log('Loading web main controller');

        $scope.firstName = user.data.firstName;
        $scope.lastName = user.data.lastName;
        $scope.localMsg = i18n.__('txtLocalMsg');

        $scope.paginationSettings = settings.pagination;

        // Pagination Pieces
        $scope.totalCount = 0;
        $scope.currentPage = 1;
        $scope.maxPerPage = 10;
        $scope.isPaginate = false;

        $scope.update_paginate = function () {
            return function pages(input) {
                $scope.pages = Math.ceil(input.length / $scope.maxPerPage);
            };
        };

        $scope.setPage = function(page) {
            $scope.currentPage = page;
        }

        $log.info('Retrieve user ' + user.data.userName + ' state info: ' + user.data.product.settings.state);
        apiProvider.callFunction('getState',  user.data.product.settings.state)
            .then(function(result) {
                $log.info('Retrieved user ' + user.data.userName + ' state info: ' + user.data.product.settings.state);
                $scope.state = result.result.length ? result.result[0] : {cities: []};
                //$log.debug(JSON.stringify($scope.state));

                $scope.totalCount = $scope.state.cities.length;
                $scope.currentPage = 1;
                $scope.isPaginate = !!(($scope.totalCount > $scope.maxPerPage));

            },
            function(err) {
                $log.error('Failed to retrieve user ' + user.data.userName + ' state info: ' + (err.result ? err.result.toString() : err.toString()));
            });


	}]);



