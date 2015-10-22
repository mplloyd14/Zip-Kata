'use strict';

/* Controllers */
angular.module('peControllers', ['evo',"evo.common.directives"])
	.controller('MainController', ['$rootScope','$scope','$log','evoAPI', function(rootScope, scope, log, evoAPI) {
                scope.table = {
                  options: {
                      columns: {
                          "rk": "uint",
                          "player": "string",
                          "pos": {
                              type: "string",
                              fmt: "uppercase"
                          },
                          "team": {
                              type: "string",
                              fmt: "uppercase"
                          },
                          "avg": {
                              type: "float",
                              fmt: { precision: 3 }
                          }
                      },
                      pagination: {
                        itemsPerPage: 2,
                        maxSize: 4
                      }
                  },
                  data: [
                    {  rk: 1, player: "me", team: "myself", avg: 1 },
                    {  rk: 1, player: "me", team: "myself", avg: 1 },
                    {  rk: 1, player: "me", team: "myself", avg: 1 },
                    {  rk: 1, player: "me", team: "myself", avg: 1 },
                    {  rk: 1, player: "me", team: "myself", avg: 1 },
                    {  rk: 1, player: "me", team: "myself", avg: 1 },
                    {  rk: 1, player: "me", team: "myself", avg: 1 },
                    {  rk: 1, player: "me", team: "myself", avg: 1 },
                    {  rk: 1, player: "me", team: "myself", avg: 1 },
                    {  rk: 1, player: "me", team: "myself", avg: 1 },
                    {  rk: 1, player: "me", team: "myself", avg: 1 },
                    {  rk: 1, player: "me", team: "myself", avg: 1 },
                    {  rk: 1, player: "me", team: "myself", avg: 1 },
                  ]
              }
                
		evoAPI.callFunction('dataAccess',{}).then(function(message){
			//$scope.zips.data = message.result;
                        console.info(message.result);
                        log.info('Zips loaded sucessfully.');
                 });
	}]);



