import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public token : string = null;
    public loggedIn = false;

    constructor(private router: Router, private http: HttpClient) { }

    login(email: string, password: string) {
        return this.http.post('login.url', {email: email, password: password});
    }

    logout() {

    }

    loginFirebase(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((response) => {
            // console.log(response);
            // console.log(firebase.auth().currentUser.email);

            this.router.navigate(['/']);
            firebase.auth().currentUser.getIdToken().then(
                (token: string) => {
                    this.token = token;
                }
            );

        })
        .catch((error) => {
            // console.log(error);
        });
    }

    logoutFirebase() {
        firebase.auth().signOut();
        this.token = null;
    }



    getToken() {
        return firebase.auth().currentUser.getIdToken();
    }

    isAuthenticated() {
        // console.log('isAuthenticated', this.token);
        return this.token != null; 
    }
}
