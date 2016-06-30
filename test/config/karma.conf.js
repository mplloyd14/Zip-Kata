module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '../..',

    // frameworks to use
    frameworks: ['mocha', 'chai', 'sinon', 'sinon-chai'],

    // list of files / patterns to load in the browser
    files: [
      'node_modules/chai-as-promised/lib/chai-as-promised.js',
      'node_modules/chai/chai.js',
      'content/shared/public/monkeynaut/dist/js/bundle-full.min.js',
      'content/shared/public/angular/angular.js',
      //'content/shared/public/js/lib/angular/angular-cookies.js',
      'content/shared/public/angular-mocks/angular-mocks.js',
      'content/web/public/js/controllers/*.js',
      'content/shared/public/js/lib/*.js',
      'content/shared/public/js/lib/lodash/*.js',
      'content/shared/public/js/controllers/**/*.js',
      'content/shared/public/js/services/**/*.js',
      'test/unit/client/*.js'
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['junit'],

    junitReporter: {
      outputFile: 'test/out/unit_client.xml',
      suite: 'unit_client'
    },

    // web server port
    port: 9100,

    // cli runner port
    runnerPort: 9100,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome'],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 10000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true
  });
};
