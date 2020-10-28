import { Component, Optional } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireDatabaseModule,
  snapshotChanges,
  AngularFireList,
} from '@angular/fire/database';
import { AngularFireModule, FirebaseApp } from '@angular/fire';
import { Observable } from 'rxjs';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import * as firebase from 'firebase';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  ENABLE_PERSISTENCE,
} from '@angular/fire/firestore';
import { Question } from './model/Question';
import { DatabaseReference } from '@angular/fire/database/interfaces';
import { cities } from './model/cities';
import { Fragenkatalog } from './model/Fragenkatalog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @Optional()
  items: Observable<any[]>;
  allitems: any;
  objects: Question[] = [];
  test: string = '40';
  hand: Observable<any[]>;

  private dbpath = '/Antworten';

  genzahl: number;
  ref: AngularFireList<Question> = null;
  ref1: DatabaseReference;
  db2: AngularFirestore;

  snap: any;
  jalla:string;

Button1:boolean=false;
Button2:boolean=false;


  constructor(db: AngularFireDatabase) {
    firebase
      .firestore()
      .enablePersistence()
      .catch(function (err) {
        if (err.code == 'failed-precondition') {
          console.log('Error');
        } else if (err.code == 'unimplemented') {
          console.log('Error');
        }
      });

    if (localStorage.getItem('hans') == null) {
      var genzahl = Math.floor(Math.random() * 1000000000 + 1).toString();
      console.log(genzahl);
      localStorage.setItem('hans', genzahl);
      console.log(localStorage.getItem('hans'), 'Klappt');
      this.dbpath = '/Antworten' + localStorage.getItem('hans');
    } else {
      console.log(localStorage.getItem('hans'), 'Klappt');
      this.dbpath = '/Antworten' + localStorage.getItem('hans');
    }

  firebase.firestore().collection("Fragenkatalog")
  .onSnapshot({ includeMetadataChanges: true }, function(snapshot) {
      snapshot.docChanges().forEach(function(change) {
          if (change.type === "added") {
              console.log("New city: ", change.doc.data());
          }

          var source = snapshot.metadata.fromCache ? "local cache" : "server";
          console.log("Data came from " + source);
      });
  });

    //Daten Abfrage und Root
    //this.ref = db.list(this.dbpath);
    this.items = db
      .list('/Fragenkatalog/Antworten/' + localStorage.getItem('hans'))
      .valueChanges();
    this.items.subscribe((items) => {
      this.allitems = items;
      console.log(this.allitems);
    });
  }

  /*test3(){
    localStorage.setItem('hannes',this.test);
    console.log(localStorage.getItem('hannes'));
  }*/

  test3(x: cities) {
    /*firebase.firestore().collection("cities").doc("LA").set({
    name: "Los Angeles",
    state: "CA",
    country: "USA"
})
*/
    firebase
      .firestore()
      .collection('Fragenkatalog')
      .doc(localStorage.getItem('hans'))
      .set({
        Frage1: 'Nfdfdfs',
        Frage2: 'ea',
      })
      .then(function () {
        console.log('Document successfully written!');
      })
      .catch(function (error) {
        console.error('Error writing document: ', error);
      });
  }
  async test8() {

    var docRef = firebase.firestore().collection('Fragenkatalog').doc('Fragen');

    docRef.get().then((doc) => {
      if (doc.exists) {
        console.log('Document data:', doc.data());
        this.snap = doc.data().Frage1;
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    });

  }

  radioChange(event: any) {
    this.jalla = event.target.value;
    return this.jalla;
  }

  //Radiobuttons abspeichern
  testradio() {
    if ((<HTMLInputElement>document.getElementById('radiotest1')).checked) {
      firebase
        .firestore()
        .collection('Fragenkatalog')
        .doc(localStorage.getItem('hans'))
        .update({
          Frage1: true,
        });
    }
    if ((<HTMLInputElement>document.getElementById('radiotest2')).checked) {
      firebase
        .firestore()
        .collection('Fragenkatalog')
        .doc(localStorage.getItem('hans'))
        .update({
          Frage1: false,
        });
    }
  }

  klick1(){
      if(this.Button1==false){
        this.Button1=true;
        console.log(this.Button1)
      }
      else{
        this.Button1=false;
        console.log(this.Button1)
      }
    }
    klick2(){
      if(this.Button2==false){
        this.Button2=true;
        console.log(this.Button2)
      }
      else{
        this.Button2=false;
        console.log(this.Button2)
      }
    }

    bildpush(){

      firebase.firestore().collection('Fragenkatalog').doc(localStorage.getItem('hans')).update({
          Button1:this.Button1,
          Button2:this.Button2
        });
    }

  //Daten eingaben Realtime DB
  test2(question: Question): any {
    //return firebase.database().ref().update(new Person("432","Hans","Standfuß"));
    //return this.ref.update(new Person("232","fdfde","dada"));
    var ref2 = firebase.database().ref('Antworten');

    ref2.once('value').then(function (snapshot) {
      var b = snapshot
        .child('/Fragenkatalog/Antworten/' + localStorage.getItem('hans'))
        .exists(); // true
      /* 
          if(b==true){
            firebase.database().ref(('Fragenkatalog/Frage1/Frage/'+localStorage.getItem('hans')).set(new Question("5554","test"));
            console.log("update");
            //return this.ref.update(new Person("44","dada","fdfdfa"));

          }*/
      if (b == false) {
        const usersRef1 = firebase
          .database()
          .ref('/Fragenkatalog/Antworten/' + localStorage.getItem('hans'));

        let x: Question = {
          Antwort0001: true,
          Antwort0010: true,
          Antwort0110a: true,
        };
        usersRef1.set(x);
        console.log('aha');
        //return this.ref.push(new Person("22","Herbert","Standfuß"));
      }

      //var b = snapshot.child("913293620").exists(); // true
    });
  }
}
