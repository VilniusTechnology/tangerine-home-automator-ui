import {Component, Input, OnInit} from '@angular/core';
import {MqttConnectionService} from "../../../services/mqtt-connection.service";
import * as _ from 'lodash';
import {IMqttMessage, MqttService} from "ngx-mqtt";

@Component({
    selector: 'app-mqtt-zigbee-snippet',
    templateUrl: './mqtt-zigbee-snippet.component.html',
    styleUrls: ['./mqtt-zigbee-snippet.component.scss']
})

export class MqttZigbeeSnippetComponent implements OnInit {

  @Input('title') title;
  @Input('device') device = 'zigbee2mqtt/sunny.valgomasis/lamp';

  type = '';

  readings = [];
  status;
  label;

    constructor(
      private mqttConnectionService: MqttConnectionService
    ) {}

    ngOnInit() {
      this.mqttConnectionService.requestSensorData(
        this.device
      ).subscribe((rsp) => {
        // console.log('IKEA: ', rsp);
        //@ts-ignore
        this.setRelayStatus(rsp.state);
        this.populateData('path', rsp);
      });

      this.mqttConnectionService.subscribe(
        this.device
      ).subscribe((data) => {
        // console.log('data: ', data);
        //@ts-ignore
        this.setRelayStatus(data.state);
      });
    }

    populateData(path, data) {
      // console.log('populateData: ', data);

      const keys = [
        'brightness',
        'color_mode',
        'color_temp',
      ];
      // console.log('populateData: ', _.get(data, path));
      _.forEach(keys, (reading, key) => {
        this.readings.push({reading: data[reading], key: reading});
        // console.log('(reading, key): ', reading, data[reading]);
        // console.log('this.readings: ', this.readings);
      });
    }

    setRelayStatus(status) {
      if (status == 'ON') {
        this.status = true;
      } else {
        this.status = false;
      }
      this.resolveLabel();
    }

    sendRelayStatus(ev) {
      // console.log('ev.checked: ', ev.checked);
      let status = 'OFF';

      if (ev.checked) {
        status = 'ON';
      }
      // this.resolveLabel();

      this.mqttConnectionService.publish(this.device + '/set/state', status);
      // this.mqttConnectionService.safePublish(this.device + '/set', {state: status});
    }

    resolveLabel() {
      if (this.status) {
        this.label = 'ON';
      }

      if (!this.status) {
        this.label = 'OFF';
      }

      console.log('this.status: ', this.status);
      console.log('this.label: ', this.label);
    }
}
