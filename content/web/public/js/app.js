cai.module("peApp", [
    "ngCookies",
    "ngRoute",
    "cai.services",
    "lux.directives",
    "peControllers"])
    .config([
        "$routeProvider",
        "$locationProvider",
        function (routeProvider, locationProvider) {
            routeProvider.
                when("/", {
                    controller: "MainCtrl",
                    templateUrl: "hello"
                }).
                when("/about", {
                    controller: "AboutCtrl",
                    templateUrl: "about"
                }).
                when("/table", {
                    controller: "LuxTableCtrl",
                    templateUrl: "lux-table"
                }).
                otherwise({
                    redirectTo: "/"
                });
            locationProvider.html5Mode(true);
        }
    ])
    .run([
        "$rootScope",
        "$route",
        function (root, route) {
            (root.routes = []).__proto__.forEach.call(Object.keys(route.routes), function (r) {  if (/^(\/|\/\w+)$/.test(r)) root.routes.push(r) });

            root.$on("$routeChangeSuccess", function (e, current) {
                try { root.currentRoute = current.$$route.originalPath } catch (e) { };
            });
        }
    ]);
