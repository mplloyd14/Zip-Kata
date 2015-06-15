'use strict';

/* Controllers */
cai.module('peControllers', ['evo'])
	.controller('MainController', ['$rootScope', '$scope', '$log', 'evoUser', 'evoAPI', function($rootScope, $scope, $log, user, apiProvider) {
		$log.info('Loading web main controller');
        $scope.fus = [];
        $scope.searchFu = '';
        $scope.bars = [];
        $scope.searchBar = '';
        $scope.fubars = [];
        $scope.searchFubarFu = '';
        $scope.searchFubarBar = '';

        $scope.getFu = function() {
            $log.info('Retrieve fu: ' + $scope.searchFu);
            apiProvider.callFunction('getFu', {fu: $scope.searchFu})
                .then(function(result) {
                    $log.info('Retrieved fus');
                    $scope.fus = result.result.length ? result.result : [];
                },
                function(err) {
                    $log.error('Failed to retrieve fus: ' + (err.result ? err.result.toString() : err.toString()));
                });
        }
        $scope.exportFu = function() {
            $log.info('Export fu');
            apiProvider.callFunction('exportFu', {fu: $scope.searchFu})
                .then(function(result) {
                    $log.info('Exported fus');
                    $scope.fus = result.result.length ? result.result : [];
                },
                function(err) {
                    $log.error('Failed to export fus: ' + (err.result ? err.result.toString() : err.toString()));
                });
        }

        $scope.getBar = function() {
            $log.info('Retrieve bar: ' + $scope.searchBar);
            apiProvider.callFunction('getBar', {bar: $scope.searchBar})
                .then(function(result) {
                    $log.info('Retrieved bars');
                    $scope.bars = result.result.length ? result.result : [];
                },
                function(err) {
                    $log.error('Failed to retrieve fubars: ' + (err.result ? err.result.toString() : err.toString()));
                });
        }

        $scope.getFubar = function() {
            $log.info('Retrieve fubar: ' + $scope.searchFubarFu + '/' + $scope.searchFubarBar);
            apiProvider.callFunction('getFubar', {fu: $scope.searchFubarFu, bar: $scope.searchFubarBar})
                .then(function(result) {
                    $log.info('Retrieved fubars');
                    $scope.fubars = result.result.length ? result.result : [];
                },
                function(err) {
                    $log.error('Failed to retrieve fubars: ' + (err.result ? err.result.toString() : err.toString()));
                });
        }

        $rootScope.$on("fuUpdate", function (event, message) {
            $log.info("Event fuUpdate fired with : " + JSON.stringify(message));
            //$scope.postCount = $scope.postCount + 1;
            //$scope.userData = message.data.body;
            //$scope.message = 'Post Received: ' + $scope.postCount;
            //$scope.fus.push(message.data.body);

            $scope.$apply();
        });

        $rootScope.$on("barUpdate", function (event, message) {
            $log.info("Event barUpdate fired with : " + JSON.stringify(message));
            //$scope.postCount = $scope.postCount + 1;
            //$scope.userData = message.data.body;
            //$scope.message = 'Post Received: ' + $scope.postCount;
            //$scope.bars.push(message.data.body);

            $scope.$apply();
        });

        $rootScope.$on("fubarUpdate", function (event, message) {
            $log.info("Event fubarUpdate fired with : " + JSON.stringify(message));
            //$scope.postCount = $scope.postCount + 1;
            //$scope.userData = message.data.body;
            //$scope.message = 'Post Received: ' + $scope.postCount;
            //$scope.fubars.push(message.data.body);

            $scope.$apply();
        });

    }]);



