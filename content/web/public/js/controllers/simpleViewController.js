cai.module('peControllers')
	.controller('SimpleViewController', ["$scope", "user", function($scope, user) {
    	$scope.input0 = 'Input 0';
    	$scope.input1 = 'Input 1';
    	$scope.input2 = 'Input 2';
    	$scope.input3 = 'Input 3';
        $scope.role = user.data.product.roles[0];
    }]);