var Q = require('q');
var _ = require('lodash-node');

module.exports = {
    selector: function(fubar) {
        return {
            fu: fubar.fu,
            bar: fubar.bar
        };
    },
    transformer: function(payload) {
        //return Q(payload.body);
		return Q(_.omit(payload.body, 'value'));
    }
};

