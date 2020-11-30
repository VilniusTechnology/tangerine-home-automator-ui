import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthHeadersInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if(this.authService.getCredentials().token != null) {
            const oldHeaders = req.headers.keys();

            let hdrs = {};
            var i;
            for (i = 0; i < oldHeaders.length; i++) {
                hdrs[oldHeaders[i]] = req.headers.get(oldHeaders[i]);
            }

            _.assign(
                hdrs, 
                {'Auth-token': this.authService.getCredentials().token}, 
                {'Auth-email': this.authService.getCredentials().email}
            );

            const authReq = req.clone({
                headers: new HttpHeaders(hdrs)
            });

            req = authReq;
        }

        return next.handle(req)
            .catch((err) => { 
                console.log('Caught connection error', err);
                if (err.status == 401) {
                    this.authService.logout();
                }
                

                return Observable.throw(err);
            });
    }
}
