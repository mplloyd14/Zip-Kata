'use strict';

/**
 * Created by mlloyd on 6/27/2016.
 */

evo.module('peControllers', ['evo', 'evo.common'])
    .controller('EditController', ['$scope', '$log', '$location', '$routeParams', 'evoAPI', 'ZipService', function ($scope, $log, $location, $routeParams, evoAPI, ZipService) {
        $log.log('Loading web Edit Controller');

        $scope.tempId = $routeParams.id;
        console.log($scope.tempId);
        ZipService.GatherById($scope.tempId).then(function (data) {
            $scope.entry = data;
            $scope.stuff = JSON.stringify($scope.entry);
        });

        $scope.back = function () {
            $location.path('/');
        };
    }]);