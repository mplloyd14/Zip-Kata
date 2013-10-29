// Routes
module.exports = exports = function(i18n) {
  return [
	{
    	method: 'get',
        route: '/',
        render: {
        	title: 'Hello World',
            template: '/web/index'
        },
        protected: true,
        options: {
            loginUrl: 'http://localhost:3000/login'
        }
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
}
