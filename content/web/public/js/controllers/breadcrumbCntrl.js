evo.module("demo.controllers", [])
    .controller("BreadcrumbCntrl", [
        "$scope",
        function (scope) {
            "use strict";
            scope.message = "is enabled.";
        }
    ])
    .controller("BreadcrumbNumberCntrl", [
        "$scope",
        "evoCrumbs",
        function (scope, crumbs) {
            "use strict";
            scope.number = crumbs.params().number;
        }
    ]);
