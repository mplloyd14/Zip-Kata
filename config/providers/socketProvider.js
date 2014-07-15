var pec = require('projevo-core');
var rest = pec.RestClient;
var utils = pec.CoreUtilities;
var Q = require('q')

module.exports = {
    type: "Socket",
    services: {
        getTeam: {
            handler: function(data){
                var name = data.name
                //return rest.request('GET', 'http://dev.localhost:8181/peseed/name/' + name);
                return Q.resolve({
                    "name": name,
                    "conference": 'east',
                    "nickname": 'blue jackets'
                });
            },
            room: {
                id: "|URL|",
                client: true,
                url: "/etldemo/team/{name}",
                announce: true
            }
        }
    },
    emitters : {
        events : [
            {'event' :  "teamUpdate", 'room': '|URL|'},{'event' :  "teamUpdate", 'room': '|URL|'}
        ]
    }
};
