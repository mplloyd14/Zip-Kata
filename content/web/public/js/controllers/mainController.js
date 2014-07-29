'use strict';

/* Controllers */
cai.module('peControllers', ['cai.services'])
	.controller('MainController', ['$rootScope', '$scope', '$log', 'user', 'apiProvider', function($rootScope, $scope, $log, user, apiProvider) {
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
                    $log.info('Retrieved fubars');
                    $scope.fus = result.result.length ? result.result : [];
                },
                function(err) {
                    $log.error('Failed to retrieve conference: ' + (err.result ? err.result.toString() : err.toString()));
                });
        }

        $scope.getBar = function() {
            $log.info('Retrieve bar: ' + $scope.searchBar);
            apiProvider.callFunction('getBar', {bar: $scope.searchBar})
                .then(function(result) {
                    $log.info('Retrieved fubars');
                    $scope.bars = result.result.length ? result.result : [];
                },
                function(err) {
                    $log.error('Failed to retrieve conference: ' + (err.result ? err.result.toString() : err.toString()));
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
                    $log.error('Failed to retrieve conference: ' + (err.result ? err.result.toString() : err.toString()));
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



