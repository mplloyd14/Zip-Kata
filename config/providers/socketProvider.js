var Q = require('q');
var _ = require('underscore');
var pec = require('projevo-core');
var rest = pec.RestClient;

module.exports = {
    type: "Socket",
    services: {
        getStories: {
            "handler": function (data) {
                return rest.request('GET','https://www.pivotaltracker.com/services/v5/projects/785969/stories',null,{'headers' : {'X-TrackerToken':'c9d8ddfca063867ed5f0ce48620c26ca'}})
            },
            room : {
                id : "|URL|",
                client : true,
                url : "/services/v5/{projects}/stories",
                announce : false

            }
        }
    },

    emitters : {
        events : [{'event' :  "trackerEvent", 'room': '*'},{ event : 'storiesRetrieved', 'room' : '|URL|' }]//what REST event to listen for and what room to publish to.  could be *, |USER|, or |URL|
    }
};