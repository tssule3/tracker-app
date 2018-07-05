import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {MatSnackBar} from '@angular/material';
@Injectable()
export class UiService {
loadingStateChanged = new Subject<boolean>();
  constructor(private snackbar: MatSnackBar) {
    console.log(this.loadingStateChanged);
  }
  showSnackbar(message, action, duration) {
    this.snackbar.open(message, action, {
      duration: duration
    });
  }
}
