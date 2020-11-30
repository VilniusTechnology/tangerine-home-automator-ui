import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EndpointsHealthService } from 'src/app/services/endpoints-health.service';
import { LedDriverService } from 'src/app/services/led-driver.service';

@Component({
    selector: 'app-led-state-switch',
    templateUrl: './led-state-switch.component.html',
    styleUrls: ['./led-state-switch.component.css']
})
export class LedStateSwitchComponent implements OnInit {

  private _ledState: number = 0;
  private _disabled: boolean = true;

    @Input('disabled') set disabled(disabled: boolean) { this._disabled = disabled; this.resolveLabel(); }

    @Output() public change = new EventEmitter();

    public currentColor: string = 'white';
    public label: string = '???';

    @Input('state') set ledState(ledState: number)
    {
      this._ledState = ledState;
      this.resolveLabel();
    }

    constructor(
        private ledDriverService: LedDriverService
    ) {}

    ngOnInit() {}

    dispatchLedControlAction() {
      console.log('this._ledState: ', this._ledState);
      this.change.emit(this._ledState);
    }

    resolveLabel() {
        if (this._disabled) {
          this.label = '???';
        }

        if(!!this._ledState) {
          this.label = 'ON';
        }

        if( !(!!this._ledState) ) {
          this.label = 'OFF';
        }
      }
}
