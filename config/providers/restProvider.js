'use strict';

module.exports = {
    'type' : 'REST',
    'services' : {
        "/fu/:fu" : [
	        {
	            "method" : "post",
	            "version" : "0.0.1",
	            "event": "fuUpdate",
                "external": true
	        }
		],
        "/bar/:bar" : [
            {
                "method" : "post",
                "version" : "0.0.1",
                "event": "barUpdate",
                "external": true
            }
        ],
        "/fu/:fu/bar/:bar" : [
            {
                "method" : "post",
                "version" : "0.0.1",
                "event": "fubarUpdate",
                "external": true
            }
        ],
        "/fu/export" : [
            {
                "method": "post",
                "version": "0.0.1",
                "external": true,
                "outbound": true
            }
        ]
    }
};
