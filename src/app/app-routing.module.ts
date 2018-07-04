import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {SignupComponent} from './auth/signup/signup.component';
import {TrainingComponent} from './training/training.component';
import {LoginComponent} from './auth/login/login.component';
import {AuthGuardService} from './auth/auth-gurad.service';
const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'training', component: TrainingComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent},
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule { }
