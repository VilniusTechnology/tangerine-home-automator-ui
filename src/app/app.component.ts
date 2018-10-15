import { Component } from '@angular/core';

import {Observable} from 'rxjs';

import {LightingLevel} from './lighting-level';
import {LightningLevelService} from './lightning-level.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'orange-home-automator-ui';

  lightingLevel: LightingLevel[];
  lightingLevelToPlot: LightingLevel[];

  set LightStatus(level: LightingLevel[]) {
    this.lightingLevel = level;
    this.lightingLevelToPlot = this.lightingLevel.slice(0, 20);

    console.log('set LightStatus(', status);
  }

  constructor(private lightingLevelSvc: LightningLevelService) {

    this.lightingLevelSvc.getInitialLightLevel()
    .subscribe(lightData => {
        console.log('subscribe(', lightData);
        this.lightingLevel = lightData;
      });
      
  }
}
