var config = require('config'),
    Q = require('q'),
    pec = require('projevo-core'),
    log = pec.Logger.getLogger(),
    restClient = pec.RestClient;

module.exports = {
    type: 'Socket',
    services: {
		sendData: {
			handler: function(data, context){
                var data = {
                    //level: (data.level || 'none').toLowerCase(),
                    name: data.name || 'noname'
                };

                var apiserver = config.apiServer.host;
                var url = '/company/' + context.company + '/product/' + context.product + '/outbound/name/' + data.name;
                log.info('POST ' + url);
                return restClient.post(apiserver + url, data, {json: true})
                    .then(function() {
                        return Q.resolve(true);
                    })
                    .fail(function(err) {
                        log.error('Failed to send data');
                        log.error(err);
                        return Q.reject(err);
                    });
			},
			room: {
				id: '|URL|',
				client: true,
				url: '/inbound/{name}',
				announce: true
			}
		}},
    emitters : {
        events : [
            {
                event: 'dataReceived',
                room: '|URL|'
            }
        ]
    }
};
