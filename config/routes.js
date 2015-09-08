// Routes
module.exports = exports = function(i18n) {
	return [
		{
			method: 'get',
			route: '/',
			redirect: '/product/breakfaststout',
			protected: false
		},

		{
			method: 'get',
			route: '/product/:product',
			redirect: '/product/breakfaststout/root',
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
				title: 'Breakfast Stout',
				template: '/web/index'
			},
			protected: true
		},
		{
			method: 'get',
			route: '/product/:product/mobile*',
			base: '/product/:product/mobile',
			render: {
				title: 'Breakfast Stout',
				template: '/web/index'
			},
			protected: true
		}
	];
}
