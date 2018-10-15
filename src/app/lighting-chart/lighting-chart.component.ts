import {ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, ViewChild} from '@angular/core';
import * as d3 from 'd3';

import {LightingLevel} from '../lighting-level';

@Component({
  selector: 'app-lighting-chart',
  templateUrl: './lighting-chart.component.html',
  styleUrls: ['./lighting-chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LightingChartComponent implements OnChanges {
  @ViewChild('chart')
  chartElement: ElementRef;

  @Input()
  lightingLevel: LightingLevel[];

  private svgElement: HTMLElement;
  private chartProps: any;

  constructor() { }

  ngOnChanges() {

    let lvl = new LightingLevel();
    lvl.timestamp = 1050;
    lvl.lightlvl = 67;

    let lvl2 = new LightingLevel();
    lvl2.timestamp = 1051;
    lvl2.lightlvl = 68;

    let lvl3 = new LightingLevel();
    lvl3.timestamp = 1052;
    lvl3.lightlvl = 99;

    let lvl4 = new LightingLevel();
    lvl4.timestamp = 1055;
    lvl4.lightlvl = 10;

    let lvl5 = new LightingLevel();
    lvl5.timestamp = 1055;
    lvl5.lightlvl = 35;

    this.lightingLevel = [lvl, lvl2, lvl3, lvl4, lvl5];

    if (this.lightingLevel) {
      this.buildChart();
    }
  }

  buildChart() {

    console.log('buildChart()', this.lightingLevel);

    this.chartProps = {};

// 2. Use the margin convention practice 
var margin = {top: 50, right: 50, bottom: 50, left: 50}
  , width = window.innerWidth - margin.left - margin.right // Use the window's width 
  , height = window.innerHeight - margin.top - margin.bottom; // Use the window's height

// 5. X scale will use the index of our data
var xScale = d3.scaleLinear()
    .domain([1040, 1060]) // input
    .range([0, width]); // output

// 6. Y scale will use the randomly generate number 
var yScale = d3.scaleLinear()
    .domain([0, 100]) // input 
    .range([height, 0]); // output 

// 7. d3's line generator
var line = d3.line()
    .x(function(d, i) { 
      // set the x values for the line generator
      return xScale(d.x); 
    }) 
    .y(function(d) { 
      // set the y values for the line generator 
      return yScale(d.y); 
    });
    // .curve(d3.curveMonotoneX) // apply smoothing to the line

// 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
var dataset = this.lightingLevel.map(function(d) { 
  return {
    "y": d.lightlvl,
    "x": d.timestamp, 
  } 
})

// 1. Add the SVG to the page and employ #2
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// 3. Call the x axis in a group tag
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

// 4. Call the y axis in a group tag
svg.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

// 9. Append the path, bind the data, and call the line generator 
svg.append("path")
    .style('stroke', 'yellow')
    .style('fill', 'none')
    .datum(dataset) // 10. Binds data to the line 
    .attr("class", "line") // Assign a class for styling 
    .attr("d", line); // 11. Calls the line generator 



//////////////////////////////////////////////
//////////////////////////////////////////////

    // 12. Appends a circle for each datapoint 
    svg.selectAll(".dot")
    .data(dataset)
    .enter().append("circle") // Uses the enter().append() method
    .style('stroke', 'black')
    .style('fill', 'yellow')
    .attr("class", "dot") // Assign a class for styling
    .attr("cx", function(d, i) { return xScale(d.x) })
    .attr("cy", function(d) { return yScale(d.y) })
    .attr("r", 5)
    .on("mouseover", function(d) {	
      
      console.log(d);

      div.transition()		
          .duration(200)		
          .style("opacity", .9)
          .style("background", 'lightsteelblue')
          .style("pointer-events", 'none')
          .style("padding", '10px')
          .style("position", 'absolute');

      div	.html('Timestamp: ' + d.x + "<br/> Light value: " + d.y)	
          .style("left", (d3.event.pageX + 10) + "px")		
          .style("top", (d3.event.pageY - 50) + "px");	
      })					
  .on("mouseout", function(d) {		
      div.transition()		
          .duration(500)		
          .style("opacity", 0);	
  });

    // Define the div for the tooltip
    var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);
  
    // Setting the required objects in chartProps so they could be used to update the chart
    this.chartProps.svg = svg;
  }
}
