'use strict';

// Declare app level module which depends on filters, and services
evo.module('peApp', ['evo', 'peControllers', 'ngCookies', 'ngRoute'])
    .value('settings', {
        pagination: {
            maxSize: 5, //number of pages to show in the pagination widget before an ellipsis is displayed
            rowsPerPage: 8,
            currentPage: 1,
            pages: 0, //NUmber of pages in total
            totalCount: 0, //Total number of rows counting all pages
            rotate: false,  //Whether to keep current page in the middle of the visible ones.
            isPaginate: false, //tells if the paginaton widget should be displayed or not depending on the number of records and max record per page
            boundaryLinks: true,
            setTotalCount: function(length) {
                this.totalCount = length;
                this.calcIsPaginate();
                this.calcPages();
            },
            setPage : function(page) {
                this.currentPage = page;
            },
            calcPagesArg: function(length) {
                this.pages = Math.ceil(length / this.rowsPerPage);
            },
            calcPages: function(){
                this.calcPagesArg(this.totalCount);
            },
            calcIsPaginate : function() {
                this.isPaginate =  !!((this.totalCount > this.rowsPerPage));
            },
            reset: function(){
                this.currentPage = 1
                this.pages = 0 //NUmber of pages in total
                this.totalCount = 0 //Total number of rows counting all pages
            }
        }
    })
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
		        templateUrl: 'main',
                controller: 'MainController'
            });

        $locationProvider.html5Mode(true);
}]);
