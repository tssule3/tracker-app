import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from 'angularfire2/auth';
import { MatSnackBar } from '@angular/material';

import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training.service';
import { UiService } from '../shared/ui.service';
import {AngularFireStuffService} from '../angular-fire-stuff.service';
import {Observable} from 'rxjs';
import {UserModel} from '../profile/user.model';

@Injectable()
export class AuthService {
  tempUser1: Observable<UserModel>;
  authChange = new Subject<boolean>();
  authDataEmail = new Subject<string>();
  private isAuthenticated = false;
   tempUser: Observable<UserModel[]>;
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UiService,
    private afStuff: AngularFireStuffService
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.authChange.next(false);
        this.router.navigate(['/']);
        this.isAuthenticated = false;
      }
    });
  }

  registerUser(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar('Registered SuccessFully', null, 3000);
        this.afStuff.createNewUser(authData.email);
        setTimeout(() => {
          this.tempUser = this.afStuff.getUserFromFireBase();
          this.tempUser.subscribe(
            (data) => {console.log(data); }
          );
        }, 1500 );
        setTimeout(() => {this.logout();
          this.uiService.showSnackbar('Please Log In With Email & Password', null, 3000); }, 4000 );
      })
      .catch(error => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar(error.message, null, 3000);
      });
     }

  login(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar('Logged In SuccessFully!', null, 3000);
        setTimeout(() => {
         this.afStuff.getUserDocFromFireBase(authData.email);
         this.authDataEmail.next(authData.email);
        }, 2000 );
      })
      .catch(error => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  logout() {
    this.uiService.showSnackbar('Logged Out!', null, 1000);
    setTimeout(() => {this.afAuth.auth.signOut().then(
      () => {
      }
    ); }, 500);
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
