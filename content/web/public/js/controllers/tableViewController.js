cai.module('peControllers')
	.controller('TableViewController', ["$scope", function($scope) {
    	$scope.items = [
        	{
            	all: 'A',
            	a: '1',
                b: 1,
                c: 'one'
            },
        	{
            	all: 'B',
            	a: '2',
                b: 2,
                c: 'two'
            },
        	{
            	all: 'C',
            	a: '3',
                b: 3,
                c: 'three'
            }
        ];
    }]);