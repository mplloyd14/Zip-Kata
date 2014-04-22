var pec = require('projevo-core'),
	log = require('../lib/log')(),
    stateCollection = pec.Collection('states');

function get(queryObj, options) {
	log.info('Get states');
    return stateCollection.find(queryObj, options)
    	.then(function(data) {
            log.debug('  ' + data.length + ' states retrieved');
            //log.debug(JSON.stringify(data, null, 4));
            return data;
		});
}

module.exports = {
	get: function(filter) {
    	var query = {};
        if (filter) {
        	if (filter.state) {
	        	query.state = filter.state;
            }
        	if (filter.city) {
	        	query['cities.city'] = filter.city;
            }
            
        }
        return get(query, {sort: ['state','asc']});
    },

	getList: function() {
        return get({}, {fields: {state: 1}, sort: ['state','asc']});
    }
};

