'use strict';

/* Controllers */
evo.module('peControllers', ['evo'])
	.controller('MainController', function($rootScope, $scope, $log, evoAPI, evoUser, evoTemplates) {
        $scope.jobOptions = {
            columns: {
                "company": "string",
                "salary": "currency",
                "start_date": "date",
                "title": "string",
                "apply": {
                    type: "button",
                    icon: ["fa", "fa-send-o"],
                    width: "60px",
                    textAlign: "center",
                    class: "btn-default",
                    onclick: function (e, item, column, index) {
                        console.log("applying", e, item, index);
                    }
                }
            }
        };

        $rootScope.$on("urlReceived", function (event, message) {
            console.log("Event urlReceived fired with : " + message);
        });
        $rootScope.$on("pathBegReceived", function (event, message) {
            console.log("Event pathBegReceived fired with : " + message);
        });
        $rootScope.$on("broadcastReceived", function (event, message) {
            console.log("Event broadcastReceived fired with : " + message);
        });

        $scope.getUsers = function getUsers(){
            //evoAPI.callFunction('getUsers', {})
            //    .then(function(res){
            //        console.log(res.result);
            //    });
        };

        $scope.getCompanies = function getCompanies(){
            evoAPI.callFunction('getCompanies', {})
                .then(function(res){
                    console.log(res.result);
                });
        };

        $scope.getCompany = function getCompany(e){
            evoAPI.callFunction('getCompany', e.context.company)
                .then(function(res){
                    console.log(res);
                });
        };

        $scope.createUrlRoom = function(){
            evoAPI.callFunction('createUrlRoom',{}).then(function(message){
                console.log("Result of createUrlRoom is " + message.result);
            });
        };
        $scope.createPathBegRoom = function(){
            evoAPI.callFunction('createPathBegRoom',{id:7}).then(function(message){
                console.log("Result of createPathBegRoom is " + message.result);
            });
        };
        $scope.createVendorRoom = function(){
            evoAPI.callFunction('createVendorRoom',{id:7,vendor:"abc"}).then(function(message){
                console.log("Result of createVendorRoom is " + message.result);
            });
        };

        $scope.getJobs = function getJobs(){
            evoAPI.callFunction('getJobs', {})
                .then(function(message){
                    $scope.jobs = {
                        options: $scope.jobOptions,
                        data: message.result
                    }
                });
        }

      $scope.toggleAbout = function toggleAbout(){
        $rootScope.isOpen = !$rootScope.isOpen;
        console.log($rootScope.isOpen);
      }
 	});



