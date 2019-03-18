import { Injectable } from '@angular/core';
import * as _ from 'lodash';

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
    ) {
    }

    public checkAllEndpointsHealth() {
        // console.log('Will checkAllEndpointsHealth');

        this.endpointsService.getAllEnpointKeys()
            .forEach((endpointConfigKey) => {
                // console.log('Will check: ', endpointConfigKey);
                this.checkEndpointHealth(endpointConfigKey);
            });
    }

    public periodicallyCheckAllEndpointsHealth(interval: number) {
        setInterval(() => {
            this.checkAllEndpointsHealth();
        }, interval);
    }

    public checkEndpointHealth(endpointConfigKey: string) {
        const endpointUrl = this.endpointsService.getEndpointUrlByKey(endpointConfigKey);
        this.httpClient.get(`${endpointUrl}/healthcheck`).subscribe( 
            (response) => {
                this.updateEndpointHealthStatus(endpointConfigKey, true);
            },
            (error) => {
                this.updateEndpointHealthStatus(endpointConfigKey, false);
            }
        );
    }

    public subscribeOnEndpointsHealthState(): Observable<any> {
        return this.enspointsStateSubject.asObservable();
    }

    public updateEndpointHealthStatus(endpointConfigKey: string, status: boolean) {
        this.endpiontsHealthStatuses[endpointConfigKey] = status
        this.enspointsStateSubject.next(this.endpiontsHealthStatuses);
        // console.log('updateEndpointHealthStatus', this.endpiontsHealthStatuses);
    }

    public getEndpointHealthStatus(endpointConfigKey: string) {
        return this.endpiontsHealthStatuses[endpointConfigKey];
    }

    public getEndpointKeyFromUrl(url: string) {
        return this.endpointsService.getEndpointKeyFromUrl(url);
    }
}
