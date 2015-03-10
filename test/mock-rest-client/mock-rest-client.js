var program = require('commander'),
	fs = require('fs'),
	http = require('http'),
	https = require('https'),
    url = require('url'),
	crypto = require('crypto');
    
    
function main(args) {
    if (args.args.length < 1) {
        program.help();
        return;
    }

	try {
		var method = (args.method || 'post').toUpperCase();
        var uri = args.args.length > 0 ? args.args[0] : '';
        var username = args.username || args.apikey;
        var password = args.password;
        var secret = args.secret;
        var data = args.data || fs.readFileSync(args.file).toString();
        var contenttype = args.contenttype;

        console.log('');
	    console.log(method + ' ' + uri);
	    console.log('');
        
        var options = url.parse(uri);
        var request = (options.protocol == 'https') ? https : http;
        options.method = method;
        if (username) {
        	options.auth = username + ':';
            if (password) {
            	options.auth = options.auth + password;
            }
		}           
        options.headers = options.headers || {};
        if (secret) {
	        options.headers.authSignature = crypto.createHmac('SHA256', secret).update(data).digest('base64');
        }
        options.headers['Content-Type'] = contenttype;
        options.headers['Content-Length'] = data.length;
        
        //console.dir(options);
        var req = request.request(options, function(res) {
        	console.log("statusCode: ", res.statusCode);
            console.log("headers: ", res.headers);
            res.on('data', function(d) {
            	process.stdout.write(d);
			});
		});
        req.on('error', function(e) {
        	console.error(e);
		});        
        
        req.write(data);
        req.end();
        
	    return 0;
	        
	} catch(ex) {
		console.error('Failed to execute REST request: ' + ex);
	    return -1;
	}
}

program
	.version('0.0.1')
	.description('Mock Rest Client')
	.option('-m, --method <s>', 'Method', 'post')
	.option('-u, --username <s>', 'User name')
	.option('-p, --password <s>', 'Password')
	.option('-k, --apikey <s>', 'API Key')
	.option('-s, --secret <s>', 'Secret')
	.option('-d, --data <s>', 'Data')
	.option('-f, --file <s>', 'File containing data')
	.option('-c, --contenttype <s>', 'Content Type', 'application/json')
	.parse(process.argv);

main(program);

//mock-rest-client -m post -u happy -p birthday -f data.json http://localhost:4242/fubar
