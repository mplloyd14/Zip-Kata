evo.module("demo.controllers", [])
    .controller("TableCntrl", [
        "$scope",
        "$log",
        function (scope, log) {
            "use strict";
            scope.table = {
                options: {
                    height: "135px",
                    order: "+rk",
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
                        "avg": {
                            type: "float",
                            fmt: { precision: 3 }
                        },
                        "edit": {
                            type: "button",
                            icon: "fa fa-pencil-square-o",
                            width: "50px",
                            textAlign: "center",
                            text: "txtEdit",
                            onclick: function (e, item, column, index) {
                                console.log("edit row", index);
                            }
                        },
                        "delete": {
                            type: "button",
                            icon: ["fa", "fa-trash"],
                            width: "60px",
                            textAlign: "center",
                            class: "btn-danger",
                            onclick: function (e, item, column, index) {
                                console.log("delete row", index);
                            }
                        }
                    },
                    toolbar: {
                        search: {
                            by: true,
                            exclude: ["edit", "delete"]
                        },
                        buttons: [
                            {
                                text: "txtAddPlayer",
                                onclick: function () {
                                    scope.table.data.push({
                                        "rk": 20,
                                        "player": "john santiago",
                                        "team": "nca",
                                        "pos": "c",
                                        "avg": ".280"
                                    });
                                    log.info("added a player!");
                                }
                            },
                            {
                                text: "txtVer",
                                onclick: function () {
                                    alert("Message!");
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
