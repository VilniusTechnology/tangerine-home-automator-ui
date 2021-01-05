import { Injectable } from '@angular/core';

import { EndpointsService } from './endpoints.service';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EndpointsHealthService {

    public static readonly defaultInitStatus: boolean = false;
    public endpiontsHealthStatuses: {} = {};

    private enspointsStateSubject = new Subject<any>();

    constructor(
        private httpClient:  HttpClient,
        private endpointsService: EndpointsService
    ) {}

    public checkAllEndpointsHealth() {
        this.endpointsService.getAllEnpointKeys()
            .forEach((endpointConfigKey) => {
                this.checkEndpointHealth(endpointConfigKey);
            });
    }

    public checkEndpointHealth(endpointConfigKey: string) {
        const endpoint = this.endpointsService.getEndpointByKey(endpointConfigKey);
        if (endpoint.healthcheck == false || typeof endpoint.healthcheck == "undefined") {
            return false;
        }

        const url = `${endpoint.url}/healthcheck`;
        this.httpClient.get(url)
        .subscribe(
            (response) => {
                this.updateEndpointHealthStatus(endpointConfigKey, true, response);
            },
            (error) => {
              this.updateEndpointHealthStatus(endpointConfigKey, false, error);
            }
        );
    }

    public periodicallyCheckAllEndpointsHealth(interval: number) {
        setInterval(() => {
            this.checkAllEndpointsHealth();
        }, interval);
    }

    public updateEndpointHealthStatus(endpointConfigKey: string, status: boolean, data) {
        if (typeof endpointConfigKey !== "undefined") {
            this.endpiontsHealthStatuses[endpointConfigKey] = {status: status, data: data};
            this.endpiontsHealthStatuses['recent'] = endpointConfigKey;

            this.enspointsStateSubject.next(this.endpiontsHealthStatuses);
        }
    }

    public subscribeOnEndpointsHealthState(): Observable<any> {
        return this.enspointsStateSubject.asObservable();
    }

    public getEndpointHealthStatus(endpointConfigKey: string) {
        return this.endpiontsHealthStatuses[endpointConfigKey];
    }

    public getEndpointKeyFromUrl(url: string) {
        return this.endpointsService.getEndpointKeyFromUrl(url);
    }
}
