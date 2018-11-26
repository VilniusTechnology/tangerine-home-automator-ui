import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {GraphsComponent} from './graphs/graphs.component';
import {HistoryComponent} from './history/history.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {HighchartsComponent} from './highcharts/highcharts.component';
import {LightomatorComponent} from './lightomator/lightomator.component';
import { LedControlPanelComponent } from './led-control-panel/led-control-panel.component';
import { LedTimingModesComponent } from './led-timing-modes/led-timing-modes.component';



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
  {
    path:  'highcharts',
    component: HighchartsComponent,
  },
  {
    path:  'lightomator',
    component: LightomatorComponent,
  },
  {
    path:  'lightomator/led',
    component: LedControlPanelComponent,
  },
  {
    path:  'lightomator/timing',
    component: LedTimingModesComponent,
  }
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