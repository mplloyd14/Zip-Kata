var Q = require('q');
var _ = require('lodash-node');
var fubars = require('./fubars');

var id = 1;

module.exports = {
    selector: function(fubar) {
        return {
            my: 0
        };
    },
    transformer: function(payload) {
        //return Q(payload.body);
		//return Q(_.omit(payload.body, 'value'));
		//return Q({my:id++,how:2});
        return fubars.get({company: payload.company}, {})
        .then(function(data) {
            return {my: id++, how: 2};
        });
    }
};
