import {ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

import { HttpClient} from  '@angular/common/http';
import { Injector } from '@angular/core';

import * as d3 from 'd3';

import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

import dator from 'date-and-time';

import {LightingLevel} from '../services/lighting-level';
import {GraphsComponent} from '../graphs/graphs.component';

@Component({
  selector: 'app-lighting-chart',
  templateUrl: './lighting-chart.component.html',
  styleUrls: ['./lighting-chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LightingChartComponent implements OnInit {
    @ViewChild('chart')
    chartElement: ElementRef;

    @Input()
    public currentReading;

    protected title = 'Line Chart of Lighting lever over time';

    private svgElement: HTMLElement;
    private chartProps: any;

    private margin = {top: 20, right: 30, bottom: 100, left: 10};
    private width: number;
    private height: number;
    private x: any;
    private xScaleOriginal: any;
    private y: any;
    private svg: any;
    private chart: any;
    private line: d3Shape.Line<[number, number]>;


    // https://github.com/datencia/d3js-angular-examples
    constructor(private  httpClient:  HttpClient, private inj:Injector) {

        this.currentReading = this.inj.get(GraphsComponent);

        this.width = 1000 - this.margin.left - this.margin.right;
        this.height = 500 - this.margin.top - this.margin.bottom;
    }

    ngOnInit() {
        this.getDataAndInit();
    }

    private getDataAndInit() {

        let that = this;

        this.httpClient.get('http://192.168.1.47:3001/data')
        .subscribe(
            data => {

                this.initSvg();
                this.initAxis(data);
                this.drawAxis();
                this.drawLine(data);
                this.setBuble(data);
            },
            error => {
                console.log('Error', error);
            }
        );
    }

    private initAxis(data) {

        let parseTime = d3.timeParse("%s");
        data.forEach(function(d) {
            d.date = parseTime(d.timestamp);
        });

        this.x = d3Scale.scaleTime().range([0, this.width]);
        this.y = d3Scale.scaleLinear().range([this.height, 0]);

        this.x.domain(d3Array.extent(data, (d) => d.date ));
        this.y.domain(d3Array.extent(data, (d) => d.level ));

        // zoom
        const zoom = d3.zoom()
                    .on('zoom', this.zoomed.bind(this));
        this.chart.call(zoom);
    }

    private drawLine(data) {
        this.line = d3Shape.line()
            .x( (d: any) => this.x(d.date)  )
            .y( (d: any) => this.y(d.level) );

        this.svg.append('path')
            .datum(data)
            .attr('class', 'line')
            .attr('d', this.line)
            .style('stroke', 'yellow')
            .style('fill', 'none')
            .attr('stroke-width', 2)
            .attr('class', 'line');
    }

    private drawAxis() {

        this.svg.append('g')
            .attr('class', 'axis axis--x')
            .attr('transform', 'translate(0,' + this.height + ')')
            .call(d3Axis.axisBottom(this.x))
            .call(
                d3.axisBottom(this.x)
                .tickFormat(
                    d3.timeFormat("%Y-%m-%d %I:%M:%S")
                ).ticks(25)
            );

        // Rotate x axis labels
        this.svg.selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)");


        this.svg.append('g')
            .attr('class', 'axis axis--y')
            .call(d3Axis.axisLeft(this.y))
            .append('text')
            .attr('class', 'axis-title')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '.71em')
            .style('text-anchor', 'end')
            .text('Ligth lvl');
    }

    protected setBuble(data) {
        // Define the div for the tooltip
        const div = d3.select('#tooltip').append('div')
            .attr('class', 'tooltip')
            .style('opacity', 0);

        // // 12. Appends a circle for each datapoint
        this.svg.selectAll('circle')
            .data(data)
            .enter().append('circle') // Uses the enter().append() method
            .style('stroke', 'black')
            .style('fill', 'yellow')
            .attr('class', 'dot') // Assign a class for styling
            .attr('cx', (d: any) => this.x(d.date) )
            .attr('cy', (d: any) => this.y(d.level) )
            .attr('r', 5)
            .on('mouseover', function(d) {

              const dateTime = new Date(d.timestamp * 1000);
              const msg = 'Timestamp: '
                  + dator.format(dateTime, 'YYYY/MM/DD HH:mm:ss') + ' '
                  + '<br/> Light value: ' + d.level;

                div.transition()
                    .duration(200)
                    .style('opacity', .9)
                    .style('background', 'lightsteelblue')
                    .style('pointer-events', 'none')
                    .style('padding', '10px')
                    .style('position', 'absolute');

                div	.html(msg)
                    .style('left', (d3.event.pageX + 10) + 'px')
                    .style('top', (d3.event.pageY - 50) + 'px');
            })
            .on('mouseout', function(d) {
                div.transition()
                    .duration(500)
                    .style('opacity', 0);
            });
    }

    private initSvg() {

        d3.select('svg').append('rect')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('fill', '#0073e6');

        this.svg = d3.select('svg');
        this.chart = this.svg.append('g')
            .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
    }

    private zoomed() {
        //X Axis zoom
        // const t = d3.event.transform;
        // this.x = t.rescaleX(this.x);
        
        const ta = d3.event.transform;
        this.x.domain(ta.rescaleX(this.xScaleOriginal).domain());

        // this.xAxisElement.call(this.xAxis);
        // for (let [key, value] of this.dataObjects) {
        //     this.chart.select('#' + key + '')
        //         .attr('d', this.valueline(value.data));
        // }
    }
}
