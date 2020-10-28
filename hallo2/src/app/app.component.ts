import { Component, Optional } from '@angular/core';
import { AngularFireDatabase, AngularFireDatabaseModule, snapshotChanges, AngularFireList } from '@angular/fire/database';
import { AngularFireModule, FirebaseApp } from '@angular/fire';
import { Observable } from 'rxjs';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Question } from './model/Question';
import { DatabaseReference } from '@angular/fire/database/interfaces';
import { cities } from './model/cities';




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
  hand:Observable<any>;


  private dbpath= '/Antworten';

  
  genzahl:number;
  ref: AngularFireList<Question> = null;
  ref1: DatabaseReference;
  db2:AngularFirestore;
  snapshot:any;

  hamm:AngularFirestoreCollection<cities>;
  cities:Observable<cities[]>
  
  constructor(db:AngularFireDatabase, db2:AngularFirestore){

    firebase.firestore().enablePersistence()
    .catch(function(err) {
        if (err.code == 'failed-precondition') {
            console.log("Error")
        } else if (err.code == 'unimplemented') {
          console.log("Error")
        }
    });

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
    //this.ref = db.list(this.dbpath);
    this.items = db.list('/Fragenkatalog/Antworten/'+localStorage.getItem('hans')).valueChanges();  
    this.items.subscribe(items => {
      this.allitems = items;
      console.log(this.allitems);
      
    })
  }
  

  /*test3(){
    localStorage.setItem('hannes',this.test);
    console.log(localStorage.getItem('hannes'));
  }*/

test3(x:cities){
  /*firebase.firestore().collection("cities").doc("LA").set({
    name: "Los Angeles",
    state: "CA",
    country: "USA"
})
console.log("läuft")*/
  firebase.firestore().collection("cities").doc("LA").set({
  name: "New York",
  state: "CA",
  country: "USA"
})
.then(function() {
  console.log("Document successfully written!");
})
.catch(function(error) {
  console.error("Error writing document: ", error);
});

}
async test5(){
  this.snapshot = await firebase.firestore().collection("cities").doc("LA").get(); //Datenabfrage

  }



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
            Antwort0110a:true,
           }
           usersRef1.set(x);
            console.log("aha");
            //return this.ref.push(new Person("22","Herbert","Standfuß"));
          }
          
          //var b = snapshot.child("913293620").exists(); // true
        });
      
  }
}
  
