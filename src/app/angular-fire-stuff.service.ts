import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {AngularFireStorage} from 'angularfire2/storage';
import {UserModel} from './profile/user.model';
import {map} from 'rxjs/internal/operators';
import {Observable} from 'rxjs';
import * as firebase from 'firebase';

@Injectable()
export class AngularFireStuffService {
  tempObj: UserModel;
  tempId;
  db;
  private userCollection: AngularFirestoreCollection<UserModel>;
  private userDoc: AngularFirestoreDocument<UserModel>;
  constructor(private afs: AngularFirestore, private afStorage: AngularFireStorage) {
    this.db = firebase.firestore();
    this.userCollection = afs.collection<UserModel>('user');
  }
  createNewUser(email: string) {
    this.userCollection.add({id: '', firstName: 'default',
      lastName: 'default', mobile: '90XX', age: null, email: email,
      imagePath: 'https://firebasestorage.googleapis.com/v0/b/tracker-app-c17a0.appspot.com/o/4762default-profile.png?alt=media&token=3b766a5a-3e40-48ac-b765-1a61f1b56fd7'}).then();
      // this.getUserFromFireBase();
  }
  getUserFromFireBase(): Observable<UserModel[]> {
    // 2
   return  this.userCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as UserModel;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
  getUserDocFromFireBase(email) {
    this.db.collection('user').where('email', '==', email)
      .get()
      .then((data) => {
        data.forEach((doc) => {
          console.log(doc.id, ' => ', doc.data());
          this.tempObj = doc.data();
          this.tempId = doc.id;
        });
      })
      .catch(function(error) {
        console.log('Error getting documents: ', error);
      });
  }
}
