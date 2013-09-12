var Q = require('q');
module.exports = {
    'type' : 'REST',
    'services' : {//these will create REST listeners on the routes specified
        "/clients/client/:num" : [{   //there should be a matching room id if the socket emitter is of type |URL|. if it is |*| then not needed.
            "method" : "post",
            "version" : "0.1.0",
            "event": "clientReceived"

        }]
    },
    'requests' : [{ //these will call remote REST services when the requestEvent fires.  Data retrieve will be published on the publishEvent
        'server' : 'http://localhost:8181',
        'method' : 'GET',//could also have options : {} or data : {}
        'publishEvent' : 'timesTwoRequest',
        'requestEvent' : { 'event': 'roomCreated', regEx : '/timestwo/num/\w*', 'reoccur' : {'interval' : '*/10 * * * * *', 'terminationEvent' : 'roomClosed' }}  //on room creation if id matches the regEX begin the polling

    }]
 }
