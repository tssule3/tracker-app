import {Component, OnInit, ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  private exChangedSubscription: Subscription;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dateExtract = [];
  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    console.log('ngOnit past-training');
    this.exChangedSubscription = this.trainingService.finishedExercisesChanged.subscribe(
      (exercises: Exercise[]) => {
        const tempD = exercises;
        for (let i = 0 ; i < tempD.length; i++) {
          const arr = [];
          arr[i] = tempD[i].date;
          arr[i] = new Date(arr[i].seconds * 1000);
          this.dateExtract[i] = arr[i];
          tempD[i].date = this.dateExtract[i];
          this.dataSource.data = tempD;
        }
      }
    );
    this.trainingService.fetchCompletedOrCancelledExercises();


  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnDestroy() {
    this.exChangedSubscription.unsubscribe();
  }
}
