import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-led-sliders',
  templateUrl: './led-sliders.component.html',
  styleUrls: ['./led-sliders.component.css']
})
export class LedSlidersComponent implements OnInit {

  @Input('state') public ledState: number = 0;
  @Input('sliders') public sliders = {
    "red" : {value: 0},
    "green" : {value: 0},
    "blue" : {value: 0},
    "coldWhite" : {value: 0},
    "warmWhite" : {value: 0},
  };

  @Output() public change = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  dispatchLedControlAction() {
    this.change.emit(this.sliders);
  }

  oncolorValuechange($event) {
    this.dispatchLedControlAction();
  }

}
