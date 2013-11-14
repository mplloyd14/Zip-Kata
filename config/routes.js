// Routes
module.exports = exports = function(i18n) {
  return [
	{
    	method: 'get',
        route: '/peseed/simple',
        render: {
        	title: 'Simple',
            template: '/web/simpleView'
        },
        protected: true
    },
	{
    	method: 'get',
        route: '/peseed/complex',
        render: {
        	title: 'Complex',
            template: '/web/complexView'
        },
        protected: true
    }	
  ];
}
