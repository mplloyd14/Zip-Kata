// Routes
module.exports = exports = function(i18n) {
	return [
		{
			method: 'get',
			route: '/',
			redirect: '/product/peseed',
			protected: false
		},

		{
			method: 'get',
			route: '/product/:product',
			redirect: '/product/peseed/root',
			protected: false
		},

		{
			method: 'get',
			route: '/product/:product/root',
			redirect: {
				desktop: '/product/:product/desktop',
				mobile: '/product/:product/mobile'
			},
			protected: false
		},

		{
			method: 'get',
			route: '/product/:product/desktop*',
			base: '/product/:product/desktop',
			render: {
				title: 'PESeed',
				template: '/web/index'
			},
			protected: false
		},
		{
			method: 'get',
			route: '/product/:product/mobile*',
			base: '/product/:product/mobile',
			render: {
				title: 'PESeed',
				template: '/mobile/index'
			},
			protected: false
		}
	];
}
