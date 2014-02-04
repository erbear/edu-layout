'use strict';

/* Services */


angular.module('ZapisyServices', []).
  service('CalendarService', [function(){
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
        if(rodzaj == "1"){
            return 'type1';
        }else{
            if(rodzaj == "2"){
                return 'type2';
            } else {
                if (rodzaj == "3"){
                    return 'type3';
                }else {
                    if (rodzaj == "4"){
                        return 'type4';
                    }else {
                        if (rodzaj == "5"){
                            return 'type5';
                        }
                    }
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
    
    //szuka w planie obiektu o podanej nazwie, zwraca miejsce w tablicy gdzie 
    //jest znaleziony obiekt
    this.findInPlan = function(plan, lecture_id){// plan i id
    	var tmp = {dzien: -1, id: -1};//nie ma zadnego dnia ani terminu w planie
        Object.getOwnPropertyNames(plan).forEach(function(val) {//zwracam nazwy pol z obiektow
            for(var i = 0; i<plan[val].length; i++){//petla po tablicy z kazdego pola
                if (plan[val][i].lecture_id == lecture_id) {//jezeli id zajecia w terminu planu odpowiada szukanemu
                    //to daje to do zmiennej ktora zwroce
                    tmp.dzien = val;
                    tmp.id = i;
                }
            }
        });
    	return tmp;
    }
    this.customizeJSON = function(data){
        var copy = new Array();
        data.forEach(function(lecture){//po przedmiotach
            var tmp = new Array();
            lecture.teachers = new Array();
            lecture.terms.forEach(function(term){//po terminach
                if (tmp.indexOf(term.teacher_id) == -1){//sprawdza czy ten prowadzacy byl juz w tej petli 
                    tmp.push(term.teacher_id);
                    lecture.teachers[tmp.indexOf(term.teacher_id)] = {};//jak nie to tworzy nowy obiekt z dniami tygodnia
                    lecture.teachers[tmp.indexOf(term.teacher_id)].nazwa = term.teacher.name;
                    lecture.teachers[tmp.indexOf(term.teacher_id)].cz = new Array();
                    lecture.teachers[tmp.indexOf(term.teacher_id)].pt = new Array();
                    lecture.teachers[tmp.indexOf(term.teacher_id)].pn = new Array();
                    lecture.teachers[tmp.indexOf(term.teacher_id)].sr = new Array();
                    lecture.teachers[tmp.indexOf(term.teacher_id)].wt = new Array();
                }
                //kazde zajecie wkladam w odpowiedni dzien
                if(term.day_id == 1){
                    lecture.teachers[tmp.indexOf(term.teacher_id)].cz.push(term);
                } else {
                    if (term.day_id == 2) {
                        lecture.teachers[tmp.indexOf(term.teacher_id)].pt.push(term);
                    } else {
                        if (term.day_id == 3) {
                            lecture.teachers[tmp.indexOf(term.teacher_id)].pn.push(term);
                        } else {
                            if (term.day_id == 4) {
                                lecture.teachers[tmp.indexOf(term.teacher_id)].sr.push(term);
                            } else {
                                if (term.day_id == 5) {
                                    lecture.teachers[tmp.indexOf(term.teacher_id)].wt.push(term);
                                } 
                            }
                        }
                    }
                }
            }); 
            //usuwam nie potrzebny obiekt
            delete lecture.terms;
            //wkladam do tablicy zajec
            copy.push(lecture);
        });
        return copy;
    }
    //dodaje termin do planu
    this.addLecture = function(plan, lecture){

        var tmp = this.findInPlan(plan, lecture.lecture_id);//szuka terminu w planie

        if(tmp.dzien != -1){//jezeli znajdzie termin w planie
            if(plan[tmp.dzien][tmp.id].id == lecture.id){//sprawdza czy id terminu w planie zgadza sie z szukanym terminem
                plan[tmp.dzien].remove(tmp.id);//usuwa termin z planu
                lecture.active = false;//mowi terminowi ze nie ma go juz w planie
            } 
        }else {//jezeli nie ma terminu w planie
            plan[lecture.day_id].push(lecture);//dodaje termin do planu na wyznaczone miejsce
            lecture.active = true;//mowi terminowi ze znajduje sie w planie
        }
    }
  }]);
