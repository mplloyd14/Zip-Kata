var Q = require('q');

var id = 1;

module.exports = {
    selector: function(fubar) {
        return {};
    },
    transformer: function(payload) {
        console.log('%%%%%%% transforming payload...');
		return Q({my:id++,how:2});
    }
};
