"use strict"
//\node_modules\.bin\mocha  .\test\unit\server\example-spec

var chai    = require("chai"),
    expect  = chai.expect,
    sinon   = require('sinon'),
    sinonChai = require('sinon-chai'),
    should  = chai.should(),
    sandbox = require('sandboxed-module');

    chai.should();
    chai.use(sinonChai);

    process.setMaxListeners(0);	// avoid warnings

    var env,infoSpy, errorSpy, mockLogger,mockRandom, mockData, mockLogLibrary,pec, config, mockRequest,mockPromise, mockFail;

    describe("Initial Sanity Test",function(){
        beforeEach(function() {
            env = {};
            env.poster = require("../../../lib/example.js");
        });
        it("should exist",function() {
            env.poster.should.exist;
        })
    });

    describe("Successful POST data to server",function(){
        beforeEach(function(done){
            env = {};
            mockLogLibrary = {};
            infoSpy = sinon.spy();
            errorSpy = sinon.spy();
            mockLogLibrary.logger = function() {
                return {
                    "error" : errorSpy,
                    "info" : infoSpy
                    }
            };
            pec = {};
            mockPromise = {};
            //then yields so the "promise" will be resolved
            mockPromise.then = sinon.stub().yields().returns({"fail" : sinon.stub()});
            mockRequest = {};
            mockRequest.request = sinon.stub().returns(mockPromise);
            pec.RestClient = mockRequest;

            pec.Logger = mockLogLibrary;
            config = {"randomServer" : 'http://example.com'};

            mockRandom = {};
            mockData = ['a','b','c'];
            mockRandom.strings = sinon.stub().callsArgWith(1,null, mockData);
            env.poster = sandbox.require("../../../lib/example.js", {
                requires : {
                    'projevo-core' : pec,
                    'config' : config,
                    'node-random' : mockRandom
                }
            });
            env.poster.Post().then(function(){
                done()
            }).fail(function (err) {
                done()
            });
        });
        //using should syntax
        it("should successfully POST data to server",function(){
            infoSpy.should.have.been.calledOnce;
            infoSpy.should.have.been.calledWith("POST was successful");
            mockRequest.request.should.have.been.calledOnce;
            mockRequest.request.should.have.been.calledWith('POST', 'http://example.com',sinon.match(mockData), sinon.match({'json' : true}));
        });
    });

describe("Failed POST to server",function(){
    beforeEach(function(done){
        env = {};
        mockLogLibrary = {};
        infoSpy = sinon.spy();
        errorSpy = sinon.spy();
        mockLogLibrary.logger = function() {
            return {
                "error" : errorSpy,
                "info" : infoSpy
            }
        };
        pec = {};
        pec.Logger = mockLogLibrary;
        mockPromise = {};
        //fail yields so the "promise" will be resolved
        mockFail = sinon.stub().yields("This is an error!!!");
        mockPromise.then = sinon.stub().returns({"fail" : mockFail});
        mockRequest = {};
        mockRequest.request = sinon.stub().returns(mockPromise);
        pec.RestClient = mockRequest;
        config = {"randomServer" : 'http://example.com'};

        mockRandom = {};
        mockData = ['a','b','c'];
        mockRandom.strings = sinon.stub().callsArgWith(1,null, mockData);
        env.poster = sandbox.require("../../../lib/example.js", {
            requires : {
                'projevo-core' : pec,
                'config' : config,
                'node-random' : mockRandom
            }
        });
        env.poster.Post().then(function(){
            done()
        }).fail(function (err) {
            done()
        });

    });
    //using expect syntax
    it("should log the failure",function(){
        expect(errorSpy).to.have.been.calledOnce;
        expect(errorSpy).to.have.been.calledWith("This is an error!!!");
        expect(mockRequest.request).to.have.been.calledOnce;
        expect(mockRequest.request).to.have.been.calledWith('POST', 'http://example.com',sinon.match(mockData), sinon.match({'json' : true}));
    });
});