cai.module('peControllers')
	.controller('SimpleViewController', ["$scope", "$log", "$location", "user", function($scope, $log, $location, user) {
        $log.info('Load Simple View Controller');
    	$scope.input0 = 'Input 0';
    	$scope.input1 = 'Input 1';
    	$scope.input2 = 'Input 2';
    	$scope.input3 = 'Input 3';
        $scope.role = user.data.product.roles[0];

        $scope.navigateRestricted = function() {
            $location.path('/roleA/restricted');
        }
    }]);