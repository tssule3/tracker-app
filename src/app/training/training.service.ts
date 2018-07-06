import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subject } from 'rxjs/Subject';

import { Exercise } from './exercise.model';
import {map} from 'rxjs/internal/operators';
import {Subscription} from 'rxjs';
import {UiService} from '../shared/ui.service';

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  dateExtracted = new Subject<Date>();
  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;
  private fbSubs: Subscription[] = [];
  constructor(private db: AngularFirestore, private uiService: UiService) {}

  fetchAvailableExercises() {
    this.uiService.loadingStateChanged.next(true);
    console.log('into fetch..');
   this.fbSubs.push(this.db.collection('availableExercises')
      .snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        // console.log({id, ...data});
        return { id, ...data };
      }))
    ).subscribe((exercises: Exercise[]) => {
       this.uiService.loadingStateChanged.next(false);
     this.availableExercises = exercises;
     this.exercisesChanged.next([...this.availableExercises]);
   }, error => {
      this.uiService.loadingStateChanged.next(false);
      this.uiService.showSnackbar('Fetching Exercise Failed Please Try Again Later',
        null, {duration: 3000});
      this.exerciseChanged.next(null);
     }));
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(
      ex => ex.id === selectedId
    );
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  fetchCompletedOrCancelledExercises() {
   this.fbSubs.push( this.db
      .collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: Exercise[]) => {
        this.finishedExercisesChanged.next(exercises);
      }));
  }
  cancelSubscriptions() {
    this.fbSubs.forEach(sub => {sub.unsubscribe(); });
  }
  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
