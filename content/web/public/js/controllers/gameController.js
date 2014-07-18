'use strict';

/* Controllers */
cai.module('peControllers', ['cai.services'])
	.controller('GameController', ['$rootScope', '$scope', '$log', 'settings', 'apiProvider', function($rootScope, $scope, $log, settings, apiProvider) {
		$log.info('Loading web game controller');

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
	}]);



