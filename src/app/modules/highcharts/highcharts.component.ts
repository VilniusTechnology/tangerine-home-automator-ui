import { Component, OnInit } from '@angular/core';

//import mapJson from './services/ltu-admin-map.json';
import * as HighMaps from 'highcharts/highmaps';

@Component({
  selector: 'app-highcharts',
  templateUrl: './highcharts.component.html',
  styleUrls: ['./highcharts.component.scss']
})

export class HighchartsComponent implements OnInit {

  // Highcharts = HighMaps;
  // chartOptions = {
  //   series: mapJson
  //};

  constructor() { }

  ngOnInit() {
    // console.log(mapJson[0]);
  }

}
