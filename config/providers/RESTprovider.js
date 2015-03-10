var Q = require('q');
module.exports = {
    'type' : 'REST',
    'services' : {
        '/inbound/name/:name' : [
            {
                method : 'post',
                version : '0.1.0',
                event: 'dataReceived',
                external: true,
                inbound: true,
                service: 'PartnerService'
            }
        ],

        '/outbound/name/:name' : [
            {
                method : 'post',
                version : '0.1.0',
                event: 'dataReceived',
                external: true,
                outbound: true,
                service: 'PartnerService'
            }
        ]
    }
};
