// base path, that will be used to resolve files and exclude
basePath = '../..';

// list of files / patterns to load in the browser
files = [
  MOCHA,
  MOCHA_ADAPTER,
    'node_modules/chai/chai.js',
    'node_modules/chai-as-promised/lib/chai-as-promised.js',
    'node_modules/sinon/lib/sinon.js',
    'node_modules/sinon/lib/sinon/assert.js',
    'node_modules/sinon/lib/sinon/collection.js',
    'node_modules/sinon/lib/sinon/match.js',
    'node_modules/sinon/lib/sinon/sandbox.js',
    'node_modules/sinon/lib/sinon/spy.js',
    'node_modules/sinon/lib/sinon/stub.js',
    'node_modules/sinon/lib/sinon/mock.js',
    'node_modules/sinon-chai/lib/sinon-chai.js',
    'node_modules/projevo-core/content/shared/public/js/lib/lodash/lodash.min.js',
    'node_modules/projevo-core/content/shared/public/js/lib/underscore/underscore.string.min.js',
    'node_modules/projevo-core/content/shared/public/js/lib/socket.io/socket.io.js',
    'node_modules/projevo-core/content/shared/public/js/lib/angular/angular.js',
    'node_modules/projevo-core/content/shared/public/js/lib/angular/angular-cookies.js',
    'node_modules/projevo-core/content/shared/public/js/lib/angular/angular-mocks.js',
    'node_modules/projevo-core/content/shared/public/js/lib/angular/angular-route.js',
    'node_modules/projevo-core/content/shared/public/js/lib/module.js',
    'node_modules/projevo-core/content/shared/public/js/services/**/*.js',
    'node_modules/projevo-core/content/shared/public/js/controllers/*.js',
    'node_modules/projevo-core/content/shared/public/js/directives/*.js',    
    'content/shared/public/js/lib/ui-bootstrap/*.js',
    'content/shared/public/js/**/*.js',
    'content/mobile/public/js/**/*.js',
    'content/web/public/js/**/*.js',
    'test/unit/client/**/*.js'
];

// test results reporter to use
// possible values: 'dots', 'progress', 'junit'
reporters = ['junit'];

// web server port
port = 9100;

// cli runner port
runnerPort = 9100;

// enable / disable colors in the output (reporters and logs)
colors = true;

// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;

// enable / disable watching file and executing tests whenever any file changes
autoWatch = false;

// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ['Chrome'];

// If browser does not capture in given timeout [ms], kill it
captureTimeout = 10000;

// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = true;

junitReporter = {
  outputFile: 'test/out/unit_client.xml',
  suite: 'unit_client'
};
