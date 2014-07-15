var Q = require('q');

module.exports = {
    'type' : 'REST',
    'services' : {
        "/etldemo/team/name/:name" : [{
            "method" : "post",
            "version" : "0.1.0",
            "event": "teamUpdate"
        }]
    }
};
