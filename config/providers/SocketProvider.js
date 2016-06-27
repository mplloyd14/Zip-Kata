'use strict';

/**
 * Created by mlloyd on 6/24/2016.
 */

var fetch = require('../../lib/fetch.js');

module.exports = {
    type: 'Socket',
    services: {
        findAll: {
            handler: fetch.findAll
        },
        findZipById: {
            handler: fetch.findZipById
        }
    }
};