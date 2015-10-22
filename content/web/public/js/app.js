
evo.module("peApp", [
    "evo",
    "ngCookies",
    "ngRoute",
    "peApp.controllers"])
    .config([
        "$routeProvider",
        "$locationProvider",
        function (routeProvider, locationProvider) {
            routeProvider
                .when("/", {
                    templateUrl: "hello",
                    controller: "MainCtrl"
                });

            locationProvider.html5Mode('/');
        }
    ])
    .run([
        function () {
            console.log("Running application.");
        }
    ]);
