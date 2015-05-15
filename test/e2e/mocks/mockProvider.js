// wth is this? it's mocking calls to the backend providers.
// working in conjunction with mockLoader, you provide the mock services and the mock data and this thing works out the rest

// MockServices: json object that must be defined that includes the "services" and their responses
//		if "error" is present, it will return the error, else it will return the data
/*
	{
    	getFUBAR: {
        	data: [],
            error: null
        },
        getSNAFU: {
        	data: null,
            error: {errorNum: 1001, errorMsg: 'bad things'}
        }
	}
*/
// MockData: json object that provides the data to be used by the services
//		kept separate so that different test suites can inject different data sets while using the same "services"

// apiProvider: a stand-in for the real thing, injected by protractor

cai.module('cai.services', [])
    .factory('apiProvider', function(MockServices) {
    	var service = {
			callFunction: function(name, params){
		    	var svc = MockServices.hasOwnProperty(name) 
                	? (typeof MockServices[name] == 'function' ? MockServices[name](params) : MockServices[name])
                    : params;
				var data = svc;
                if (svc.hasOwnProperty('error')) {
                	data = svc.error;
                }
                else if (svc.hasOwnProperty('data')) {
                	data = svc.data;
                }
				// it's an object that looks like a promise, right??
				return {        
			    	then: function(callback, errcallback) {
                    	var cb = callback;
						if (data && data.hasOwnProperty('errorNum') || 
                        			data.hasOwnProperty('errno')) {
                    		cb = errcallback;
		                }
                        cb({result: JSON.stringify(data)});
			            return this;
			        }
				};
		    }
		};
        return service;
    })
    .factory('MockServices', function(MockData) {
    	return %services%;
    })
    .factory('MockData', function() {
        return %data%;
    });
