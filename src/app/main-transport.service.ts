import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { HttpClient} from  '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AutomatorMainResponse } from './entities/AutomatorMainResponse';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class MainTransportService {
    private baseUrl = environment.mainNestUrl;

    constructor(private  httpClient:  HttpClient) { }

    getData(): Observable<AutomatorMainResponse> {
        return this.httpClient.get<AutomatorMainResponse>(this.baseUrl);
    }

    performHealthCheck() {
        const prom = this.httpClient.get(`${this.baseUrl}`);
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

        const prom = this.httpClient.get(`${this.baseUrl}${queryString}`);
        return new Promise( (resolve, reject) => {
            prom.subscribe((rawData) => {
                resolve(rawData);
            });
        });
    }

    setLedSettings(payload) {
        console.log('payload', payload);
        const prom = this.httpClient.get(`${this.baseUrl}?mode=${payload.mode}&state=${payload.state}`);
        return new Promise( (resolve, reject) => {
            prom.subscribe((rawData) => {
                resolve(rawData);
            });
        });
    }
}
