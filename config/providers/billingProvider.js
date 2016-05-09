var log = require('projevo-core').Logger.getLogger(),
  Q = require('q'),
  pec = require('projevo-core'),
  billing = pec.BillingMetrics,
  CompanyCollection = pec.CompanyCollection(),
  UserCollection = pec.UserCollection('cai');

var get = function(query, options) {
  return CompanyCollection.find(query, options)
    .then (function(result) {
    return result;
  })
  .fail (function(err) {
    log.error(err);
    return Q.reject(err);
  });
};

var aggregate = function(query, options){
  return CompanyCollection.aggregate(query, options)
    .then(function(result){
      return result;
    })
    .fail(function(err){
      log.error(err);
      return Q.reject(err);
    })
};

module.exports = {
  type: 'Socket',
  services: {
    companyUsers: {
      handler: function(filter) {
        return billing.companyProductUsers('cai', 'billing');
      }
    },
    allUsers: {
      handler: function(filter) {
        return billing.allProductUsers('billing');
      }
    }
  }
};
