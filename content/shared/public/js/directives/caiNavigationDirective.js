cai.module('cai.commerce.directives')
    .directive('caiNavigationDesktop', function () {
        return {
            restrict: 'EAC',
            scope: {
                username: "=ngModel",
                logo: "@logo"
            },
            templateUrl: 'caiCommerceNavigation',
            controller: 'NavigationDirectiveController'
        };
    })
    .directive('activeLink', ['$rootScope', '$location', '$log', function($rootScope, $location, $log) {
    return {
        restrict: 'A',
        link: function($scope, $element, $attrs) {
            var activeClass = $attrs.activeLink;
            var path = $attrs.href;

            function startsWith(str, fragment) {
                console.log('str = ' + str);
                console.log('fragment = ' + fragment);
                if (fragment && fragment.length > 0 && fragment.length < str.length) {
                        return str.slice(0, fragment.length) == fragment;

                }
                return str == fragment;
            }

            $scope.$watch(function() {
                return $location.path();
            }, function(newPath) {
                if (startsWith(newPath, path)) {
                    console.log('add class active');
                    console.log('add class active');
                    console.log('add class active');
                    $element.addClass(activeClass);
                } else {
                    console.log('no add active');
                    console.log('no add active');
                    console.log('no add active');
                    $element.removeClass(activeClass);
                }
            });
        }
    };
}]);