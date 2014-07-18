'use strict';
var pec = require('projevo-core'),
	log = require('../lib/log')();

module.exports = {

	get: function (context, filter, options) {    
	    var query = {};
        filter = filter || {};
		options = options || {sort: ['conference', 'asc', 'division', 'asc', 'name','asc']};
	    
		log.info('Get team ' + JSON.stringify(filter));
	    if (filter.conference) {
	    	query.conference = filter.conference;
	    }
	    if (filter.division) {
	    	query.division = filter.division;
	    }
	    if (filter.code) {
	    	query.code = filter.code;
	    }
	    
	    var teamCollection = pec.GenericCollection(context.company, 'teams');
	    return teamCollection.find(query, options)
	    	.then(function(rs) {
	            log.debug('  ' + rs.length + ' teams retrieved');
	            return rs;
			});
    }
};                    