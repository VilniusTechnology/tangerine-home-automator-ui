import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';

import {LightningLevelService} from './lightning-level.service';
import {MainTransportService} from './main-transport.service';
import {DataService} from './data.service';

import { ColorPickerModule } from 'ngx-color-picker';
import {LightingChartComponent} from './lighting-chart/lighting-chart.component';
import { TopbarComponent } from './topbar/topbar.component';
import { GraphsComponent } from './graphs/graphs.component';
import { HistoryComponent } from './history/history.component';

import { AppRoutingModule } from './app-routing.module';


import { ColorSliderComponent } from './color-picker/color-slider/color-slider.component';
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
import { LedControlPanelComponent } from './led-control-panel/led-control-panel.component';
import { LedTimingModesComponent } from './led-timing-modes/led-timing-modes.component';
import {HighchartsComponent} from './highcharts/highcharts.component';

import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';
import * as xrange from 'highcharts/modules/xrange.src';


@NgModule({
  declarations: [
      AppComponent,
      LightingChartComponent,
      TopbarComponent,
      GraphsComponent,
      HistoryComponent,
      ColorSliderComponent,
      HighchartsComponent,
      LoginComponent,
      HomeComponent,
      LightomatorComponent,
      LedControlPanelComponent,
      LedTimingModesComponent
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
  ],
  providers: [
    MainTransportService,
    LightningLevelService,
    DataService,
    { provide: HIGHCHARTS_MODULES, useFactory: () => [ more, exporting, xrange ] },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}