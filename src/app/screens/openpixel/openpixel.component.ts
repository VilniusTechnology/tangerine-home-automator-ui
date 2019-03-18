import { Component, OnInit } from '@angular/core';
import { LightAutomatorConnectionService } from 'src/app/services/light-automator-connection.service';

@Component({
  selector: 'app-openpixel',
  templateUrl: './openpixel.component.html',
  styleUrls: ['./openpixel.component.scss']
})
export class OpenpixelComponent implements OnInit {

    public openPixelState;

    constructor(private connectionService: LightAutomatorConnectionService) { }

    ngOnInit() {
    }

    toggleOpenPixel() {
        this.connectionService.toggleOpenPixel().subscribe( (data) => {
            console.log('Got openpixel response: ', data);
        });
    }

}
