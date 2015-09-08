// Scaffolding entry-point for ProjEvo-Core applications
// To use as is, place this file into your content/ directory.
var pec = require('projevo-core'),
    path = require('path'),
    config = require('config');

// This path should point to the root of the application
var main = new pec.Main(path.join(__dirname, '..'), config);
main.start(config);
