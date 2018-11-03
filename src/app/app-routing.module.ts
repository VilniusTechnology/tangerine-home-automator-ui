import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {GraphsComponent} from './graphs/graphs.component';
import {HistoryComponent} from './history/history.component';
import {HighchartsComponent} from './highcharts/highcharts.component';

const routes: Routes = [
  {
    path:  '',
    component: HistoryComponent,
  },
  {
    path:  'graphs',
    component: GraphsComponent,
  },
  {
    path:  'history',
    component: HistoryComponent,
  },
  {
    path:  'highcharts',
    component: HighchartsComponent,
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