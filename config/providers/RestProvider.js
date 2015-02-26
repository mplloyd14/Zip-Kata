var Q = require('q');
module.exports = {
    'type' : 'REST',
    'services' : {
        "/test/id/:id" : [{
            "method" : "post",
            "version" : "0.1.0",
            "contextualized" : true,
            "event": "testReceived"

        }],
       "/test/id/:id/vendor/:vendor" : [{
            "method" : "post",
            "version" : "0.1.0",
            "contextualized" : true,
            "event": "testReceived"

        }],
    "/test/company/:company" : [{
        "method" : "post",
        "version" : "0.1.0",
        "contextualized" : true,
        "event": "companyReceived"
    }]

    }
};
