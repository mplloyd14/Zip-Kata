var pec = require('projevo-core');
var Q = require('q');
var timer = require('timers');

var provider = {
    type: "Socket",
    services: {
        createRoom: {
            handler: function(data){
                var name = data.name
                return Q.resolve({
                    "id": data.id});
            },
            room: {
                id: "|URL|",
                client: true,
                url: "/test/{id}",
                announce: true
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
                announce: true
            }
        }
    },
    emitters : {
        events : [{'event' :  "testReceived", 'room': '|PATTERN|', pattern: "/test/{id}"}]

    }
}
module.exports = provider;