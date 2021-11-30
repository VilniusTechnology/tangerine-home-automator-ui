import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {TimedMode} from '../models/timed-mode';
import * as _ from 'lodash';
import { EndpointsService } from './endpoints.service';

@Injectable({
    providedIn: 'root'
})
export class LightAutomatorConnectionService {

    private baseUrl: string;

    constructor(
        private httpClient: HttpClient,
        private endpointsService: EndpointsService
    ) {
        this.baseUrl = this.endpointsService.getEndpointUrlByKey('nest');
    }

    toggleOpenPixel() {
        return this.httpClient.get(`${this.baseUrl}/openpixel/toggle`);
    }

    launchEffect(id: number, host: string) {
        return this.httpClient.get(`${host}/led/effects/play/${id}`);
    }

    getTimedModes() {
        const prom = this.httpClient.get(`${this.baseUrl}/get-light-time-programs`);

        return new Promise(function(resolve, reject) {
            prom.subscribe((rawData) => {
                let outData = [];
                _.forEach(rawData, (val, key) => {
                    outData[key] = new TimedMode(val);
                });

                resolve(outData);
            });
        });
    }

    createTimedMode(payload) {
        // console.log('payload', payload);
        const prom = this.httpClient.post(`${this.baseUrl}/add-light-time-program`, payload);
        return new Promise( (resolve, reject) => {
            prom.subscribe((rawData) => {
                resolve(rawData);
            });
        });
    }

    editTimedMode(payload) {
        // console.log('payload', payload);
        const prom = this.httpClient.post(`${this.baseUrl}/edit-light-time-program`, payload);
        return new Promise( (resolve, reject) => {
            prom.subscribe((rawData) => {
                resolve(rawData);
            });
        });
    }

    reloadDb(payload) {
        // console.log('payload', payload);
        const prom = this.httpClient.post(`${this.baseUrl}/reload-db`, payload);
        return new Promise( (resolve, reject) => {
            prom.subscribe((rawData) => {
                resolve(rawData);
            });
        });
    }

    deleteTimedMode(payload) {
        const prom = this.httpClient.post(`${this.baseUrl}/delete-light-time-program`, payload);
        return new Promise( (resolve, reject) => {
            prom.subscribe((rawData) => {
                resolve(rawData);
            });
        });
    }

    getEffects() {
        const prom = this.httpClient.get(`${this.baseUrl}/led/effects/list`);
        return new Promise( (resolve, reject) => {
            prom.subscribe((rawData) => {
              console.log('Effects rawData: ', rawData);
                resolve(rawData);
            });
        });
    }
}
