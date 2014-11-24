'use strict';

// Routes
module.exports = exports = function(i18n) {
	return [
        {
            method: 'get',
            route: '/',
            redirect: '/product/etldemo',
            protected: false
        },

        {
            method: 'get',
            route: '/product/etldemo',
            redirect: '/product/etldemo/root',
            protected: true
        },

        {
            method: 'get',
            route: '/product/etldemo/root',
            redirect: {
                desktop: '/product/etldemo/desktop',
                mobile: '/product/etldemo/mobile'
            },
            protected: true
        },

        {
            method: 'get',
            route: '/product/etldemo/desktop*',
            base: '/product/etldemo/desktop',
            render: {
                title: 'Evolution ETL Demo',
                template: '/web/index'
            },
            protected: true
        }
	];
};
