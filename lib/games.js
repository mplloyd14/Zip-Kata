'use strict';
var pec = require('projevo-core'),
	_ = require('lodash-node'),
	Q = require('q'),
	teams = require('../lib/teams'),
	log = require('../lib/log')();

function getGames(context, filter, options) {
	var query = {};
	options = {sort: ['date', 'asc', 'home','asc', 'visitor', 'asc']};
    
    if (filter.teams) {
    	query["$or"] = [{"home": {$in: filter.teams} }, {"visitor": {$in: filter.teams} }];
    }
    if (filter.date) {
    	query.date = {"$eq": ISODate(filter.date)};
    }
    
    var gameCollection = pec.GenericCollection(context.company, 'games');
    return gameCollection.find(query, options)
    	.then(function(rs) {
            log.debug('  ' + rs.length + ' games retrieved');
            if (rs.length > 0) {
            	return rs[0];
            }
            return {};
		});
}    
    

module.exports = {

	get: function (context, filter, options) {    
	    var query = {};
	    
    	log.info('Get games ' + JSON.stringify(filter));
        var query = {};
        if (filter.conference && filter.division) {
    		log.debug('Get games in conference ' + filter.conference + ' and division ' + filter.division);
            // get all teams in conference/division
            return teams.get({conference: filter.conference, division: filter.division})
            	.then(function(rs) {
                	// get all games where home or visitor is in the list of teams
                    return getGames(context, {teams: _.map(rs, function(r) {return r.code;}), date: filter.date});
                });
        }
        else if (filter.conference) {
    		log.debug('Get games in conference ' + filter.conference);
            // get all teams in conference
            return teams.get({conference: filter.conference})
            	.then(function(rs) {
                	// get all games where home or visitor is in the list of teams
                    return getGames(context, {teams: _.map(rs, function(r) {return r.code;}), date: filter.date});
                });
            
        }
        else if (filter.division) {
    		log.debug('Get games in division ' + filter.division);
            // get all teams in division (?)
            return teams.get({division: filter.division})
            	.then(function(rs) {
                	// get all games where home or visitor is in the list of teams
                    return getGames(context, {teams: _.map(rs, function(r) {return r.code;}), date: filter.date});
                })
        }
        else if (filter.home && filter.visitor) {
    		log.debug('Get games by home team ' + filter.home + ' and visiting team ' + filter.visitor);
            // get all games where home or visitor is in the list of teams
            return getGames(context, {teams: [filter.home, filter.visitor], date: filter.date});
        }
        else if (filter.home) {
    		log.debug('Get games by home team ' + filter.home);
            // get all games where home is in the list of teams
            return getGames(context, {teams: [filter.home], date: filter.date});
        }
        else if (filter.visitor) {
    		log.debug('Get games by visiting team ' + filter.visitor);
            // get all games where visitor is in the list of teams
            return getGames(context, {teams: [filter.visitor], date: filter.date});
        }
        
        log.warn('Invalid filter criteria: no games retrieved');
        return Q([]);
    }
};                    