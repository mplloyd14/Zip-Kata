evo.module("peseed.controllers", [])
  .controller("MainCtrl", [
    "$scope",
    function (scope) {
      scope.message = "Hello world!";
      scope.items   = [
        "house",
        "mouse",
        "cat",
        "hat",
        "command alkon",
        "toys"
      ];
    }
  ]);