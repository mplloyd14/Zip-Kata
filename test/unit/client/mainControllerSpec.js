'use strict';



describe('Main Controller', function() {
	var expect = chai.expect,
	    should = chai.should();

    var scope, ctrl, log, location, evoAPI, ZipService;

    beforeEach(module('ngCookies'));
    beforeEach(module('ngRoute'));
    beforeEach(module('evo'));
    beforeEach(module('kataService'));
	beforeEach(module('peControllers'));
    
    beforeEach(inject(function ($rootScope, $controller, $log, $location, _evoAPI_, _ZipService_) {
        scope = $rootScope.$new();
        log = $log;
        location = $location;
        evoAPI = _evoAPI_;
        ZipService = _ZipService_;
        ctrl = $controller('MainController', {
            $scope: scope,
            $log: log,
            $location: location,
            evoAPI: evoAPI,
            ZipService: ZipService
        });
    }));

    it('should be created', function () {
        expect(ctrl).to.exist;
    });


    describe('display', function() {
        it('should load the table', function() {
            scope.table.should.exist;
        });
	});
});


