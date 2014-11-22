'use strict';
var pec = require('projevo-core'),
	log = require('../lib/log')();

module.exports = {

	get: function (context, filter, options) {    
	    var query = {};
        filter = filter || {};
		options = options || {sort: ['value','asc']};
	    
    	log.info('Get fubar ' + JSON.stringify(filter));
        var query = {};
        if (filter.fu) {
        	query.fu = filter.fu;
        }
        if (filter.bar) {
        	query.bar = filter.bar;
        }
        
        var fubarCollection = pec.Collection('fubars', null, null, context.company);
	    return fubarCollection.find(query, options)
	    	.then(function(rs) {
	            log.debug('  ' + rs.length + ' fubars retrieved');
                return rs;
			});
    }
};                    