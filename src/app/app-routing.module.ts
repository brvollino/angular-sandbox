import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RandomSpoilerComponent } from './marble-testing/top-spoilers/random-spoiler.component';

const routes: Routes = [
  {
    path: 'marble-testing',
    component: RandomSpoilerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
