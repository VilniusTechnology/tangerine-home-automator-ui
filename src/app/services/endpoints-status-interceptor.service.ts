import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { EndpointsHealthService } from './endpoints-health.service';

@Injectable({
  providedIn: 'root'
})

export class EndpointsStatusInterceptor implements HttpInterceptor {

    constructor(
        private endpointsHealthService: EndpointsHealthService,
        ) { 
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).do( (response) => {
            const endpointConfigKey = this.endpointsHealthService.getEndpointKeyFromUrl(req.url);
            this.endpointsHealthService.updateEndpointHealthStatus(endpointConfigKey, true, response);
        })
        .catch( (errorResponse) => {
            const endpointConfigKey = this.endpointsHealthService.getEndpointKeyFromUrl(req.url);
            this.endpointsHealthService.updateEndpointHealthStatus(endpointConfigKey, false, errorResponse);

            return _throw(`${req.urlWithParams} - produced connection errror.`);
        });
    }
}
