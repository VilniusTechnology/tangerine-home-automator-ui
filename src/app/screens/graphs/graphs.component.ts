import { Component, OnInit } from '@angular/core';
import { AutomatorMainResponse } from 'src/app/models/AutomatorMainResponse';
import { LedDriverService } from 'src/app/services/led-driver.service';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {

    public currentReading: number = 0;
    public readings: any;

    constructor(private _mainTransportService: LedDriverService) { }

    ngOnInit() {
        // this._mainTransportService.getSensorsData().then(data => {
        //     this.readings = data;
        //     // this.currentReading = data.light_lvl;
        // });
    }

}

