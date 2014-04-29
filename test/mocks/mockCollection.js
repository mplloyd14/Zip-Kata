var sinon = require('sinon');

module.exports = function() {
	return {
		aggregate: sinon.stub(),
		get: sinon.stub(),
		getById: sinon.stub(),
		find: sinon.stub(),
		save: sinon.stub(),
        update: sinon.stub(),
		remove: sinon.stub()
    };
}