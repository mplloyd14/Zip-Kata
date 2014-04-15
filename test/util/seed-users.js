var path = require('path'),
	userUtils = require('./user-utils'); 
  
exports.seed = function(file) {
	file = file || path.join(__dirname, 'users.json');
	userUtils.seedUsers(file);
};
	
