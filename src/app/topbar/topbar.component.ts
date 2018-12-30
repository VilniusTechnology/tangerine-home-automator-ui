import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: [
    './topbar.component.css',
    './topbar.component.scss'
  ]
})
export class TopbarComponent implements OnInit {

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
    }

    onLogout() {
        console.log('onLogout');
        this.authService.logout();
        this.router.navigate(['login']);
    }

}
