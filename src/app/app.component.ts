import { Component } from '@angular/core';

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
    './app.component.scss'
  ]
})
export class AppComponent {
    title = 'orange-home-automator-ui';

    ngOnInit(): void {
        firebase.initializeApp({
            apiKey: "",
            authDomain: "mandarin-home-automator-ui.firebaseapp.com",
        });
    }

    constructor() {

    }
}
