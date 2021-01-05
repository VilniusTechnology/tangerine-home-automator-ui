import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LedDriverService } from 'src/app/services/led-driver.service';

@Component({
    selector: 'app-led-state-switch',
    templateUrl: './led-state-switch.component.html',
    styleUrls: ['./led-state-switch.component.css']
})
export class LedStateSwitchComponent implements OnInit {

  public _ledState: number = 0;
  public _disabled: boolean = true;

    @Input('disabled') set disabled(disabled: boolean) {
      this._disabled = disabled;
      this.resolveLabel();
    }

    @Output() public change = new EventEmitter();

    public currentColor: string = 'white';
    public label: string = '???';

    @Input('state') set ledState(ledState: number)
    {
      this._ledState = ledState ? 1 : 0;
      this.resolveLabel();
    }

    constructor(
        private ledDriverService: LedDriverService
    ) {}

    ngOnInit() {}

    dispatchLedControlAction() {
      this.change.emit(this._ledState);
    }

    returnBool(vari) {
      return vari;
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
