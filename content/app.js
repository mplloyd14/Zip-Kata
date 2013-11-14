//process.chdir(__dirname + '/../');

var pec = require('projevo-core'),
    config = require('config'),
    log = require('../lib/log')();

config.log = log;
var main = new pec.Main(__dirname + '/../', config);
main.start(config);

// evo release 0.07 startup code
//main.configure(config);
//main.start();
//main.startMonitoring();