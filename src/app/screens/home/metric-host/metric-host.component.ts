import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-metric-host',
    templateUrl: './metric-host.component.html',
    styleUrls: ['./metric-host.component.css']
})

export class MetricHostComponent implements OnInit {

  @Input('value') value;
  @Input('title') title;

    constructor() {}

    ngOnInit() {}

  roundToTwo(value) {
    return(Math.round(value * 100) / 100);
  }

}
