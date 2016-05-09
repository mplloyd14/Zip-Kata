// Routes
module.exports = exports = function(i18n) {
	return [
		{
			method: 'get',
			route: '/',
			redirect: '/product/billing',
			protected: false
		},

		{
			method: 'get',
			route: '/product/:product',
			redirect: '/product/billing/root',
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
				title: 'billing',
				template: '/web/index'
			},
			protected: true
		},
		{
			method: 'get',
			route: '/product/:product/mobile*',
			base: '/product/:product/mobile',
			render: {
				title: 'billing',
				template: '/mobile/index'
			},
			protected: true
		},
    {
      method: 'get',
      route: '/product/:product/users',
      handler: {
        module: 'billingProvider',
        method: 'users'
      },
      protected: true
    }
	];
}
