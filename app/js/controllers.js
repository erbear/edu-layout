'use strict';

/* Controllers */

angular.module('ZapisyControllers', [])
  .controller('MainController', ['$scope', '$http','CalendarService', function($scope, $http, CalendarService) {
  	$http.get('data/przedmioty.json').success(function(data){
  		$scope.dane = data;
  		$scope.przedmiot = data[0];
  	});
  	$scope.plan = [];
  	$scope.services = CalendarService;
  	$scope.changeTerminy = function(data){
  		$scope.przedmiot = data;
  	}

  	$scope.addLecture = function(lecture){
  		$scope.plan.push(lecture);
  	}
  }]);