var path = require('path'),
	Q = require('q'),
	pec = require('projevo-core'),
	customerCollection = require('../../lib/customerCollection')(),
	productCollection = require('../../lib/productDefinition')(),
	instanceCollection = require('../../lib/productInstance')(),
    userCollection = pec.UserCollection(),
	userProvider = require('../../config/providers/userProvider'),
	customers = require('../mocks/evoCustomers.json'),
	products = require('../mocks/evoProductDefinitions.json'),
	instances = require('../mocks/evoProductInstances.json'),
	users = require('../mocks/evoUsers.json'),
    log = {
    	info: function(msg) {
        	//console.log(msg);
        }
    };

users.forEach(function(user) {
   user.userName = user.userName.toLowerCase();
});
    
function clearCollection(name, collection) {
	log.info('clear ' + name);
	return collection.find({}, {})
    	.then(function(docs) {
        	var all = [];
            docs.forEach(function(doc) {
            	all.push(collection.remove(doc));
            });
            return Q.allResolved(all);
        });
}

function saveCollection(name, collection, docs) {
	log.info('save ' + name);
	var all = [];
	docs.forEach(function(doc) {
    	all.push(collection.save(doc));
	});
    return Q.allResolved(all);
}

function resetCollection(name, collection, docs) {
	return clearCollection(name, collection)
    	.then(function() {
        	return saveCollection(name, collection, docs);
        });
}

    
exports.seed = function() {
	resetCollection('customers', customerCollection, customers)
    	.then(function() {
        	return resetCollection('products', productCollection, products);
        })
    	.then(function() {
        	return resetCollection('instances', instanceCollection, instances);
        })
    	.then(function() {
        	return clearCollection('users', userCollection);
        })
        .then(function() {
            return saveCollection('users', {save: userProvider.services.saveUser.handler}, users);
        })
        .then(function() {
        	log.info('all done');
        	return Q(true);
        });
};
	
