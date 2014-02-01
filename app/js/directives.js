'use strict';

/* Directives */


angular.module('ZapisyDirectives', []).
  directive('dragElement', [ function() {
    return {
    	restrict: 'EA',
      scope: {
        ownTerminy: '=',//terminy danego przedmiotu
        change: '=changeTerminy',//funkcja zmieniajaca zmienna przedmioty w widoku
        trigger: '=triggerDroppable'
      },
    	link: function(scope, ele, attrs){
        //obserwator czy w terminach aktywuje sie jakis termin
        scope.$watch('trigger', function(val){
          if (val){
            ele.draggable('disable');
          }else{
            ele.draggable('enable');
          }
        });
    		$(function() {
    			ele.draggable({
    				revert: "invalid",
    				start: function(event, ui){
  						scope.change(scope.ownTerminy);//pokazuja sie przedmioty
              scope.$apply();
  					}
    			}).click(function(){
            scope.change(scope.ownTerminy);//pokazuja sie przedmioty
            scope.$apply();
          });
    		});
    	}
    };
  }]).
  directive('dropElement', [function() {
  	return {
      scope: {
        ownTermin: '=',//termin danego kafelka
        addToPlan: '='//funkcja dodajaca termin do planu
      },
  		link: function(scope, ele, attrs){
  			$(function() {
  				ele.droppable({
  					accept: "#ed-sidebar ul li",
  					drop: function(event, ui){
  						scope.addToPlan(scope.ownTermin);//dodaje do plany
              scope.ownTermin.active = true;//ustawia termin jako aktywny
              scope.$apply();
              var el = angular.element(ui.draggable).get(0);
              //powrot elementu na swoje miejsce
              el.style.top = 'auto';
              el.style.left = 'auto';
              $(el).draggable('disable');//wylaczenie draggable
  					}
  				});
  			});
  		}
  	}
  }]);
