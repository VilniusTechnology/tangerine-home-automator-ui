import {Component, Input, OnInit} from '@angular/core';
import {MqttConnectionService} from "../../../services/mqtt-connection.service";
import * as _ from 'lodash';

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
        //@ts-ignore
        this.setRelayStatus(rsp.state);
        this.populateData('path', rsp);
      });

      this.mqttConnectionService.subscribe(
        this.device
      ).subscribe((data) => {
        //@ts-ignore
        this.setRelayStatus(data.state);
      });
    }

    populateData(path, data) {
      const parsedData = JSON.parse(data);
      const keys = [
        'brightness',
        'color_mode',
        'color_temp',
      ];
      this.readings = [];
      _.forEach(keys, (reading) => {
        this.readings.push({reading: parsedData[reading], key: reading});
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
      let status = 'OFF';

      if (ev.checked) {
        status = 'ON';
      }

      this.mqttConnectionService.publish(this.device + '/set/state', status);
    }

    resolveLabel() {
      if (this.status) {
        this.label = 'ON';
      }

      if (!this.status) {
        this.label = 'OFF';
      }
    }
}
