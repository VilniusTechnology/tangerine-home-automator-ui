import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { HeadedComponent } from './layout/headed/headed.component';
import { HomeComponent } from './screens/home/home.component';
import { GraphsComponent } from './screens/graphs/graphs.component';
import { HistoryComponent } from './screens/history/history.component';
import { LightomatorComponent } from './screens/lightomator/lightomator.component';
import { LedEmulatorComponent } from './screens/led-emulator/led-emulator.component';
import { LedTimingModesComponent } from './screens/lightomator/led-timing-modes/led-timing-modes.component';
import { EffectorComponent } from './screens/effector/effector.component';
import { OpenpixelComponent } from './screens/openpixel/openpixel.component';
import {LedControlPanelListComponent} from "./components/led-control-panel/led-control-panel-list/led-control-panel-list.component";
import {LedEmulatorDetachedModule} from "./modules/led-emulator-detached/led-emulator-detached.module";
import {KeysComponent} from "./screens/keys/keys.component";

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
                path:  'sensors/dashboard',
                component: HomeComponent,
                canActivate: [AuthGuardService],
            },
            {
                path:  'login',
                component: HomeComponent,
                // component: LoginComponent,
            },
            {
                path:  'sensors/graphs',
                component: GraphsComponent,
                canActivate: [AuthGuardService],
            },
            {
                path:  'history',
                component: HistoryComponent,
                canActivate: [AuthGuardService],
            },
            {
                path:  'lightomator',
                component: LightomatorComponent,
                canActivate: [AuthGuardService],
            },
            {
                path:  'lightomator/led',
                component: LedControlPanelListComponent,
                canActivate: [AuthGuardService],
            },
            {
                path:  'lightomator/timing',
                component: LedTimingModesComponent,
                canActivate: [AuthGuardService],
            },
            {
                path:  'lightomator/led/effects',
                component: EffectorComponent,
                canActivate: [AuthGuardService],
            },
            {
                path:  'lightomator/led/openpixel',
                component: OpenpixelComponent,
                canActivate: [AuthGuardService],
            },
            {
                path:  'led-emulator',
                component: LedEmulatorComponent,
                canActivate: [AuthGuardService],
            },
            {
                path:  'keys',
                component: KeysComponent,
                canActivate: [AuthGuardService],
            },
        ]
    },
    { path: 'led-outlet', loadChildren: () => LedEmulatorDetachedModule},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
