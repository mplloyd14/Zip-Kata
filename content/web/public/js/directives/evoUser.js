evo.module('peDirectives', ['evo'])

.directive('evoUser', function(evoAPI, evoUser, $rootScope){
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="evoUser" dropdown on-toggle="toggled(open)"><span dropdown-toggle id="user-dropdown">{{ evoUser.firstName }}</span>' +
              '<ul class="userDropdown dropdown-menu"  aria-labelledby="user-dropdown"><li>{{ evoUser.email }}</li><li>{{ evoUser.firstName }} {{ evoUser.lastName }}</li></ul></div>',
    link: function(scope, elem, attrs) {
      scope.evoUser = evoUser.data;
      scope.listVisible = false;
      elem.bind('click', function() {
    		scope.$apply(function() {
  				scope.showUserDropdown = scope.showUserDropdown ? scope.showUserDropdown = false : scope.showUserDropdown = true;
  			});
      });
      // $rootScope.$on("documentClicked", function(inner, target) {
			// 	console.log(target[0]);
			// // 	if (!$(target[0]).is(".dropdown-display.clicked") && !$(target[0]).parents(".dropdown-display.clicked").length > 0)
			// // 		scope.$apply(function() {
			// // 			scope.listVisible = false;
			// // 		});
			// });
    }
  };
});
