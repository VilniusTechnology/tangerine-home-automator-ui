import { OnInit } from '@angular/core';
import {Component} from '@angular/core';
import {FormGroup, FormBuilder, FormArray} from '@angular/forms';
import {LightAutomatorConnectionService} from '../light-automator-connection.service';
import {MainTransportService} from '../main-transport.service';

import * as _ from 'lodash';

export interface LedLightingState {
    color: string;
    cols: number;
    rows: number;
    text: string;
}

@Component({
  selector: 'app-lightomator',
  templateUrl: './lightomator.component.html',
  styleUrls: ['./lightomator.component.css']
})
export class LightomatorComponent implements OnInit {

    public myForm: FormGroup;
    public formSet: FormGroup;

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

    public intervals = [];

    public formTemplate = {
        'title': '',
        'from' : '01:00',
        'to':    '23:59',
        'red' : 0,
        'green' : 0,
        'blue': 0,
    };

    constructor(
        private fb: FormBuilder,
        private _lightAutomatorConnectionService: LightAutomatorConnectionService,
        private _mainTransportService: MainTransportService
    ) { }

    ngOnInit() {
        this.ledMode = 1;

        this.myForm = this.fb.group(this.formTemplate);

        this.formSet = this.fb.group({
            intervals: this.fb.array([])
        });

        this.myForm.valueChanges.subscribe(console.log);

        this.loadTimedModes();
        this.dispatchHealthCheck();

        this.currentColor = this.determineCurrentColor();
    }

    dispatchHealthCheck() {
        const that = this;
        this._mainTransportService.performHealthCheck()
            .then((data) => {
                that.setLedLightingState(data);
            });
    }

    setLedLightingState(data) {
        this.ledLightingState = {
            state: data.ledState,
            mode: data.ledMode,
            red: data.red.value,
            green: data.green.value,
            blue: data.blue.value,
            coldWhite: data.coldWhite.value,
            warmWhite: data.warmWhite.value,
            light_lvl: data.light_lvl,
            temperature: data.temperature,
            humidity: data.humidity,
        };

        this.sliders.red.value = data.red.value;
        this.sliders.green.value = data.green.value;
        this.sliders.blue.value = data.blue.value;
        this.currentColor = this.determineCurrentColor();
    }

    ngGetLedLightingState() {
        this.currentColor = this.determineCurrentColor();
        return {
            state: this.ledState ? 1 : 0,
            mode: this.ledMode ? 1 : 0,
            red: this.sliders.red.value,
            green: this.sliders.green.value,
            blue: this.sliders.blue.value,
            coldWhite: this.sliders.blue.value,
            warmWhite: this.sliders.blue.value,
        };
    }

    dispatchLedControlAction() {
        const that = this;
        this._mainTransportService.setLedParams(this.ngGetLedLightingState())
            .then((data) => {
                that.setLedLightingState(data);
                that.currentColor = this.determineCurrentColor();
                // console.log('dispatchLedControlAction: ', data);
            });

    }

    get intervalsForms() {
        return this.formSet.get('intervals') as FormArray;
    }

    loadTimedModes() {
        const that = this;
        this._lightAutomatorConnectionService.getTimedModes().then((data) => {
            that.intervals = _.values(data);

            that.formSet = this.fb.group({
                intervals: this.fb.array([])
            });

            _.forEach(that.intervals, (val, key) => {
                const dt = val.toJSON();
                that.createFormEntry(dt);
            });

        });
    }

    updateTimedMode(id) {
        const that = this;
        this._lightAutomatorConnectionService.editTimedMode(this.formSet.controls.intervals.controls[id].value)
            .then((data) => {
                that.loadTimedModes();
            });
    }

    deleteTimedMode(id) {
        const that = this;
        this._lightAutomatorConnectionService.deleteTimedMode(this.myForm.value)
            .then((data) => {
                console.log('handleClick', this.formSet.controls.intervals.controls);
                // that.loadTimedModes();
                // that.formSet.removeAt(data.i);
            });
    }

    addTimedMode() {
        const that = this;
        this._lightAutomatorConnectionService.createTimedMode(this.myForm.value)
            .then((data) => {
                console.log('handleClick', data);
                that.loadTimedModes();
                that.createFormEntry(this.formTemplate);
            });
    }

    /////

    createFormEntry(data) {
        const interval = this.fb.group(data);
        this.intervalsForms.push(interval);
    }
    ////

    determineCurrentColor() {
        const red = this.sliders.red.value;
        const green = this.sliders.green.value;
        const blue = this.sliders.blue.value;

        return `rgb(${red}, ${green}, ${blue})`;
    }
    ////

    handleAdd(event) {
        event.preventDefault();
        console.log(this.myForm.value);

        this.addTimedMode();
    }

    handleUpdate(event, id) {
        event.preventDefault();
        this.updateTimedMode(id);
        console.log(id);
    }

    handleDelete(event, id) {
        event.preventDefault();
        this.deleteTimedMode(id);
    }

}
