// Routes
module.exports = exports = function(i18n) {
  return [
	{
    	method: 'get',
        route: '/',
        redirect: {
            desktop: '/product/styleguide/desktop',
            mobile: '/product/styleguide/mobile'
        },
        protected: false
    },
    {
          method: 'get',
          route: '/product/:product',
          redirect: {
              desktop: '/product/:product/desktop',
              mobile: '/product/:product/mobile'
          },
          protected: false
    },

    {
          method: 'get',
          route: '/product/:product/desktop',
          base: '/product/:product/desktop',
          render: {
              title: 'MOBIlEconnect Style Guide',
              template: '/web/index'
          },
          protected: false
    },
	{
    	method: 'get',
        route: '/product/:product/mobile',
        base: '/product/:product/mobile',
        render: {
        	title: 'MOBIlEconnect Style Guide',
            template: '/mobile/index'
        },
        protected: false
    }	
  ];
}
