import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable, Subscription} from 'rxjs';
import {UserModel} from './user.model';
import {AngularFireStorage} from 'angularfire2/storage';
import {map} from 'rxjs/internal/operators';
import * as firebase from 'firebase';
import {AuthService} from '../auth/auth.service';
import {AngularFireStuffService} from '../angular-fire-stuff.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  db;
  uploadFileBtn = false;
  userCollection: AngularFirestoreCollection<UserModel>;
  users: Observable<UserModel[]>;
  userDoc: AngularFirestoreDocument<UserModel>;
  user: Observable<UserModel>;
  btnDisabled = true;
  imageToBeUploaded;
  profileImg;
  getUserSubs: Subscription;
  getUserObj: UserModel;
  getUserId;
  newUser: UserModel[] = [{id: '', age: null, lastName: '', email: '', mobile: '', imagePath: '', firstName: ''}];
  getUserArray: UserModel[];
  getUserEmail;
  constructor(private service: AuthService, private afStuff: AngularFireStuffService, private afs: AngularFireStorage,
              private afStore: AngularFirestore) {
    console.log(this.service.authDataEmail);
  }
  ngOnInit() {
    console.log('ngOnInit');
    console.log(this.afStuff.tempObj);
    this.getUserObj = this.afStuff.tempObj;
    this.getUserId = this.afStuff.tempId;
    console.log(this.getUserId);
    this.newUser = [{firstName: this.getUserObj.firstName, imagePath: this.getUserObj.imagePath, mobile: this.getUserObj.mobile,
    email: this.getUserObj.email, lastName: this.getUserObj.lastName, age: this.getUserObj.age, id: this.getUserObj.id}];
  }
  // newUser: UserModel[] = [{firstName: '', lastName: '', email: '', age: null, mobile: '', imagePath: ''}];
  //
  // userArray: UserModel[];

  // userCollection: AngularFirestoreCollection<UserModel>;
  // users: Observable<UserModel[]>;
  // constructor(private afs: AngularFireStorage, private afStore: AngularFirestore) {
  //   this.userCollection = afStore.collection<UserModel>('user');
  //   this.users = this.userCollection.snapshotChanges().pipe(
  //     map(actions => actions.map(a => {
  //       const data = a.payload.doc.data() as UserModel;
  //       const id = a.payload.doc.id;
  //       return { id, ...data };
  //     }))
  //   );
  //   this.users.subscribe(
  //     (d) => {
  //       console.log(d);
  //       this.userArray = d;
  //     }
  //   );
  //   console.log(this.userArray);
  // }
  uploadFile(event) {
    const file = event.target.files[0];
    // this.imageToBeUploaded = file.name;
    // console.log(file.name);
    const filePath = Math.round(Math.random() * 10000) + file.name;
    console.log(filePath);
    this.imageToBeUploaded = filePath;
    const task = this.afs.upload(filePath, file);
    setTimeout(() => {this.getUploadedFile();  this.btnDisabled = false; this.uploadFileBtn = true;
    }, 4000);
    // this.getUploadedFile();
  }
  updateImg() {
    this.getUploadedFile();
    this.btnDisabled = true;
  }
  getUploadedFile() {
    const storageRef = firebase.storage().ref();
    const storage = firebase.storage();
    const gsReference = storage.refFromURL(`gs://tracker-app-c17a0.appspot.com/${this.imageToBeUploaded}`);
    gsReference.getDownloadURL().then(
      (data) => {
        this.profileImg = data;
        console.log('profileImg');
        console.log(this.profileImg);
      }
    );
  }

  updateDetails(user: UserModel) {
    if (this.uploadFileBtn === false) {
      this.userDoc = this.afStore.doc<UserModel>(`user/${this.getUserId}`);
      this.user = this.userDoc.valueChanges();
      this.userDoc.update({firstName: user.firstName, lastName: user.lastName,
        email: user.email, mobile: user.mobile, age: user.age,
        id: this.getUserId}).then();
      this.btnDisabled = true;
      setTimeout(() => {
        this.getUser();
      }, 1000);
    } else {
      this.userDoc = this.afStore.doc<UserModel>(`user/${this.getUserId}`);
      this.user = this.userDoc.valueChanges();
      this.userDoc.update({firstName: user.firstName, lastName: user.lastName,
        email: user.email, mobile: user.mobile, age: user.age,
        imagePath: this.profileImg, id: this.getUserId}).then();
      this.btnDisabled = true;
      setTimeout(() => {
        this.getUser();
      }, 1000);
    }
    }
  // saveImage(event) {
  //   console.log(event);
  // }
  // saveData(usr: UserModel) {
  //   // console.log(this.profileImg);
  //   this.userCollection.add({firstName: usr.firstName, lastName: usr.lastName, email: usr.email,
  //   age: usr.age, mobile: usr.mobile, imagePath: this.profileImg});
  // }
  getUser() {
    this.db = firebase.firestore();
    this.db.collection('user').where('id', '==', this.getUserId)
      .get()
      .then((data) => {
        data.forEach((doc) => {
          console.log(doc.id, ' => ', doc.data());
          this.getUserObj = doc.data();
          this.getUserId = doc.id;
          this.newUser = [{firstName: this.getUserObj.firstName, imagePath: this.getUserObj.imagePath, mobile: this.getUserObj.mobile,
            email: this.getUserObj.email, lastName: this.getUserObj.lastName, age: this.getUserObj.age, id: this.getUserObj.id}];
        });
      })
      .catch(function(error) {
        console.log('Error getting documents: ', error);
      });
  }
  deleteImage() {
    const storage = firebase.storage();

// Create a storage reference from our storage service
    const storageRef = storage.ref();
   console.log(storageRef.delete());
  }
}
