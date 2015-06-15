module.exports = {
	logIn: function(username, password) {
        element(by.id('content')).element(by.id('form-login')).element(by.id('userName')).sendKeys(username);
        element(by.id('content')).element(by.id('form-login')).element(by.id('password')).sendKeys(password);
        element(by.id('content')).element(by.id('form-login')).element(by.id('form-login-btn')).click();
	},
    waitForNavigation: function (part) {
    	browser.wait(function() {
        	return browser.driver.getCurrentUrl().then(function(url) {
            	return !!url.match(part);
			});
		});
	}
};