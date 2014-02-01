'use strict';

/* Directives */


angular.module('ZapisyDirectives', []).
  directive('dragElement', [ function() {
    return {
    	restrict: 'EA',
      scope: {
        ownTerminy: '=',
        change: '=changeTerminy'
      },
    	link: function(scope, ele, attrs){
    		$(function() {
    			ele.draggable({
    				revert: "invalid",
    				start: function(event, ui){
  						scope.change(scope.ownTerminy);
              scope.$apply();
  					}
    			}).click(function(){
            scope.change(scope.ownTerminy);
            scope.$apply();
          });
    		});
    	}
    };
  }]).
  directive('dropElement', [function() {
  	return {
      scope: {
        ownTermin: '=',
        addToPlan: '='
      },
  		link: function(scope, ele, attrs){
  			$(function() {
  				ele.droppable({
  					accept: "#ed-sidebar ul li",
  					drop: function(event, ui){
  						scope.addToPlan(scope.ownTermin);
              scope.$apply();
              var el = angular.element(ui.draggable).get(0)
              el.style.top = 'auto';
              el.style.left = 'auto';
              $(el).draggable('disable').off('click');
  					}
  				});
  			});
  		}
  	}
  }]);
