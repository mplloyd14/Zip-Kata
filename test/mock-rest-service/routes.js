module.exports = function(company) {
	return [
		{
			method: 'post',
			url: '/product/:product/outbound/name/:name',
			handler: function(req, res, next) {
				try {
					var dt = new Date()
					console.log(dt.toISOString() + ' Posted to ' + company);				
					console.log(dt.toISOString() + ' ' + JSON.stringify(req.body));
					console.dir(req.headers);
					
					res.send(200);
					return next();
				
				} catch (ex) {
					console.error('Error in processing REST operation for ' + company);
					console.error(ex);
				}
			}
		}
	];
}

