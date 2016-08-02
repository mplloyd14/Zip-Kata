'use strict';

/**
 * Created by mlloyd on 6/30/2016.
 */


var Q = require('q');
var core = require('projevo-core');
var log = core.Logger.logger();
var eventBus = core.EventBus;

var postMessage = function (req, context) {
    return Q.fcall(function () {
        log.log(req);

        var data = {
            source: 'REST',
            method: 'POST',
            data: req.body
        };

        eventBus.publishEvent('postMessage', data)
    }, function (err) {
        log.error('error in restService.js');
        log.error(err);
    })
};

var addMessage = function(req, context) {
    return Q.fcall(function() {
        log.log(req);

        var data = {
            source: 'REST',
            method: 'POST',
            data: req.body
        };

        if (checkData(data.data) == false) {
            throw Error('New entry must contain all fields');
        }

        eventBus.publishEvent('addMessage', data)
    }, function(err) {
        log.error('error in restService.js');
        log.error(err);
    })
};

var checkData = function(data) {
    if (data._id && data.city && data.state && data.pop && data.loc && data.loc.length == 2) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    addMessage: addMessage,
    postMessage: postMessage
};