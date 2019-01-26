import * as _ from 'lodash';
import * as moment from 'moment';

import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';

import { Chart } from 'angular-highcharts';
import { LightAutomatorConnectionService } from 'src/app/services/light-automator-connection.service';

@Component({
  selector: 'app-led-timing-modes',
  templateUrl: './led-timing-modes.component.html',
  styleUrls: ['./led-timing-modes.component.css']
})
export class LedTimingModesComponent implements OnInit {

    public myForm: FormGroup;
    public formSet: FormGroup;

    public intervals = [];

    public formTemplate = {
        'title': '',
        'from' : '01:00',
        'to':    '23:59',
        'red' : 0,
        'green' : 0,
        'blue': 0,
    };

    public chart: Chart;

    constructor(
        private fb: FormBuilder,
        private _lightAutomatorConnectionService: LightAutomatorConnectionService
    ) { }

    ngOnInit() {
        this.getTimedModes();

        this.myForm = this.fb.group(this.formTemplate);
        this.formSet = this.fb.group({
            intervals: this.fb.array([])
        });
        // this.myForm.valueChanges.subscribe(console.log);

        this.loadTimedModes();  
    }

    initChart(data, columns) {
        let lineDate = new Date();

        this.chart = new Chart({
            time: {
                timezone: 'Europe/Vilnius',
                useUTC: false,
            },
            chart: {
                type: 'xrange'
            },
            title: {
                text: 'Time ranges visualisation'
            },
            xAxis: {
                type: 'datetime',
                plotLines: [{
                    color: '#FF0000', // Red
                    width: 2,
                    value: lineDate.getTime() // Position, you'll have to translate this to the values on your x axis
                }]
            },
            yAxis: {
                title: {
                    text: ''
                },
                categories: columns,
                reversed: true
            },
            series: [{
                name: 'TimeFrame',
                pointWidth: 20,
                data: data,
                // borderColor: 'gray',
                // dataLabels: {
                //     enabled: true
                // }
            }]
        });
    }

    getTimedModes() {
        this._lightAutomatorConnectionService.getTimedModes().then((data: any) => {
            const current_date = moment().format('YYYY-MM-DD');
            let outData = [];
            let columns = [];
            data.forEach((elem, key) => {
                let date1 = new Date(`${current_date} ${elem.from}:00`);
                date1.getTime();

                let date2 = new Date(`${current_date} ${elem.to}:00`);
                date2.getTime();

                let lightColorString = `rgb(${elem.settings.red}, ${elem.settings.green}, ${elem.settings.blue});`;
                let hexColor = '#' + this.rgbToHex(elem.settings.red) + this.rgbToHex(elem.settings.green) + this.rgbToHex(elem.settings.blue);
                outData.push({
                        x:  Math.round(date1.getTime()),
                        x2: Math.round(date2.getTime()),
                        y: key,
                        color: hexColor,
                        marker: {
                            symbol: 'triangle',
                            radius: 10,
                        }
                    });

                columns.push(`${elem.title} - [${elem.from} | ${elem.to} ]`);
            });

            // console.log('outData: ', outData);
            this.initChart(outData, columns);
        });
    }

    colorRgbToHex(red, green, blue) {
        return  '#' + this.rgbToHex(red) + this.rgbToHex(green) + this.rgbToHex(blue);
    }

    rgbToHex(rgb) { 
        var hex = Number(rgb).toString(16);
        if (hex.length < 2) {
            hex = "0" + hex;
        }
        return hex;
    };

    loadTimedModes() {
        this._lightAutomatorConnectionService.getTimedModes().then((data) => {
            this.intervals = _.values(data);

            this.formSet = this.fb.group({
                intervals: this.fb.array([])
            });

            _.forEach(this.intervals, (val, key) => {
                const dt = val.toJSON();
                this.createFormEntry(dt);
            });

        });
    }

    updateTimedMode(key) {
        // console.log('updateTimedMode', this.formSet['controls'].intervals['controls']);
        this._lightAutomatorConnectionService.editTimedMode(this.formSet['controls'].intervals['controls'][key].value)
            .then((data) => {
                this.loadTimedModes();
            });
    }

    deleteTimedMode(id: string) {
        this._lightAutomatorConnectionService.deleteTimedMode({'id' : id})
            .then((data) => {
                // console.log('deleteTimedMode response: ', data);
                this.loadTimedModes();
            });
    }

    addTimedMode() {
        this._lightAutomatorConnectionService.createTimedMode(this.myForm.value)
            .then((data) => {
                this.loadTimedModes();
                this.createFormEntry(this.formTemplate);
            });
    }

    reloadDb() {
        this._lightAutomatorConnectionService.reloadDb({})
            .then((data) => {
                this.loadTimedModes();
                this.createFormEntry(this.formTemplate);
            });
    }

    createFormEntry(data) {
        this.formSet['controls'].intervals['controls'].push(this.fb.group(data));
    }

    handleAdd(event) {
        event.preventDefault();

        this.addTimedMode();
    }

    handleUpdate(event, id) {
        event.preventDefault();
        // console.log('handleUpdate');
        this.updateTimedMode(id);
    }

    handleDelete(event, id) {
        event.preventDefault();
        this.deleteTimedMode(id);
    }

    updateSeriesData(data: Highcharts.SeriesOptions): void {
        let series = this.chart;
        // console.log('data', data);
        series.addSerie(data, true);
    }

}
