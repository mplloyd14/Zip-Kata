'use strict';

/* Controllers */
angular.module('peControllers', ['evo'])
	.controller('MainController', function($scope, $log, $http, $state) {
		$log.log('Loading mobile main controller');
		//$scope.message = 'Hello Mobile world';
		$scope.data = {};



		$scope.login = function() {
			console.log('Login');
			console.log('User: ' + $scope.data.username);
			console.log('Company' + $scope.data.company);

			delete $http.defaults.headers.common['X-Requested-With'];

			$http.post('//' + $scope.data.company + '.localhost:3000/login', {userName: $scope.data.username, password: $scope.data.password, product: 'ion'})
				.success(function(data, status, headers, config) {
					console.log('Success');
					//var newLocation = '/';
					//if (data && data.baseUrl) {
					//	newLocation = data.baseUrl;
					//	if (data.route) {
					//		newLocation += data.route;
					//	}
					//}
					//$window.location.href = newLocation;
				})
				.error(function(data, status, headers, config) {
					console.log('Not today');
					console.log(data.error);
					switch(data.error) {
						case 'locked':
							//$scope.errorMessage = i18n.__('errLoginLocked');
							break;
						default:
							//$scope.errorMessage = i18n.__('errLoginUser');
							break;
					}
				});

			//$state.go('tabs');

		};

	});

