import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  // verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private authService: AuthService, private snack: MatSnackBar) {}
  ngOnInit() {
    this.authService.initAuthListener();
    // this.snack.open('Fitness Tracker App', null, {duration: 2000} );
  }
}
