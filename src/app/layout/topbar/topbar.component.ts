import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';

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

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        this.isEmulated = environment.endpoints.useEmulator;
    }

    onLogout() {
        this.authService.logout();
        this.router.navigate(['login']);
    }

}
