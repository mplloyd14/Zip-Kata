evo.module("demo.controllers", [])
    .controller("TableCntrl", [
        "$scope",
        function (scope) {
            "use strict";
            scope.table = {
                options: {
                    height: "120px",
                    columns: {
                        "rk": "uint",
                        "player": {
                            type: "string",
                            fmt: "title"
                        },
                        "team": {
                            type: "string",
                            fmt: "uppercase"
                        },
                        "pos": {
                            type: "string",
                            fmt: "uppercase"
                        },
                        "avg": "string"
                    },
                    thead: {
                        rename: {
                            "rk": "rank",
                            "pos": "position",
                            "avg": "average"
                        }
                    }
                },
                data: [
                    {
                        "rk": 1,
                        "player": "chris young",
                        "team": "nyy",
                        "pos": "lf",
                        "avg": ".320"
                    },
                    {
                        "rk": 6,
                        "player": "mark teixeira",
                        "team": "nyy",
                        "pos": "1b",
                        "avg": ".242"
                    },
                    {
                        "rk": 5,
                        "player": "alex rodriguez",
                        "team": "nyy",
                        "pos": "3b",
                        "avg": ".267"
                    },
                    {
                        "rk": 13,
                        "player": "carlos beltran",
                        "pos": "rf",
                        "team": "nyy",
                        "avg": ".161"
                    },
                    {
                        "rk": 9,
                        "player": "curtis granderson",
                        "team": "nym",
                        "avg": ".222"
                    }
                ]
            };
        }
    ]);
