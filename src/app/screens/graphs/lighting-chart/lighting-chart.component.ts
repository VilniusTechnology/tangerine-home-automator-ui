import {ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { HttpClient} from  '@angular/common/http';
import { Injector } from '@angular/core';
import { GraphsComponent } from '../graphs.component';

import * as Highcharts from 'highcharts/highstock';
import * as _ from 'lodash';


Highcharts.setOptions({
    title: {
        style: {
            color: 'orange'
        }
    }
});

@Component({
  selector: 'app-lighting-chart',
  templateUrl: './lighting-chart.component.html',
  styleUrls: ['./lighting-chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LightingChartComponent implements OnInit {
    public options = {
        chart: {
            backgroundColor: '#373648',
            type: 'line',
            events: {
                // load: (x) => {
                //     this.chartService.chartResizeFix(x.target);
                // }
            },
            styledMode: true,
            className: 'line-chart',
        },
        title: {
            text: null,
        },

        subtitle: {
            text: ''
        },

        xAxis: {
            categories: [],
            // className: 'highcharts-style-axisX',
            labels: {
                enabled: false
            },
        },

        yAxis: {
            title: {
                text: null,
            },
            labels: {
                enabled: false
            },
            tickWidth: 1,
            // className: 'highcharts-style-axisY',
        },
        series: [{
            data: [],
            name: 'temperature',
            color: 'orange',
        },{
            data: [],
            name: 'humidity',
            color: 'navy',
        },{
            data: [],
            name: 'preassure',
            color: 'black',
        },{
            data: [],
            name: 'light',
            color: 'yellow',
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        },
        exporting: {
            enabled: false
        },
    };

    public chart;

    public title = 'Line Chart of sensors readings over time';

    constructor(private  httpClient:  HttpClient, private inj:Injector) {
        // this.currentLightReading = this.inj.get(GraphsComponent);
    }

    ngOnInit() {
        this.getDataAndInit();
    }

    private getDataAndInit() {
        this.chart = Highcharts.chart('chart', this.options);

        this.httpClient.get('http://192.168.1.40:8081/sensors/get-all')
        .subscribe(
            data => {
                console.log('getDataAndInit', data);
                this.prepareDataAndFillChart(data);
            },
            error => {
                console.log('Error', error);
            }
        );
    }

    private prepareDataAndFillChart(data: any) {
        let xVals = [];
        let yValsTemp = [];
        let yValsHum = [];
        let yValsPress = [];
        let yValsLight = [];

        _.forEach(data, (value, key) => {
            // console.log(value, key);
            xVals.push(value.timestamp);

            yValsTemp.push({
                y: parseFloat(value.temperature)
            });
            yValsHum.push({
                y: parseFloat(value.humidity)
            });
            yValsPress.push({
                y: parseFloat(value.pressure)
            });
            yValsLight.push({
                y: parseFloat(value.light)
            });
        });

        if (this.chart.xAxis !== undefined) {
            this.chart.xAxis[0].setCategories(xVals);

            // console.log(yValsPress);

            this.chart.series[0].setData(yValsTemp);
            this.chart.series[1].setData(yValsHum);
            this.chart.series[2].setData(yValsPress);
            this.chart.series[3].setData(yValsLight);
        }
    }
}
