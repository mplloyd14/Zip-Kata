// Routes
module.exports = exports = function(i18n) {
  return [
      {
          method: 'get',
          route: '/',
          redirect: '/product/customadmindemo',
          protected: false
      },
      {
          method: 'get',
          route: '/product/customadmindemo',
          base: '/product/customadmindemo',
          render: {
              title: 'Evolution Custom Admin Demo',
              template: '/web/index'
          },
          protected: true
      },
      {
          method: 'get',
          route: '/product/:product/admin',
          handler: { module: 'adminProvider', method: 'admin' },
          protected: true
      }
  ];
};