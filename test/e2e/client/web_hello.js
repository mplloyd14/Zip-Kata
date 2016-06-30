'use strict'

var protractor = require('protractor');

describe('Test web hello page', function() {

	beforeEach(function() {
		browser.get('/');
	});

	it('should have the correct URL', function() {
		expect(browser.getCurrentUrl()).toEqual('/');
	});
});





