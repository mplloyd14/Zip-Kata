// Routes
module.exports = exports = function(i18n) {
	return [
		{
			method: 'get',
			route: '/',
			redirect: '/product/permissiondemo',
			protected: false
		},

		{
			method: 'get',
			route: '/product/:product',
			redirect: '/product/permissiondemo/root',
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
				title: 'MOBILEconnect Permissions Demo',
				template: '/web/index'
			},
			protected: true
		}
	];
}
