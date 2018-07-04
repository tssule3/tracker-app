import { Injectable } from '@angular/core';
import {UserModel} from './user.model';
import {AuthDataModel} from './auth-data.model';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
@Injectable()
export class AuthService {
private user: UserModel;
authChange  = new Subject<boolean>();
  constructor(private router: Router) { }
  registerUser(auth: AuthDataModel) {
      this.user = { email: auth.email, userId: Math.round(Math.random() * 10000).toString()};
     this.authSuccessfully();
  }
  login(auth: AuthDataModel) {
    this.user = { email: auth.email, userId: Math.round(Math.random() * 10000).toString()};
    this.authSuccessfully();
  }
  logOut() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }
  getUser() {
    return {...this.user};
  }
  isAuth() {
    return this.user != null;
  }
  private authSuccessfully() {
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}
