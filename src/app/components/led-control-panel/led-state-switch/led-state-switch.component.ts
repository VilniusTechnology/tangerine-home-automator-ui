import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EndpointsHealthService } from 'src/app/services/endpoints-health.service';
import { LedDriverService } from 'src/app/services/led-driver.service';

@Component({
    selector: 'app-led-state-switch',
    templateUrl: './led-state-switch.component.html',
    styleUrls: ['./led-state-switch.component.css']
})
export class LedStateSwitchComponent implements OnInit {

    @Input('state') public ledState: number = 0;
    @Input('disabled') public disabled: boolean = true;

    @Output() public change = new EventEmitter();

    public currentColor: string = 'white';

    constructor(
        private ledDriverService: LedDriverService
    ) {}

    ngOnInit() {}

    dispatchLedControlAction() {
        this.change.emit(this.ledState);
    }

    resolveLabel() {
        if (this.disabled) {
          return '???';
        }
        
        if(!!this.ledState) {
          return 'ON';
        }

        if( !(!!this.ledState) ) {
            return 'OFF';
          }
      }
}
