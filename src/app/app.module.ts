import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
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
import { GraphsComponent } from './modules/graphs/graphs.component';
import { HighchartsComponent } from './modules/highcharts/highcharts.component';
import { HomeComponent } from './modules/home/home.component';
import { LightingChartComponent } from './modules/lighting-chart/lighting-chart.component';
import { HistoryComponent } from './modules/history/history.component';
import { LedControlPanelComponent } from './modules/led-control-panel/led-control-panel.component';
import { LedTimingModesComponent } from './modules/led-timing-modes/led-timing-modes.component';
import { LedStateSwitchComponent } from './modules/led-control-panel/led-state-switch/led-state-switch.component';
import { LedSlidersComponent } from './modules/led-control-panel/led-sliders/led-sliders.component';
import { LedEmulatorComponent } from './modules/led-emulator/led-emulator.component';
import { LedEmulatorService } from './modules/led-emulator/shared/services/led-emulator.service';
import { LightomatorComponent } from './modules/lightomator/lightomator.component';
import { TopbarComponent } from './layout/topbar/topbar.component';

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
        LedDriverService,
        LightningLevelService,
        { provide: HIGHCHARTS_MODULES, useFactory: () => [ more, exporting, xrange ] },
        AuthGuardService,
        AuthService,
        LedEmulatorService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}