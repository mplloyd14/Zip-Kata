var Q = require('q');
module.exports = {
    'type' : 'REST',
    'services' : {
        "/name/:name" : [
        {
            "external": true,
            "method" : "post",
            "version" : "0.1.0",
            "event": "dataReceived"
        }, {
            "external": true,
            "method" : "get",
            "version" : "0.1.0",
            handler: function(data) {
                return Q.fcall(function() {
                    return "DATA FROM PE_SEED: " + data;
                });
            }
        }],
        "/product/peseed/name/:name" : [
        {
            "external": true,
            "method" : "get",
            "version" : "0.1.0",
            handler: function(data) {
                return Q.fcall(function() {
                    return "DATA FROM PE_SEED: " + data;
                });
            }
        }]
    },
    'requests' : [
        {
            'server' : "PeSeedGetService",
            'method' : 'GET',
            'publishEvent' : 'dataGot',
            'requestEvent' : {
                'event': 'roomCreated',
				'regEx': '/peseed/name/.*',
                'reoccur' : {
                    'interval' : '*/30 * * * * *',
                    'terminationEvent' : 'roomClosed'
                }

            }
        }

    ]


};
