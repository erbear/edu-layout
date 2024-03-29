'use strict';

/* Directives */


angular.module('ZapisyDirectives', [])
  .directive('edTerminy', [ 'CalendarService', function(services) {
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
        scope.isFull = function(przedmiot){
          if (przedmiot.space.taken >= przedmiot.space.all){
            return true;
            console.log(full);
          } else {
            return false;
          }
        }
        
      },
      templateUrl: 'partials/ed-terminy.html'
    };
  }])
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
      },
      templateUrl: 'partials/ed-mockup.html'
    };
  }]);
