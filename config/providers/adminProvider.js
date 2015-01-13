var pec = require('projevo-core'),
    log = pec.Logger.logger();

module.exports = {
	type : 'Express',
	services : {
		admin: function(req, res) {
            var cd = pec.ClientDataTransfer.buildClientData(req);
            log.debug('Redirect to ' + cd.adminUrl);
            res.redirect(cd.adminUrl);
        }
	}
}
