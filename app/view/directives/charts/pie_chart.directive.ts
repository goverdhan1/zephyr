import {Directive, ElementRef, Input, OnChanges} from '@angular/core';
// var d3 = require('d3/d3');
declare var d3;

@Directive({
  selector:   'pie-chart'
})

export class PieChartDirective implements OnChanges {
    graph: any;
    @Input() data;
    @Input() width: any;
    @Input() height: any;
    constructor(private elementRef: ElementRef) {
        var el:any = elementRef.nativeElement;
        this.graph = d3.select(el);
    }
    renderPieChart(data) {
        var margins = {
            top: 20,
            left: 20,
            right: 20,
            bottom: 20
        },
        width = this.width - margins.left - margins.right,
        height = this.height - margins.top - margins.bottom,
        radius = height/2,
        color = d3.scale.category20c();

        // create canvas
        var svg = this.graph
            .html('')
            .append('svg:svg')
            .data([data])
            .attr('class', 'chart')
            .attr('width', width)
            .attr('height', height )
            .append('svg:g')
            .attr('transform', 'translate('+ radius +','+ radius +')');

        var pie = d3.layout.pie().value(function(d){return d.count;});

        // declare an arc generator function
        var arc = d3.svg.arc().outerRadius(radius);

        // select paths, use arc generator to draw
        var arcs = svg.selectAll('g.slice').data(pie).enter().append('svg:g').attr('class', 'slice');
        arcs.append('svg:path')
            .attr('fill', function(d, i){
                return color(i);
            })
            .attr('d', function (d) {
                return arc(d);
            });

        // add the text
        arcs.append('svg:text').attr('transform', function(d){
        			d.innerRadius = 0;
        			d.outerRadius = radius;
            return 'translate(' + arc.centroid(d) + ')';}).attr('text-anchor', 'middle').text( function(d, i) {
            return data[i].location + ' : ' + data[i].count;}
        		);
    }
    ngOnChanges(changedNode) {
        if(!this.data && !this.data.length) {
            return;
        }
        this.renderPieChart(this.data);
    }
}
