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
import { AuthGuardService } from './services/auth/auth-guard.service';
import { LedEmulatorComponent } from './led-emulator/led-emulator.component';

const routes: Routes = [
  {
    path:  '',
    component: HomeComponent,
    canActivate: [AuthGuardService],
  },
  {
    path:  'login',
    component: LoginComponent,
  },
  {
    path:  'graphs',
    component: GraphsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path:  'history',
    component: HistoryComponent,
    canActivate: [AuthGuardService],
  },
  {
    path:  'highcharts',
    component: HighchartsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path:  'lightomator',
    component: LightomatorComponent,
    canActivate: [AuthGuardService],
  },
  {
    path:  'lightomator/led',
    component: LedControlPanelComponent,
    canActivate: [AuthGuardService],
  },
  {
    path:  'lightomator/timing',
    component: LedTimingModesComponent,
    canActivate: [AuthGuardService],
  },
  {
    path:  'led-emulator',
    component: LedEmulatorComponent,
    canActivate: [AuthGuardService],
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}