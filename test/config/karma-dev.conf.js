module.exports = function (config) {
    config.set({
        basePath: "../../",
        frameworks: ['mocha', 'chai', 'sinon', 'sinon-chai'],

        files: [
            'node_modules/chai/chai.js',
            'node_modules/sinon/lib/sinon.js',
            'node_modules/sinon/lib/sinon/util/core.js',
            'node_modules/sinon/lib/sinon/assert.js',
            'node_modules/sinon/lib/sinon/behavior.js',
            'node_modules/sinon/lib/sinon/call.js',
            'node_modules/sinon/lib/sinon/collection.js',
            'node_modules/sinon/lib/sinon/extend.js',
            'node_modules/sinon/lib/sinon/typeOf.js',
            'node_modules/sinon/lib/sinon/format.js',
            'node_modules/sinon/lib/sinon/log_error.js',
            'node_modules/sinon/lib/sinon/match.js',
            'node_modules/sinon/lib/sinon/mock.js',
            'node_modules/sinon/lib/sinon/sandbox.js',
            'node_modules/sinon/lib/sinon/spy.js',
            'node_modules/sinon/lib/sinon/stub.js',
            'node_modules/sinon/lib/sinon/test.js',
            'node_modules/sinon/lib/sinon/test_case.js',
            'node_modules/sinon/lib/sinon/times_in_words.js',
            'node_modules/sinon-chai/lib/sinon-chai.js',
        	'node_modules/chai-as-promised/lib/chai-as-promised.js',
            'content/shared/public/monkeynaut/dist/js/bundle-full.min.js',
            'content/shared/public/angular/angular.js',
            //'content/shared/public/js/lib/angular/angular-cookies.js',
            'content/shared/public/angular-mocks/angular-mocks.js',
            'content/web/public/js/controllers/*.js',
            'content/web/public/js/services/*.js',
            'content/shared/public/js/lib/*.js',
            'content/shared/public/js/lib/lodash/*.js',
            'content/shared/public/js/controllers/**/*.js',
            'content/shared/public/js/services/**/*.js',
            'test/unit/client/*.js'
        ],
        autoWatch: false,
        singleRun: true,
        browsers: ['Chrome']
    });
};