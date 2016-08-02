'use strict';

/* Controllers */
evo.module('peControllers', ['evo'])
	.controller('MainController', ['$rootScope', '$scope', '$log', '$location', 'evoAPI', 'ZipService' , function($rootScope, $scope, $log, $location, evoAPI, ZipService) {
		$log.log('Loading web main controller');
		$scope.listen = ZipService.listen();
		$rootScope.$on('fetched', function () {
			$scope.table.data = undefined;
			$scope.table.data = ZipService.data;
		});

		$scope.table = {
			options: {
				columns: {
					'_id': 'string',
					'city': 'string',
					'loc': 'string',
					'pop': 'string',
					'state': 'string',
					'edit': {
						type: 'button',
						icon: 'fa fa-pencil-square-o',
						width: '50px',
						textAlign: 'center',
						onclick: function (e, item, column, index) {
							//Get the item info
							var id = $scope.table.data[index]._id;
							$location.path('/edit/' + id);
						}

					}
				},
				toolbar: {
					search: {
						by: true,
						//exclude: ['edit'],
						placeholder: 'Search'
					}
				},
				pagination: {
					itemsPerPage: 10,
					maxSize: 5,
					nextText: 'Next',
					previousText: 'Previous'
				}
			},
			data: []
		};

		$scope.table.data = ZipService.data;
	}]);

