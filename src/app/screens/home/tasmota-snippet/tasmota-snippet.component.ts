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
      if (this.deviceType == '4ch') {
        this.mqttConnectionService.subscribeTasmotaData(
          this.device,
          this.type,
          'STATUS11'
        ).subscribe((rs) => {
          this.set4CHRelayStatus(rs);
        });
        this.mqttConnectionService.subscribeTasmotaData(
          this.device,
          this.type,
          'RESULT'
        ).subscribe((rs) => {
          this.set4CHRelayStatus(rs);
        });
      } else {
        this.mqttConnectionService.subscribeTasmotaData(
          this.device,
          this.type,
          'POWER'
        ).subscribe((rs) => {
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
      _.forEach(_.get(JSON.parse(data), path), (reading, key) => {
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

      if (statuses !== undefined) {
        this.label1 = statuses.POWER1;
        this.label2 = statuses.POWER2;
        this.label3 = statuses.POWER3;
        this.label4 = statuses.POWER4;
      } else {
      const statuses = JSON.parse(status).StatusSTS;
        const p1 = JSON.parse(status).POWER1;
        if (p1 !== undefined) {
          this.label1 = p1;
        }
        const p2 = JSON.parse(status).POWER2;
        if (p2 !== undefined) {
          this.label2 = p2;
        }
        const p3 = JSON.parse(status).POWER3;
        if (p3 !== undefined) {
          this.label3 = p3;
        }
        const p4 = JSON.parse(status).POWER4;
        if (p4 !== undefined) {
          this.label4 = p4;
        }
      }

      if (this.label1 == 'ON') {
        this.status1 = true;
      } else {
        this.status1 = false;
      }

      if (this.label2 == 'ON') {
        this.status2 = true;
      } else {
        this.status2 = false;
      }

      if (this.label3 == 'ON') {
        this.status3 = true;
      } else {
        this.status3 = false;
      }

      if (this.label4 == 'ON') {
        this.status4 = true;
      } else {
        this.status4 = false;
      }
    }

    sendRelayStatus(ev, seq = '') {
      let status = 'OFF';

      if (ev.checked) {
        status = 'ON';
      }

      const command = this.device + 'cmnd/POWER' + seq;

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
