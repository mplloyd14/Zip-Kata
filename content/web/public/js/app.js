'use strict';

// Declare app level module which depends on filters, and services
evo.module('peApp', [
      'evo',
      'evo.common',
      'peControllers',
      'ngCookies',
      'ngRoute',
      'uiGmapgoogle-maps',
      'peDirectives',
      'ngAnimate',
      'i18n'
    ]).
  config([
      '$routeProvider',
      '$locationProvider',
      'uiGmapGoogleMapApiProvider',

      function($routeProvider, $locationProvider, GoogleMapApiProvider, evoAPI) {

        $routeProvider.
          when('/', {
              templateUrl: 'hello',
              controller: 'MainController',
              breadcrumb: {
                label: 'Home'
              }
          })
          .when('/states', {
              templateUrl: 'statesTable',
            controller: 'StatesController',
              breadcrumb: {
                label: 'States'
              }
          });
          $locationProvider.html5Mode(true);

          GoogleMapApiProvider.configure({
            key: 'AIzaSyCQoZIY2lj-j013e3GdfCAmohlPyn69mK4',
            v: '3.20',
            libraries: 'weather,visualization'
          });
      }])
      .run([
          "$rootScope",
          "$route",
          "$location",
          "$log",
          "evoAPI",
          "evoUser",
          function (root, route, location, log, evoAPI, evoUser) {
            angular.element(document).on("click", function(e) {
          		root.$broadcast("documentClicked", angular.element(e.target));
          	});
              root.user = evoUser;
              root.isOpen = false;
              evoAPI.callFunction('getCompany', evoUser.context.company)
                  .then(function (data) {
                    root.companyName = data.result.description;
                  });
              if (document.documentMode === 9) {
                  log.info("If Monday was a browser, it would be Internet Explorer.");
              }

              root.routes = [];
              angular.forEach(Object.keys(route.routes), function (r) { if (r !== "null" && /^(\/|\/\w+)$/.test(r)) root.routes.push(r) });

              root.$on("$routeChangeSuccess", function (e, current, previous) {
                  try { root.currentRoute = current.$$route.originalPath } catch (e) { /* pass */ };
              });
          }
      ]);
