'use strict';

/* Directives */


angular.module('ZapisyDirectives', [])
  .directive('edPrzedmioty', [ 'CalendarService', function(services) {
    return {
    	restrict: 'EA',
      scope: {
        przedmioty: '=',
        plan: '=',
        isPlan: '='
      },
      replace:true,
      link: function(scope, ele, attrs){
        scope.services = services;
        scope.$watch('isPlan', function(val){
          if (val){
            scope.inPlan = {display: 'block'};
            scope.inTermin = {display: 'none'};
          } else {
            scope.inPlan = {display: 'none'};
            scope.inTermin = {display: 'block'};
          }
        });
      },
      templateUrl: 'partials/ed-przedmioty.html'
    };
  }])
  .directive('edMockup', [ 'CalendarService', function(services) {
    return {
      restrict: 'EA',
      scope: {
        plan: '=',
        isPlan: '='
      },
      replace:true,
      link: function(scope, ele, attrs){
        scope.services = services;
        scope.$watch('isPlan', function(val){
          if (val){
            scope.inTermin = {display: 'none'};
          } else {
            scope.inTermin = {display: 'block'};
          }
        });
        
      },
      templateUrl: 'partials/ed-mockup.html'
    };
  }]);
