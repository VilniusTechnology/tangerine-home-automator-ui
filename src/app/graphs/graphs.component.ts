import { Component, OnInit } from '@angular/core';

import {MainTransportService} from '../main-transport.service';
import { AutomatorMainResponse } from '../entities/AutomatorMainResponse';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {

  public currentReading = 0;
  public readings: AutomatorMainResponse;

  constructor(private _mainTransportService: MainTransportService) { }

  ngOnInit() {

    // var intervalID = setInterval(function() {
    //     that.parentComponent.getDataAndInit();
    //     that.lightingLevel = that.parentComponent.currentReading;
    //     console.log(that.lightingLevel);
    // }, 1000);

      this._mainTransportService.getData().subscribe(data => {
      // console.log(data);
      this.readings = data;
      this.currentReading = data.light_lvl;
    });
  }

}

