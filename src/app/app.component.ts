import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import {VersionCheckService} from "./services/version-check.service";

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

    constructor(
      private versionService: VersionCheckService
    ) { }

  ngOnInit(): void {
    if (environment.envTitle == 'PROD'
      || environment.envTitle == 'TEST'
    ) {
      this.versionService.initVersionCheck("/version.json");
    }
  }
}
