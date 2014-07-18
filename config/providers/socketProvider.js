var log = require('../../lib/log')(),
    Q = require('q'),
    conferences = require('../../lib/conferences'),
    teams = require('../../lib/teams'),
    games = require('../../lib/games');
    
module.exports = {
    type: "Socket",
    services: {
        getConference: {
            handler: function(data, context){
            	log.info('Get conferences for ' + JSON.stringify(context));
                return conferences.get(context, data);
            },
            room: {
                id: "|URL|",
                client: true,
                url: "/conference/{code}",
                announce: true
            }
        },
        
        getTeam: {
            handler: function(data, context){
            	log.info('Get teams for ' + JSON.stringify(context));
                return teams.get(context, data);
            },
            room: {
                id: "|URL|",
                client: true,
                url: "/team/{code}",
                announce: true
            }
        },
        
        getGame: {
            handler: function(data, context){
            	log.info('Get games for ' + JSON.stringify(context));
                return games.get(context, data);
            },
            room: {
                id: "|URL|",
                client: true,
                url: "/game/{home}/{visitor}/{date}",
                announce: true
            }
        }
    },
    emitters : {
        events : [
            {'event' :  "conferenceUpdate", 'room': '|URL|'},
            {'event' :  "teamUpdate", 'room': '|URL|'},
            {'event' :  "gameUpdate", 'room': '|URL|'}
        ]
    }
};