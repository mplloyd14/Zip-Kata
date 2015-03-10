//var config = require('config');

// Routes
module.exports = exports = function(i18n) {
	return [
		{
			method: 'get',
			route: '/',
			redirect: '/product/:product',
			protected: false
		},

		{
			method: 'get',
			route: '/product/:product*',
			base: '/product/:product',
			render: {
				title: 'API Server Demo',
				template: '/web/index'
			},
			protected: true
		}
	];
}
