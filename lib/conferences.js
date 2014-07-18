'use strict';
var pec = require('projevo-core'),
	log = require('../lib/log')();

module.exports = {

	get: function (context, filter, options) {    
	    var query = {};
        filter = filter || {};
		options = options || {sort: ['name','asc']};
	    
    	log.info('Get conference ' + JSON.stringify(filter));
        var query = {};
        if (filter.code) {
        	query.code = filter.code;
        }
        var conferenceCollection = pec.GenericCollection(context.company, 'conferences');
	    return conferenceCollection.find(query, options)
	    	.then(function(rs) {
	            log.debug('  ' + rs.length + ' conferences retrieved');
                return rs;
			});
    }
};                    