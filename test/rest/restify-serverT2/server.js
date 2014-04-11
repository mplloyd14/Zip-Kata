var restify = require('restify');

var server = restify.createServer();
server.get('/peseed', sendName);
server.get('/peseed/name/:name', sendUserInfo);

server.listen(8191, function() {
  console.log('%s listening at %s', server.name, server.url);
});

var userData = {"name" : "Dev company user"};
var userInformation = {"name": "Dev company User", "first": "Road", "last": "Runner", "eye": "Black", "hair": "Black"};


function sendName(req,res,next){
    console.log("Sent data for T2 Company");
    res.send(userData);
    return next();
};

function sendUserInfo(req, res, next){
	console.log("Sent data for T2 Company");
	res.send(userInformation);
	return next();
	
};

