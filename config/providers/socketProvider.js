'use strict';

var log = require('../../lib/log')(),
    Q = require('q'),
    fubars = require('../../lib/fubars');
    
module.exports = {
    type: "Socket",
    services: {
        getFu: {
            handler: function(data, context){
            	log.info('Get Fu for ' + JSON.stringify(context));
                return fubars.get(context, data);
            },
            room: {
                //id: "|URL|",
                //url: "/{fu}",
                id: "|PATTERN|",
                pattern: "/{fu}",
                client: true,
                announce: true
            }
        },
        getBar: {
            handler: function(data, context){
                log.info('Get Bar for ' + JSON.stringify(context));
                return fubars.get(context, data);
            },
            room: {
                //id: "|URL|",
                //url: "/{bar}",
                id: "|PATTERN|",
                pattern: "/{bar}",
                client: true,
                announce: true
            }
        },
        getFubar: {
            handler: function(data, context){
                log.info('Get Fubar for ' + JSON.stringify(context));
                return fubars.get(context, data);
            },
            room: {
                //id: "|URL|",
                //url: "/{fu}/{bar}",
                id: "|PATTERN|",
                pattern: "/{fu}/{bar}",
                client: true,
                announce: true
            }
        }
    },
    emitters : {
        events : [
            /*
            {'event' :  "fuUpdate", 'room': '|URL|'},
            {'event' :  "barUpdate", 'room': '|URL|'},
            {'event' :  "fubarUpdate", 'room': '|URL|'}
            */
            {'event' :  "fuUpdate", 'room': '|URL|'},
            {'event' :  "barUpdate", 'room': '|URL|'},
            {'event' :  "fubarUpdate", 'room': '|URL|'}
        ]
    }
};
