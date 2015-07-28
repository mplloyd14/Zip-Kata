'use strict';

var core = require('projevo-core'),
    log = core.Logger.getLogger(),
    Q = require('q');

module.exports = {
    type: "Socket",
    services: {
        getInformation: {
            handler: function(data, context){
            	log.info('Get some information ' + JSON.stringify(context));
              return Q([
                {code: 'a', value: 1},
                {code: 'b', value: 2},
                {code: 'c', value: 3},
                {code: 'd', value: 4},
                {code: 'e', value: 5},
                {code: 'f', value: 6},
                {code: 'g', value: 7},
                {code: 'h', value: 8},
                {code: 'i', value: 9},
                {code: 'j', value: 10}
              ]);
            }
        }
    }
};
