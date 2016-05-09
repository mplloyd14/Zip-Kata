'use strict';

/* Controllers */
angular.module('peControllers', ['evo'])
	.controller('MainController', ['$rootScope', '$scope', '$log', 'evoAPI', function($rootScope, $scope, $log, api) {
		$log.log('Loading web main controller');

    $scope.getCompanyUsers = function(){
      api.callFunction('companyUsers', {})
      .then(function(r){
        $scope.companyUsers = r.result;
        console.log(r);
      });
    };

    $scope.getAllUsers = function(){
      api.callFunction('allUsers', {})
      .then(function(r){
        $scope.allUsers = r.result;
        console.log(r);
      });
    }
		$scope.message = 'Hello world';
	}]);
