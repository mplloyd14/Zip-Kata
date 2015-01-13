// Routes
module.exports = exports = function(i18n) {
  return [
      {
          method: 'get',
          route: '/',
          redirect: '/product/ticket',
          protected: true
      },

      {
          method: 'get',
          route: '/product/:product',
          redirect: '/product/ticket/root',
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
          route: "/product/:product/:platform/:path",
          base: '/product/:product/desktop',
          render: {
              title: 'MOBILEticket',
              template: '/web/index'
          },
          protected: true
      },
      
      {
          method: 'get',
          route: '/product/:product/admin',
          handler: { module: 'adminProvider', method: 'admin' },
          protected: true
      },

      {
          method: 'get',
          route: '/product/:product/desktop*',
          base: '/product/:product/desktop',
          render: {
              title: 'MOBILEticket',
              template: '/web/index'
          },
          protected: true
      }

  ];
};