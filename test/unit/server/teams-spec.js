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
        
        env.mockTeams = [
			{
			    "code": "a",
			    "name": "a b",
			    "nickname": "b",
			    "city": "here",
			    "conference": "e",
			    "division": "d",
			    "record": {
			        "wins": 0,
			        "losses": 0,
			        "overtimelosses": 0
			    },
			    "roster": [
			        {
			            "fname": "y",
			            "lname": "z",
			            "number": 99,
			            "position": "l"
			        }
			    ]
			},
			{
			    "code": "q",
			    "name": "q r",
			    "nickname": "r",
			    "city": "here",
			    "conference": "w",
			    "division": "f",
			    "record": {
			        "wins": 0,
			        "losses": 0,
			        "overtimelosses": 0
			    },
			    "roster": [
			        {
			            "fname": "w",
			            "lname": "x",
			            "number": 11,
			            "position": "r"
			        }
			    ]
			}        
		];
	});        
    
	describe('Mock DB', function() {
    	beforeEach(function() {
			env.teams = sandbox.require('../../../lib/teams', {
            	requires: {
                	'../lib/log': env.log,
                	'../lib/context-collection' : env.mockContextCollection
				}
			});
		});
        
        describe('get', function() {
	        describe('all', function() {
	        	beforeEach(function(done) {
	            	env.collection.find.returns(Q(env.mockTeams)); 
	                env.promise = env.teams.get(env.context);
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
	            	expect(env.collection.find).to.have.been.calledWith({}, {sort: ['conference', 'asc', 'division', 'asc', 'name','asc']});
	            });

	        	it('should return a promise', function() {
                	expect(env.promise).to.exist;
                    expect(env.promise).to.have.property('promiseDispatch');
	            });

	        	it('promise should return data', function() {
                	expect(env.data).to.exist;
                    expect(env.data).to.have.length(env.mockTeams.length);
	            });

		    	it('data should contain correct information', function() {
                	expect(env.data[0]).to.have.property('code', 'a');
                	expect(env.data[0]).to.have.property('roster');
                	expect(env.data[1]).to.have.property('code', 'q');
                	expect(env.data[1]).to.have.property('roster');
		        });
	        });
            
	        describe('by code', function() {
	        	beforeEach(function(done) {
                	env.team = 'a';
	            	env.collection.find.returns(Q(_.filter(env.mockTeams, function(c) {
                    	return c.code == env.team;
                    }))); 
	                env.promise = env.teams.get(env.context, {code: env.team});
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
	            	expect(env.collection.find).to.have.been.calledWith({code: env.team}, {sort: ['conference', 'asc', 'division', 'asc', 'name','asc']});
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
                	expect(env.data[0]).to.have.property('code', env.team);
                	expect(env.data[0]).to.have.property('roster');
		        });
			});
            
	        describe('by conference and division', function() {
	        	beforeEach(function(done) {
                	env.conf = 'e';
                    env.div = 'd';
	            	env.collection.find.returns(Q(_.filter(env.mockTeams, function(c) {
                    	return c.conference == env.conf && c.division == env.div;
                    }))); 
	                env.promise = env.teams.get(env.context, {conference: env.conf, division: env.div});
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
	            	expect(env.collection.find).to.have.been.calledWith({conference: env.conf, division: env.div}, {sort: ['conference', 'asc', 'division', 'asc', 'name','asc']});
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
                	expect(env.data[0]).to.have.property('code', 'a');
                	expect(env.data[0]).to.have.property('roster');
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
            env.config.db.collections.teams.database = env.context.company;

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

			env.teams = sandbox.require('../../../lib/teams', {
            	requires: {
                	'../lib/log': env.log,
                    '../lib/context-collection' : env.contextCollection
				}
			});

            //reset the db
            env.helpers.resetAll('teams', env.mockTeams)
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
	                env.promise = env.teams.get(env.context);
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
                    expect(env.data).to.have.length(env.mockTeams.length);
	            });

		    	it('data should contain correct information', function() {
                	expect(env.data[0]).to.have.property('code', 'a');
                	expect(env.data[0]).to.have.property('roster');
                	expect(env.data[1]).to.have.property('code', 'q');
                	expect(env.data[1]).to.have.property('roster');
		        });
	        });
            
	        describe('by code', function() {
	        	beforeEach(function(done) {
                	env.team = 'a';
	                env.promise = env.teams.get(env.context, {code: env.team});
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
                	expect(env.data[0]).to.have.property('code', env.team);
                	expect(env.data[0]).to.have.property('roster');
		        });
			});
            
	        describe('by conference and division', function() {
	        	beforeEach(function(done) {
                	env.conf = 'e';
                    env.div = 'd';
	                env.promise = env.teams.get(env.context, {conference: env.conf, division: env.div});
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
                	expect(env.data[0]).to.have.property('code', 'a');
                	expect(env.data[0]).to.have.property('roster');
		        });
			});
	    });
    });
});