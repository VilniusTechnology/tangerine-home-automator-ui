import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EndpointsService } from '../endpoints.service';
import { UserModel } from 'src/app/shared/models/system/user-model';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public user: UserModel;
    public token: string = null;
    public userId: number = null;
    public userEmail: string = null;
    public userName: string = null;

    public loggedIn = false;

    private baseUrl: string;

    constructor(
        private router: Router,
        private http: HttpClient,
        private endpointsService: EndpointsService
    ) { }

    login(email: string, password: string) {
        this.baseUrl = this.endpointsService.getEndpointUrlByKey('nest');

        this.http.post<UserModel>(`${this.baseUrl}/auth/log-in`, {email: email, password: password})
        .subscribe((user: UserModel) => {
            if(user) {
                console.log(user);

                localStorage.setItem('Auth-token', user.token);
                localStorage.setItem('Auth-email', user.email);
                localStorage.setItem('user', JSON.stringify(user));

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

        localStorage.removeItem('Auth-token');
        localStorage.removeItem('Auth-email');
        localStorage.removeItem('user');

        // Send request to invalidate token expirity.
        this.router.navigate(['/login']);
    }

    isAuthenticated() {
        return true;
        // return this.getToken() != null;
    }

    getUser(): UserModel {
        return JSON.parse(localStorage.getItem('user'));
    }

    getUserName(): string {
        const data = JSON.parse(localStorage.getItem('user'));

        if (data != null) {
            return data.name;
        }

        return '';
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
