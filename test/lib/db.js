var Collection = require('projevo-core').Collection;

function resetAll(name, data) {
	var coll = Collection(name);
    return coll.removeByQuery({})
    	.then(function() {
        	return coll.insert(data);
        });
}

function retrieveAll(name) {
	var coll = Collection(name);
    return coll.find();
}

module.exports = {
	retrieveAll: retrieveAll,
    resetAll: resetAll
};    
