'use strict';

module.exports = {
    'type' : 'REST',
    'services' : {
        //"/company/:company/product/:product/conference/code/:code" : [
        "/conference/code/:code" : [
	        {
	            "method" : "post",
	            "version" : "0.0.1",
	            "event": "conferenceUpdate",
                "external": true
	        }
		],

        //"/company/:company/product/:product/team/code/:code" : [
        "/team/code/:code" : [
	        {
	            "method" : "post",
	            "version" : "0.0.1",
	            "event": "teamUpdate",
                "external": true
	        }
		],

        //"/company/:company/product/:product/game/home/:home/visitor/:visitor/date/:date" : [
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
