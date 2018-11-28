import { Component, OnInit } from '@angular/core';

import {MainTransportService} from '../main-transport.service';

@Component({
  selector: 'app-led-control-panel',
  templateUrl: './led-control-panel.component.html',
  styleUrls: ['./led-control-panel.component.css']
})
export class LedControlPanelComponent implements OnInit {

  public currentColor;

  public ledModesList = [
      {code: 0, title: 'AUTO'},
      {code: 1, title: 'MANUAL'},
      {code: 2, title: 'TIMED'}
  ];

  public ledMode = 1;
  public ledState = 0;


  public sliders = {
      'red': {
          'value': 155
      },
      'green': {
          'value': 155
      },
      'blue': {
          'value': 155
      },
      'coldWhite': {
        'value': 155
    },
        'warmWhite': {
            'value': 155
        },
  };

  public ledLightingState = {
      state: 0,
      mode: 0,
      red: 0,
      green: 0,
      blue: 0,
      coldWhite: 0,
      warmWhite: 0,
      light_lvl: 0,
      temperature: 0,
      humidity: 0
  };

  constructor(
    private _mainTransportService: MainTransportService
  ) {
    this.ledMode = 1;
    this.currentColor = this.determineCurrentColor();
  }

  ngOnInit() {
    this.dispatchHealthCheck();
  }

  determineCurrentColor() {
    const red = this.sliders.red.value;
    const green = this.sliders.green.value;
    const blue = this.sliders.blue.value;

    return `rgb(${red}, ${green}, ${blue})`;
  }

  ////

setLedLightingState(data) {

    this.ledMode = data.ledMode;
    this.ledState = data.ledState;

    // this.ledLightingState = {
    //     state: data.ledState,
    //     mode: data.ledMode,
    //     red: data.red.value,
    //     green: data.green.value,
    //     blue: data.blue.value,
    //     coldWhite: data.coldWhite.value,
    //     warmWhite: data.warmWhite.value,
    //     light_lvl: data.light_lvl,
    //     temperature: data.temperature,
    //     humidity: data.humidity,
    // };
    
    this.currentColor = this.determineCurrentColor();
}

setSlidersStates(data) {
    this.sliders.red.value = data.red.value;
    this.sliders.green.value = data.green.value;
    this.sliders.blue.value = data.blue.value;
    this.sliders.coldWhite.value = data.coldWhite.value;
    this.sliders.warmWhite.value = data.warmWhite.value;

    this.currentColor = this.determineCurrentColor();
    this.dispatchLedControlAction();
}

  onLedModeSelect(event) {
      this.ledMode = event.value;
      this.dispatchLedControlAction();
  }

  ngGetLedLightingState() {
      this.currentColor = this.determineCurrentColor();
      
      return {
          state: this.ledState ? 1 : 0,
          mode: this.ledMode,
          red: this.sliders.red.value,
          green: this.sliders.green.value,
          blue: this.sliders.blue.value,
          coldWhite: this.sliders.coldWhite.value,
          warmWhite: this.sliders.warmWhite.value,
      };
  }

  dispatchLedControlAction() {
      const data = this.ngGetLedLightingState();

      this._mainTransportService.setLedParams(data)
          .then((data) => {
              this.setLedLightingState(data);
              this.currentColor = this.determineCurrentColor();
              // console.log('dispatchLedControlAction: ', data);
          });
  }

  dispatchHealthCheck() {
    const that = this;
    this._mainTransportService.performHealthCheck()
        .then((data) => {
            that.setLedLightingState(data);
        });
  }

}
