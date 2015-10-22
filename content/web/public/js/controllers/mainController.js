
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
            scope.response = {};

            var ticket = {
              "ticketNumber": "123456",
              "entityData": [
                {
                  "name": "ticket",
                  "year": "2016"
                }
              ]
            };

            console.debug("[MainCtrl]:submitEDXTicket");
            api.callFunction("submitEDXTicket", ticket).then(function (d) {
              scope.response = d;
            },
            function (err) {
              console.error("[MainCtrl]:submitEDXTicket:" + err.errorMsg);
            });
        }
    ]);
