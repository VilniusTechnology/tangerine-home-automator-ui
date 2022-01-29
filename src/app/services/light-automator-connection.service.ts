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

    getTimedModes(url) {
        const prom = this.httpClient.get(`${url}/get-light-time-programs`);

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

    createTimedMode(url, payload) {
        // console.log('payload', payload);
        const prom = this.httpClient.post(`${url}/add-light-time-program`, payload);
        return new Promise( (resolve, reject) => {
            prom.subscribe((rawData) => {
                resolve(rawData);
            });
        });
    }

    editTimedMode(url, payload) {
        // console.log('payload', payload);
        const prom = this.httpClient.post(`${url}/edit-light-time-program`, payload);
        return new Promise( (resolve, reject) => {
            prom.subscribe((rawData) => {
                resolve(rawData);
            });
        });
    }

    reloadDb(url, payload) {
        // console.log('payload', payload);
        const prom = this.httpClient.post(`${url}/reload-db`, payload);
        return new Promise( (resolve, reject) => {
            prom.subscribe((rawData) => {
                resolve(rawData);
            });
        });
    }

    deleteTimedMode(url, payload) {
        const prom = this.httpClient.post(`${url}/delete-light-time-program`, payload);
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
                resolve(rawData);
            });
        });
    }
}
