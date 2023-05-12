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
    path: 'ngMFE',
    loadChildren: () => import('mf1/Module').then(m => m.HeroesModule)
  },
  {
    path: 'react-js-MFE',
    component: WebComponentWrapper,
    data: {
      remoteEntry: 'http://localhost:4204/remoteEntry.js',
      remoteName: 'react',
      exposedModule: './web-components',
      elementName: 'react-element'
    } as WebComponentWrapperOptions
  },
  {
    path: 'react-ts-MFE',
    component: WebComponentWrapper,
    data: {
      remoteEntry: 'http://localhost:3000/remoteEntry.js',
      remoteName: 'mf2',
      exposedModule: './web-components',
      elementName: 'react-ts-element',
    } as WebComponentWrapperOptions,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
