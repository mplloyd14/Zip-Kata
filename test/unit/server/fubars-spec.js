var chai = require('chai'),
	sinon = require('sinon'),
    expect = chai.expect,
    sandbox = require('sandboxed-module'),
    mockCollection = require('../../mocks/mockCollection'),
    _ = require('lodash-node'),
    fs = require('fs'),
    Q = require('q');

chai.use(require("chai-as-promised"));
chai.use(require('sinon-chai'));

describe('Fubars', function() {

	var env = {};
    process.setMaxListeners(0);	// avoid Q promise library warning
    
	beforeEach(function() {
    	env = {};
        
        env.context = {
        	company: 'a',
            product: 'b'
        };
        
		env.log = require('../../mocks/mockLogger');

        env.mockFubars = [
			{
			    "fu": "fu",
			    "bar": "FUBAR",
                "value": 1
			},
			{
			    "fu": "bar",
			    "bar": "BARFU",
                "value": 2
			}
		];
	});        
    
	describe('Mock DB', function() {
    	beforeEach(function() {
            env.collection = mockCollection();
            env.mockGenericCollection = function() {
                return env.collection;
            }

			env.fubars = sandbox.require('../../../lib/fubars', {
            	requires: {
                	'../lib/log': env.log,
                	'projevo-core' : {GenericCollection: env.mockGenericCollection}
				}
			});
		});
        
        describe('get', function() {
	        describe('all', function() {
	        	beforeEach(function(done) {
	            	env.collection.find.returns(Q(env.mockFubars)); 
	                env.promise = env.fubars.get(env.context);
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
	            	expect(env.collection.find).to.have.been.calledWith({}, {sort: ['value','asc']});
	            });

	        	it('should return a promise', function() {
                	expect(env.promise).to.exist;
                    expect(env.promise).to.have.property('promiseDispatch');
	            });

	        	it('promise should return data', function() {
                	expect(env.data).to.exist;
                    expect(env.data).to.have.length(env.mockFubars.length);
	            });

		    	it('data should contain correct information', function() {
                	expect(env.data[0]).to.have.property('fu', 'fu');
                	expect(env.data[0]).to.have.property('bar');
                	expect(env.data[1]).to.have.property('fu', 'bar');
                	expect(env.data[1]).to.have.property('bar');
		        });
	        });
            
	        describe('by fu', function() {
	        	beforeEach(function(done) {
	            	env.collection.find.returns(Q(_.filter(env.mockFubars, function(c) {
                    	return c.fu == 'fu';
                    }))); 
	                env.promise = env.fubars.get(env.context, {fu: 'fu'});
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
	            	expect(env.collection.find).to.have.been.calledWith({fu: 'fu'}, {sort: ['value','asc']});
	            });

	        	it('should return a promise', function() {
                	expect(env.promise).to.exist;
                    expect(env.promise).to.have.property('promiseDispatch');
	            });

	        	it('promise should return data', function() {
                	expect(env.data).to.exist;
                    expect(env.data).to.have.length(1);
	            });

		    	it('data should contain correct information', function() {
                	expect(env.data[0]).to.have.property('fu', 'fu');
                	expect(env.data[0]).to.have.property('bar');
                	expect(env.data[0]).to.have.property('value');
		        });
			});
		});
    });

	describe('Mongo DB', function() {
    	beforeEach(function(done) {
	        env.context = {
	        	company: 'etldemo-tests',
	            product: 'b'
	        };
        
        	env.config = require('config');
            env.config.db.databases['etldemo-tests'] = {server: 'mobileconnect'};
            env.config.db.collections.fubars.database = env.context.company;

        	env.helpers = sandbox.require('../../lib/dbhelper', {
            	requires: {
                    'config': env.config
				}
			});

            env.collection = sandbox.require('../../../node_modules/projevo-core/lib/collection', {
            	requires: {
                	'./logger': {getLogger: env.log},
                	'config': env.config
				}
			});
            
            env.genericCollection = sandbox.require('../../../node_modules/projevo-core/lib/genericCollection', {
            	requires: {
                    'projevo-core' : {Collection: env.collection},
                	'config': env.config
				}
			});

			env.fubars = sandbox.require('../../../lib/fubars', {
            	requires: {
                	'../lib/log': env.log,
                	'projevo-core' : {GenericCollection: env.genericCollection}
				}
			});

            //reset the db
            env.helpers.resetAll('fubars', env.mockFubars)
            	.then(function() {
                	done();
                })
                .fail(function(err) {
                	done(err);
                });
		});            
        
        after(function(done) {
        	//env.config.resetRuntime(function() {done();});
            fs.unlink('./config/runtime.json', done);
        });
        
        describe('get', function() {
	        describe('all', function() {
	        	beforeEach(function(done) {
	                env.promise = env.fubars.get(env.context);
	                env.promise
	                	.then(function(data) {
                        	env.data = data;
	                        done();
						})
	                    .fail(function(err) {
	                    	done(err);
						});
	            });

	        	it('should return a promise', function() {
                	expect(env.promise).to.exist;
                    expect(env.promise).to.have.property('promiseDispatch');
	            });

	        	it('promise should return data', function() {
                	expect(env.data).to.exist;
                    expect(env.data).to.have.length(env.mockFubars.length);
	            });

		    	it('data should contain correct information', function() {
                	expect(env.data[0]).to.have.property('fu', 'fu');
                	expect(env.data[0]).to.have.property('bar');
                	expect(env.data[1]).to.have.property('fu', 'bar');
                	expect(env.data[1]).to.have.property('bar');
				});
	        });
            
	        describe('by fu', function() {
	        	beforeEach(function(done) {
	                env.promise = env.fubars.get(env.context, {fu: 'fu'});
	                env.promise
	                	.then(function(data) {
                        	env.data = data;
	                        done();
						})
	                    .fail(function(err) {
	                    	done(err);
						});
	            });

	        	it('should return a promise', function() {
                	expect(env.promise).to.exist;
                    expect(env.promise).to.have.property('promiseDispatch');
	            });

	        	it('promise should return data', function() {
                	expect(env.data).to.exist;
                    expect(env.data).to.have.length(1);
	            });

		    	it('data should contain correct information', function() {
                	expect(env.data[0]).to.have.property('fu', 'fu');
                	expect(env.data[0]).to.have.property('bar');
		        });
	        });
		});
    });
});