import {Component, Input, OnInit} from '@angular/core';
import {MqttConnectionService} from "../../../services/mqtt-connection.service";
import * as _ from 'lodash';
import {IMqttMessage, MqttService} from "ngx-mqtt";

@Component({
    selector: 'app-tasmota-snippet',
    templateUrl: './tasmota-snippet.component.html',
    styleUrls: ['./tasmota-snippet.component.scss']
})

export class TasmotaSnippetComponent implements OnInit {

  @Input('value') value;
  @Input('title') title;

  device = 'tasmota/top/server/';
  type = 'stat/';

  readings = [];
  status;

    constructor(
      private mqttConnectionService: MqttConnectionService
    ) {}

    ngOnInit() {
      this.mqttConnectionService.subscribeTasmotaData(
        this.device,
        this.type,
        'POWER'
      ).then((rs) => {
        // console.log('POWER TASMOTA RESPONSE: ', rs);
        this.setRelayStatus(rs);
      });

      this.readData().then((data) => {
        this.populateData('StatusSNS.SI7021', data);
      });
      this.readRelayStatus().then((rs) => {
        this.setRelayStatus(rs);
      })
    }

    readData() {
      return new Promise((resolve, reject) => {
        this.read(
          this.device,
          this.type,
          'STATUS10'
        ).then((rs) => {
          // console.log('readData TASMOTA RESPONSE: ', rs);
          resolve(rs);
        });
      });
    }

    readRelayStatus() {
      return new Promise((resolve, reject) => {
        this.read(
          this.device,
          this.type,
          'STATUS11'
        ).then((rs) => {
          // console.log('TASMOTA RESPONSE 11: ', _.get(rs, 'StatusSTS.POWER') );
          resolve(_.get(rs, 'StatusSTS.POWER'));
        });
      });
    }

    read(device, type, command) {
      return new Promise((resolve, reject) => {
        this.mqttConnectionService.subscribeTasmotaData(
          device,
          type,
          command
        ).then((rs) => {
          // console.log('read TASMOTA RESPONSE: ', rs);
          // @ts-ignore
          resolve(JSON.parse(rs));
        });
      });
    }

    populateData(path, data) {
      // console.log('populateData: ', _.get(data, path));
      _.forEach(_.get(data, path), (reading, key) => {
        this.readings.push({reading, key});
        // console.log('this.readings: ', this.readings);
      });
    }

    setRelayStatus(status) {
      if (status == 'ON') {
        this.status = true;
      } else {
        this.status = false;
      }
    }

    sendRelayStatus(ev) {
      // console.log('ev.checked: ', ev.checked);
      let status = 'OFF';

      if (ev.checked) {
        status = 'ON';
      }

      // console.log('status: ', status);
      // this.status = ev.checked;
      this.mqttConnectionService.publish(this.device + 'cmnd/POWER', status);
    }
}
