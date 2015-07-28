var config = require('config');

// Routes
module.exports = exports = function(i18n) {
	return [
		{
			method: 'get',
			route: '/',
			redirect: '/product/' + config.product_code,
			protected: false
		},

		{
			method: 'get',
			route: '/product/:product',
			redirect: '/product/' + config.product_code + '/root',
			protected: true
		},

		{
			method: 'get',
			route: '/product/:product/root',
			redirect: {
				desktop: '/product/:product/desktop',
				mobile: '/product/:product/mobile'
			},
			protected: true
		},

		{
			method: 'get',
			route: '/product/:product/desktop*',
			base: '/product/:product/desktop',
			render: {
				title: 'PESeed Providers',
				template: '/web/index'
			},
			protected: true
		},
		{
			method: 'get',
			route: '/product/:product/mobile*',
			base: '/product/:product/mobile',
			render: {
				title: 'PESeed Providers',
				template: '/mobile/index'
			},
			protected: true
		}
	];
}
