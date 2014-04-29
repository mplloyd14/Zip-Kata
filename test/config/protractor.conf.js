// This configuration file uses a Jasmine reporter to
// output test results in XML format. Before running, you will need to
// npm install jasmine-reporters
require('jasmine-reporters');

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

    onPrepare: function(){
        jasmine.getEnv().addReporter(
            new jasmine.JUnitXmlReporter('test/out/', true, true));
    },

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        isVerbose: true,
        showColors: true,
        includeStackTrace: false
    }
};