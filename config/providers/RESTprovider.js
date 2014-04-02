var Q = require('q');
module.exports = {
    'type' : 'REST',
    'services' : {
		"/peseed/name/:name" : [{
            "method" : "post",
            "version" : "0.1.0",
            "event": "dataReceived"

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
