import { HttpClient } from '@angular/common/http';
import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-recuperator-snippet',
    templateUrl: './recuperator-snippet.component.html',
    styleUrls: ['./recuperator-snippet.component.scss']
})

export class RecuperatorSnippetComponent implements OnInit {

    mode;

    constructor(
      private httpClient:  HttpClient
    ) {}

    ngOnInit() {
      this.getStatus().then((mode) => {
        this.mode = mode;
      });

      setTimeout(() => {
        setInterval(() => {
          this.getStatus().then((mode) => {
            this.mode = mode;
          });
        }, 1500);
      }, 3000);
    }

    getStatus() {
      const prom = this.httpClient.get('https://hub.local/konfovent/status');

      return new Promise( (resolve, reject) => {
          prom.subscribe(
            (rawData) => {
                //@ts-ignore
                resolve(rawData.mode);
            },
            error => reject('https://hub.local/konfovent/status')
          );
      });
    }

    setMode(mode) {
      const prom = this.httpClient.get('https://hub.local/konfovent/set?mode=' + mode.toLowerCase());
      return new Promise( (resolve, reject) => {
          prom.subscribe(
            () => {
                //@ts-ignore
                this.getStatus().then((mode) => {
                  this.mode = mode;
                  console.log('this.mode: ', this.mode);
                  resolve(mode);
              });
            },
            error => reject('https://hub.local/konfovent/set?mode=')
          );
      });
    }

    isSet(mode) {
      if (mode == this.mode) {
        return 'selected';
      }

      return '';
    }

}
