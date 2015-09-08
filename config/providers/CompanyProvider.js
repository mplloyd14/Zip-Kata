var pec = require('projevo-core');
var log = require('projevo-core').Logger.getLogger();
var Q = require('q');
var CompanyCollection = pec.Collection('companies');
var timer = require('timers');

var getCompanies = function(query, options) {
  return CompanyCollection.find(query)
      .then (function(result) {
        return result;
      })
      .fail (function(err) {
        log.error(err);
        return Q.reject(err);
      });
};

var getCompany = function(query) {
  return CompanyCollection.get(query)
      .then (function(result) {
        return result;
      })
      .fail (function(err) {
        log.error(err);
        return Q.reject(err);
      });
};

module.exports = {
  type: "Socket",
  services: {
    getCompanies: {
      handler: function (filter) {
        log.info('\n\n' + filter.company + '\n\n');
        if (filter) {
          query = {};
          if (filter.company) {
            query.company = filter.company;
          }
        }
        return getCompanies(query, null);
      },
      room: {
        id: "|URL|",
        client: true,
        url: "/companies",
        announce: false
      }
    },
    getCompany: {
      handler: function(code) {
        return getCompany({ code: code });
      },
      room: {
        id: "|URL|",
        client: true,
        url: "/company",
        announce: false
      }
    }
  }
};
