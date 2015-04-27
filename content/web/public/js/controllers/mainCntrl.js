evo.module("demo.controllers", [])
	.controller("MainCntrl", [
        "$scope",
        function (scope) {
            "use strict";
            scope.message = "Hello world!";
        }
    ]);



