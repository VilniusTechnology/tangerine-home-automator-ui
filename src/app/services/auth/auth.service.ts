import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EndpointsService } from '../endpoints.service';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public token : string = null;
    public userId : number = null;
    public userEmail : string = null;
    public userName : string = null;

    public loggedIn = false;

    private baseUrl: string;

    constructor(
        private router: Router, 
        private http: HttpClient,
        private endpointsService: EndpointsService
    ) { }

    login(email: string, password: string) {
        this.baseUrl = this.endpointsService.getEndpointUrlByKey('nest');
        this.http.post(`${this.baseUrl}/auth/log-in`, {email: email, password: password}).subscribe((user: any) => {
            console.log(user);
            if(user) {
                console.log(user);

                localStorage.setItem('Auth-token', user.token);
                localStorage.setItem('Auth-email', user.email);

                this.token = user.token;
                this.userEmail = user.email;

                this.router.navigate(['/']);

                return true;
            }

            console.log('error');
            // ELSE: DISPLAY ERR.   
        });
    }

    logout() {
        this.token = null;
        this.userEmail = null;

        // Send request to invalidate token expirity.
        this.router.navigate(['/login']);
    }

    isAuthenticated() {
        return this.getToken() != null; 
    }

    getToken() {
        return localStorage.getItem('Auth-token');
    }

    getEmail() {
        return localStorage.getItem('Auth-email');
    }

    getCredentials() {
        return {email: this.getEmail(), token: this.getToken()};
    }
}
