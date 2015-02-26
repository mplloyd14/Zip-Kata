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
                announce: false
            }
        },
        createAnotherRoom: {
            handler: function(data){
                var name = data.name
                return Q.resolve({
                    "id": data.id});
            },
            room: {
                id: "|URL|",
                client: true,
                url: "/another/test/{id}",
                announce: false
            }
        },
        createCompanyRoom: {
            handler: function(data){
                var name = data.name
                return Q.resolve({
                    "id": data.id});
            },
            room: {
                id: "|URL|",
                client: true,
                url: "/test/{company}",
                announce: false
            }
        }
    },
    emitters : {
        events : [{'event' :  "testReceived", 'room': '|PATH_BEG|', pattern: "/test/{id}"},{'event' : 'companyReceived', 'room' : '|URL|'}]

    }
}
module.exports = provider;