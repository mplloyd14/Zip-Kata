var pec = require('projevo-core');
var rest = pec.RestClient;
var utils = pec.CoreUtilities;
var eventBus = pec.EventBus;
var Q = require('q')

module.exports = {
    type: "Socket",
    services: {
		getPESeedData: {
			handler: function(data){
				var name = data.name
				return Q.resolve({
					"name": "DevUser",
					"first": name,
					"last": "Last",
					"eye": "Green",
					"hair": "Yellow"});
			}
		}}
};
