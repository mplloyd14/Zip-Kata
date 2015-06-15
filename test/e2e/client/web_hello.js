'use strict'

var protractor = require('protractor');
var ptor = protractor.getInstance();
 
describe('Test web hello page', function() {

	beforeEach(function() {
		ptor.get('/');
	});

	it('should display the message', function(done) {
	
		ptor.findElement(protractor.By.id("hellomsg")).getText()
			.then(function(text) {
				expect(text).toEqual('Hello world');
				done();
			});

	},	100000);
});	




	





