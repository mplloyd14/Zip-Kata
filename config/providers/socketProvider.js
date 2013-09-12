var Q = require('q');
var _ = require('underscore');
var pec = require('projevo-core');
var rest = pec.RestClient;
var utils = pec.CoreUtilities;

var newCollection = {};
var oldCollection = {
    init : false,
    hashes : []
}
var evaluator = new utils.Evaluator();
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
                filter : function (data) {
                    var deferred = Q.defer();
                    evaluator.EvaluateForDiff(data.message).then(function(result){
                       result = JSON.parse(result);
                       var newOrders = [];
                        if(oldCollection.init === false) {
                            result.orders.forEach(function(order){
                                var hash = utils.StringToHash(utils.ItemToString(order.id + order.date))
                                oldCollection[hash] = order;
                             });
                            oldCollection.init = true;
                        } else {
                            result.orders.forEach(function(order){
                                var hash = utils.StringToHash(utils.ItemToString(order.id + order.date))
                                newCollection[hash] = order;
                            });
                        };

                        for (var newHash in newCollection) {
                            if(newCollection.hasOwnProperty(newHash)){
                                if(oldCollection.hasOwnProperty(newHash)){
                                    log.debug("Already contains order " + newCollection[newHash]);
                                } else {
                                    log.debug("New order found " + newCollection[newHash]);
                                    oldCollection[newHash] = newCollection[newHash];
                                    //send email on new order
                                }
                            }
                        };
                        deferred.resolve(data);

                    }).fail(function(error){
                       deferred.reject();
                    });  //Todo:  Do not use the fail for no diff. This is just to get it done.
                    return deferred.promise;
                },
                exclusivityGroup : 'chuckwagon'  //ToDo: shouldn't be kicked out of this group cause no other services implements it.BUGGY!!!!
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
               // filter : function (data) {return data},
                exclusivityGroup : 'rawhide'  //when any other services implements this group, then client will be removed from all other rooms before being added to this one
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
              //  filter : function (data) {return data},
                exclusivityGroup : 'rawhide'
            }
        },
        callReddit:
        {
            "handler" : function(data) {
                return rest.request('GET','http://www.reddit.com/.json')
            }
        }
    },
    emitters : {
        events : [{'event' :  "clientReceived", 'room': '*'},{ event : 'timesTwoRequest', 'room' : '|URL|' }]//what REST event to listen for and what room to publish to.  could be *, |USER|, or |URL|
    }
};