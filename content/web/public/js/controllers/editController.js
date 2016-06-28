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

            $scope.stuff = $scope.entry._id;
        });

        $scope.back = function () {
            $location.path('/');
        };

        $scope.confirm = function() {
            // Check the spaces
            if ($scope.verify() == true) {
                $log.log('true');
                ZipService.updateEntry($scope.entry);
            }
        };

        $scope.verify = function () {
            if ($scope.entry.city.length <= 0) {
                $scope.errorMessage = 'Error: City blank empty';
                return false;
            } else if ($scope.entry.state.length <= 0) {
                $scope.errorMessage = 'Error: State blank empty';
                return false;
            } else if ($scope.entry.pop == undefined || $scope.entry.pop == "") {
                $scope.errorMessage = 'Error: Population blank empty';
                return false;
            } else if ($scope.entry.loc[0] == undefined || $scope.entry.loc[0] == "") {
                $scope.errorMessage = 'Error: Latitude blank empty';
                return false;
            } else if ($scope.entry.loc[1] == undefined || $scope.entry.loc[1] == "") {
                $scope.errorMessage = 'Error: Longitude blank empty';
                return false;
            } else {
                $scope.errorMessage = '';
                return true;
            }
        };
    }]);