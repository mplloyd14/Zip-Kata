evo.module("demo", [
    "ngCookies",
    "ngRoute",
    "evo",
    "demo.controllers"])
    .config([
        "$routeProvider",
        function (r) {
            r.when("/", {
                controller: "MainCntrl",
                templateUrl: "hello"
            });
            r.when("/table", {
                controller: "TableCntrl",
                templateUrl: "table"
            });
            r.otherwise({
                redirectTo: "/"
            });
            // $locationProvider.html5Mode(true);
        }
    ])
    .run([
        "$log",
        function (log) {
            log.info("Demo running.");
        }
    ]);
