import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';

import {LightningLevelService} from './lightning-level.service';
import {LightingChartComponent} from './lighting-chart/lighting-chart.component';
import { TopbarComponent } from './topbar/topbar.component';


@NgModule({
  declarations: [
    AppComponent,
    LightingChartComponent,
    TopbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    LightningLevelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}