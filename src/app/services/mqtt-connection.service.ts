import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { environment } from 'src/environments/environment';
import {IMqttMessage, MqttService} from "ngx-mqtt";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class MqttConnectionService {
    constructor(
      private mqtt: MqttService
    ) {}

    subscribe(topic) {
      return new Observable((observer) => {
        // console.log("Observable starts");

        // console.log('subscribe Will subscribe to: ', topic);
        this.mqtt.observe(topic).subscribe((message: IMqttMessage) => {
          // console.log('subscribe Got response[message]: ', message.topic, message.payload.toString());
          if (message.topic == topic) {
            observer.next(JSON.parse(message.payload.toString()));
          }
        });
      });
    }

  requestSensorData(topic) {
      const msg = '{"state": ""}';
      const getTopic = topic + '/get';
      // console.log('WILL requestSensorData: ', topic);

    return new Observable((observer) => {
      // return new Promise((resolve, reject) => {
        // console.log('WILL publish: ', getTopic, msg);
        this.mqtt.publish(getTopic, msg);

        // console.log('subscribe Will observe: ', topic);

        this.mqtt.observe(topic).subscribe((message: IMqttMessage) => {
          // console.log('requestSensorData Got response[message]: ', message.topic, message.payload.toString());
          if (message.topic == topic) {
            // resolve(JSON.parse(message.payload.toString()));
          }
          if (message.topic == topic) {
            observer.next(JSON.parse(message.payload.toString()));
          }
        });
      });
  }

  subscribeTasmotaData(device, type, command) {
      const topic = device + type + command;

      return new Promise((resolve, reject) => {
        this.requestTasmotaData(device).then(() => {

          this.mqtt.observe(topic).subscribe((message: IMqttMessage) => {
            console.log('subscribeTasmotaData Got response[message]: ', message.topic, topic);
            if (message.topic == topic) {
              resolve(message.payload.toString());
            }
          });

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

  publish(topic, message) {
    // console.log('unsafePublish: ', topic, message);
    this.mqtt.unsafePublish(topic, message.toString(), {qos: 1, retain: true});
  }

  safePublish(topic, message) {
    // console.log('unsafePublish: ', topic, message);
    this.mqtt.publish(topic, message.toString(), {qos: 1, retain: true});
  }

}
