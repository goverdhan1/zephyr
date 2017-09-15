import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, HostListener} from '@angular/core';
declare var _: any, jQuery: any, window:any;

// import './bar_chart.scss';

import 'd3';
import * as tip from 'd3-tip';

declare let d3: any;
d3.tip = tip;


/*
* SAMPLE DATA FORMAT
* {
 x: '%',
 y: 'Cycle',
 data : [
 {
 x : {
 entries : [
 {
 name : 'executed',
 value : 23,
 color : '#ffffff'
 },
 {
 name : 'unexecuted',
 value : 47,
 color : "#0000000"
 }
 ]
 },
 y : {
 id : 1,
 name : 'Cycle 1'
 },
 tooltip : '<p></p>',
 label : 25% executed
 },
 {
 x : {
 entries : [
 {
 name : 'executed',
 value : 63,
 color : '#ffffff'
 },
 {
 name : 'unexecuted',
 value: 37,
 color : "#0000000"
 }
 ]
 },
 y : {
 id : 2,
 name : 'Cycle 2'
 },
 tooltip : '<p></p>',
 label : 75% unexecuted
 }
 ]
 };
*/

@Component({
    selector: 'zui-bar-chart',
    templateUrl: 'bar_chart.html'
})
export class BarChartComponent implements OnChanges {
  @Input() data = [];
  @Input() align: string = 'horizontal';
  @Input() width: any;
  @Input() height: any;
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
  _defaultColors = ['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00'];

  constructor(private elementRef: ElementRef) {

  }

  renderVerticalBarChart(data) {
    //console.log('TDB')
  }

  renderHorizontalBarChart(data) {

    var x = d3.scaleLinear()
      .rangeRound([0, this._width]);

    var y = d3.scaleBand()
      .rangeRound([0, this._height])
      .paddingInner(0.4)
      .align(0.1);

    var z = d3.scaleOrdinal()
      .range(this.colors);

    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset(function(d, i, rects) {
        var rectTopPosition = rects[i].getBoundingClientRect().top;
        var bBox = this.getBBox();
        var elementHeight = d.data.x.entries.length * 25;
        if((bBox.height + elementHeight + 60) > rectTopPosition) {
          return [10, 0];
        }
        return [-10, 0];
      })
      .direction(function(d, i, rects) {
        var rectTopPosition = rects[i].getBoundingClientRect().top;
        var bBox = this.getBBox();
        var elementHeight = d.data.x.entries.length * 25;
        if((bBox.height + elementHeight + 60) > rectTopPosition) {
          return 'e';
        }
        return 'n';
      })
      .html(function(d) {
        return d.data.tooltip;
      });

    y.domain(data.map(function (d) {
      return d.y.id;
    }));

    x.domain([0, d3.max(data, function (d) {
      return d.total;
    })]).nice();

    z.domain(this._columns);

    this.g.call(tip);

    let rectg = this.g.append('g')
      .selectAll('g')
      .data(d3.stack().keys(this._columns)(data))
      .enter().append('g')
      .attr('fill', function (d) {
        return z(d.key);
      })
      .selectAll('rect')
      .data(function (d) {
        return d;
      });
    rectg.enter().append('rect')
      .attr('y', function (d) {
        if(y.bandwidth() < 40) {
          return y(d.data.y.id);
        } else {
          return y(d.data.y.id) + (y.bandwidth() - 40) / 2;
        }
      })
      .attr('x', function (d) {
        return x(d[0]);
      })
      .attr('width', function (d) {
        return isNaN(d[1]) ? 0 : x(d[1]) - x(d[0]);
      })
      .attr('height', Math.min(y.bandwidth(), 40))
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
      .call(this.appendLabelAtTop, x, y);

    this.g.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + this._height + ')')
      .call(d3.axisBottom(x))
      .append('text')
      .attr('y', 40)
      .attr('x', (this._width / 2 ) - (this.data['x'].length * 9 / 2))
      .attr('dx', '0.32em')
      .attr('fill', '#000')
      .attr('font-size', 13)
      .attr('class', 'x-label')
      .attr('font-weight', 'bold')
      .attr('text-anchor', 'start')
      .text(this.data['x']);

    this.g.append('g')
      .attr('class', 'axis')
      .call(d3.axisLeft(y).tickFormat((d) =>  {
        return this._axisLabels[d];
      }))
      .selectAll('.tick text')
      .call(this.wrap, 10);

    this.g
      .append('text')
      .attr('y', -80)
      .attr('x', "-" + (this._height / 2))
      .attr('font-size', 13)
      .attr('transform', "rotate(270)")
      .attr('dx', '0.32em')
      .attr('fill', '#000')
      .attr('font-weight', 'bold')
      .attr('text-anchor', 'end')
      .attr('class', 'y-label zui-checkbox-value')
      .text(this.data['y']);

    /*this._columns = _.map(this._columns, (col) => {
      return _.capitalize(col);
    });*/

    //this._columns = _.sortBy(this._columns, (col) => col.length);
    let that = this;
    var previousXPosition = 0;
    var yPosition = 0;
    var counter = 0;

    var legend = this.g.append('g')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .attr('text-anchor', 'end')
      .selectAll('g')
      .data(this._columns.slice())
      .enter().append('g')
      .attr('transform', function (d, i) {
        var xPosition = 110 * counter++;

        if(xPosition > that._width ) {
          counter = 0;
          xPosition = 110 * counter++;
          yPosition++;
        }

        previousXPosition = xPosition;
        return 'translate(' + xPosition + ', ' + yPosition * 25 + ')';
      });

