// Routes
module.exports = exports = function(i18n) {
  return [
      {
          method: 'get',
          route: '/product/:product/admin',
          handler: { module: 'adminProvider', method: 'admin' },
          protected: true
      }
  ];
};