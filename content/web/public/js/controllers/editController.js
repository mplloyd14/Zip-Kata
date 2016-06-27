'use strict';

/**
 * Created by mlloyd on 6/27/2016.
 */

evo.module('peControllers', ['evo', 'evo.common'])
    .controller('EditController', ['$scope', '$log', '$location', '$routeParams', 'evoAPI', 'ZipService', function ($scope, $log, $location, $routeParams, evoAPI, ZipService) {
        $log.log('Loading web Edit Controller');

        var entry = $routeParams.id;
        console.log(entry);
        // ZipService.GatherById(entry);
    }]);