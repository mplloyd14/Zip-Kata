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
            loginUrl: 'http://ec2-54-242-10-194.compute-1.amazonaws.com/login'
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
