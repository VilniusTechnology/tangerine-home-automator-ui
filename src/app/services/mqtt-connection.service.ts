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
        this.mqtt.observe(topic).subscribe((message: IMqttMessage) => {
          if (message.topic == topic) {
            observer.next(JSON.parse(message.payload.toString()));
          }
        });
      });
    }

  requestSensorData(topic) {
    const msg = '{"state": ""}';
    const getTopic = topic + '/get';

    return new Observable((observer) => {
        this.mqtt.publish(getTopic, msg);
        this.mqtt.observe(topic).subscribe((message: IMqttMessage) => {
          if (message.topic == topic) {
            observer.next(message.payload.toString());
          }
        });
    });
  }

  subscribeTasmotaData(device, type, command) {
    const topic = device + type + command;

    return new Observable((observer) => {
      this.requestTasmotaData(device).then(() => {
        this.mqtt.observe(topic).subscribe((message: IMqttMessage) => {
          if (message.topic == topic) {
            observer.next(message.payload.toString());
          }
        });
      });

      setTimeout(() => {
        this.requestTasmotaData(device).then(() => {
          this.mqtt.observe(topic).subscribe((message: IMqttMessage) => {
            if (message.topic == topic) {
              observer.next(message.payload.toString());
            }
          });
        });
      }, 3000);
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
    this.mqtt.unsafePublish(topic, message.toString(), {qos: 1, retain: true});
  }

  safePublish(topic, message) {
    this.mqtt.publish(topic, message.toString(), {qos: 1, retain: true});
  }
}
