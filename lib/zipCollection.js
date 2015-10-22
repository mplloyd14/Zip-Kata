'use strict';
var Collection = require('projevo-core').Collection;

module.exports = function(companyName) {
	var ZipCollection = new Collection('zips', null, null, companyName);
	
	ZipCollection.getZips = function() {
        return ZipCollection.find({},{"limit": 20});
    };	
	return ZipCollection;
}