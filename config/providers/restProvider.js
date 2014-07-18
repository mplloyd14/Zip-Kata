'use strict';

module.exports = {
    'type' : 'REST',
    'services' : {
        "/conference/code/:code" : [
	        {
	            "method" : "post",
	            "version" : "0.0.1",
	            "event": "conferenceUpdate",
                "external": true
	        }
		],
        
        "/team/code/:code" : [
	        {
	            "method" : "post",
	            "version" : "0.0.1",
	            "event": "teamUpdate",
                "external": true
	        }
		],
        
        "/game/home/:home/visitor/:visitor/date/:date" : [
	        {
	            "method" : "post",
	            "version" : "0.0.1",
	            "event": "gameUpdate",
                "external": true
	        }
		]
    }
};
