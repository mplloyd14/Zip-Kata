'use strict';


describe('Main Controller', function() {
	var mocks = {};
	var expect = chai.expect,
	    should = chai.should();

    beforeEach(module('ngCookies'));
    beforeEach(module('ngRoute'));
    beforeEach(module('cai.services'));
	beforeEach(module('peApp'));
	beforeEach(module('peControllers'));

    describe('display', function() {
    	var env = {};
        
        var scope, ctrl;
    	beforeEach(inject(function($rootScope) {
            scope = $rootScope.$new();
            inject(function($controller, apiProvider){
                ctrl = $controller('MainController', {
                    $scope: scope
                });
            });
		}));

        it('should display message', function() {
            scope.message.should.exist;
            scope.message.should.equal('Hello world');
        });
	});
});


