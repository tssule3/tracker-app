import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { User } from './user.model';
import { AuthData } from './auth-data.model';
import {AngularFireAuth} from 'angularfire2/auth';
import {TrainingService} from '../training/training.service';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(private router: Router, private afauth: AngularFireAuth,
              private trainingService: TrainingService) {}
  initAuthListener() {
    this.afauth.authState.subscribe(
      user => {
        if (user) {
          this.isAuthenticated = true;
          this.authChange.next(true);
          this.router.navigate(['/training']);
        } else {
          this.trainingService.cancelSubscription();
          this.authChange.next(false);
          this.router.navigate(['/login']);
          this.isAuthenticated = false;
        }
      }
    );
  }
  registerUser(authData: AuthData) {
    this.afauth.auth.createUserWithEmailAndPassword(authData.email, authData.password).then(
      result => {console.log(result);
      }
    ).catch(error => {console.log(error); })
    ;
  }

  login(authData: AuthData) {
    this.afauth.auth.signInWithEmailAndPassword(authData.email, authData.password).then(
      result => {console.log(result);
      }
    ).catch(error => {console.log(error); });
  }

  logout() {
    this.afauth.auth.signOut().then();
  }
  isAuth() {
    return this.isAuthenticated;
  }

}
