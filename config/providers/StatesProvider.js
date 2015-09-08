var pec = require('projevo-core');
var log = require('projevo-core').Logger.getLogger();
var Q = require('q');
var StatesCollection = pec.Collection('states');
var timer = require('timers');

var getStates = function(query, options) {
  return StatesCollection.find(query)
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
    getStates: {
      handler: function(filter){
        log.info('\n\n' + filter.state + '\n\n');
        if(filter) {
          query = {};
          if(filter.state) {
            query.state = filter.state;
          }
        }
        return getStates(query, {sort: ['pop','asc']});
      },
      room: {
        id: "|URL|",
        client: true,
        url: "/states",
        announce: false
      }
    }
  },
  emitters : {
    events : [{'event' : 'reqReceived', 'room' : '|URL|'},{'event' : 'broadcastReceived', 'room' : '*'}]

  }
}

module.exports = provider;
