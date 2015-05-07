evo.module("demo.controllers", [])
    .controller("TableCntrl", [
        "$scope",
        "evoAbout",
        function (scope, about) {
            "use strict";
            scope.table = {
                options: {
                    height: "135px",
                    columns: {
                        "rk": "uint",
                        "player": {
                            type: "string",
                            fmt: "title"
                        },
                        "pos": {
                            type: "string",
                            fmt: "uppercase"
                        },
                        "team": {
                            type: "string",
                            fmt: "uppercase"
                        },
                        "avg": "string"
                    },
                    toolbar: {
                        search: {
                            by: "*"
                        },
                        buttons: [
                            {
                                text: "Add Player",
                                onclick: function () {
                                    scope.table.data.push({
                                        "rk": 20,
                                        "player": "john santiago",
                                        "team": "nca",
                                        "pos": "c",
                                        "avg": ".280"
                                    });
                                    console.log("added a player!");
                                }
                            },
                            {
                                text: "Say Hello",
                                class: "btn-warning",
                                onclick: function () {
                                    alert("hello world!");
                                }
                            }
                        ]
                    },
                    pagination: {
                        itemsPerPage: 4
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
                        "pos": "rf",
                        "team": "nym",
                        "avg": ".222"
                    }
                ]
            };
        }
    ]);
