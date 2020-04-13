import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { HttpClient} from  '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AutomatorMainResponse } from '../models/AutomatorMainResponse';
import { EndpointsService } from './endpoints.service';

@Injectable({
  providedIn: 'root'
})

export class LedDriverService {
    private baseUrl: string;

    constructor(
        private  httpClient:  HttpClient, 
        private endpointsService: EndpointsService
    ) { 
        this.baseUrl = this.endpointsService.getEndpointUrlByKey('nest');
    }

    getData(): Observable<AutomatorMainResponse> {
        return this.httpClient.get<AutomatorMainResponse>(this.baseUrl);
    }

    performHealthCheck() {
        const url = `${this.baseUrl}/led`;

        const prom = this.httpClient.get(url);
        return new Promise( (resolve, reject) => {
            prom.subscribe((rawData) => {
                resolve(rawData);
            });
        });
    }

    setLedParams(data) {
        let queryString = '?';
        _.forEach(data, (val, key) => {
            queryString += '&' + key + '=' + val;
        });

        const prom = this.httpClient.get(`${this.baseUrl}/led/${queryString}`);
        return new Promise( (resolve, reject) => {
            prom.subscribe((rawData) => {
                resolve(rawData);
            });
        });
    }

    setLedSettings(payload) {
        const prom = this.httpClient.get(`${this.baseUrl}?mode=${payload.mode}&state=${payload.state}`);
        return new Promise( (resolve, reject) => {
            prom.subscribe((rawData) => {
                resolve(rawData);
            });
        });
    }

    getSensorsData() {
        const url = `${this.baseUrl}/sensors/get-all`;
        const prom = this.httpClient.get(url);
        return new Promise( (resolve, reject) => {
            prom.subscribe((rawData) => {
                resolve(rawData);
            });
        });
    }

    resolveState(disabled, ledState) {
        if (!disabled && ledState) {
          return false;
        }

        return true;
      }
}
