import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
    providedIn: 'root'
})
export class PwaService {

    public promptEvent;

    constructor(private swUpdate: SwUpdate) {
        swUpdate.available.subscribe(event => {
            if (confirm('Update ?')) {
                window.location.reload();
            }
        });

        window.addEventListener('beforeinstallprompt', (event) => {
            this.promptEvent = event;
        });
    }
}
