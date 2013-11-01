// Routes
module.exports = exports = function(i18n) {
  return [
	{
    	method: 'get',
        route: '/',
        render: {
        	title: 'Pivotal Tracker',
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
}
