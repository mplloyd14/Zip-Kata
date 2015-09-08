'use strict';

/* Controllers */
evo.module('peControllers', ['evo'])
	.controller('StatesController', function($rootScope, $scope, $log, evoAPI, $anchorScroll, $location, evoUtils) {
      $scope.states = [];
      $scope.list = [];

      $scope.map = {
        center: {
          latitude: 40.0905899,
          longitude: -83.1304559
        },
        zoom: 8
      };

      $scope.marker = {
        id: 0,
        coords: {
          latitude: 40.0905899,
          longitude: -83.1304559
        },
        options: {
          draggable: false
        },
        events: {
          click: function(e){
            $scope.cityName = e.city;
            $scope.windowOptions.visible = !$scope.windowOptions.visible;
          }
        }

      };

      $scope.centerMap = function centerMap(city){
        console.log(city);
        $scope.cityName = city.city;
        $scope.map = {
          center: {
            latitude: city.loc[1],
            longitude: city.loc[0]
          },
          zoom: 12
        };

        $scope.marker = {
          id: city.zip,
          coords: {
            latitude: city.loc[1],
            longitude: city.loc[0]
          },
          options: { draggable: false },
          events: {
            click: function(e){
              $scope.cityName = e.city;
              $scope.windowOptions.visible = !$scope.windowOptions.visible;
            }
          }
        }
      };

      $scope.windowOptions = {
        visible: false
      };

      $scope.closeMarkerWindow = function closeMarkerWindow() {
        $scope.windowOptions.visible = false;
      };

        //$scope.table = {
        //    options: {
        //        order: "-pop",
        //        columns: {
        //            "city": "string",
        //            "pop": "int",
        //            "loc": "string",
        //            "zip": "string"
        //        },
        //        thead: {
        //            rename: {
        //                "city": "City",
        //                "pop": "Population",
        //                "loc": "Loc.",
        //                "zip": "Zip Code"
        //            }
        //        },
        //        pagination: {
        //            itemsPerPage: 15,
        //            nextText: 'Next',
        //            previousText: 'Prev'
        //        }
        //    },
        //    data: [
        //
        //    ]
        //};

      evoAPI.callFunction('getStates', { state: $location.hash() })
          .then(function(res){
              angular.forEach(res.result, function(v, k){
                $scope.list.push({ name: v.state });
                $scope.states.push({ name: v.state, cities: v.cities });
              });
          });

      $scope.getState = function getState(e){
        evoAPI.callFunction('getStates', { state: e.name })
            .then(function(res){
              angular.forEach(res.result, function(v, k){
                $scope.states = [{ name: v.state, cities: v.cities }];
              });
            });
      };

 	});
