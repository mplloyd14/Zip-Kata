'use strict';

var log = require('../../lib/log')(),
    Q = require('q'),
    fubars = require('../../lib/fubars');


var throwError = false;

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
                announce: true,
                filter: function(data, perms) {
                    log.info('Filtering for getFubar room');
                    if (throwError) {
                        log.warn('About to throw an error, man');
                        throw new Error('Bad things, man');
                    }
                    log.debug('No prob, dude');
                    throwError = !throwError;
                    return Q(data);
                }
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
            {'event' :  "fuUpdate", 'room': '|PATTERN|', 'pattern': '/{fu}'},
            {'event' :  "barUpdate", 'room': '|PATTERN|', 'pattern': '/{bar}'},
            {'event' :  "fubarUpdate", 'room': '|PATTERN|', 'pattern': '/{fu}/{bar}'}
        ]
    }
};
