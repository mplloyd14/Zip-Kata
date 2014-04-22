var chai = require('chai'),
	sinon = require('sinon'),
    expect = chai.expect,
    sandbox = require('sandboxed-module'),
    _ = require('lodash-node'),
    Q = require('q');

chai.use(require("chai-as-promised"));
chai.use(require('sinon-chai'));

describe('States Provider', function() {

	var env = {};
    process.setMaxListeners(0);	// avoid Q promise library warning
    
	beforeEach(function() {
    	env = {};
        
        env.mockStates = [
			{
				"state" : "FU",
				"cities" : [ 
					{
						"zip" : "99999",
						"city" : "BAR",
						"loc" : [ 
							-88.02539400000001, 
							43.615071
						],
						"pop" : 1221
					},                 
					{
						"zip" : "99998",
						"city" : "NONE",
						"loc" : [ 
							-88.02539400000001, 
							43.615071
						],
						"pop" : 1500
					}
				]                        
		    },
            
			{
				"state" : "BAR",
				"cities" : [ 
					{
						"zip" : "88888",
						"city" : "HERE",
						"loc" : [ 
							-88.02539400000001, 
							43.615071
						],
						"pop" : 2000
					},                 
					{
						"zip" : "88887",
						"city" : "THERE",
						"loc" : [ 
							-88.02539400000001, 
							43.615071
						],
						"pop" : 2500
					}
				]                        
		    }
		];
        
        env.states = {
        	get: sinon.stub(),
        	getList: sinon.stub()
        };
		env.Provider = sandbox.require('../../../config/providers/statesProvider', {
        	requires: {
            	'../../lib/states': env.states
			}
		});
	});        
    
	describe('interface', function() {
        it('should support get states', function() {
        	expect(env.Provider).to.have.property('services');
        	expect(env.Provider.services).to.have.property('getStates');
            expect(env.Provider.services.getStates).to.respondTo('handler');
        });
    });
    
    describe('getStates', function() {
        describe('all', function() {
        	describe('list', function() {
	        	beforeEach(function(done) {
	            	env.states.getList.returns(Q(_.map(env.mockStates, function(state) {
                    	return _.pick(state, 'state');
                    }))); 
                    
	                env.promise = env.Provider.services.getStates.handler({list: true});
	                env.promise
	                	.then(function(data) {
	                    	env.data = data;
	                        done();
						})
	                    .fail(function(err) {
	                    	done(err);
						});
	            });
	        
	        	it('should make the proper request', function() {
	            	expect(env.states.get).to.not.have.been.called;
	            	expect(env.states.getList).to.have.been.calledWith(undefined);
	            });
	        
	        	it('should return a promise', function() {
	            	expect(env.promise).to.exist;
                    expect(env.promise).to.have.property('promiseDispatch');
	            });
	        
	        	it('promise should return states', function() {
	            	expect(env.data).to.exist;
                    expect(env.data).to.have.length(env.mockStates.length);
	            });
            });
            
        	describe('full', function() {
	        	beforeEach(function(done) {
	            	env.states.get.returns(Q(env.mockStates));
                    
	                env.promise = env.Provider.services.getStates.handler();
	                env.promise
	                	.then(function(data) {
	                    	env.data = data;
	                        done();
						})
	                    .fail(function(err) {
	                    	done(err);
						});
	            });
	        
	        	it('should make the proper request', function() {
	            	expect(env.states.getList).to.not.have.been.called;
	            	expect(env.states.get).to.have.been.calledWith(undefined);
	            });
	        
	        	it('should return a promise', function() {
	            	expect(env.promise).to.exist;
                    expect(env.promise).to.have.property('promiseDispatch');
	            });
	        
	        	it('promise should return states', function() {
	            	expect(env.data).to.exist;
                    expect(env.data).to.have.length(env.mockStates.length);
	            });
            });
            
        });

        
        describe('error', function() {
        	beforeEach(function(done) {
            	env.states.get.returns(Q.reject({errorNum: 1, errorMsg: 'bad stuff happened'}));
                env.promise = env.Provider.services.getStates.handler();
                env.promise
                	.then(function(data) {
                        done('should not return data');
					})
                    .fail(function(e) {
                    	env.err = e;
                    	done();
					});
            });
        
        	it('should make the proper request', function() {
            	expect(env.states.getList).to.not.have.been.called;
            	expect(env.states.get).to.have.been.calledWith(undefined);
            });
        
        	it('should return a promise', function() {
            	expect(env.promise).to.exist;
                expect(env.promise).to.have.property('promiseDispatch');
            });
        
        	it('promise should fail', function() {
            	expect(env.err).to.deep.equal({"errorNum": 1, "errorMsg": 'bad stuff happened'});
            });
        });
    });
    
});


