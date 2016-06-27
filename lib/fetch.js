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

module.exports = {
    findAll: findAll,
    findZipById: findZipById
};