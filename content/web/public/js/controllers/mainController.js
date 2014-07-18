'use strict';

/* Controllers */
cai.module('peControllers', ['cai.services'])
	.controller('MainController', ['$rootScope', '$scope', '$log', 'user', 'settings', 'apiProvider', function($rootScope, $scope, $log, user, settings, apiProvider) {
		$log.info('Loading web main controller');
        $scope.conferences = [];
        $scope.conference = null;
        $scope.teams = [];
        $scope.team = null;

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
        }

        $scope.setPage = function(page) {
            $scope.currentPage = page;
        }

        $scope.onConferenceChange = function() {
            $log.info('Retrieve teams for conference: ' + $scope.conference.name);
            apiProvider.callFunction('getTeam', {conference: $scope.conference.code})
                .then(function(result) {
                    $log.info('Retrieved teams for conference: ' + $scope.conference.name);
                    $scope.teams = result.result.length ? result.result : [];
                    //$log.debug(JSON.stringify($scope.teams));

                    $scope.totalCount = $scope.teams.length;
                    $scope.currentPage = 1;
                    $scope.isPaginate = !!(($scope.totalCount > $scope.maxPerPage));
                },
                function(err) {
                    $log.error('Failed to retrieve teams for conference: ' + $scope.conference.name + '. ' + (err.result ? err.result.toString() : err.toString()));
                });
        }

        $log.info('Retrieve conferences');
        apiProvider.callFunction('getConference', {})
            .then(function(result) {
                $log.info('Retrieved conferences');
                $scope.conferences = result.result.length ? result.result : [];
                //$log.debug(JSON.stringify($scope.conferences));
            },
            function(err) {
                $log.error('Failed to retrieve conferences: ' + (err.result ? err.result.toString() : err.toString()));
            });
	}]);



