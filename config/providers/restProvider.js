var Q = require('q');
module.exports = {
    'type' : 'REST',
    'services' : {//these will create REST listeners on the routes specified
        "/services/v5/projects/785969/stories" : [{   //there should be a matching room id if the socket emitter is of type |URL|. if it is |*| then not needed.
            "method" : "post",
            "version" : "0.1.0",
            "event": "trackerEvent"

        }]
    },
    'requests' : [{ //these will call remote REST services when the requestEvent fires.  Data retrieve will be published on the publishEvent
        'server' : 'https://www.pivotaltracker.com',
        'method' : 'GET',//could also have options : {} or data : {}
        'options' : {'headers' : {'X-TrackerToken':'c9d8ddfca063867ed5f0ce48620c26ca'}} ,
        'publishEvent' : 'storiesRetrieved',
        'requestEvent' : { 'event': 'roomCreated', regEx : '/services/v5/projects/785969/stories', 'reoccur' : {'interval' : '*/10 * * * * *', 'terminationEvent' : 'roomClosed' }}  //on room creation if id matches the regEX begin the polling

    }]
 }
