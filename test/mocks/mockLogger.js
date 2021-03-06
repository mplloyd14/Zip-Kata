var sinon = require('sinon');

module.exports = function(output) {
	var logger = {
    	debug: function() {console.log(arguments);},
        info: function() {console.log(arguments);},
        warn: function() {console.log(arguments);},
        error: function() {console.log(arguments);},
        fatal: function() {console.log(arguments);}
	};
    var stub = {
    	debug: sinon.stub(),
        info: sinon.stub(),
		warn: sinon.stub(),
		error: sinon.stub(),
		fatal: sinon.stub()
	};                
    
	return output ? logger : stub;
};
