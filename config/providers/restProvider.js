
module.exports = {
    'type' : 'REST',
    'services' : {
        "/etldemo/conference/code/:code" : [
	        {
	            "method" : "post",
	            "version" : "0.0.1",
	            "event": "conferenceUpdate"
	        }
		],
        
        "/etldemo/team/code/:code" : [
	        {
	            "method" : "post",
	            "version" : "0.0.1",
	            "event": "teamUpdate"
	        }
		],
        
        "/etldemo/game/home/:home/visitor/:vistor/date/:date" : [
	        {
	            "method" : "post",
	            "version" : "0.0.1",
	            "event": "gameUpdate"
	        }
		]
    }
};
