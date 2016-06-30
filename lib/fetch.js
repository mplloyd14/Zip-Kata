'use strict';

/**
 * Created by mlloyd on 6/27/2016.
 */


var ZipCollection = require('./ZipCollection');
var core = require('projevo-core');
var log = core.Logger.logger();

var findAll = function () {
    return ZipCollection.findAll().then(function (result) {
        console.log('Returning Results');
        return result;
    }, function (err) {
        log.error(err);
    })
};

var findZipById = function (idIn) {
    return ZipCollection.findZipById(idIn).then(function (result) {
        console.log('Returning Result');
        return result;
    }, function (err) {
        log.error(err);
    })
};

var updateData = function (entry) {
    console.log('Retrieving old data');
    return ZipCollection.findZipById(entry._id).then(function (oldData) {
        console.log('Data updating');

        oldData.city = entry.city;
        oldData.pop = entry.pop;
        oldData.state = entry.state;
        oldData.loc[0] = entry.loc[0];
        oldData.loc[1] = entry.loc[1];
        ZipCollection.updateData(oldData).then(function (result) {
            console.log('Finished updating');
            return result;
        }, function (err) {
            log.error(err);
        })
    }, function (err) {
        log.error(err);
    })
};

module.exports = {
    findAll: findAll,
    findZipById: findZipById,
    updateData: updateData
};