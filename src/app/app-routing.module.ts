import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {GraphsComponent} from './graphs/graphs.component';
import {HistoryComponent} from './history/history.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {
    path:  '',
    component: HomeComponent,
  },
  {
    path:  'login',
    component: LoginComponent,
  },
  {
    path:  'graphs',
    component: GraphsComponent,
  },
  {
    path:  'history',
    component: HistoryComponent,
  },
  // {
  //   path:  'history/show/:id',
  //   component: HistoryComponent,
  // },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}