var Q = require('q');
module.exports = {
    'type' : 'REST',
    'services' : {
        "/test" : [{
            "method" : "post",
            "version" : "0.1.0",
            "external" : true,
            "event": "urlReceived"

        }],
        "/test/id/:id" : [{
            "method" : "post",
            "version" : "0.1.0",
            "external" : true,
            "event": "pathBegReceived"

        }],
       "/test/id/:id/vendor/:vendor" : [{
            "method" : "post",
            "version" : "0.1.0",
            "external" : true,
            "event": "pathBegReceived"

        }],
      "/test/broadcast" : [{
        "method" : "post",
        "version" : "0.1.0",
        "external" : true,
        "event": "broadcastReceived"
    }]
 }
};
