import { Component, OnInit } from '@angular/core';
import { LedEmulatorViewService } from 'src/app/services/led-view-emulator.service';

@Component({
  selector: 'app-led-emulator',
  templateUrl: './led-emulator.component.html',
  styleUrls: ['./led-emulator.component.scss']
})
export class LedEmulatorComponent implements OnInit {

    public currentColor: any = {};
  
    constructor(private ledEmulatorService: LedEmulatorViewService) { }
    
    ngOnInit(): void {
        this.ledEmulatorService.subscribeOnColorsSubject().subscribe(
            (response) => {
                this.currentColor = response;
            }
        );
    }

    openNewWindow() {
        window.open('/led-outlet', '', 'width=450,height=280');
    }

}
