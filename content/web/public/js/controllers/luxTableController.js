cai.module("peControllers")
    .controller("LuxTableCtrl", [
        "$scope",
        function (scope) {
            "use strict";
            scope.table = {
                options:{
                    columns: {
                        "field5": {
                            type: "link",
                            onclick: function (e, val, key, i) {
                                console.log(val, key, i);
                            }
                        },
                        "field1": "int",
                        "field2": "float",
                        "field4": {
                            type: "float"
                        },
                        "field3": {
                            type: "button",
                            text: "delete",
                            class: "btn-success",
                            onclick: function (e, val, key, i) {
                                console.log(val, key, i);
                            }
                        }
                    },
                    thead: {
                        rename: {
                            "field5": "mystery link"
                        },
                        onclick: function (e, key, i) {
                            console.log(key);
                        }
                    },
                    tbody: {
                        height: "100px"
                    }
                },
                data: [
                    {
                        "field1": 12.5,
                        "field2": 22.4,
                        "field3": "Steven Hawkins",
                        "field4": 1.23e-7,
                        "field5": "Recycle"
                    },
                    {
                        "field1": 100.50,
                        "field2": 10.24,
                        "field3": "Jason Bourne",
                        "field4": 300.10,
                        "field5": "Killer"
                    },
                    {
                        "field1": 300,
                        "field2": 5.00,
                        "field3": "Luke Skywalker",
                        "field4": 666.66,
                        "field5": "Yoda"
                    }
                ]
            };
        }
    ]);
