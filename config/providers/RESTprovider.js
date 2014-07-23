var Q = require('q');
module.exports = {
    'type' : 'REST',
    'services' : {
		"/peseed/name/:name" : [{
            "method" : "post",
            "version" : "0.1.0",
            "event": "dataReceived"

        }],
        "/location/:locationId/delivery/:deliveryId" : [
        {
            "external": true,
            "method" : "post",
            "version" : "0.1.0",
            "event": "incomingLocationDelivery"
        }],
        "/location/:locationId" : [
        {
            "external": true,
            "method" : "post",
            "version" : "0.1.0",
            "event": "incomingLocation"
        }],
        "/delivery/:deliveryId" : [
        {
            "external": true,
            "method" : "post",
            "version" : "0.1.0",
            "event": "incomingDelivery"
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
