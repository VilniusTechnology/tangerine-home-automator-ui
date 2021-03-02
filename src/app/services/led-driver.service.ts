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
        const url = this.getLedUri() + '?contour=' + contour
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
