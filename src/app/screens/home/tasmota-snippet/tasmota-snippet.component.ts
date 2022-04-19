import {Component, Input, OnInit} from '@angular/core';
import {MqttConnectionService} from "../../../services/mqtt-connection.service";
import * as _ from 'lodash';

@Component({
    selector: 'app-tasmota-snippet',
    templateUrl: './tasmota-snippet.component.html',
    styleUrls: ['./tasmota-snippet.component.scss']
})

export class TasmotaSnippetComponent implements OnInit {

    @Input('title') title;
    @Input('device') device;
    @Input('deviceType') deviceType;

    type = 'stat/';
    readings = [];

    label;
    status;

    label1;
    label2;
    label3;
    label4;

    status1;
    status2;
    status3;
    status4;

    constructor(
      private mqttConnectionService: MqttConnectionService
    ) {}

    ngOnInit() {
      // console.log(this.title, this.device, this.deviceType);
      if (this.deviceType == '4ch') {
        this.mqttConnectionService.subscribeTasmotaData(
          this.device,
          this.type,
          'STATUS11'
        ).subscribe((rs) => {
          // console.log('POWER1 TASMOTA RESPONSE: ', rs);
          this.set4CHRelayStatus(rs);
        });
      } else {
        this.mqttConnectionService.subscribeTasmotaData(
          this.device,
          this.type,
          'POWER'
        ).subscribe((rs) => {
          // console.log(this.title, this.device, 'POWER TASMOTA RESPONSE: ', rs);
          console.log('1 rs: ', rs);
          this.setRelayStatus(rs);
        });
      }

      this.readData().then((data) => {
        this.populateData('StatusSNS.SI7021', data);
        this.populateData('StatusSNS.DS18B20', data);
      });
      this.readRelayStatus().then((rs) => {
        if (rs != undefined) {
          this.setRelayStatus(rs);
        }
      })
    }

    readData() {
      return new Promise((resolve, reject) => {
        this.read(
          this.device,
          this.type,
          'STATUS10'
        ).then((rs) => {
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
          //@ts-ignore
          const status = JSON.parse(rs)
          if (status != undefined) {
            resolve(_.get(status, 'StatusSTS.POWER'));
          }
        });
      });
    }

    read(device, type, command) {
      return new Promise((resolve, reject) => {
        this.mqttConnectionService.subscribeTasmotaData(
          device,
          type,
          command
        ).subscribe((rs) => {
          // @ts-ignore
          resolve(rs);
        });
      });
    }

    populateData(path, data) {
      _.forEach(_.get(data, path), (reading, key) => {
        if (key != 'Id') {
          this.readings.push({reading, key});
        }
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

    set4CHRelayStatus(status) {
      const statuses = JSON.parse(status).StatusSTS;

      this.label1 = statuses.POWER1;
      this.label2 = statuses.POWER2;
      this.label3 = statuses.POWER3;
      this.label4 = statuses.POWER4;

      if (statuses.POWER1 == 'ON') {
        this.status1 = true;
      } else {
        this.status1 = false;
      }

      if (statuses.POWER2 == 'ON') {
        this.status2 = true;
      } else {
        this.status2 = false;
      }

      if (statuses.POWER3 == 'ON') {
        this.status3 = true;
      } else {
        this.status3 = false;
      }

      if (statuses.POWER4 == 'ON') {
        this.status4 = true;
      } else {
        this.status4 = false;
      }

      this.resolveLabel();
    }

    sendRelayStatus(ev, seq = '') {
      console.log(
        'ev: ', ev,
        'seq: ', seq
      );
      let status = 'OFF';

      if (ev.checked) {
        status = 'ON';
      }

      console.log('status: ', status);

      const command = this.device + 'cmnd/POWER' + seq;

      console.log('command: ', command, status);

      this.mqttConnectionService.publish(command, status);
      this.resolveLabel();
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
