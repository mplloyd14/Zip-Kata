var     pec  = require('projevo-core')
    ,   rest = pec.RestClient
    ,   log  = pec.Logger.logger()
    ,   config = require('config')
    ,   random = require("node-random")
    ,   Q = require("q");

function randomPoster () {
    this.Post = function() {
        var defer = Q.defer();
        random.strings({
            "length": 1,
            "number": 20,
            "upper": false,
            "digits": false
        }, function(error, data) {
            if (error) throw error;
            rest.request('POST',config.randomServer,data,{json : true}).then(function(res){
                log.info("POST was successful");
                defer.resolve();
            }).fail(function(err){
                log.error(err);
                defer.reject(err);
            })
        });
        return defer.promise;
    }
};
module.exports = new randomPoster();
