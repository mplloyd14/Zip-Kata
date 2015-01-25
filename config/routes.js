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
        },

        // protected client side page
        {
            method: 'get',
            route: '/product/:product/desktop/:token/restricted',
            base: '/product/:product/desktop',
            render: {
                title: 'MOBILEconnect Permissions Demo',
                template: '/web/index'
            },
            roles: [
                'roleA'
            ],
            protected: true
        },

        // protected server side page
        {
            method: 'get',
            route: '/product/:product/restricted',
            redirect: {
                desktop: '/product/:product/restricted/desktop',
                mobile: '/product/:product/restricted/mobile/'
            },
            protected: true
        },

        {
            method: 'get',
            route: '/product/:product/restricted/desktop*',
            base: '/product/:product/restricted/desktop',
            render: {
                title: 'Evolution Permissions Demo',
                template: '/web/restricted'
            },
            roles: [
                'roleA'
            ],
            protected: true
        }

	];
}
