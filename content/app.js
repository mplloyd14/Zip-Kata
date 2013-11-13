var pec = require('projevo-core'),
    config = require('config'),
    log = require('../lib/log')()

config.log = log;
var main = new pec.Main(__dirname + '/../', config);
main.start();
