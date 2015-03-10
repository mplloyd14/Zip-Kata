RESTService = function(port, company) {
	var self = this;
    
	port = port || 8282;
    
    self.start = function() {
    	console.log('Starting Mock REST Service for ' + company);
    
    	var routes = require("./routes.js")(company);
		var restify = require('restify');
		var server = restify.createServer();
        server.use(restify.queryParser());
        server.use(restify.bodyParser({mapParams: false}));
        
    	console.log('Creating routes...');
        if (routes && routes.length > 0) {
        	for (var i = 0; i<routes.length; i++) {
            	var route = routes[i];
                console.log("   " + route.method + " @ " + route.url);
            	if (route.method == "post") {
                	server.post(route.url, route.handler);
                }
                else if (route.method == "get") {
                	server.get(route.url, route.handler);
                }
                else if (route.method == "put") {
                	server.put(route.url, route.handler);
                }
                else if (route.method == "delete") {
                	server.del(route.url, route.handler);
                }
                else {
                	console.log("Unknown REST operation specified: " + route.method);
                }
            }
        }
        
		server.listen(port, function() {
        	console.log('%s listening at %s', server.name, server.url);
		});
        
        console.log('Mock REST Server running at http://127.0.0.1:' + port + '/ for ' + company);
	}
    
};

// main entry point
(function() {
	try {
    	console.log('Creating Mock REST Services');
            
		var ac = new RESTService(4005, 'ACME Conglomerated');
		ac.start();

		var ss = new RESTService(4006, 'Spacely Sprockets');
		ss.start();
		
		var cc = new RESTService(4007, 'Cogswell Cogs');
		cc.start();

    } catch (ex) {
    	console.log('Error in creating Mock REST Services: ' + ex);
    }
})();