    legend.append('rect')
      .attr("class", "legend-rect")
      .attr('x', 20)
      .attr('y', this.height - 10)
      .attr('width', 19)
      .attr('height', 19)
      .attr('fill', z);

    legend.append('text')
      .attr("class", "legend")
      .attr('x', 15)
      .attr('y', this.height)
      .attr('dy', '0.32em')
      .text(function (d) {
        if(d.length > 10) {
          return d.substr(0, 10) + '...';
        }
        return d;
      });

      let xCoords = [], xIncr = 20;

      /*this.svg.selectAll(".legend").each(function(element) {
        let width = this.getBoundingClientRect().width;
        d3.select(this).attr("x", xIncr);
        xCoords.push(parseInt(d3.select(this).attr("x")) + 10);
        if(xIncr > that._width) {
          xIncr = 20;
        } else {
          xIncr = xIncr + width + (element.length * 5) + 10;
        }
      });

      let index = 0, legendRowNumber = 0, yPosition = 0;

      this.svg.selectAll(".legend-rect").each(function(element, i, legends) {
        let y = jQuery(legends[i]).attr("y");
        if(xCoords[index] > that._width) {
          legendRowNumber++;
        }
        d3.select(this).attr("y", +y + (25 * legendRowNumber));
        d3.select(this).attr("x", xCoords[index]);
        index++;
      });*/

  }

  /**
   * this method will append label at the end of the complete stacked bar and not at the end of each section of stacked bar.
   * @param d
   * @param x
   * @param y
   */
  appendLabelAtTop(d, x, y) {
    //looping on the last group of the data which is the top most stack in the whole stacked chart.
    //for example if there are 3 status pass, fail, wip and wip being the top most for all the cycles then all WIP values
    //will be in the last group.
    d._groups[d._groups.length - 1].forEach(da => {
      var label = da.__data__.data.label;
      var xPosition = isNaN(da.__data__[1]) ? x(da.__data__[0]) + 5 : x(da.__data__[1]) + 5;
      var yPosition = 0;
      if(y.bandwidth() < 40) {//40 is the max width that a bar can have.
        yPosition = y(da.__data__.data.y.id) + (y.bandwidth() / 2);
      } else {
        //adding 20 to the overall result because in this condition max width is 40 and we need to show label in the middle so 40 / 2 = 20.
        yPosition = y(da.__data__.data.y.id) + ((y.bandwidth() - 40) / 2) + 20;
      }
      var labelg = d3.select(da.parentNode);
      labelg.append('text')
        .attr('x', xPosition)
        .attr('y', yPosition)
        .attr('dy', '0.32em')
        .attr('fill', '#000')
        .attr('font-family', 'sans-serif')
        .attr('font-size', 10)
        .text(label);
    });
  }

  wrap(text, width) {
    text.each(function() {
      var text = d3.select(this),
        word = text.text(),
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr('y'),
        dy = parseFloat(text.attr('dy')),
        tspan = text.text(null).append('tspan').attr('x', 0).attr('y', y).attr('dy', dy + 'em'),

        word = word.length > width ? word.substring(0, width) + '...' : word;
        tspan = text.append('tspan').attr('y', 0).attr('x', -8).attr('dy', lineNumber * lineHeight + dy + 'em').text(word);
    });
  }

  extractKeys(axes) {
    this._columns = [];
    this.colors = [];

    this.data['data'].forEach(d => {
      d[axes].entries.forEach(entry => {
        d[entry.name] = entry.value;
        if(this._columns.indexOf(entry.name) === -1) {
          this._columns.push(entry.name);
          this.colors.push(entry.color);
        }
      });
    });

  }

  extractAxisLabel(axes) {
    this._axisLabels = {};
    this.data['data'].forEach(d => {
      this._axisLabels[d[axes]['id']] = d[axes]['name'];
    });
  }

  calculateTotal(axes) {
    this._data = this.data['data'].map(d => {
      let t = 0;
      d[axes].entries.forEach( entry => {
        t += entry.value;
      });
      d['total'] = t;
      return d;
    });
  }

  ngOnChanges(changedNode) {
    if(!(this.data && this.data['data'])) {
      return;
    }

    if(this.align === 'horizontal') {
      this.extractAxisLabel('y');
      this.extractKeys('x');
      this.calculateTotal('x');
    } else if(this.align === 'vertical') {
      this.extractAxisLabel('x');
      this.extractKeys('y');
      this.calculateTotal('y');
    }

    var el: any = this.elementRef.nativeElement;

    jQuery(el).find('svg').remove();

    this.graph = d3.select(el);
    //
    // console.log(this.height);
    //
    // this.height = this.height + 20;

    this.margin = {top: 20, right: 95, bottom: 30, left: 90};
    this._width = this.width - this.margin.left - this.margin.right;
    this._height = this.height - this.margin.top - this.margin.bottom - 2 - 10;

    //this.height = this.height + (this.getLegendRows() * 22); //(22 = 19 + 3) where 19 is each legend height and 3 is the gap between legend rows.

    this.svg = this.graph.append('svg').attr('width', this.width).attr('height', this.height + 100);
    this.g = this.svg.append('g').attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    if(this.align === 'horizontal') {
      this.renderHorizontalBarChart(this._data);
    } else if(this.align === 'vertical') {
      this.renderVerticalBarChart(this._data);
    }

    setTimeout(() => {
      jQuery(window).trigger('resize');
    }, 100);
  }

}
