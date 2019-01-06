import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';

import {LightningLevelService} from './services/lightning-level.service';
import {MainTransportService} from './services/main-transport.service';

import { ColorPickerModule } from 'ngx-color-picker';
import {LightingChartComponent} from './lighting-chart/lighting-chart.component';
import { TopbarComponent } from './topbar/topbar.component';
import { GraphsComponent } from './graphs/graphs.component';
import { HistoryComponent } from './history/history.component';

import { AppRoutingModule } from './app-routing.module';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LightomatorComponent } from './lightomator/lightomator.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
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

import { LedControlPanelComponent } from './led-control-panel/led-control-panel.component';
import { LedTimingModesComponent } from './led-timing-modes/led-timing-modes.component';
import {HighchartsComponent} from './highcharts/highcharts.component';

import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';
import * as xrange from 'highcharts/modules/xrange.src';
import { LedStateSwitchComponent } from './led-control-panel/led-state-switch/led-state-switch.component';
import { LedSlidersComponent } from './led-control-panel/led-sliders/led-sliders.component';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { AuthService } from './services/auth/auth.service';
import { LedEmulatorComponent } from './led-emulator/led-emulator.component';
import { SocketService } from './led-emulator/shared/services/socket.service';
import { HeadedComponent } from './layout/headed/headed.component';
import { HeadlessComponent } from './layout/headless/headless.component';

@NgModule({
    declarations: [
        AppComponent,
        LightingChartComponent,
        TopbarComponent,
        GraphsComponent,
        HistoryComponent,
        HighchartsComponent,
        LoginComponent,
        HomeComponent,
        LightomatorComponent,
        LedControlPanelComponent,
        LedTimingModesComponent,
        LedStateSwitchComponent,
        LedSlidersComponent,
        LedEmulatorComponent,
        HeadedComponent,
        HeadlessComponent
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
    ],
    providers: [
        MainTransportService,
        LightningLevelService,
        { provide: HIGHCHARTS_MODULES, useFactory: () => [ more, exporting, xrange ] },
        AuthGuardService,
        AuthService,
        SocketService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}