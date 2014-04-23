var states = require('../../lib/states');

module.exports = {
    type: 'Socket',
	services: {
        getState: {
            handler: function(state) {
                return states.get({state: state});
            }
        },

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


