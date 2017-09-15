import {Directive, ElementRef, OnChanges, Input} from '@angular/core';
// var d3 = require('d3/d3');
declare var d3;

@Directive({
  selector:   'bar-chart'
})

export class BarChartDirective implements OnChanges {
    @Input() data: Array<any>;
    graph: any;
    @Input() width: number;
    @Input() height: number;
    @Input() align: string;
    constructor(elementRef: ElementRef) {
        var el:any = elementRef.nativeElement;
        this.graph = d3.select(el);
    }

    renderVerticalBarChart(data) {
//        console.log('release report data', data);
        var margins = {
            top: 10,
            left: 50,
            right: 50,
            bottom: 20
        },
        width = this.width - margins.left - margins.right,
        height = this.height - margins.top - margins.bottom;

        // create canvas
        var svg = this.graph
            .html('')
            .append('svg:svg')
            .attr('class', 'chart')
            .attr('width', width)
            .attr('height', height )
            .append('svg:g')
            .attr('transform', 'translate(10,470)');

        var x = d3.scaleBand().range([0, width]).round(true),
        y = d3.scaleLinear().range([0, height]),
        z = d3.scaleOrdinal().range(['#4ee8ba']);
        var remapped =['c1'].map(function(dat,i) {
            return data.map(function(d,ii){
                return {x: ii, y: d[i+1] };
            });
        });
        var stacked = d3.stack()(remapped);

        x.domain(stacked[0].map(function(d) { return d.x; }));
        y.domain([0, d3.max(stacked[stacked.length - 1], function(d) { return d.y0 + d.y; })]);

        // Add a group for each column.
        var valgroup = svg.selectAll('g.valgroup')
            .data(stacked)
            .enter().append('svg:g')
            .attr('class', 'valgroup')
            .style('fill', function(d, i) { return z(i); })
            .style('stroke', function(d, i) { return d3.rgb(z(i)).darker(); });

        // Add a rect for each date.
        valgroup.selectAll('rect')
            .data(function(d){return d;})
            .enter().append('svg:rect')
            .attr('x', function(d) { return x(d.x); })
            .attr('y', function(d) { return -y(d.y0) - y(d.y); })
            .attr('height', function(d) { return y(d.y); })
            .attr('width', x.bandWidth() - 20);
    }

    renderHorizontalBarChart(data) {
        if (!data) return;
        var dataset = data;
        var margins = {
            top: 12,
            left: 48,
            right: 24,
            bottom: 24
        },
        width = this.width - margins.left - margins.right,
        height = this.height - margins.top - margins.bottom,
        stack = d3.stack();
        dataset = dataset.map(function (d) {
            return d.data.map(function (o, i) {
                // Structure it so that your numeric
                // axis (the stacked amount) is y
                return {
                    y: o.count,
                    x: o.month
                };
            });
        });
        stack(dataset);

        dataset = dataset.map(function (group) {
            return group.map(function (d) {
                // Invert the x and y values, and y0 becomes x0
                return {
                    x: d.y,
                    y: d.x,
                    x0: d.y0
                };
            });
        });
        var svg = this.graph
            .html('')
            .append('svg')
            .attr('width', width + margins.left + margins.right)
            .attr('height', height + margins.top + margins.bottom)
            .append('g')
            .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')'),
        xMax = d3.max(dataset, function (group) {
            var innerMax = d3.max(group, function (d) {
                return d.x;
            });
            return innerMax;
        }),
        xScale = d3.scaleLinear()
            .domain([0, xMax])
            .range([0, width]),
        months = dataset[0].map(function (d) {
            return d.y;
        }),
        yScale = d3.scaleBand()
            .domain(months)
            .range([0, height], .1).round(true),
        xAxis = d3.axisBottom()
            .scale(xScale),
        yAxis = d3.axisLeft()
            .scale(yScale),
        colours = d3.scaleOrdinal(d3.schemeCategory10),
        groups = svg.selectAll('g')
            .data(dataset)
            .enter()
            .append('g')
            .style('fill', function (d, i) {
                return colours(i);
            });
        groups.selectAll('rect')
            .data(function (d) {
                return d;
            })
            .enter()
            .append('rect')
            .attr('x', function (d) {
                return xScale(d.x0);
            })
            .attr('y', function (d, i) {
                return yScale(d.y);
            })
            .attr('height', function (d) {
                return yScale(d.y);
            })
            .attr('width', function (d) {
                return xScale(d.x);
            });

        svg.append('g')
            .attr('class', 'axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis);

        svg.append('g')
            .attr('class', 'axis')
            .call(yAxis);
    }

    ngOnChanges(changedNode) {
        if(!(this.data && this.data.length)) { return; }
        if(this.align === 'horizontal') {
            this.renderHorizontalBarChart(this.data);
        } else if(this.align === 'vertical') {
            this.renderVerticalBarChart(this.data);
        }
    }
}
