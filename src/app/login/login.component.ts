import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public showSpinner = false;

    constructor(private authService: AuthService) { }

    ngOnInit() {
    }

    onLogin(form: NgForm) {

        this.showSpinner = true;

        const email    = form.value.email; 
        const password = form.value.password;

        this.authService.login(email, password);
        this.showSpinner = false;
    }
}
