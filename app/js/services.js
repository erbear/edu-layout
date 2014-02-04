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
    this.findInPlan = function(plan, _id){
    	var id = -1;
    	for (var i = 0; i<plan.length; i++){
    		if (plan[i].lecture_id === _id){
    			id = i;
    		}
    	}
    	return id;
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
    this.addLecture = function(plan, lecture){
        var id = this.findInPlan(plan, lecture.lecture_id);//miejsce danego terminu w planie
        if (id != -1 ){//jezeli znalazlo termin w planie
            if (plan[id].id == lecture.id){// jezeli termin_id zgadadza sie z szukanym terminem_id
                plan.remove(this.findInPlan(plan, lecture.lecture_id));//usuwam
                lecture.active = false;
            }
        } else {
            plan.push(lecture);// w przeciwnym razie dodaje
            lecture.active = true;
        }
    }
  }]);
