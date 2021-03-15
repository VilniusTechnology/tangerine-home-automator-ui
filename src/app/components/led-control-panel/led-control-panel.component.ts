import {Component, Input, OnInit} from '@angular/core';
import { LedDriverService } from 'src/app/services/led-driver.service';
import { RgbCalculatorService } from 'src/app/services/rgb-calculator.service';
import { EndpointsHealthService } from 'src/app/services/endpoints-health.service';
import {HttpClient} from "@angular/common/http";
import {EndpointsService} from "../../services/endpoints.service";

@Component({
    selector: 'app-led-control-panel',
    templateUrl: './led-control-panel.component.html',
    styleUrls: ['./led-control-panel.component.css']
})

export class LedControlPanelComponent implements OnInit {

  @Input('server') server: any = {};
  uri: string = '';

  public currentColor: any = {};

    public disabled: boolean = true;
    public disabled_all: boolean = true;

    public ledModesList = [
        {code: 1, title: 'MANUAL'},
        {code: 0, title: 'AUTO'},
        {code: 2, title: 'TIMED'}
    ];

    public ledMode = 1;
    public ledState = 0;

    public contourId = 'main';

    public ledDriverService;
    public interval;

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

    constructor(
        private rgbService: RgbCalculatorService,
        private healthService: EndpointsHealthService,
        private  httpClient:  HttpClient,
        private endpointsService: EndpointsService
    ) {
        this.ledMode = 1;
        this.currentColor = this.determineCurrentColor();

        this.ledDriverService = new LedDriverService(
          httpClient,
          endpointsService
        );
    }

    ngOnInit() {
      this.ledDriverService.setUrl(this.server.host);

      this.dispatchHealthCheck();

      this.interval = setInterval(() => {
         this.dispatchHealthCheck();
       }, 5000);

        // this.healthService.subscribeOnEndpointsHealthState().subscribe(
        //     (response) => {
        //       console.log('response: ', response);
        //         if (response.recent == 'ledController') {
        //             if (response.ledController && response.ledController.status) {
        //                 this.disabled = false;
        //                 this.disabled_all = false;
        //                 this.setSlidersStates(response.ledController.data[this.contourId]);
        //                 this.setLedLightingState(response.ledController.data[this.contourId]);
        //             } else {
        //               this.disabled = true;
        //               this.disabled_all = true;
        //             }
        //         }
        //     },
        //     (error) => {
        //         console.log('State NOK');
        //         console.error('GOT AN ERROR ON ledController ENDPOINT: ', error);
        //     }
        // );
    }

  ngOnDestroy() {
    clearTimeout(this.interval);
  }

  dispatchHealthCheck() {
    this.ledDriverService.performHealthCheck(false)
      .then((data) => {
        // console.log('HC OK: ', data);
        this.setLedLightingState(data[this.contourId]);
        this.setSlidersStates(data[this.contourId]);
        this.disabled = false;
        this.disabled_all = false;
      }).catch((rejection) => {
      // console.log('HC rejection: ', rejection);
      this.disabled = true;
      this.disabled_all = true;
    })
  }


  determineCurrentColor() {
        return this.rgbService.determineCurrentColor(this.sliders);
    }

    setLedLightingState(data) {
        if (typeof data == "undefined") {
            return false;
        }

        this.ledMode = data.ledMode;
        this.ledState = data.ledState;

        this.currentColor = this.determineCurrentColor();
    }

    setSlidersStates(data) {
        if (typeof data == "undefined") {
            return false;
        }

        this.sliders.red.value = data.red.value;
        this.sliders.green.value = data.green.value;
        this.sliders.blue.value = data.blue.value;
        this.sliders.coldWhite.value = data.coldWhite.value;
        this.sliders.warmWhite.value = data.warmWhite.value;

        this.currentColor = this.determineCurrentColor();
    }

    toggleLedState($event) {
        this.ledState = Number(!(!!$event));
        this.dispatchLedControlAction();
    }

    ngGetLedLightingState() {
        this.currentColor = this.determineCurrentColor();

        return {
            state: +this.ledState,
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

        this.ledDriverService.setLedParams(false, data)
            .then((data) => {
                this.setLedLightingState(data[this.contourId]);
                this.currentColor = this.determineCurrentColor();
                // console.log('CA OK: ', data);
            }).catch((fail) => {
                // console.log('CA OK: ', fail);
            })
    }

    onLedModeSelect(event) {
        this.ledMode = event.value;

        if (this.ledMode == 1) {
          this.disabled = false;
        }

        if (this.ledMode != 1) {
          this.disabled = true;
        }
        this.dispatchLedControlAction();
    }

    onSlidersChange($event) {
        this.dispatchLedControlAction();
    }

}
