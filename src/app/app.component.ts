import { Component } from '@angular/core';

import {Observable} from 'rxjs';

import {LightingLevel} from './lighting-level';
import {LightningLevelService} from './lightning-level.service';
import {DataService} from './data.service';

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

  constructor() {
  }
}
