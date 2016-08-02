'use strict';

/**
 * Created by mlloyd on 6/30/2016.
 */


var restService = require('../../lib/restService.js');

module.exports = {
    type: 'REST',
    services : {
        '/api/zip/update': [{
            method: 'POST',
            version: '0.1.0',
            external: true,
            handler: restService.postMessage
        }],
        '/api/zip/add': [{
        	method: 'POST',
        	version: '0.1.0',
        	external: true,
        	handler: restService.addMessage
        }]
    }
};
