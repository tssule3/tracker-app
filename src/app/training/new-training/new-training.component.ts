import {Component, OnDestroy, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/internal/operators';
@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})

export class NewTrainingComponent implements OnInit, OnDestroy {

  exerciseSubscription: Subscription;
  exercises: Exercise[];
  constructor(private trainingService: TrainingService,
              ) { }

  ngOnInit() {
    // this.exercises = this.trainingService.getAvailableExercises();
  this.exerciseSubscription =  this.trainingService.exercisesChanged.subscribe(
    data => {
      this.exercises = data;
    }
  );
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
  ngOnDestroy(): void {
    this.exerciseSubscription.unsubscribe();
  }
}
