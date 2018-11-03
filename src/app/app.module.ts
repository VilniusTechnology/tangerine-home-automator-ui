import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';

import {LightningLevelService} from './lightning-level.service';
import {MainTransportService} from './main-transport.service';
import {DataService} from './data.service';
import {LithuanianAdminMapSvgLoaderService} from './highcharts/services/lithuanian-admin-map-svg-loader.service';


import {LightingChartComponent} from './lighting-chart/lighting-chart.component';
import { TopbarComponent } from './topbar/topbar.component';
import { GraphsComponent } from './graphs/graphs.component';
import { HistoryComponent } from './history/history.component';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { HighchartsComponent } from './highcharts/highcharts.component';

import { HighchartsChartModule } from 'highcharts-angular';


@NgModule({
  declarations: [
    AppComponent,
    LightingChartComponent,
    TopbarComponent,
    GraphsComponent,
    HistoryComponent,
    HighchartsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    HighchartsChartModule,
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