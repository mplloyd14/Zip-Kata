'use strict';

/* Controllers */
cai.module('peControllers', ['cai.services'])
	.controller('TeamController', ['$rootScope', '$scope', '$log', '$routeParams', 'settings', 'apiProvider', function($rootScope, $scope, $log, $routeParams, settings, apiProvider) {
		$log.info('Loading web team controller');
        $scope.team = {};
        $scope.games = [];

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

        function retrieveTeam(conference, code) {
            $log.info('Retrieve team for : ' + code);
            apiProvider.callFunction('getTeam', {conference: conference, code: code})
                .then(function(result) {
                    $log.info('Retrieved team for: ' + code);
                    $scope.team = result.result.length ? result.result[0] : {};
                    //$log.debug(JSON.stringify($scope.team));

                    retrieveGames(code, 'home');
                    retrieveGames(code, 'visitor');
                },
                function(err) {
                    $log.error('Failed to retrieve teams for conference: ' + $scope.conference.name + '. ' + (err.result ? err.result.toString() : err.toString()));
                });
        }

        function retrieveGames(code, homeOrVisitor) {
            $log.info('Retrieve ' + homeOrVisitor + ' games for team: ' + code);
            var query = {};
            query[homeOrVisitor] = code;
            apiProvider.callFunction('getGame', query)
                .then(function(result) {
                    $log.info('Retrieved ' + homeOrVisitor + ' games team for: ' + code);
                    $scope.games = $scope.games.concat(result.result.length ? result.result : {});
                    //$log.debug(JSON.stringify($scope.games));

                    $scope.totalCount = $scope.games.length;
                    $scope.currentPage = 1;
                    $scope.isPaginate = !!(($scope.totalCount > $scope.maxPerPage));
                },
                function(err) {
                    $log.error('Failed to retrieve games for team: ' + code + '. ' + (err.result ? err.result.toString() : err.toString()));
                });
        }

        retrieveTeam($routeParams.conference || '', $routeParams.code || '');
	}]);



