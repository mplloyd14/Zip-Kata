'use strict';

var Collection = require('projevo-core').Collection;

module.exports = function(companyName) {

    var SecretsCollection = new Collection('secrets', null, null, companyName);

    SecretsCollection.getSecrets = function() {
        return SecretsCollection.find();
    };
    return SecretsCollection;
};