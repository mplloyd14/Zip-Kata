'use strict';

/* Controllers */
angular.module('peControllers', ['evo',"evo.common.directives"])
	.controller('MainController', ['$rootScope','$scope','$log','evoAPI', function(rootScope, scope, log, evoAPI) {
                scope.table = {
                  options: {
                      columns: {
                          "city": "string",
                          "state": "string",
                          "loc": "string",
                          "edit": {
                                type: "button",
                                icon: "fa fa-pencil-square-o",
                                width: "60px",
                                textAlign: "center",
                                onclick: function (e, item, column, index) {
                                        /** do something */
                                        console.info(e);
                                        console.info(item);
                                        console.info(column);
                                        console.info(index);
                                }
                          }
                      },
                      pagination: {
                        itemsPerPage: 5
                      }
                  },
                  data: [ ]
              }
                
		evoAPI.callFunction('dataAccess',{}).then(function(message){
			//$scope.zips.data = message.result;
                        console.info(message.result);
                        scope.table.data = message.result;
                        log.info('Zips loaded sucessfully.');
                 });
	}]);



