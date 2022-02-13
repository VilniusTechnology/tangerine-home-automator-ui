import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LedDriverService } from 'src/app/services/led-driver.service';

@Component({
  selector: 'app-led-sliders',
  templateUrl: './led-sliders.component.html',
  styleUrls: ['./led-sliders.component.scss']
})
export class LedSlidersComponent implements OnInit {

  public buttonsState: boolean = true;
  public _ledState: boolean = true;
  public _disabled: boolean = true;

  @Input('state')
  set ledState(ledState: number) {
    this._ledState = !!ledState;
    this.buttonsState = this.resolveSlidersState();
  }
  get ledState(): number { return +this._ledState; }

  @Input()
  set disabled(disabled: boolean) {
    this._disabled = disabled;
    this.buttonsState = this.resolveSlidersState();
  }
  get disabled(): boolean { return this._disabled; }

  @Input('sliders') public sliders = {
    "red" : {value: 0},
    "green" : {value: 0},
    "blue" : {value: 0},
    "coldWhite" : {value: 0},
    "warmWhite" : {value: 0},
  };

  @Output() public change = new EventEmitter();

  constructor(
    private ledDriverService: LedDriverService
  ) {
    this.buttonsState = true;
  }

  ngOnInit() {
    this.buttonsState = true;
  }

  resolveSlidersState() {
    return this.ledDriverService.resolveState(this._disabled, this._ledState);
  }

  dispatchLedControlAction() {
    this.change.emit(this.sliders);
  }

  oncolorValuechange($event) {
    this.dispatchLedControlAction();
  }

}
