import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopSpoilersComponent } from './marble-testing/top-spoilers/top-spoilers.component';

const routes: Routes = [
  {
    path: 'marble-testing',
    component: TopSpoilersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
