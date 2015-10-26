var restify = require('restify');

var routes = [
	{
    	method: "post",
    	url: "/(.*)",
        handler: function(req, res, next) {
	    	try {
				var dt = new Date()
	        	console.log(dt.toISOString() + " Posted to Mock Service");
				console.log(dt.toISOString() + " " + req.path);
				console.log(dt.toISOString() + " " + JSON.stringify(req.headers));
				console.log(dt.toISOString() + " " + JSON.stringify(req.body));
				//console.dir(req);

		        res.send(200);
                return next();

		    } catch (ex) {
		    	console.log('Error in processing REST operation: ' + ex);
		    }
		}
    }
];

RESTService = function(port) {
	var self = this;

	self.Port = port || 8282;

    self.start = function(port) {
    	if (!port) port = self.Port;
        self.Port = port;

    	console.log('Starting Mock REST Service');
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

    	console.log('Listening...');

		server.listen(self.Port, function() {
        	console.log('%s listening at %s', server.name, server.url);
		});

        console.log('Mock REST Server running at http://127.0.0.1:' + self.Port + '/');
	}
};

// main entry point
function main(args) {
	args = args || [];
	try {
    	console.log('Creating Mock REST Service');
        var port = args.length > 2 ? args[2] : 8282;
		var ds = new RESTService(port);
		ds.start();
    } catch (ex) {
    	console.error('Error in creating Mock REST Service: ' + ex);
    }
}

main(process.argv);
