// Desktop version
cai.module('cai.commerce.controllers')
    .controller('NavigationDirectiveController', function ($scope, $rootScope, $location, $route, $log, user, core) {
        $scope.logoutUrl = core.logoutUrl;
        $scope.adminUrl = core.adminUrl;
        $scope.changeUrl = core.changeUrl;

        function extract_routes(object) {
            var routes = [], i = 0;

            for (var key in object) {
                if (object[key].exposed)
                    routes[i++] = angular.extend(object[key], { path: key });
            }

            return routes;
        }

        $scope.btnClick = function(path){
            $location.path(path);

        };
        //$scope.username = "Guest";
        $scope.userName = user.data.userName;
        $scope.isPresenter = user.data.canSetNotification;
        $scope.presenterName = user.data.canSetNotification ? 'PRESENTER' : '';

        $scope.routes = extract_routes($route.routes);
        //$scope.message = "Hello, " + ( || "Guest");

        $scope.go_back = function (e) {
            e.preventDefault();
            history.back();
        };

        $scope.disabled = true;
        $scope.logoutUrl = core.logoutUrl;

        $scope.$watch(function() {
            return $location.path();
        }, function() {
            $scope.disabled = !$rootScope.storage.get('customer');
        });

        $scope.$on("$routeChangeSuccess", function (e, current, previous) {
            if (current.originalPath == "/mobile" || current.originalPath == "/mobile/orders")
                $scope.isBackVisible = false;
            else
                $scope.isBackVisible = true;
        });
    });