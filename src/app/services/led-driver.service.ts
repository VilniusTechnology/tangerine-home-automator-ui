import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { HttpClient} from  '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AutomatorMainResponse } from '../models/AutomatorMainResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LedDriverService {
    private baseUrl = environment.ledControllerAddress;

    constructor(private  httpClient:  HttpClient) { 
        if (environment.useEmulator) {
            this.baseUrl = environment.ledEmulatedControllerAdress;
        }
    }

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
                console.log('setLedParams: ', rawData);
                resolve(rawData);
            });
        });
    }

    setLedSettings(payload) {
        const prom = this.httpClient.get(`${this.baseUrl}?mode=${payload.mode}&state=${payload.state}`);
        return new Promise( (resolve, reject) => {
            prom.subscribe((rawData) => {
                console.log('setLedSettings: ', rawData);
                resolve(rawData);
            });
        });
    }
}
