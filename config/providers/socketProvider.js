var Q = require('q');
var pec = require('projevo-core');
var rest = pec.RestClient;

//ToDo: I think a connect module type approach would be better.  include it in SocketServer (or RestServer?) and then all calls pass thru it before being passed to the handler....But, too much refactoring before the conference.
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
                url : "/timestwo/{num}",//Todo: align this with the URL declarations in Restify
                announce : true,
                filter : function (data) {return data},
                exclusivityGroup : 'rawhide'
            }
        },
        timesThree: {
            "handler": function (data) {
                var deferred = Q.defer();
                timethree(data.num);
                function timethree(num) {
                    setTimeout(function () {
                        var sum = num * 3;
                        deferred.resolve(sum);
                    }, 300);

                };

                return deferred.promise;
            },
            room : {
                id : "|URL|",//Todo: could be |*|, |user|, or a function to return an id
                url : "/timethree/{num}",//Todo: align this with the URL declarations in Restify
                announce : true,
                filter : function (data) {return data},
                exclusivityGroup : 'rawhide'
            }
        },
        timesFour: {
            "handler": function (data) {
                var deferred = Q.defer();
                timesfour(data.num);
                function timesfour(num) {
                    setTimeout(function () {
                        var sum = num * 4;
                        deferred.resolve(sum);
                    }, 300);

                };

                return deferred.promise;
            }, room : {
                id : "|URL|",//Todo: could be |*|, |user|, or a function to return an id
                url : "/timefour/{num}",//Todo: align this with the URL declarations in Restify
                announce : true,
                filter : function (data) {return data},
                exclusivityGroup : 'chuckwagon'
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