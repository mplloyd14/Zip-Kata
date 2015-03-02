// Routes
module.exports = exports = function(i18n) {
	return [
		{
			method: 'get',
			route: '/',
			redirect: '/product/emitters',
			protected: false
		},

		{
			method: 'get',
			route: '/product/:product',
			redirect: '/product/emitters/root',
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
				title: 'Emitters',
				template: '/web/index'
			},
			protected: true
		}
	];
}
