evo.module("demo", [
    "ngCookies",
    "ngRoute",
    "evo",
    "evo.common",
    "demo.controllers"])
    .config([
        "$routeProvider",
        "$locationProvider",
        function (route, location) {
            route.when("/", {
                controller: "MainCntrl",
                templateUrl: "hello"
            });
            route.when("/table", {
                controller: "TableCntrl",
                templateUrl: "table"
            });
            route.otherwise({
                redirectTo: "/"
            });
            location.html5Mode(true);
        }
    ])
    .run([
        "$rootScope",
        "$route",
        function (root, route) {
            (root.routes = []).__proto__.forEach.call(Object.keys(route.routes), function (r) {  if (r !== "null" && /^(\/|\/\w+)$/.test(r)) root.routes.push(r)  });
            root.$on("$routeChangeSuccess", function (e, current) {
                try { root.currentRoute = current.$$route.originalPath } catch (e) { /* pass */ };
            });
        }
    ]);
