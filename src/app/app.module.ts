import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';

import {LightningLevelService} from './lightning-level.service';
import {MainTransportService} from './main-transport.service';
import {DataService} from './data.service';
import {LithuanianAdminMapSvgLoaderService} from './highcharts/services/lithuanian-admin-map-svg-loader.service';


import { ColorPickerModule } from 'ngx-color-picker';
import {LightingChartComponent} from './lighting-chart/lighting-chart.component';
import { TopbarComponent } from './topbar/topbar.component';
import { GraphsComponent } from './graphs/graphs.component';
import { HistoryComponent } from './history/history.component';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { HighchartsComponent } from './highcharts/highcharts.component';

import { HighchartsChartModule } from 'highcharts-angular';
import { ColorSliderComponent } from './color-picker/color-slider/color-slider.component';
import { PromisesComponent } from './promises/promises.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    LightingChartComponent,
    TopbarComponent,
    GraphsComponent,
    HistoryComponent,
    HighchartsComponent,
    ColorSliderComponent,
    HistoryComponent,
    PromisesComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    HighchartsChartModule,
    ColorPickerModule,
  ],
  providers: [
    MainTransportService,
    LightningLevelService,
    DataService,
    LithuanianAdminMapSvgLoaderService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}