import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { UserModel } from 'src/app/shared/models/system/user-model';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: [
    './topbar.component.css',
    './topbar.component.scss'
  ]
})
export class TopbarComponent implements OnInit {

    public isEmulated: boolean;
    public user_name: string = '';

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        this.isEmulated = environment.endpoints.useEmulator;
    }

    onLogout() {
        this.authService.logout();
        this.router.navigate(['login']);
    }

    isAuthenticated() {
        return this.authService.isAuthenticated();
    }

    getUserName() {
        return this.authService.getUserName();
    }

}
