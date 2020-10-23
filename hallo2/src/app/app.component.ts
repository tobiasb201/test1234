import { Component, Optional } from '@angular/core';
import { AngularFireDatabase, AngularFireDatabaseModule, snapshotChanges, AngularFireList } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { Observable } from 'rxjs';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { Question } from './model/Question';
import { DatabaseReference } from '@angular/fire/database/interfaces';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @Optional()
  items: Observable<any[]>;
  allitems :any;
  objects:Question[] = [];
  test:string='40';


  private dbpath= '/Antworten';

  
  genzahl:number;
  ref: AngularFireList<Question> = null;
  ref1: DatabaseReference;

  
  constructor(db:AngularFireDatabase){

    if(localStorage.getItem('hans')==null){
      var genzahl=Math.floor((Math.random() * 1000000000) + 1).toString();
      console.log(genzahl);
      localStorage.setItem('hans',genzahl);
      console.log(localStorage.getItem('hans'),"Klappt");
      this.dbpath= '/Antworten'+localStorage.getItem('hans');
    }
    else{
      console.log(localStorage.getItem('hans'),"Klappt");
      this.dbpath= '/Antworten'+localStorage.getItem('hans');
    }
    
//Daten Abfrage und Root
    this.ref = db.list(this.dbpath);
    this.items = db.list('/Fragenkatalog/Fragen').valueChanges();  
    this.items.subscribe(items => {
      this.allitems = items;
      console.log(this.allitems);
      
    })
  }
  

  /*test3(){
    localStorage.setItem('hannes',this.test);
    console.log(localStorage.getItem('hannes'));
  }*/

  //Daten eingabe
  test2(question:Question):any
  {


      //return firebase.database().ref().update(new Person("432","Hans","Standfuß"));
      //return this.ref.update(new Person("232","fdfde","dada"));
          var ref2 = firebase.database().ref("Antworten");

          ref2.once("value").then(function(snapshot) {
          var b = snapshot.child('/Fragenkatalog/Antworten/'+localStorage.getItem('hans')).exists(); // true
         /* 
          if(b==true){
            firebase.database().ref(('Fragenkatalog/Frage1/Frage/'+localStorage.getItem('hans')).set(new Question("5554","test"));
            console.log("update");
            //return this.ref.update(new Person("44","dada","fdfdfa"));

          }*/
          if(b==false)
          {
            const usersRef1=firebase.database().ref('/Fragenkatalog/Antworten/'+localStorage.getItem('hans'));
           
           let x: Question={
            Antwort0001:true,
            Antwort0010:true,
            Antwort0110a:false,
           }
           usersRef1.set(x);
            console.log("aha");
            //return this.ref.push(new Person("22","Herbert","Standfuß"));
          }
          
          //var b = snapshot.child("913293620").exists(); // true
        });
      
  }
}
  
