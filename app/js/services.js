'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('ZapisyServices', []).
  service('CalendarService', [function(){
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
    this.height = function(start, koniec){
        var godzinaStart = new Date('2014/01/03 ' + start);
        var godzinaKoniec = new Date('2014/01/03 ' + koniec);
        var diff = godzinaKoniec.getTime() - godzinaStart.getTime();
        var minutes =Math.round(diff / 60000);
        //console.log(minutes * 0.11111111);
        return minutes * 0.1111111;
    }
    this.top = function(start){
        var godzinaZero = new Date('2014/01/03 ' + start);
        var godzinaRozpoczecia = new Date('2014/01/03 7:30');
        var diff = godzinaZero.getTime() - godzinaRozpoczecia.getTime();
        var minutes =Math.round(diff / 60000);
        //console.log(minutes * 0.111111111 + 10);
        return minutes * 0.11111111 + 10;
    }
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
  }]);
