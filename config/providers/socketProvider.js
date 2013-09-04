var Q = require('q');
var pec = require('projevo-core');
var rest = pec.RestClient;

module.exports = {
    type: "Socket",
    services: {
        timesTwo: {
            "handler": function (data) {
                var deferred = Q.defer();
                timetwo(data.num);
                function timetwo(num) {
                    setTimeout(function () {
                        var sum = num * 2;
                        deferred.resolve(sum);
                    }, 300);

                };

                return deferred.promise;
            },
            room : {
                id : "|URL|",//Todo: could be |*|, |user|, or a function to return an id
                url : "/ticket/{num}",//Todo: align this with the URL declarations in Restify
                announce : true,
                filter : function (data) {return data},
                exclusive : true  ///Todo: Add Exclusivity so that joining one room deletes client from others
            }
        },
        callReddit:
        {
            "handler" : function(data) {
                return rest.request('GET','http://www.reddit.com/.json')
            }
        },
        sayHello : {
             'event' : 'helloReceived'
        }
    },
    emitters : {
        events : [{'event' :  "clientReceived", 'room': '*'},{ event : 'ticketUpdate', 'room' : '|URL|' }]//what REST event to listen for and what room to publish to.  could be *, |USER|, or |URL|
    }
};