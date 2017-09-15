import {Component, AfterViewInit} from '@angular/core';
declare var $:any, _: any, d3;
import {ZephyrStore} from '../../../../store/zephyr.store';
import * as ACTION_EVENTS from '../../../../utils/constants/action.events';
import {ChartAction} from '../../../../actions/chart.action';

import {ToastrService} from '../../../../services/toastr.service';

declare var jQuery: any;
@Component({
    selector: 'zee-testcase-time-series',
    template: `
        <div class='zee-module-header'>
            <span class='zee-module-header-left' [style.margin-left]="'0px'">
            Top 20 Testcase’s having most Defects from Last 5 Releases</span>
        </div>
        <div id='zee-time-series-graph'>
            <div [class]="'zee-time-series-highlight-message'">
                Our machine learning tells us that you have to execute
                 Cloning, Login and Provision phases as they have more number of defects.</div>
        </div>
    `,
    providers: [ChartAction]
})
export class TestcaseTimeSeriesChartComponent implements AfterViewInit {
    _zephyrStore;
    _timeSeries = {};
    constructor(public _chartAction: ChartAction) {
        this._zephyrStore = ZephyrStore.getZephyrStore();
        this._zephyrStore.subscribe((x) => {
            let state = this._zephyrStore.getState();
            if(state.chartData.event === ACTION_EVENTS.FETCH_TESTCASE_TIME_SERIES_DATA_SUCCESS) {
                this._timeSeries = state.chartData.testcaseTimeSeriesData;
                this._zephyrStore.dispatch(this._chartAction.clearEvent());
                this.generateLineChart();
            }
        });
    }
    ngAfterViewInit() {
        this._zephyrStore.dispatch(this._chartAction.fetchTestcaseTimeSeries());
    }
    generateLineChart() {
        $('.d3-tip').remove();
        var tip = d3.tip()
			      	.attr('class', 'd3-tip')
			      	.html(function(data) {
                          return '<span>Phase: ' + data.xItem + '</span><br/>Defect count: ' + data.yItem;
                    })
			      	.offset([-12, 0]);
        var margin = {top: 20, right: 20, bottom: 50, left: 50},
            width = $('#zee-time-series-graph').width() - margin.left - margin.right - 10,
            height = 250 - margin.top - margin.bottom;
        var data = this._timeSeries['timeSeries'];
        var xScale = d3.scale.linear()
            .domain([0, data.length - 1])
            .range([0, width]);
        var yScale = d3.scale.linear()
            .domain([0, d3.max(data, function(d){ return (d.yItem); })])
            .range([height, 0]);
        var xAxis = d3.svg.axis()
            .scale(xScale)
            //.orient('bottom')
            .tickSize(-height)
            .tickValues(d3.range(data.length))
            .tickFormat(function(d, i) {
                if(data[d]) {
                    let _label = data[d].xItem;
                    try {
                        let _labels = data[d].xItem.split(' ');
                        _label = _labels[0];
                    } catch(e) {
                       // console.log(e);
                    }
                    return _label; //.replace(' ', '<br/>');
                    /*var w = 30;
                    var el = $('<span style="display:none;">' + data[d].xItem + '</span>').appendTo('#zee-time-series-graph');
                    var labelWidth = $(el).width();
                    $(el).remove();
                    var slength = Math.floor(w / labelWidth * data[d].xItem.length) - 2;
                    if(labelWidth > width) return data[d].xItem.substr(0, slength) + '...'; else return data[d].xItem;*/
                    //return data[d].xItem;
                }
            });
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient('left');
        var line = d3.svg.line()
            .x(function (d, i) {
                return xScale(i);
            })
            .y(function (d) {
                return yScale(d.yItem);
            });
        var svg = d3.select('#zee-time-series-graph').append('svg:svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('svg:g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
        svg.call(tip);
        // Add the x-axis.
        svg.append('svg:g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(0,' + height + ')')
                .call(xAxis);
        svg.append('text')
                .attr('transform', 'translate(' + (width / 2) + ' ,' + (height + margin.bottom) + ')')
                .style('text-anchor', 'middle')
                // .attr("transform", "rotate(45)")
                .text('Phase');
        // create left yAxis
        // var yAxisLeft = d3.svg.axis().scale(yScale).ticks(4).orient('left');
        // Add the y-axis to the left
        svg.append('svg:g')
            .attr('class', 'y axis')
            // .attr('transform', 'translate(-25,0)')
            .call(yAxis);
        svg.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 0 - margin.left)
            .attr('x',0 - (height / 2))
            .attr('dy', '1em')
            .style('text-anchor', 'middle')
            .text('Defect Count');
        // Add the line by appending an svg:path element with the data line we created above
        // do this AFTER the axes above so that the line is above the tick-lines
        svg.append('svg:path').attr('d', line(data));
        // Add the scatterplot
        svg.selectAll('dot')
            .data(data)
            .enter().append('circle')
            .attr('r', 3.5)
            .attr('cx', function(d, i) { return xScale(i); })
            .attr('cy', function(d) { return yScale(d.yItem); })
            .attr('fill', 'steelblue')
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);
    }
}
