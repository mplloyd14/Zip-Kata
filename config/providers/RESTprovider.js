var Q = require('q');
module.exports = {
    'type' : 'REST',
    'services' : {
        "/test" : [{
            "method" : "post",
            "version" : "0.1.0",
            "external" : true,
            "contextualized" : true,
            "event": "testReceived"

        }],
    "/test/id/:id" : [{
        "method" : "post",
        "version" : "0.1.0",
        "external" : true,
        "contextualized" : true,
        "event": "testReceived"

    }]
    }
};
