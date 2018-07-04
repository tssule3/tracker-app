import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule, MatIconModule, MatListModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatSelectModule, MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatSidenavModule,
    MatInputModule,
    MatIconModule,
    FlexLayoutModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatSelectModule,
    MatProgressSpinnerModule, MatDialogModule
  ],
  declarations: [],
  exports: [MatButtonModule, MatSidenavModule, MatInputModule, MatIconModule, FlexLayoutModule,
    MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatSidenavModule,
    MatToolbarModule, MatListModule, MatTabsModule, MatCardModule,
    MatSelectModule, MatProgressSpinnerModule, MatDialogModule]
})
export class MyOwnCustomMaterialModule { }
