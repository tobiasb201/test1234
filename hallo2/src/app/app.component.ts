import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireDatabaseModule, snapshotChanges, AngularFireList } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { Observable } from 'rxjs';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { Person } from './model/Person';
import { DatabaseReference } from '@angular/fire/database/interfaces';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  
  items: Observable<any[]>;
  allitems :any;
  objects:Person[] = [];
  test:string='40';

  private dbpath= '/items';

  
  genzahl:number;
  ref: AngularFireList<Person> = null;
  ref1: DatabaseReference;

  
  constructor(db:AngularFireDatabase){

    if(localStorage.getItem('hans')==null){
      var genzahl=Math.floor((Math.random() * 1000000000) + 1).toString();
      console.log(genzahl);
      localStorage.setItem('hans',genzahl);
      console.log(localStorage.getItem('hans'),"Klappt");
      this.dbpath= '/items/'+localStorage.getItem('hans')+'/Fragenkatalog';
    }
    else{
      console.log(localStorage.getItem('hans'),"Klappt");
      this.dbpath= '/items/'+localStorage.getItem('hans')+'/Fragenkatalog';
    }
    
//Daten Abfrage und Root
    this.ref = db.list(this.dbpath);
    this.items = db.list('/items').valueChanges();  
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
  test2(person:Person):any
  {
    
    
    

      //console.log("hi")

      //const usersRef=firebase.database().ref('items/Fragenkatalog').child("test");
      //usersRef.push(3232);
      //console.log("aha");


      //return firebase.database().ref().update(new Person("432","Hans","Standfuß"));
      //return this.ref.update(new Person("232","fdfde","dada"));
          var ref2 = firebase.database().ref("items");

          ref2.once("value").then(function(snapshot) {
          var b = snapshot.child(localStorage.getItem('hans')+'/Fragenkatalog').exists(); // true
          if(b==true){
            firebase.database().ref('items/'+localStorage.getItem('hans')+'/Fragenkatalog/test/').set(new Person("5554","test","test123"));
            console.log("update");
            //return this.ref.update(new Person("44","dada","fdfdfa"));
           /* let newPerson = this.database.ref("/items").push();
            
            person.id = newPerson.key;
           // newPerson.set(this.personid = '1');*/

            //this.db.ref("items/91329320/Fragenkatalog/test/-MK9tj0m-9gFp4SzZ8RD").set(person.id ="566");

          }
          if(b==false)
          {
            const usersRef=firebase.database().ref('items/'+localStorage.getItem('hans')+'/Fragenkatalog').child("test");
            usersRef.set(new Person("2","Kilo","Mett"));
            console.log("aha");
            

            //return this.ref.push(new Person("22","Herbert","Standfuß"));
          }
          
          //var b = snapshot.child("913293620").exists(); // true
        });
      
  }

  /*test(){
    return new Promise<Person[]>(resolve=>{
    let collection=this.dbi.collection('person');
    collection.get().subscribe(function(snapshot)
    {
      let objects : Person []=[];

      snapshot.forEach(function(doc){
        let data =doc.data();           //Hält data von jedem Object was aus der connection kommt
        objects.push(new Person('', 'Tobias', 'Angularprofi'));
        objects.push();
      });
      console.log("LAN");
      resolve (objects);
      });
      console.log("LAN");

    });
  }*/
}
  
