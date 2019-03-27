import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
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
    title = 'tangerine-home-automator-ui';

    ngOnInit(): void {
    }

    constructor() { }
}
