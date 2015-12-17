var pec = require('projevo-core');
var secretsCollection = require('../../lib/secretsCollection.js');
var confidentialCollection = require('../../lib/confidentialCollection.js');

var provider = {
    type: "Socket",
    services: {
        getSecrets: {
            handler: function (data,context) {
               return secretsCollection(context.company).getSecrets(context.company);
            }
        },
        getConfidentialMsg : {
            handler: function (data,context) {
                return confidentialCollection(context.company).getConfidentialMsg(context.company);
            }
        }
    }
}
module.exports = provider;