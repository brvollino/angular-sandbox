import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RandomSpoilerComponent } from './top-spoilers/random-spoiler.component';

@NgModule({
  declarations: [RandomSpoilerComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatSnackBarModule
  ],
  exports: [RandomSpoilerComponent]
})
export class MarbleTestingModule { }
