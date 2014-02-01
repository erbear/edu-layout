'use strict';

/* Services */


angular.module('ZapisyServices', []).
  service('CalendarService', [function(){
  	//funkcje filtrujace zajecia wg dni
  	this.pn = function(zajecie){
        return zajecie.dzien == "Pn";
    }
    this.wt = function(zajecie){
        return zajecie.dzien == "Wt";
    }
    this.sr = function(zajecie){
        return zajecie.dzien == "Sr";
    }
    this.czw = function(zajecie){
        return zajecie.dzien == "Czw";
    }
    this.pt = function(zajecie){
        return zajecie.dzien == "Pt";
    }
    //wysokosc cegielki zalezaca od dlugosci trwania
    this.height = function(start, koniec){
        var godzinaStart = new Date('2014/01/03 ' + start);
        var godzinaKoniec = new Date('2014/01/03 ' + koniec);
        var diff = godzinaKoniec.getTime() - godzinaStart.getTime();
        var minutes =Math.round(diff / 60000);
        //console.log(minutes * 0.11111111);
        return minutes * 0.1111111;
    }
    //odleglosc od gornej krawedzi czyli od godz 7:30
    this.top = function(start){
        var godzinaZero = new Date('2014/01/03 ' + start);
        var godzinaRozpoczecia = new Date('2014/01/03 7:30');
        var diff = godzinaZero.getTime() - godzinaRozpoczecia.getTime();
        var minutes =Math.round(diff / 60000);
        //console.log(minutes * 0.111111111 + 10);
        return minutes * 0.11111111 + 10;
    }
    //typ cegielki z zajeciami (wyklad, labolatoria itd.)
    this.type = function(rodzaj){
        if(rodzaj == "W"){
            return 'type1';
        }else{
            if(rodzaj == "L"){
                return 'type2';
            } else {
                if (rodzaj == "Ćwiczenia"){
                    return 'type3';
                }
            }
        }
    }
    //sprawdza czy dany termin zostal dodany to planu i zwraca klase
    this.isChosen = function(active, rodzaj){
    	if (active == true){
    		return this.type(rodzaj);
    	}else return 'type6';
    }
    //spradza czy w terminach jest termin ktory jest dodany do planu
    this.isDone = function(terminy){
    	var isCompleted = false;
    	terminy.forEach(function(termin){
    		if (termin.active == true){
    			isCompleted = true;
    		}
    	});
    	return isCompleted;
    }
    //szuka w planie obiektu o podanej nazwie, zwraca miejsce w tablicy gdzie 
    //jest znaleziony obiekt
    this.findInPlan = function(plan, nazwa){
    	var id = -1;
    	for (var i = 0; i<plan.length; i++){
    		if (plan[i].nazwa === nazwa){
    			id = i;
    		}
    	}
    	return id;
    }
    //usuwa z tablicy obiekt na podanej pozycji
    Array.prototype.remove = function(from, to) {
	  var rest = this.slice((to || from) + 1 || this.length);
	  this.length = from < 0 ? this.length + from : from;
	  return this.push.apply(this, rest);
	};
	//usuwa z planu podany termin
	this.deleteFromPlan = function(plan, termin){
		plan.remove(this.findInPlan(plan,termin.nazwa));
		termin.active = false;
	}
  }]);
