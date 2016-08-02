/**
 * Created by mlloyd on 6/29/2016.
 */

describe('Edit Controller', function () {
    var expect = chai.expect,
        should = chai.should();

    var scope, ctrl, log, location, evoAPI, ZipService, sandbox;

    beforeEach(module('peApp'));
    beforeEach(module('ngCookies'));
    beforeEach(module('ngRoute'));
    beforeEach(module('evo'));
    beforeEach(module('kataService'));
    beforeEach(module('peControllers'));


    beforeEach(inject(function ($rootScope, $controller, $log, $location, $routeParams, _evoAPI_, _ZipService_) {
        scope = $rootScope.$new();
        log = $log;
        location = $location;
        evoAPI = _evoAPI_;
        ZipService = _ZipService_;
        sandbox = sinon.sandbox.create();
        sandbox.spy(ZipService, 'GatherById');
        ctrl = $controller('EditController', {
            $scope: scope,
            $log: log,
            $location: location,
            $routeParams: {id: '01001'},
            evoAPI: evoAPI,
            ZipService: ZipService
        });
    }));

    it('should be created', function () {
        expect(ctrl).to.exist;
    });

    describe('retrieving data', function () {
        it('should receive the entry _id', function () {
            expect(scope.tempId).to.equal('01001');
        });

        it('should retrieve the entry data using GatherById method', function () {
            expect(ZipService.GatherById).to.have.been.called;
        });
    });

    describe('back button', function () {
        it('should route back to \'/\'', function () {
            sandbox.spy(location, 'path');
            scope.back();
            expect(location.path).to.be.calledWith('/');
        });
    });

    describe('verify method for input blanks', function () {

        beforeEach(function () {
            sandbox.spy(scope, 'verify');
        });

        it('should return false for empty blank', function () {
            scope.entry = {
                "_id" : "01001",
                "city" : "",
                "loc" : [
                    -72.622739,
                    42.070206
                ],
                "pop" : "16000",
                "state" : "MA"
            };
            expect(scope.verify()).to.equal(false);
        });

        it('should return true', function () {
            scope.entry = {
                "_id" : "01001",
                "city" : "AGAWAM",
                "loc" : [
                    -72.622739,
                    42.070206
                ],
                "pop" : "16000",
                "state" : "MA"
            };
            expect(scope.verify()).to.equal(true);
        });
    });

    describe('confirm button', function () {
        it('should call the verify method once', function () {
            scope.entry = {
                "_id" : "01001",
                "city" : "AGAWAM",
                "loc" : [
                    -72.622739,
                    42.070206
                ],
                "pop" : "16000",
                "state" : "MA"
            };

            sandbox.spy(scope, 'verify');
            scope.confirm();
            expect(scope.verify).to.be.called;
        });

        it('should call updateEntry if verify returned true', function () {
            scope.entry = {
                "_id" : "01001",
                "city" : "AGAWAM",
                "loc" : [
                    -72.622739,
                    42.070206
                ],
                "pop" : "16000",
                "state" : "MA"
            };
            sandbox.spy(ZipService, 'updateEntry');
            scope.confirm();
            expect(ZipService.updateEntry).to.be.called;
        });
    });
});