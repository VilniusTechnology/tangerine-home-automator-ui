import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-metric-snippet',
    templateUrl: './metric-snippet.component.html',
    styleUrls: ['./metric-snippet.component.css']
})

export class MetricSnippetComponent implements OnInit {

  @Input('value') value;
  @Input('title') title;

    constructor() {}

    ngOnInit() {}

  roundToTwo(value) {
    if (isNaN(value)){
      return value;
    }

    return(Math.round(value * 100) / 100);
  }

}
