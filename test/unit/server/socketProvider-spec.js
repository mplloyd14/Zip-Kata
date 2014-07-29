var chai = require('chai'),
	sinon = require('sinon'),
    expect = chai.expect,
    sandbox = require('sandboxed-module'),
    _ = require('lodash-node'),
    Q = require('q');

chai.use(require("chai-as-promised"));
chai.use(require('sinon-chai'));

describe('Socket Provider', function() {

	var env = {};
    process.setMaxListeners(0);	// avoid Q promise library warning
    
	beforeEach(function() {
    	env = {};
        
        env.log = require('../../mocks/mockLogger');
        
        env.fubars = {
        	get: sinon.stub()
        };
        
		env.Provider = sandbox.require('../../../config/providers/socketProvider', {
        	requires: {
            	'../../lib/log': env.log,
            	'../../lib/fubars': env.fubars
			}
		});
	});        
    
	describe('interface', function() {
        it('should support get fu', function() {
        	expect(env.Provider).to.have.property('services');
        	expect(env.Provider.services).to.have.property('getFu');
            expect(env.Provider.services.getFu).to.respondTo('handler');
        });
    
        it('should support get bar', function() {
        	expect(env.Provider).to.have.property('services');
        	expect(env.Provider.services).to.have.property('getBar');
            expect(env.Provider.services.getBar).to.respondTo('handler');
        });
        
        it('should support get fubar', function() {
        	expect(env.Provider).to.have.property('services');
        	expect(env.Provider.services).to.have.property('getFubar');
            expect(env.Provider.services.getFubar).to.respondTo('handler');
        });
        
    });
    
    /*
    describe('getState', function() {
    	describe('full', function() {
        	beforeEach(function(done) {
            	env.states.get.returns(Q([env.mockStates[0]]));
                
                env.promise = env.Provider.services.getState.handler('FU');
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
            	expect(env.states.get).to.have.been.calledWith({state: 'FU'});
            });
        
        	it('should return a promise', function() {
            	expect(env.promise).to.exist;
                expect(env.promise).to.have.property('promiseDispatch');
            });
        
        	it('promise should return state', function() {
            	expect(env.data).to.exist;
                expect(env.data).to.have.length(1);
            });
        });
        
        describe('error', function() {
        	beforeEach(function(done) {
            	env.states.get.returns(Q.reject({errorNum: 1, errorMsg: 'bad stuff happened'}));
                env.promise = env.Provider.services.getState.handler('fu');
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
            	expect(env.states.get).to.have.been.calledWith({state: 'fu'});
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
    */
    
});


