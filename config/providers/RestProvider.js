var Q = require('q');
module.exports = {
    'type' : 'REST',
    'services' : {
        "/test" : [{
            "method" : "post",
            "version" : "0.1.0",
            "contextualized" : true,
            "event": "urlReceived"

        }],
        "/test/id/:id" : [{
            "method" : "post",
            "version" : "0.1.0",
            "contextualized" : true,
            "event": "pathBegReceived"

        }],
       "/test/id/:id/vendor/:vendor" : [{
            "method" : "post",
            "version" : "0.1.0",
            "contextualized" : true,
            "event": "pathBegReceived"

        }],
          "/test/broadcast" : [{
            "method" : "post",
            "version" : "0.1.0",
            "contextualized" : true,
            "event": "broadcastReceived"
        }],
        "/states" : [{
          "method" : "get",
          "version" : "0.1.0",
          "contextualized" : true,
          "event": "statesRequested"
        }]
 }
};
