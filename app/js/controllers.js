'use strict';

/* Controllers */

angular.module('ZapisyControllers', [])
  .controller('MainController', ['$scope', '$http','CalendarService', function($scope, $http, CalendarService) {
  	$http.get('data/edu.json').success(function(data){
      var newData = CalendarService.customizeJSON(data);
      $scope.dane = newData;
      $scope.nauczyciele = newData[5].teachers
  		$scope.przedmioty = newData[0].teachers[0];
  	});
  	$scope.plan = [];
  	$scope.services = CalendarService;
  	$scope.changeSubject = function(data){
      $scope.nauczyciele = data.teachers
      $scope.przedmioty = data.teachers[0];
  	}
    $scope.changeTeacher = function(nauczyciel){
      $scope.przedmioty = nauczyciel;
    }
    //usuwa z tablicy obiekt na podanej pozycji
    Array.prototype.remove = function(from, to) {
      var rest = this.slice((to || from) + 1 || this.length);
      this.length = from < 0 ? this.length + from : from;
      return this.push.apply(this, rest);
    };
  	$scope.addLecture = function(isOnCal, lecture){
      if (isOnCal == -1){  
        $scope.plan.push(lecture);
        lecture.active = true;
      } else {
        $scope.plan.remove(CalendarService.findInPlan($scope.plan,lecture.nazwa));
        lecture.active = false;
      }
      console.log($scope.plan);
  	}
    
    $scope.deleteFromPlan = function(termin){
      $scope.plan.remove(CalendarService.findInPlan($scope.plan,termin.nazwa));
      termin.active = false;
      console.log($scope.plan);
    }
  }]);