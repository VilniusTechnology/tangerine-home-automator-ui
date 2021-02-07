import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';

@Component({
  selector: 'app-led-control-panel-list',
  templateUrl: './led-control-panel-list.component.html',
  styleUrls: ['./led-control-panel-list.component.css']
})
export class LedControlPanelListComponent implements OnInit {

  servers = {};
  serversArr = [];

  server = '';
  uri = '';

  constructor() {

  }

  ngOnInit() {
    this.servers = environment.endpoints.led.servers;
    _.forEach(this.servers,(val, key) => {
      this.serversArr.push(val);
    });
  }
}
