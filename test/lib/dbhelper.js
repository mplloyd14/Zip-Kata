var mongo = require('mongodb'),
	Q = require('q'),
	config = require('config');
    
function getConnectInfo(name) {
    var collCfg = config.db.collections[name];
    var dbCfg = collCfg ? config.db.databases[collCfg.database] : null;
    var srvCfg = dbCfg ? config.db.servers[dbCfg.server] : {};
    return {
    	host: srvCfg.host, 
        port: srvCfg.port,
        database: collCfg.database
	};
}    

function resetAll(name, data) {
	var connInfo = getConnectInfo(name);
    var server = new mongo.Server(connInfo.host, connInfo.port),
        conn = new mongo.Db(connInfo.database, server, {safe: true});	
        
	//console.log('reset ' + name + ' on database ' + cfg.name);
	//console.log('open');
	return Q.ninvoke(conn, 'open')
    	.then(function(db) {
        	if (!db) {
            	return new Error('Could not connect to database.');
			}
		    var collection = db.collection(name);
	        if (collection) {
	        	collection.drop();
	        }
            
            //console.log('create collection');
            
			return Q.ninvoke(db, 'createCollection', name);
		})
        .then(function(collection) {
            //console.log('insert data');
        
		    return Q.ninvoke(collection, 'insert', data)
		    	.then(function() {
		            return true;
				})
		        .fail(function(err) {
                	//console.error(err);
                
		            return Q.reject(err);
				});
	    })
        .fail(function(err) {
        	//console.error(err);
            return Q.reject(err);
		})
        .fin(function() {
            //console.log('done');
            conn.close();
		});        
}

function retrieveAll(name) {
	var connInfo = getConnectInfo(name);
    var server = new mongo.Server(connInfo.host, connInfo.port),
        conn = new mongo.Db(connInfo.database, server, {safe: true});	
        
	return Q.ninvoke(conn, 'open')
    	.then(function(db) {
        	if (!db) {
            	return new Error('Could not connect to database.');
			}
            
		    var collection = db.collection(name);
		    return Q.ninvoke(collection, 'find')
		    	.then(function(cursor) {
		        	if (!cursor) {
		                return Q.reject(new Error('Data not found.'));
		            }
		        	return Q.ninvoke(cursor, 'toArray');
				})
		    	.then(function(data) {
		        	if (!data) {
		                return Q.reject(new Error('Data not found.'));
					}
                    
		            return data;
				})
		        .fail(function(err) {
		            return Q.reject(err);
				});
	    })
        .fail(function(err) {
            return Q.reject(err);
		})
        .fin(function() {
            conn.close();
		});        
}


module.exports = {
	retrieveAll: retrieveAll,
    resetAll: resetAll
};    
