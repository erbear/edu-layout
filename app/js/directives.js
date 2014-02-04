'use strict';

/* Directives */


angular.module('ZapisyDirectives', []).
  directive('edPrzedmioty', [ 'CalendarService', function(services) {
    return {
    	restrict: 'EA',
      scope: {
        przedmioty: '=',
        plan: '=',
        typ: '='
      },
      replace:true,
      link: function(scope, ele, attrs){
        scope.services = services;
      },
      templateUrl: 'partials/ed-przedmioty.html'
    };
  }]);
