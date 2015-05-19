evo.module("demo", [
    "ngCookies",
    "ngRoute",
    "evo",
    "evo.common",
    "demo.controllers"])
    .controller("NavCntrl", [
        "$scope",
        "evoAbout",
        function (scope, evoAbout) {
            scope.onclick = function (e, r) {
                if (r === "/about") {
                    e.preventDefault();
                    evoAbout.openModal();
                }
            }
        }
    ])
    .config([
        "$routeProvider",
        "$locationProvider",
        function (route, location) {
            route.when("/", {
                breadcrumb: {
                    label: "home"
                },
                controller: "MainCntrl",
                templateUrl: "hello"
            });
            route.when("/about", { });
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
        "$location",
        "$log",
        function (root, route, location, log) {
            if (document.documentMode === 9) {
                log.info("If Monday was a browser, it would be Internet Explorer.");
                root.routes = [];
                angular.forEach(Object.keys(route.routes), function (r) {
                    if (r !== "null" && /^(\/|\/\w+)$/.test(r)) root.routes.push(r)
                });
            } else {
                (root.routes = []).__proto__.forEach.call(Object.keys(route.routes), function (r) { if (r !== "null" && /^(\/|\/\w+)$/.test(r)) root.routes.push(r)  });
            }


            root.$on("$routeChangeSuccess", function (e, current, previous) {
                try { root.currentRoute = current.$$route.originalPath } catch (e) { /* pass */ };
            });
        }
    ]);
