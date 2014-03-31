var Q = require('q');
module.exports = {
    'type' : 'REST',
    'services' : {
		"/name/:name" : [{
            "method" : "post",
            "version" : "0.1.0",
            "event": "dataReceived"

        }]/*,
        "/peseed/name/:name/status" : [{
            "method" : "post",
            "version" : "0.1.0",
            "event": "statusReceived"
        }]*/
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
                    'interval' : '*/10 * * * * *',
                    'terminationEvent' : 'roomClosed'
                }

            }
        }

    ]


};
