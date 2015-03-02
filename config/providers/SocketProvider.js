var pec = require('projevo-core');
var Q = require('q');
var timer = require('timers');

var provider = {
    type: "Socket",
    services: {
        createPathBegRoom: {
            handler: function(data){
                var name = data.name
                return Q.resolve({
                    "id": data.id});
            },
            room: {
                id: "|URL|",
                client: true,
                url: "/test/{id}",
                announce: false
            }
        },
        createVendorRoom: {
            handler: function(data){
                var name = data.name
                return Q.resolve({
                    "id": data.id});
            },
            room: {
                id: "|URL|",
                client: true,
                url: "/test/{id}/{vendor}",
                exactMatch : true,
                announce: false
            }
        },
        createUrlRoom: {
            handler: function(data){
                var name = data.name
                return Q.resolve({
                    "id": data.id});
            },
            room: {
                id: "|URL|",
                client: true,
                url: "/test",
                announce: false
            }
        }
    },
    emitters : {
        events : [{'event' : 'urlReceived', 'room' : '|URL|'},{'event' :  "pathBegReceived", 'room': '|PATH_BEG|', pattern: "/test/{id}"},{'event' : 'broadcastReceived', 'room' : '*'}]

    }
}
module.exports = provider;