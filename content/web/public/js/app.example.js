

evo.module("peApp.controllers", ["evo.common.directives"])
    .controller("MainCtrl", [
        "$scope",
        "evoAPI",
        function (scope, api) {
            scope.message = "This is an example.";
            scope.table = {
                options: {
                    columns: {
                      "rk": "uint",
                      "player": "string",
                      "pos": {
                          type: "string",
                          fmt: "uppercase"
                      },
                      "team": {
                          type: "string",
                          fmt: "uppercase"
                      },
                      "avg": {
                          type: "float",
                          fmt: { precision: 3 }
                      }
                  },
                  pagination: {
                    itemsPerPage: 2,
                    maxSize: 4
                  }
                },
                data: [
                    {  rk: 1, player: "me", team: "myself", avg: 1 },
                    {  rk: 1, player: "me", team: "myself", avg: 1 },
                    {  rk: 1, player: "me", team: "myself", avg: 1 },
                    {  rk: 1, player: "me", team: "myself", avg: 1 },
                    {  rk: 1, player: "me", team: "myself", avg: 1 },
                    {  rk: 1, player: "me", team: "myself", avg: 1 },
                    {  rk: 1, player: "me", team: "myself", avg: 1 },
                    {  rk: 1, player: "me", team: "myself", avg: 1 },
                    {  rk: 1, player: "me", team: "myself", avg: 1 },
                    {  rk: 1, player: "me", team: "myself", avg: 1 },
                    {  rk: 1, player: "me", team: "myself", avg: 1 },
                    {  rk: 1, player: "me", team: "myself", avg: 1 },
                    {  rk: 1, player: "me", team: "myself", avg: 1 }
                ]
            };

            try {
                api.callFunction("dataAccess", {}).then(function () {}, function () {});
            } catch (err) {
                console.log(err);
                console.log("Call does not exist.")
            }

        }
    ]);

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

            // locationProvider.html5Mode(true)
        }
    ])
    .run([
        function () {
            console.log("Running application.");
        }
    ]);
    
    
/* the markup */
/* 
script#hello(type='text/ng-template')
    h2#hellomsg {{message}}
    evo-table(ng-model="table.data", data-options="table.options")
*/

