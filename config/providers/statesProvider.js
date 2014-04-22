var states = require('../../lib/states');

module.exports = {
    type: 'Socket',
	services: {
    	getStates: {
        	handler: function(options) {
            	if (options && options.list) {
                	return states.getList();
                }
                
                return states.get(options);
            }
		}
    }
};


