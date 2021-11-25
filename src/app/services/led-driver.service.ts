import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { HttpClient} from  '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AutomatorMainResponse } from '../models/AutomatorMainResponse';
import { EndpointsService } from './endpoints.service';
import {IMqttMessage, MqttService } from 'ngx-mqtt';
import {Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class LedDriverService {
    private baseUrl: string;
    private subscription: Subscription;

    constructor(
        private  httpClient:  HttpClient,
        private endpointsService: EndpointsService,
        private _mqttService: MqttService
    ) {}

    setUrl(url = '') {
      this.baseUrl = this.endpointsService.getEndpointUrlByKey('nest');
      if (url != '') {
        this.baseUrl = url;
      }
    }


    getData(): Observable<AutomatorMainResponse> {
        return this.httpClient.get<AutomatorMainResponse>(this.baseUrl);
    }

    performHealthCheck(contour) {
        if (contour) {
          contour = 'main';
        }



        let msg = 'contour=' + contour;
        this._mqttService.publish('zigbee2mqtt/shady/led', msg);
        this.subscription = this._mqttService.observe('zigbee2mqtt/shady/sensors.all').subscribe((message: IMqttMessage) => {
          console.log(message.payload.toString());
        });

        const url = this.getLedUri() + '?' + msg;
        const prom = this.httpClient.get(url);

        return new Promise( (resolve, reject) => {
            prom.subscribe(
              (rawData) => {
                  resolve(rawData);
              },
              error => reject(url)
            );
        });
    }

    setLedParams(contour, data) {
        let queryString = '?';
        _.forEach(data, (val, key) => {
            queryString += '&' + key + '=' + val;
        });

        const finUrl = this.getLedUri() + '/' + queryString;
        const prom = this.httpClient.get(finUrl);

        return new Promise( (resolve, reject) => {
            prom.subscribe((rawData) => {
                resolve(rawData);
            });
        });
    }

    getLedUri() {
      return `${this.baseUrl}/led`;
    }

    resolveState(disabled, ledState) {
        if (!disabled && ledState) {
          return false;
        }

        return true;
      }
}
