import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
    providedIn: 'root'
})
export class PwaService {

    public promptEvent;

    constructor(private swUpdate: SwUpdate) {
        swUpdate.available.subscribe(event => {
          // console.log('uod');
        });

        window.addEventListener('beforeinstallprompt', (event) => {
            this.promptEvent = event;
        });
    }
}
