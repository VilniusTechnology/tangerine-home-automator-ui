import { OnInit } from '@angular/core';
import {Component} from '@angular/core';
import {environment} from "../../../environments/environment";
import * as _ from "lodash";

export interface LedLightingState {
    color: string;
    cols: number;
    rows: number;
    text: string;
}

@Component({
  selector: 'app-lightomator',
  templateUrl: './lightomator.component.html',
  styleUrls: ['./lightomator.component.css']
})
export class LightomatorComponent implements OnInit {

    serversArr = [];
    servers = {};

    constructor() { }

    ngOnInit() {
      this.servers = environment.endpoints.led.servers;
      _.forEach(this.servers,(val, key) => {
        this.serversArr.push(val);
      });
    }
}
