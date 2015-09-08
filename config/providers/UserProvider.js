var pec = require('projevo-core');
var log = pec.Logger.getLogger();
var UserCollection = pec.UserCollection();
var Q = require('q');
var timer = require('timers');

module.exports = {
  type: "Socket",
  services: {
    getUsers: {
      handler: function (data) {
        return Q.resolve({
          users: UserCollection()
        });
      },
      room: {
        id: "|URL|",
        client: true,
        url: "/users",
        announce: false
      }
    }
  }
};
