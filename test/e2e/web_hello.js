'use strict'

var protractor = require('protractor');
var ptor = protractor.getInstance();
 
describe('Test web hello page', function() {

	beforeEach(function() {
		browser.get('http://localhost:3333/#/');
	});

	it('should display the message', function(done) {
	
		ptor.findElement(protractor.By.id("hellomsg")).getText()
			.then(function(text) {
				expect(text).toEqual('Hello world');
				done();
			});

	},	100000);
});	




	





