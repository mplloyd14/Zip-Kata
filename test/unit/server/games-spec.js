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

describe('Conferences', function() {

	var env = {};
    process.setMaxListeners(0);	// avoid Q promise library warning
    
	beforeEach(function() {
    	env = {};
        
        env.context = {
        	company: 'a',
            product: 'b'
        };
        
		env.log = require('../../mocks/mockLogger');
        env.collection = mockCollection();
        env.mockContextCollection = function() {
        	return env.collection;
        }
        
        env.now = new Date();
        env.mockGames = [
			{
			    "home": "a",
			    "visitor": "b",
			    "date": env.now.toISODateString(),
			    "periods": []
			},
			{
			    "home": "c",
			    "visitor": "d",
			    "date": env.now.toISODateString(),
			    "periods": []
			}        
		];
	});        
    
	describe('Mock DB', function() {
    	beforeEach(function() {
			env.games = sandbox.require('../../../lib/games', {
            	requires: {
                	'../lib/log': env.log,
                	'../lib/context-collection' : env.mockContextCollection
				}
			});
		});
        
        describe('get', function() {
	        describe('all', function() {
	        	beforeEach(function(done) {
	            	env.collection.find.returns(Q(env.mockGames)); 
	                env.promise = env.games.get(env.context);
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
	            	expect(env.collection.find).to.have.been.calledWith({}, {sort: ['name','asc']});
	            });

	        	it('should return a promise', function() {
                	expect(env.promise).to.exist;
                    expect(env.promise).to.have.property('promiseDispatch');
	            });

	        	it('promise should return data', function() {
                	expect(env.data).to.exist;
                    expect(env.data).to.have.length(env.mockGames.length);
	            });

		    	it('data should contain correct information', function() {
                	expect(env.data[0]).to.have.property('code', 'fu');
                	expect(env.data[0]).to.have.property('divisions');
                	expect(env.data[1]).to.have.property('code', 'bar');
                	expect(env.data[1]).to.have.property('divisions');
		        });
	        });
            
	        describe('by code', function() {
	        	beforeEach(function(done) {
	            	env.collection.find.returns(Q(_.filter(env.mockGames, function(c) {
                    	return c.code == 'fu';
                    }))); 
	                env.promise = env.games.get(env.context, {code: 'fu'});
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
	            	expect(env.collection.find).to.have.been.calledWith({code: 'fu'}, {sort: ['name','asc']});
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
                	expect(env.data[0]).to.have.property('code', 'fu');
                	expect(env.data[0]).to.have.property('divisions');
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
            env.config.db.collections.games.database = env.context.company;

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
            
            env.contextCollection = sandbox.require('../../../lib/context-collection', {
            	requires: {
                    'projevo-core' : {Collection: env.collection},
                	'config': env.config
				}
			});

			env.games = sandbox.require('../../../lib/games', {
            	requires: {
                	'../lib/log': env.log,
                    '../lib/context-collection' : env.contextCollection
				}
			});

            //reset the db
            
            env.helpers.resetAll('games', env.mockGames)
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
	                env.promise = env.games.get(env.context);
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
                    expect(env.data).to.have.length(env.mockGames.length);
	            });

		    	it('data should contain correct information', function() {
                	expect(env.data[0]).to.have.property('code', 'bar');
                	expect(env.data[0]).to.have.property('divisions');
                	expect(env.data[1]).to.have.property('code', 'fu');
                	expect(env.data[1]).to.have.property('divisions');
				});
	        });
            
	        describe('by code', function() {
	        	beforeEach(function(done) {
	                env.promise = env.games.get(env.context, {code: 'fu'});
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
                	expect(env.data[0]).to.have.property('code', 'fu');
                	expect(env.data[0]).to.have.property('divisions');
		        });
	        });
		});
    });
});