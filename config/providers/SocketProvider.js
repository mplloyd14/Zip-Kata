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
        },
        updateData: {
            handler: fetch.updateData
        },
        addData: {
            handler: fetch.addData
        }
        
    },
    emitters: {
        events: [{
            'event': 'postMessage',
            'room': '*'
        },
        {
            'event': 'addMessage',
            'room': '*'
        }]
    }
};