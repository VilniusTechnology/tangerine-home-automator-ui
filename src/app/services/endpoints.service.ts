import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class EndpointsService {
    private endpointType: string;

    constructor() {
        if (!environment.endpoints.useEmulator) {
            this.endpointType = 'hardwareEndpoints';
        }

        if (environment.endpoints.useEmulator) {
            this.endpointType = 'emulatorEndpoints';
        }
    }

    public getEndpointUrlByKey(key: string) {
        return environment.endpoints[this.endpointType][key].url;
    }

    public getEndpointByKey(key: string) {
        return environment.endpoints[this.endpointType][key];
    }

    public getEndpointKeyFromUrl(url: string) {
        const endpointsList = _.invert(environment.endpoints[this.endpointType]);

        return endpointsList[url];
    }

    public getAllEnpointKeys() {
        return _.keys(environment.endpoints[this.endpointType]);
    }

    public getSpecificEndpointKeys(key: string) {
      const endpoints = [];
      _.forEach(environment.endpoints[key].servers, (value, key) => {
        console.log(value.host, key);
        endpoints.push(value.host)
      });

      // return _.keys(environment.endpoints[this.endpointType]);
    }
}
