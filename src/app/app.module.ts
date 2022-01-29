import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { EffectorComponent } from './screens/effector/effector.component';
import { OpenpixelComponent } from './screens/openpixel/openpixel.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {LedControlPanelListComponent} from "./components/led-control-panel/led-control-panel-list/led-control-panel-list.component";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { GaugeModule } from 'angular-gauge';
import {MetricSnippetComponent} from "./screens/home/metric-snippet/metric-snippet.component";
import {MetricHostComponent} from "./screens/home/metric-host/metric-host.component";
import {KeysComponent} from "./screens/keys/keys.component";
import {MatDialogModule} from "@angular/material/dialog";
import {UpdateDialogComponent} from "./components/update-dialog/update-dialog.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { IMqttServiceOptions, MqttModule } from "ngx-mqtt";

@NgModule({
    declarations: [
        AppComponent,
        LightingChartComponent,
        MetricSnippetComponent,
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
        LedControlPanelListComponent,
        MetricHostComponent,
        KeysComponent,
        LedEmulatorComponent,
        HeadedComponent,
        HeadlessComponent,
        ConnectionStatusComponent,
        EffectorComponent,
        OpenpixelComponent,
        UpdateDialogComponent,
    ],
    imports: [
        MqttModule.forRoot({
          protocol: environment.endpoints.mqtt.protocol,
          hostname: environment.endpoints.mqtt.server,
          port: environment.endpoints.mqtt.port,
        }),
        GaugeModule.forRoot(),
        NgbModule,
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
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
        MatSliderModule,
        MatGridListModule,
        MatProgressSpinnerModule,
        LedEmulatorDetachedModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
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
    bootstrap: [AppComponent],
    entryComponents: [
      UpdateDialogComponent,
    ],
})
export class AppModule {}
