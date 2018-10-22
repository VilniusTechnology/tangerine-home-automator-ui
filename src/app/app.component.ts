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

  lightingLevel: LightingLevel[];
  lightingLevelToPlot: LightingLevel[];

  set LightStatus(level: LightingLevel[]) {


    let lvl = new LightingLevel();
    lvl.timestamp = 1050;
    lvl.lightlvl = 67;

    let lvl2 = new LightingLevel();
    lvl2.timestamp = 1051;
    lvl2.lightlvl = 68;

    let lvl3 = new LightingLevel();
    lvl3.timestamp = 1052;
    lvl3.lightlvl = 99;

    let lvl4 = new LightingLevel();
    lvl4.timestamp = 1055;
    lvl4.lightlvl = 10;

    let lvl5 = new LightingLevel();
    lvl5.timestamp = 1055;
    lvl5.lightlvl = 35;

    level = [lvl, lvl2, lvl3, lvl4, lvl5];

    this.lightingLevel = level;
    this.lightingLevelToPlot = level; // this.lightingLevel.slice(0, 20);

    console.log('set LightStatus(', status);
  }

  constructor(private lightingLevelSvc: LightningLevelService) {

    // this.lightingLevelSvc.getInitialLightLevel()
    // .subscribe(lightData => {
    //     console.log('subscribe(', lightData);
    //     this.lightingLevel = lightData;
    //   });
      
  }
}
