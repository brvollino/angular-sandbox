import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TopSpoilersComponent } from './top-spoilers/top-spoilers.component';
import { MatSlideToggle, MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [TopSpoilersComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatSlideToggleModule
  ],
  exports: [TopSpoilersComponent]
})
export class MarbleTestingModule { }
