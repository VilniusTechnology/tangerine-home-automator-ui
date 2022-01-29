import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { environment } from 'src/environments/environment';
import {IMqttMessage, MqttService} from "ngx-mqtt";

@Injectable({
  providedIn: 'root'
})

export class MqttConnectionService {
    constructor(
      private mqtt: MqttService
    ) {}

  requestSensorData(topic) {
      const msg = '{"state": ""}';
      const getTopic = topic + '/get';
      // console.log('WILL requestSensorData: ', topic);

      return new Promise((resolve, reject) => {
        this.mqtt.publish(getTopic, msg);

        this.mqtt.observe(topic).subscribe((message: IMqttMessage) => {
          // console.log('requestSensorData Got response[message]: ', message.topic, message.payload.toString());
          if (message.topic == topic) {
            resolve(JSON.parse(message.payload.toString()));
          }
        });
      });
    }

  requestTasmotaData(device) {
      const msg = '0';
      const getTopic = device + 'cmnd/status';

    return new Promise((resolve, reject) => {
      this.publish(getTopic, msg);

      setTimeout(() => {
        resolve(true);
      }, 100);
    });
  }

  subscribeTasmotaData(device, type, command) {
      const topic = device + type + command;

      return new Promise((resolve, reject) => {
        this.requestTasmotaData(device).then(() => {

          this.mqtt.observe(topic).subscribe((message: IMqttMessage) => {
            // console.log('subscribeTasmotaData Got response[message]: ', message.topic);
            if (message.topic == topic) {
              resolve(message.payload.toString());
            }
          });

        });
      });
  }

  publish(topic, message) {
    // console.log('unsafePublish: ', topic, message);
    this.mqtt.unsafePublish(topic, message, {qos: 1, retain: true});
  }

}
