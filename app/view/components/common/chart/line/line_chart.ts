import {Component, Input, Output, EventEmitter, ElementRef, OnChanges} from '@angular/core';
declare var _: any, jQuery: any, window:any, moment;

// import './line_chart.scss';

import 'd3';
import * as tip from 'd3-tip';

declare let d3: any;
d3.tip = tip;

@Component({
  selector: 'zui-line-chart',
  templateUrl: 'line_chart.html'
})


export class LineChartComponent implements OnChanges {
  @Input() data = [];
  @Input() align: string = 'horizontal';
  @Input() dataKeys = [];
  @Input() dataLegends = {};
  @Input() timeKey = '';
  @Input() width: any;
  @Input() height: any;
  @Input() columnColors = [];

  _width;
  _height;
  colors = [];
  _data = [];
  _columns = [];
  _axisLabels = {};
  graph: any;
  svg: any;
  margin: any;
  g: any;

  constructor(private elementRef: ElementRef) {

  }

  renderLineChart(data) {

  }

  ngOnChanges(changedNode) {
    let el: any = this.elementRef.nativeElement;

    if(!(this.data.length)) {
      jQuery(el).find('svg').remove();
      return;
    } else {
      let maxValues = [];

      this.dataKeys.forEach((key, index) => {
        maxValues.push(this.calculateTotal(key));
      });

      let maxValue = Math.max.apply(Math, maxValues);

      jQuery(el).find('svg').remove();

      this.graph = d3.select(el);

      let width = 80 * this.data.length;

      if (width > this.width) {
        this.width = width;
      }

      if (maxValue < 50) {
        this.height = 300;
      }

      this.svg = this.graph.append('svg').attr('width', this.width).attr('height', this.height);
      this.margin = {top: 30, right: 90, bottom: 30, left: 90};

      this._width = this.width - this.margin.right;

      this._height = this.height - this.margin.top - this.margin.bottom;
      this.g = this.svg.append('g').attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

      this._data = [];

      this.dataKeys.forEach((key) => {
        this._data.push([]);
      });

      this.data.forEach((d) => {
        this.dataKeys.forEach((key, index) => {
          if (d[key]) {
            this._data[index].push({
              x: d[this.timeKey],
              y : d[key],
              tooltip : d[key + '_tooltip']
            });
          } else {
            this._data[index].push({
              x: d[this.timeKey],
              y: 0,
              tooltip : d[key + '_tooltip']
            });
          }
        });
      });
      //
      // let colors = _.filter(this.columnColors, (val) => {
      //   return this.dataKeys.indexOf(())
      // });


      let colors = [];

      _.forEach(this.columnColors, (value, key) => {
        if (this.dataKeys.indexOf(key) !== -1) {
          colors.push(value);
        }
      });

      var z = d3.scaleOrdinal()
        .range(colors);

      let xLegend = 40;
      let yLegend = this.height - 50;

      let focus = this.svg.append("g")
        .style("display", "none");

      let legend = this.g.append("g").selectAll('g')
        .data(Object['values'](this.dataLegends).slice())
        .enter().append("g");

      // draw legend colored rectangles
      legend.append("rect")
        .attr("class", "legend-rect")
        .attr("x", 0)
        .attr("y", yLegend - 2)
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", z);

      // draw legend text
      legend.append("text")
        .attr('font-family', 'sans-serif')
        .attr("class", "legend")
        .style("font", "14px")
        .attr("x", xLegend)
        .attr("y", yLegend + 5)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function (d) {
          return d;
        });

      let xScale = d3.scalePoint()
        .domain(this._data[0].map(function(d) {
          return d.x;
        }))
        .range([50, this._width]);

      let yScale;

      if (maxValue >= 10 && maxValue < 100 ) {
        yScale = d3.scaleLinear()
          .domain([0, maxValue + 10]).range([this._height, 10]);
      } else if (maxValue > 1000) {
        yScale = d3.scaleLinear()
          .domain([0, maxValue + 100]).range([this._height, 10]);
      } else if (maxValue > 100) {
        yScale = d3.scaleLinear()
          .domain([0, maxValue + 50]).range([this._height, 10]);
      } else if (maxValue < 10) {
        yScale = d3.scaleLinear()
          .domain([0, maxValue + 1]).range([this._height, 10]);
      }

      let self = this;

      var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset(function(d, i, circles) {
          var rectLeftPosition = circles[i].getBoundingClientRect().left;
          var bBox = this.getBBox();
          var elementHeight = self.dataKeys.length * 40;
          if((bBox.height + elementHeight + 60) > rectLeftPosition) {
            return [-2, 3];
          }
          return [-5, -5];
        })
        .direction(function(d, i, circles) {
          var rectLeftPosition = circles[i].getBoundingClientRect().left;
          var bBox = this.getBBox();
          var elementHeight = 250;
          if((bBox.width + elementHeight + 60) > rectLeftPosition) {
            return 'e';
          }
          return 'w';
        })
        .html(function(d) {
          return d.tooltip;
        });

      this.g.call(tip);

      this._data.forEach((data, index) => {
        let line = d3.line()
          // .curve(d3.curveMonotoneX)
          .x(function(d){ return xScale(d.x);})
          .y(function(d){ return yScale(d.y);});

        this.svg.append("path")
          .attr("d", line(data))
          .attr("class", ".axis")
          .attr("stroke", this.columnColors[this.dataKeys[index]])
          .attr("stroke-width", "4")
          .attr("fill", "none");

        this.svg.selectAll("dot")
          .data(data)
          .enter().append("circle")
          .attr("r", 3)
          .attr("cx", function(d) { return xScale(d.x); })
          .attr("cy", function(d) { return yScale(d.y); })
          .on("mouseover", tip.show)
          .on("mouseout", tip.hide);
      });

      let xAxis = d3.axisBottom(xScale);
      let yAxis = d3.axisLeft(yScale);

      this.svg.append("g").attr("transform", "translate(0," + (this._height) + ")")
        .attr("class", "xAxis")
        .call(xAxis);

      this.svg.append("g")
        .attr("transform", "translate(50, 0)")
        .attr("class", "yAxis")
        .call(yAxis);

      let xCoords = [], xIncr = xLegend;

      this.svg.selectAll(".legend").each(function(element) {
        let width = this.getBoundingClientRect().width;
        d3.select(this).attr("x", xIncr);
        xCoords.push(parseInt(d3.select(this).attr("x")) + 10);
        xIncr = xIncr + width + 50;
      });

      let index = 0;

      this.svg.selectAll(".legend-rect").each(function(element) {
        d3.select(this).attr("x", xCoords[index]);
        index++;
      });

    }

    setTimeout(() => {
      jQuery(window).trigger('resize');
    }, 100);
}

  calculateTotal(axis) {
    let value =  Math.max.apply(Math, this.data.map((o) => o[axis]));
    return value;
  }

}
