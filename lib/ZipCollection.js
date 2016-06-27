/**
 * Created by mlloyd on 6/27/2016.
 */

'use strict';

var core = require('projevo-core');
var Collection = core.Collection;
var log = core.Logger.logger();

var ZipCollection = Collection('zipcodes', null, null);

ZipCollection.findAll = function () {
    console.log('Query Started');
    return ZipCollection.find();
};

ZipCollection.findZipById = function (idIn) {
    console.log('Finding ID');
    return ZipCollection.findZipById({_id: idIn}).then(function (response) {
        if (response) {
            return response;
        } else {
            return ZipCollection.getById(idIn);
        }
    }, function (err) {
        log.error(err);
    });
};

module.exports = {
    findAll: ZipCollection.findAll,
    findZipById: ZipCollection.findZipById

};