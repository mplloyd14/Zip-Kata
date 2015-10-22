var pec = require('projevo-core');
var Q = require('q');
var timer = require('timers');
var log = pec.Logger.getLogger();
var util = require('util');
var zip = require('../../lib/zipCollection');

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
                    "id": data.id,
                    "vendor" : data.id
                });
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
                return Q.resolve({});
            },
            room: {
                id: "|URL|",
                client: true,
                url: "/test",
                announce: false
            }
        }, 
        createMYRoom: {
            handler: function(data){
                var name = data.name
                return Q.resolve({});
            },
            room: {
                id: "|URL|",
                client: true,
                url: "/test/{myid}",
                announce: false
            }
        },
        dataAccess :{
            handler: function(data, context){
                var defer = Q.defer();
                zip(context.company).getZips().then(function (result) {
                    log.info(result);
                    defer.resolve(result);
                },
                function (err) {
                    log.error(err);
                    defer.reject(err);
                });
                return defer.promise;
            },
            room: {
                id: "|URL|",
                client: true,
                url: "/destop",
                announce: false
            }
        }
    },
    emitters : {
        events : [{'event' : 'urlReceived', 'room' : '|URL|'},{'event' :  "pathMyBegReceived", 'room': '|PATH_BEG|', pattern: "/test/{myid}"},{'event' :  "pathBegReceived", 'room': '|PATH_BEG|', pattern: "/test/{id}"},{'event' : 'broadcastReceived', 'room' : '*'}]

    }
}
module.exports = provider;