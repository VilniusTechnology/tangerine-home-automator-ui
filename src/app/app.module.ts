import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule, MatCheckboxModule, MatInputModule} from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LightningLevelService} from './services/lightning-level.service';
import {LedDriverService} from './services/led-driver.service';
import { ColorPickerModule } from 'ngx-color-picker';
import { LoginComponent } from './login/login.component';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';
import * as xrange from 'highcharts/modules/xrange.src';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { AuthService } from './services/auth/auth.service';
import { HeadedComponent } from './layout/headed/headed.component';
import { HeadlessComponent } from './layout/headless/headless.component';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { EndpointsService } from './services/endpoints.service';
import { ConnectionStatusComponent } from './components/connection-status/connection-status.component';
import { EndpointsHealthService } from './services/endpoints-health.service';
import { EndpointsStatusInterceptor } from './services/endpoints-status-interceptor.service';
import { LedEmulatorDetachedModule } from './modules/led-emulator-detached/led-emulator-detached.module';
import { LedEmulatorViewService } from './services/led-view-emulator.service';
import { GraphsComponent } from './screens/graphs/graphs.component';
import { HistoryComponent } from './screens/history/history.component';
import { HomeComponent } from './screens/home/home.component';
import { LightomatorComponent } from './screens/lightomator/lightomator.component';
import { LedEmulatorComponent } from './screens/led-emulator/led-emulator.component';
import { LedStateSwitchComponent } from './components/led-control-panel/led-state-switch/led-state-switch.component';
import { LedSlidersComponent } from './components/led-control-panel/led-sliders/led-sliders.component';
import { LedControlPanelComponent } from './components/led-control-panel/led-control-panel.component';
import { LightingChartComponent } from './screens/graphs/lighting-chart/lighting-chart.component';
import { LedTimingModesComponent } from './screens/lightomator/led-timing-modes/led-timing-modes.component';
import { AuthHeadersInterceptor } from './services/auth-headers-interceptor.service';

@NgModule({
    declarations: [
        AppComponent,
        LightingChartComponent,
        TopbarComponent,
        GraphsComponent,
        HistoryComponent,
        LoginComponent,
        HomeComponent,
        LightomatorComponent,
        LedControlPanelComponent,
        LedTimingModesComponent,
        LedStateSwitchComponent,
        LedSlidersComponent,
        LedEmulatorComponent,
        HeadedComponent,
        HeadlessComponent,
        ConnectionStatusComponent,
    ],
    imports: [
        ChartModule,
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        ColorPickerModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatIconModule,
        MatListModule,
        MatRadioModule,
        FormsModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
        MatSliderModule,
        MatGridListModule,
        MatProgressSpinnerModule,
        LedEmulatorDetachedModule,
    ],
    providers: [
        LedDriverService,
        LightningLevelService,
        { provide: HIGHCHARTS_MODULES, useFactory: () => [ more, exporting, xrange ] },
        AuthGuardService,
        AuthService,
        LedEmulatorViewService,
        EndpointsService,
        EndpointsHealthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: EndpointsStatusInterceptor,
            multi: true
        },{
            provide: HTTP_INTERCEPTORS,
            useClass: AuthHeadersInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}