// This configuration file is for developers; it does not record output to file and can be used to evaluate individual tests

// An example configuration file.
exports.config = {
    // The address of a running selenium server. If this is specified,
    // seleniumServerJar and seleniumPort will be ignored.
    seleniumAddress: 'http://localhost:4444/wd/hub',

    //seleniumServerJar: 'test/selenium/selenium-server-standalone-2.33.0.jar',
    //seleniumArgs: '-Dwebdriver.chrome.driver=test/selenium/chromedriver.exe',

    // A base URL for your application under test. Calls to protractor.get()
    // with relative paths will be prepended with this.
    baseUrl: 'http://localhost',	// append the port number for the application

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome'
//    'browserName': 'firefox'
    },
    allScriptsTimeout: 20000,
    specs: [
		'../e2e/**/*.js'
    ],

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        isVerbose: true,
        showColors: true,
        includeStackTrace: false
    }
};