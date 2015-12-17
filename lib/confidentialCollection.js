'use strict';

var Collection = require('projevo-core').Collection;

module.exports = function(companyName) {

    var confidentialCollection = new Collection('confidential', null, null, companyName);

    confidentialCollection.getConfidentialMsg = function() {
        return confidentialCollection.find();
    };
    return confidentialCollection;
};