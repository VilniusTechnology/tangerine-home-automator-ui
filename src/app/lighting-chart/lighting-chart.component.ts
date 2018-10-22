import {ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

import { HttpClient} from  '@angular/common/http';

import * as d3 from 'd3';

import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

import dator from 'date-and-time';

import {LightingLevel} from '../lighting-level';

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
    lightingLevel: LightingLevel[];

    private svgElement: HTMLElement;
    private chartProps: any;

    title = 'Line Chart';

    private margin = {top: 20, right: 20, bottom: 30, left: 50};
    private width: number;
    private height: number;
    private x: any;
    private y: any;
    private svg: any;
    private line: d3Shape.Line<[number, number]>;


    // https://github.com/datencia/d3js-angular-examples
    constructor(private  httpClient:  HttpClient) {
        this.width = 900 - this.margin.left - this.margin.right;
        this.height = 500 - this.margin.top - this.margin.bottom;
    }

    ngOnInit() {
      this.getDataAndInit();
    }

    private getDataAndInit() {
        this.httpClient.get('http://192.168.1.47:3001/data').subscribe(
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

    private initSvg() {

        d3.select('svg').append('rect')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('fill', '#0073e6');

        this.svg = d3.select('svg')
            .append('g')
            .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
    }

    private initAxis(data) {
        this.x = d3Scale.scaleTime().range([0, this.width]);
        this.y = d3Scale.scaleLinear().range([this.height, 0]);
        this.x.domain(d3Array.extent(data, (d) => d.timestamp ));
        this.y.domain(d3Array.extent(data, (d) => d.level ));
    }

    private drawAxis() {

        this.svg.append('g')
            .attr('class', 'axis axis--x')
            .attr('transform', 'translate(0,' + this.height + ')')
            .call(d3Axis.axisBottom(this.x));

        this.svg.append('g')
            .attr('class', 'axis axis--y')
            .call(d3Axis.axisLeft(this.y))
            .append('text')
            .attr('class', 'axis-title')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '.71em')
            .style('text-anchor', 'end')
            .text('Price ($)');
    }

    private drawLine(data) {
        this.line = d3Shape.line()
            .x( (d: any) => this.x(d.timestamp) )
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

    protected setBuble(data) {

        // Define the div for the tooltip
        const div = d3.select('#chart').append('div')
            .attr('class', 'tooltip')
            .style('opacity', 0);

        // // 12. Appends a circle for each datapoint
        this.svg.selectAll('circle')
            .data(data)
            .enter().append('circle') // Uses the enter().append() method
            .style('stroke', 'black')
            .style('fill', 'yellow')
            .attr('class', 'dot') // Assign a class for styling
            .attr('cx', (d: any) => this.x(d.timestamp) )
            .attr('cy', (d: any) => this.y(d.level) )
            .attr('r', 5)
            .on('mouseover', function(d) {

              const dateTime = new Date(d.timestamp * 1000);
              const msg = 'Timestamp: '
                  + dator.format(dateTime, 'YYYY/MM/DD HH:mm:ss') + ' '
                  + '<br/> Light value: ' + d.level;
              console.log(msg);

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
}
