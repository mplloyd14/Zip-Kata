var fs = require('fs');

function inject(script, services, data) {
	if (typeof script == 'string') {
		if (services) {
        	services = typeof services == 'string' ? services : JSON.stringify(services);
	    	script = script.replace('%services%', services);
	    }
		if (data) {
	    	if (typeof data == 'string') {
	        	data = (fs.existsSync(data) ? fs.readFileSync(data).toString() : data);
	        }
	        else {
	        	for (var key in data) {
	            	if (typeof data[key] == 'string') {
	                	data[key] = JSON.parse(fs.existsSync(data[key]) ? fs.readFileSync(data[key]).toString() : data[key]);
	                }
	            }
	        }
	    	script = script.replace('%data%', JSON.stringify(data));
		}
	}        
    return script;
}

//----------------------
// module = string, module name
// scriptin = string, string literal javascript OR path to file containing javascript
// data	= string, string literal json OR path to file containing json OR object with properties representing multiple entries of the former specs
//	'{"this": "is", "some": "json"}'
//	OR
//	'/path/to/some/data.json'
//	OR
//	{
//    	foo: '{"this": "is", "some": "json"}',
//      bar: '/path/to/some/data.json'
//  }
//	json will be "loaded" and stringified
//
function load(module, scriptin, services, data) {
	var script = (typeof scriptin == 'string' ? (fs.existsSync(scriptin) ? fs.readFileSync(scriptin).toString() : scriptin) : scriptin);
	var svc = (typeof services == 'string' ? (fs.existsSync(services) ? fs.readFileSync(services).toString() : services) : services);
	script = inject(script, svc, data);
    browser.addMockModule(module, script);
}

function clear() {
	browser.clearMockModules();
}

module.exports = {
	load: load,
    clear: clear
};