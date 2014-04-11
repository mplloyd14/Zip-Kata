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
				//return rest.request('GET', 'http://dev.localhost:8181/peseed/name/' + name);
				return Q.resolve({
					"name": "TweetyBird",
					"first": name,
					"last": "Bird",
					"eye": "Green",
					"hair": "Yellow"});
			},
			room: {
				id: "|URL|",
				client: true,
				url: "/peseed/{name}",
				announce: true
			}
		}},
    emitters : {
        events : [{'event' :  "dataReceived", 'room': '|URL|'},{'event' :  "dataGot", 'room': '|URL|'}]

    }
};
