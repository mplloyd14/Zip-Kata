//var module = angular.module('adminApp.controllers.users.custom',['projEvo.services.companies']);

//module.controller('commerceSettingsCtrl', ['$scope', '$location', '$log', '$http', '$routeParams', 'users', 'localize', 'config', 'user','companies',
//function ($scope, $location, $log, $http, $routeParams, users, localize, config,  user, companies) {
function customadmindemoSettingsCtrl ($scope, $log, i18n) {
    $log.debug('Created custom admin user controller');

    i18n.ensureLocaleIsLoaded().then( function() {
        // Chaining on the promise returned from ensureLocaleIsLoaded() will make sure the translation is loaded.
        $scope.localMsg = i18n.__('txtLocalMsg');
    });

    //the permissions will be set for the controller to use
    $scope.$on('getUser', function() {
        //set the permissions from the parent scope;
        $log.info('setting local scopes for settings');

    });

    $scope.$on('editUser', function(){
        $log.debug('here as an edit');

    });
}
//}]);



