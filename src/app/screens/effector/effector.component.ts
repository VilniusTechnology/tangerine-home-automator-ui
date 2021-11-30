import { Component, OnInit } from '@angular/core';
import { LightAutomatorConnectionService } from 'src/app/services/light-automator-connection.service';
import {environment} from "../../../environments/environment";
import * as _ from "lodash";

@Component({
  selector: 'app-effector',
  templateUrl: './effector.component.html',
  styleUrls: ['./effector.component.scss']
})
export class EffectorComponent implements OnInit {

  effects;
  servers = {};
  serversArr = [];

  constructor(
    private connectionService: LightAutomatorConnectionService
  ) { }

  ngOnInit() {
    this.servers = environment.endpoints.led.servers;
    _.forEach(this.servers,(val, key) => {
      this.serversArr.push(val);
    });

    this.connectionService.getEffects().then((rs) => {
      this.effects = rs;
    });
  }

  launchEffect(id, host) {
      this.connectionService.launchEffect(id, host).subscribe( (data) => {
          // console.log('Got effect response: ', data);
      });
  }

  stopCurrentEffect() {

  }
}
