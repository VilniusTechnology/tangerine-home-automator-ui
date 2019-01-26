import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RgbCalculatorService } from 'src/app/services/rgb-calculator.service';
import { LedEmulatorViewService } from 'src/app/services/led-view-emulator.service';

@Component({
  selector: 'app-light-outlet',
  templateUrl: './light-outlet.component.html',
  styleUrls: ['./light-outlet.component.scss']
})
export class LightOutletComponent implements OnInit {

    public title = "Detached LED emulator";
    public currentColor: {} = {};

    constructor(
        private titleService: Title , 
        private rgbService: RgbCalculatorService,
        private ledEmulatorService: LedEmulatorViewService
    ) { }

    ngOnInit() {
        this.titleService.setTitle(this.title);

        this.ledEmulatorService.subscribeOnColorsSubject().subscribe(
            (response) => {
                this.currentColor = response;
            }
        );   
    }

    determineCurrentColor(colors: any) {
        return this.rgbService.determineCurrentColor(colors);
    }

}
