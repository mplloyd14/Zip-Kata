var _ = require('lodash-node'),
  q = require('q'),
  mongodb = require('mongodb'),
  util = require('util'),
  fs = require('fs'),
  config = require('config');

if (process.argv.length < 3) {
  console.log('Script imports users from JSON file to "users" database.');
  console.log('It assumes database engine (mongod) is running.');
  console.log('If the database does not exist, it is created. Existing users are not removed,');
  console.log('but may be overwritten based on the user name.');
  console.log('');
  console.log('Usage: NODE_PATH=. node test/util/seed_users.js [path to users file]')
} else {
  var userUtils = require('./user-utils');
  var host = process.argv.length > 3 ? process.argv[3] : undefined;
  userUtils.seedUsers(process.argv[2], host);
}