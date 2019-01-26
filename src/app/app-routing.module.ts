import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from './login/login.component';

import { AuthGuardService } from './services/auth/auth-guard.service';

import { HeadedComponent } from './layout/headed/headed.component';

import { HomeComponent } from './screens/home/home.component';
import { GraphsComponent } from './screens/graphs/graphs.component';
import { HistoryComponent } from './screens/history/history.component';
import { HighchartsComponent } from './screens/highcharts/highcharts.component';
import { LightomatorComponent } from './screens/lightomator/lightomator.component';
import { LedEmulatorComponent } from './screens/led-emulator/led-emulator.component';
import { LedControlPanelComponent } from './components/led-control-panel/led-control-panel.component';
import { LedTimingModesComponent } from './screens/led-timing-modes/led-timing-modes.component';

import { LedEmulatorDetachedModule } from './modules/led-emulator-detached/led-emulator-detached.module';

const routes: Routes = [
    { 
        path: '', 
        component: HeadedComponent,
        children: [
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
            },
        ]
    },
    { path: 'led-outlet', loadChildren: () => LedEmulatorDetachedModule},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}