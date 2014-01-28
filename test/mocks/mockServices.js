'use strict';

var caiServices;
try {
    caiServices = angular.module('cai.services');
}
catch(e) {
    caiServices = angular.module('cai.services', []);
};
caiServices
    .factory('apiProvider', function($q,$rootScope) {
        var scope = $rootScope.$new();
        var deferred = $q.defer();
        var promise = deferred.promise;
        var stub = sinon.stub();
        stub.returns(promise);

        var service = {
            reset: function() {
                deferred = $q.defer();
                promise = deferred.promise;
                stub.reset();
                stub.returns(promise);
            },
            resolvePromise : function (data){
                scope.$apply(function(){
                    deferred.resolve({ result: data });
                });
            },
            rejectPromise : function (data){
                scope.$apply(function(){deferred.reject({result: data});
                });
            },
            callFunction: stub
        };
        return service;
    })
    .factory('serverData', function() {
        var serverData = {
            config: {
                'clientA': 'value_a',
                'clientB': ['value_b0', 'value_b1'],
                'clientC': {
                    d: 'value_d'
                }
            }
        };

        return btoa(JSON.stringify(serverData));
    });

