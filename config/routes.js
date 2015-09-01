// Routes
module.exports = exports = function(i18n) {
	return [
		{
			method: 'get',
			route: '/',
			redirect: '/product/breakfastStout',
			protected: false
		},

		{
			method: 'get',
			route: '/product/:product',
			redirect: '/product/breakfastStout/root',
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
		}
	];
}
