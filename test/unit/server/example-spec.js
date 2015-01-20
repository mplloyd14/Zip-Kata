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

    var env,infoStub, errorStub, mockLogger,mockRandom, mockData, mockLogLibrary,pec, config, mockRequest,mockPromise, mockFail;



    describe("Successful POST data to server",function(){

        beforeEach(function(done){
            env = {};
            mockLogLibrary = {};
            infoStub = sinon.stub();
            errorStub = sinon.stub();
            mockLogLibrary.logger = function() {
                return {
                    "error" : errorStub,
                    "info" : infoStub
                    }
            };



            pec = {};
            pec.Logger = mockLogLibrary;
            mockPromise = {};
            mockPromise.then = sinon.stub().yields().returns({"fail" : sinon.stub()});
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
            env.poster.Post().then(done()).fail(done());
        });

        it("should successfully POST data to server",function(){
            infoStub.should.have.been.calledOnce;
            infoStub.should.have.been.calledWith("POST was successful");
            mockRequest.request.should.have.been.calledOnce;
            mockRequest.request.should.have.been.calledWith('POST', 'http://example.com',sinon.match(mockData), sinon.match({'json' : true}));
        });
    });

describe("Failed POST to server",function(){

    beforeEach(function(done){
        env = {};
        mockLogLibrary = {};
        infoStub = sinon.stub();
        errorStub = sinon.stub();
        mockLogLibrary.logger = function() {
            return {
                "error" : errorStub,
                "info" : infoStub
            }
        };
        pec = {};
        pec.Logger = mockLogLibrary;
        mockPromise = {};
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

    it("should log the failure",function(){
        errorStub.should.have.been.calledOnce;
        errorStub.should.have.been.calledWith("This is an error!!!");
        mockRequest.request.should.have.been.calledOnce;
        mockRequest.request.should.have.been.calledWith('POST', 'http://example.com',sinon.match(mockData), sinon.match({'json' : true}));
    });
});