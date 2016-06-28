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
    return ZipCollection.get({_id: idIn})
        .then(function (response) {
        if (response) {
            return response;
        } else {
            return ZipCollection.getById(idIn);
        }
    }, function (err) {
        log.error(err);
    });
};

ZipCollection.updateData = function (newData) {
    console.log('Beginning update');
    ZipCollection.update({_id: newData._id}, newData);
};

module.exports = {
    findAll: ZipCollection.findAll,
    findZipById: ZipCollection.findZipById,
    updateData: ZipCollection.updateData
};