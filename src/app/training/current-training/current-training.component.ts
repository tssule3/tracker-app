import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {StopTrainingComponent} from './stop-training.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  @Output() trainingExit = new EventEmitter();
progress = 0;
timer: number;
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.timer = setInterval(() => {
      this.progress = this.progress + 10;
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000);
  }
onStop() {
      clearInterval(this.timer);
     const dialogRef = this.dialog.open(StopTrainingComponent, {data: {progress: this.progress}});
     dialogRef.afterClosed().subscribe(
       result => {
         if (result === false) {
           this.onContinue();
         } else {
            this.trainingExit.emit();
         }
       }
     );
}
onContinue() {
  this.timer = setInterval(() => {
    if (this.progress >= 100) {
      clearInterval(this.timer);
    } else {
      this.progress = this.progress + 10;
    }
  }, 1000);
}
}
