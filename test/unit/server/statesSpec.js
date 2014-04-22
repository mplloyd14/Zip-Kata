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

describe('States', function() {

	var env = {};
    process.setMaxListeners(0);	// avoid Q promise library warning
    
	beforeEach(function() {
    	env = {};
        
		env.log = require('../../mocks/mockLogger');
        
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
	});        
    
	describe('Mock DB', function() {
        
    	beforeEach(function() {

        	env.collection = mockCollection();
			env.states = sandbox.require('../../../lib/states', {
            	requires: {
                	'../lib/log': env.log,
                	'projevo-core' : {Collection: function() {return env.collection;}}
				}
			});
		});
        
        describe('get', function() {
	        describe('all', function() {
	        	describe('list', function() {
            
		        	beforeEach(function(done) {
		            	env.collection.find.returns(Q(_.map(env.mockStates, function(state) {
                        	return _.pick(state, 'state');
                        }))); 
		                env.promise = env.states.getList();
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
		            	expect(env.collection.find).to.have.been.calledWith({}, {fields: {state: 1}, sort: ['state','asc']});
		            });
		        
		        	it('should return a promise', function() {
                    	expect(env.promise).to.exist;
                        expect(env.promise).to.have.property('promiseDispatch');
		            });
		        
		        	it('promise should return data', function() {
                    	expect(env.data).to.exist;
                        expect(env.data).to.have.length(env.mockStates.length);
		            });
			        
			    	it('data should contain correct information', function() {
                    	expect(env.data[0]).to.have.property('state', 'FU');
                    	expect(env.data[0]).to.not.have.property('cities');
                    	expect(env.data[1]).to.have.property('state', 'BAR');
                    	expect(env.data[1]).to.not.have.property('cities');
			        });
				});
                
	        	describe('full', function() {
            
		        	beforeEach(function(done) {
		            	env.collection.find.returns(Q(env.mockStates)); 
		                env.promise = env.states.get();
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
		            	expect(env.collection.find).to.have.been.calledWith({}, {sort: ['state','asc']});
		            });
		        
		        	it('should return a promise', function() {
                    	expect(env.promise).to.exist;
                        expect(env.promise).to.have.property('promiseDispatch');
		            });
		        
		        	it('promise should return data', function() {
                    	expect(env.data).to.exist;
                        expect(env.data).to.have.length(env.mockStates.length);
		            });
			        
			    	it('data should contain correct information', function() {
                    	expect(env.data[0]).to.have.property('state', 'FU');
                    	expect(env.data[0]).to.have.property('cities');
                    	expect(env.data[1]).to.have.property('state', 'BAR');
                    	expect(env.data[1]).to.have.property('cities');
			        });
				});
                
	        });
            
	        describe('by state', function() {
	        	describe('full', function() {
            
		        	beforeEach(function(done) {
		            	env.collection.find.returns(Q(_.filter(env.mockStates, function(state) {
                        	return state.state == 'FU';
                        }))); 
		                env.promise = env.states.get({state: 'FU'});
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
		            	expect(env.collection.find).to.have.been.calledWith({state: 'FU'}, {sort: ['state','asc']});
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
                    	expect(env.data[0]).to.have.property('state', 'FU');
                    	expect(env.data[0]).to.have.property('cities');
			        });
				});
	        });
            
	        describe('by city', function() {
	        	describe('full', function() {
            
		        	beforeEach(function(done) {
		            	env.collection.find.returns(Q(_.filter(env.mockStates, function(state) {
                        	return !!_.find(state.cities, function(city) {
                            	return city.city === 'THERE';
                            });
                        }))); 
		                env.promise = env.states.get({city: 'THERE'});
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
		            	expect(env.collection.find).to.have.been.calledWith({'cities.city': 'THERE'}, {sort: ['state','asc']});
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
                    	expect(env.data[0]).to.have.property('state', 'BAR');
                    	expect(env.data[0]).to.have.property('cities');
			        });
				});
                
	        });
		});
    });
	
	describe('Mongo DB', function() {
    	beforeEach(function(done) {
        	env.config = require('config');
            env.config.db.databases['localedemo-tests'] = {server: 'mobileconnect'};
            env.config.db.collections.states.database = 'localedemo-tests';

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
           
			env.states = sandbox.require('../../../lib/states', {
            	requires: {
                	'../lib/log': env.log,
                    'projevo-core' : {Collection: env.collection}
				}
			});

            //reset the db
            env.helpers.resetAll('states', env.mockStates)
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
	        	describe('list', function() {
            
		        	beforeEach(function(done) {
		                env.promise = env.states.getList();
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
                        expect(env.data).to.have.length(env.mockStates.length);
		            });
			        
			    	it('data should contain correct information', function() {
                    	expect(env.data[0]).to.have.property('state', 'BAR');
                    	expect(env.data[0]).to.not.have.property('cities');
                    	expect(env.data[1]).to.have.property('state', 'FU');
                    	expect(env.data[1]).to.not.have.property('cities');
			        });
				});
                
	        	describe('full', function() {
            
		        	beforeEach(function(done) {
		                env.promise = env.states.get();
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
                        expect(env.data).to.have.length(env.mockStates.length);
		            });
			        
			    	it('data should contain correct information', function() {
                    	expect(env.data[0]).to.have.property('state', 'BAR');
                    	expect(env.data[0]).to.have.property('cities');
                    	expect(env.data[1]).to.have.property('state', 'FU');
                    	expect(env.data[1]).to.have.property('cities');
			        });
				});
                
	        });
            
	        describe('by state', function() {
	        	describe('full', function() {
            
		        	beforeEach(function(done) {
		                env.promise = env.states.get({state: 'FU'});
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
                    	expect(env.data[0]).to.have.property('state', 'FU');
                    	expect(env.data[0]).to.have.property('cities');
			        });
				});
	        });
            
	        describe('by city', function() {
	        	describe('full', function() {
            
		        	beforeEach(function(done) {
		                env.promise = env.states.get({city: 'THERE'});
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
                    	expect(env.data[0]).to.have.property('state', 'BAR');
                    	expect(env.data[0]).to.have.property('cities');
			        });
				});
	        });
		});
    });
});


