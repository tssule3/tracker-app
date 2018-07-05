import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private snack: MatSnackBar) {this.snack.open('Welcome To Fitness Tracker App', null, {duration: 1500} );
  }

  ngOnInit() {
     }

}
