var pec = require('projevo-core');
var log = require('projevo-core').Logger.getLogger();
var Q = require('q');
var JobsCollection = pec.Collection('jobs');
var timer = require('timers');

var getJobs = function(query, options) {
  return JobsCollection.find(query)
      .then (function(result) {
    return result;
  })
      .fail (function(err) {
    log.error(err);
    return Q.reject(err);
  });
};


var provider = {
  type: "Socket",
  services: {
    getJobs: {
      handler: function(filter){
        log.info('\n\n' + filter.job + '\n\n');
        if(filter) {
          query = {};
          if(filter.job) {
            query.job = filter.job;
          }
        }
        return getJobs(query, {});
      },
      room: {
        id: "|URL|",
        client: true,
        url: "/jobs",
        announce: false
      }
    }
  },
  emitters : {
    events : [{'event' : 'reqReceived', 'room' : '|URL|'},{'event' : 'broadcastReceived', 'room' : '*'}]

  }
}

module.exports = provider;
