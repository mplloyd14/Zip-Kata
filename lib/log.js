'use strict';

var pec = require('projevo-core');
var config = require('config');

var logger;

function LoggerSingleton(options) {
    return logger = (logger || pec.Logger.getLogger(options || config));
}

function Logger(options) {
    return LoggerSingleton(options);
}

module.exports = Logger;
