import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

import {LithuanianAdminMapSvgLoaderService} from './services/lithuanian-admin-map-svg-loader.service';

import mapJson from './services/ltu-admin-map.json';
import * as HighMaps from 'highcharts/highmaps';


@Component({
  selector: 'app-highcharts',
  templateUrl: './highcharts.component.html',
  styleUrls: ['./highcharts.component.scss']
})

export class HighchartsComponent implements OnInit {

  Highcharts = HighMaps;
  chartOptions = {
    series: mapJson
  };

  constructor(
    private mapLoader : LithuanianAdminMapSvgLoaderService
  ) { }

  ngOnInit() {
    console.log(mapJson[0]);
  }

}
