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
                controller: "MainCntrl",
                templateUrl: "hello",
                breadcrumb: {
                    label: "home",
                    tooltip: {
                        text: "Main controller.",
                        placement: "bottom"
                    }
                }
            });
            route.when("/about", { });
            route.when("/table", {
                controller: "TableCntrl",
                templateUrl: "table",
                breadcrumb: {
                    tooltip: {
                        text: "Table controller.",
                        placement: "bottom"
                    }
                }
            });
            route.when("/breadcrumb", {
                controller: "BreadcrumbCntrl",
                templateUrl: "breadcrumb",
                breadcrumb: {
                    label: "crumbs",
                    tooltip: {
                        text: "Tooltips enabled!",
                        placement: "right"
                    }
                }
            });
            route.when("/breadcrumb/:number", {
                controller: "BreadcrumbNumberCntrl",
                template: "<div><b>Breadcrumb number: {{ number }}</b></div>"
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
            }

            root.routes = [];
            angular.forEach(Object.keys(route.routes), function (r) { if (r !== "null" && /^(\/|\/\w+)$/.test(r)) root.routes.push(r) });

            root.$on("$routeChangeSuccess", function (e, current, previous) {
                try { root.currentRoute = current.$$route.originalPath } catch (e) { /* pass */ };
            });
        }
    ]);
