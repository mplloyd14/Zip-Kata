'use strict';

/**
 * Created by mlloyd on 6/27/2016.
 */


evo.module('kataService').service('ZipService',['evoAPI', '$rootScope', '$log', function (evoAPI, $rootScope, $log) {
    var self = this;
    self.data = {};

    self.GatherZips = function () {
        console.log('Gathering Zips');
        return evoAPI.callFunction('findAll').then(function (response) {
            console.log('Success');
            self.data = response.result;
            $rootScope.$broadcast('fetched');
        }).catch(function (err) {
            console.log(err);
        })
    };

    self.GatherById = function (idIn) {
        return evoAPI.callFunction('findZipById', idIn).then(function (response) {
            console.log('Success');
            return response.result;
        }, function (err) {
            console.log(err);
        })
    };

    self.updateEntry = function (newEntry) {
        console.log('Beginning update');
        return evoAPI.callFunction('updateData', newEntry).then(function () {
            console.log('Successful update');
            return self.GatherZips();
        }, function (err) {
            console.log(err);
        })
    }
}]);