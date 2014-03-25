// Routes
/*module.exports = exports = function(i18n) {
  return [
	{
    	method: 'get',
        route: '/',
        render: {
        	title: 'Hello World',
            template: '/web/index'
        },
        protected: false
    },
	{
    	method: 'get',
        route: '/mobile',
        render: {
        	title: 'Hello World',
            template: '/mobile/index'
        },
        protected: false
    }	
  ];
}*/
// Routes
module.exports = exports = function(i18n) {
	return [
		{
			method: 'get',
			route: '/',
			redirect: '/product/peseed',
			/*render: {
				title: 'Hello World',
				template: '/web/index'
			},*/
			protected: false
		},

		{
			method: 'get',
			route: '/product/:product',
			redirect: '/product/peseed/root',
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
				title: 'PESeed',
				template: '/web/index'
			},
			protected: true
		}
	];
}
