var log = require('projevo-core').Logger.getLogger();

module.exports = {
    'type' : '',
    "test" : function() {
        log.info('test');
        return "test";
    }
}