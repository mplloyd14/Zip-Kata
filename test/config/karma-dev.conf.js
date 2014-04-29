module.exports = function (config) {
	config.set({
		basePath: "../..",
		frameworks: ["mocha"],
		files: [
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
			'test/mocks/mockServices.js',
			'test/unit/client/**/*.js'
		],
		plugins: [
			'karma-mocha',
			'karma-chrome-launcher',
			'karma-junit-reporter'
		],

		autoWatch: false,
		singleRun: true,
		browsers: ['Chrome'],
		reporters: ['progress'],
		junitReporter: {
			outputFile: 'test/out/unit_desktop.xml',
			suite: 'unit'
		}
	});
};






