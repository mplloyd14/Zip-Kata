'use strict';

/**
 * Created by mlloyd on 6/27/2016.
 */


evo.module('kataService').service('ZipService',['evoAPI', '$rootScope', '$log', function (evoAPI, $rootScope, $log) {
    var self = this;
    self.data = {};

    self.GatherZips = function () {
        console.log('Gathering Zips');
        evoAPI.callFunction('findAll').then(function (response) {
            console.log('Success');
            self.data = response.result;
            $rootScope.$broadcast('fetched');
        }).catch(function (err) {
            console.log(err);
        })
    };

    self.GatherById = function (idIn) {
        console.log('Getting Zip');
        return evoAPI.callFunction('findZipById', idIn).then(function (response) {
            console.log('Success');
            return response.result;
        }).catch(function (err) {
            console.log(err);
        })
    };
}]);