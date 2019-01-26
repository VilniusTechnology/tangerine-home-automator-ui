import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-led-sliders',
  templateUrl: './led-sliders.component.html',
  styleUrls: ['./led-sliders.component.css']
})
export class LedSlidersComponent implements OnInit {

  @Input('state') public ledState: number = 0;
  @Input('sliders') public sliders = {
    "red" : 0,
    "green" : 0,
    "blue" : 0,
    "coldWhite" : 0,
    "warmWhite" : 0,
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
