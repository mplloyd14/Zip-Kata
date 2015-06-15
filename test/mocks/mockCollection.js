var sinon = require('sinon');

module.exports = function() {
	var mock = {
		ensureID: sinon.stub(),
		aggregate: sinon.stub(),
		get: sinon.stub(),
		getById: sinon.stub(),
		find: sinon.stub(),
		save: sinon.stub(),
        update: sinon.stub(),
		remove: sinon.stub()
    };
    mock.ensureID.returnsArg(0);
    return mock;
}