import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HeroesDetailsComponent} from './heroes-details/heroes-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'details',
    pathMatch: 'full'
  },
  {
    path: 'details',
    component: HeroesDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
