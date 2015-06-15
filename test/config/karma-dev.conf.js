module.exports = function (config) {
    config.set({
        basePath: "../../",
        frameworks: ['mocha', 'chai', 'sinon', 'sinon-chai'],

        files: [
        	'node_modules/chai-as-promised/lib/chai-as-promised.js',
            'content/shared/public/js/lib/angular/angular.js',
            'content/shared/public/js/lib/angular/angular-cookies.js',
            'content/shared/public/js/lib/angular/angular-mocks.js',
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