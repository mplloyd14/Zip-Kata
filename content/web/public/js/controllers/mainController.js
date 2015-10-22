
evo.module("peApp.controllers", ["evo.common.directives"])
    .controller("MainCtrl", [
        "$scope",
        "evoAPI",
        function (scope, api) {
            scope.message = "Table example for the nth time.";
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
                    {  rk: 1, player: "Jason Bourne", team: "myself", avg: 1 },
                    {  rk: 1, player: "Steven", team: "myself", avg: 1 },
                    {  rk: 1, player: "Luke Skywalker", team: "myself", avg: 1 },
                    {  rk: 1, player: "Joseph Santos", team: "myself", avg: 1 },
                    {  rk: 1, player: "Jimmy Kimble", team: "myself", avg: 1 },
                    {  rk: 1, player: "Jenny McCarthy", team: "myself", avg: 1 }
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
