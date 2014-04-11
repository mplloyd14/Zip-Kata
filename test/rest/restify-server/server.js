var restify = require('restify');

var server = restify.createServer();

server.get('/peseed', sendName);
server.get('/peseed/name/:name', sendUserInfo);

server.listen(8181, function() {
  console.log('%s listening at %s', server.name, server.url);
});

var userData = {"name" : "Dev company user"};
var userInformation = {"name": "Dev company User", "first": "Buggs", "last": "Bunny", "eye": "Pink", "hair": "Grey"};


function sendName(req,res,next){
    console.log("Sent data for Dev Company");
    res.send(userData);
    return next();
};

function sendUserInfo(req, res, next){
	console.log("Sent data for Dev Company");
	res.send(userInformation);
	return next();
	
};

