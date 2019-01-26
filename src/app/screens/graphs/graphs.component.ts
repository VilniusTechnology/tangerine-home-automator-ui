import { Component, OnInit } from '@angular/core';
import { AutomatorMainResponse } from 'src/app/models/AutomatorMainResponse';
import { LedDriverService } from 'src/app/services/led-driver.service';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {

    public currentReading = 0;
    public readings: AutomatorMainResponse;

    constructor(private _mainTransportService: LedDriverService) { }

    ngOnInit() {
        this._mainTransportService.getData().subscribe(data => {
            // console.log(data);
            this.readings = data;
            this.currentReading = data.light_lvl;
        });
    }

}

