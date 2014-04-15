var _ = require('lodash-node'),
  q = require('q'),
  mongodb = require('mongodb'),
  util = require('util'),
  fs = require('fs'),
  config = require('config'),
  auth = require('./../../lib/auth');

if (!config.hasOwnProperty('db')) {
    config.db = {};
}
if (!config.db.hasOwnProperty('users')) {
    config.db.users = {
        host: 'localhost',
        port: 27017,
        name: 'mobileconnect',
        options: {
            server: {
                poolSize: 10
            },
            db: {
                journal: true
            }
        },
        pool: {
            max      : 10,
            min      : 0,
            idleTimeoutMillis : 30000
        }
    }
}

// seedUsers - initialize mongo DB with users. If DB does not exist, it is created.
//   userFile - JSON file containing array of users to create, existing users are not removed,
//     but may be overwritten based on the user name.
exports.seedUsers = function(userFile, host) {
  var url = config.db['users'],      
    mongoserver = new mongodb.Server(host || url.host, url.port),
    db_connector = new mongodb.Db(url.name, mongoserver, {safe: true});

  q.ninvoke(db_connector, 'open')
    .then(function(db) {
      if (!db) {
        return new Error('Could not connect to database.');
      }
      return q.ninvoke(db, 'createCollection', 'users');
    })
    .then(function(collection) {
      //var users = JSON.parse(fs.readFileSync(userFile, {options: {encoding: 'utf8'}}));
	   var users = _.isArray(userFile) ? userFile : JSON.parse(fs.readFileSync(userFile));

      var results = [];
      _.each(users, function(user) {
        results.push(
          auth.hashUser(user)
            .then(function (user) {
              //console.log('Updating/inserting user ' + user.userName + '.');
              user.userName = user.userName.toLowerCase();
              user.email = user.email.toLowerCase();
              return q.ninvoke(
                collection, 'update',
                {userName: user.userName}, user, { safe: true, upsert: true }
              );
            })
            .fail(function(err) {
              console.log('Failed importing user ' + user.userName + ': ' + err);
            })
        );
      });

      return q.all(results);
    })
    .then(function(results) {
      //console.log('Succesfully imported ' + results.length + ' records.');
    })
    .fail(function(err) {
      console.log('Failed with error: ' + err);
    })
    .fin(function() {
      //console.log('Closing connection.');
      db_connector.close();
    });
};
