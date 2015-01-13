//var module = angular.module('adminApp.controllers.users.custom',['projEvo.services.companies']);

//module.controller('commerceSettingsCtrl', ['$scope', '$location', '$log', '$http', '$routeParams', 'users', 'localize', 'config', 'user','companies',
//function ($scope, $location, $log, $http, $routeParams, users, localize, config,  user, companies) {
function customadmindemoSettingsCtrl ($scope, $log) {
    $log.debug('Created custom admin user controller');

    //the permissions will be set for the controller to use
    $scope.$on('getUser', function() {
        //set the permissions from the parent scope;
        $log.info('setting local scopes for settings');

    });

    $scope.$on('editUser', function(){
        log.debug('here as an edit');

    });
}
//}]);



