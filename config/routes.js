// Routes
module.exports = exports = function(i18n) {
	return [
		{
			method: 'get',
			route: '/',
			redirect: '/product/highavailability',
			protected: false
		},

		{
			method: 'get',
			route: '/product/:product',
			redirect: '/product/highavailability/root',
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
				title: 'High Availability',
				template: '/web/index'
			},
			protected: true
		},
		{
			method: 'get',
			route: '/product/:product/mobile*',
			base: '/product/:product/mobile',
			render: {
				title: 'High Availability',
				template: '/mobile/index'
			},
			protected: true
		}
	];
}
