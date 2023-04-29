import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './core/home/home.component';
import {WebComponentWrapper, WebComponentWrapperOptions} from '@angular-architects/module-federation-tools';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'heroes',
    loadChildren: () => import('mf1/Module').then(m => m.HeroesModule)
  },
  {
    path: 'react',
    component: WebComponentWrapper,
    data: {
      type: 'script',
      remoteEntry: 'http://localhost:3000/remoteEntry.js',
      remoteName: 'mf2',
      exposedModule: './CounterModule',
      elementName: 'react-element',
    } as WebComponentWrapperOptions,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
