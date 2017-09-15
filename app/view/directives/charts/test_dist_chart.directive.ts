import {Directive, ElementRef, OnChanges, Input, Output, EventEmitter} from '@angular/core';
// var d3 = require('d3/d3');
declare var d3, _;

@Directive({
  selector:   'test-dist-chart'
})

export class TestDistChartDirective implements OnChanges {
    @Input() data: Array<any>;
    @Input() chartType: string;
    @Input() dashBoardLayout: number;
    graph: any;
    width: number = 500;
    height: number = 500;
    pieRadius;
    pieOuterRadius;
    pieInnerRadius;
    pieInnerRadiusOver;
    pieTranslateX;
    @Output() onChartClick: EventEmitter<any> = new EventEmitter();
    constructor(elementRef: ElementRef) {
        let el:any = elementRef.nativeElement;
        this.graph = d3.select(el);
    }

    renderBarChart(data) {
        let margins = {
            top: 20,
            left: 50,
            right: 50,
            bottom: 20
        },
        width = this.width - margins.left - margins.right,
        height = this.height - margins.top - margins.bottom;

        let x = d3.scale.ordinal().rangeRoundBands([0, width], .1);

        let y = d3.scale.linear().range([height, 0]);

        let xAxis = d3.svg.axis().scale(x).orient('bottom');

        let yAxis = d3.svg.axis().scale(y).orient('left');

        let svg = this.graph
            .html('')
            .append('svg:svg')
            .attr('class', 'chart')
            .attr('width', this.width)
            .attr('height', this.height )
            .append('g')
            .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')');

        x.domain(data.map((d, i) => {
            return d.name;
        }));
        y.domain([0, d3.max(data, (d) => {
            return d.keyWords.total;
        })]);

        svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis);

        svg.append('g')
            .attr('class', 'y axis')
            .call(yAxis);

        let onBarClick = (d) => {
            this.onChartClick.emit(d.contextString);
        };
        svg.selectAll('.bar')
            .data(data)
            .enter().append('rect')
            .attr('class', 'bar')
            .attr('x', (d) => {
                return x(d.name);
            })
            .attr('width', x.rangeBand())
            .attr('y', (d) => {
                return y(d.keyWords.total);
            })
            .attr('height', (d) => {
                return height - y(d.keyWords.total);
            })
            .on('click', _.debounce(onBarClick, 500));
    }

    renderPieChart(data) {
        let radius = this.pieRadius;

        let color = d3.scale.ordinal()
                    .range(['#A6D5A3', '#C4E3F4', '#2F567D']);

        let arc = d3.svg.arc()
                .outerRadius(this.pieOuterRadius)
                .innerRadius(this.pieInnerRadius);

        let arcMouseOver = d3.svg.arc()
            .outerRadius(this.pieOuterRadius)
            .innerRadius(this.pieInnerRadiusOver);

        let tip = d3.tip()
              .attr('class', 'd3-tip')
              .offset([-10, 0])
              .html(function(d) {
                return '<div>'+ d.data.name +'</div>';
              });

        let pie = d3.layout.pie()
                .value(function(d) { return d.keyWords.total; });
        let svg = this.graph
            .html('')
            .append('svg:svg')
            .attr('class', 'chart')
            .attr('width', this.width)
            .attr('height', this.height)
            .append('g')
            .attr('transform', 'translate(' + this.pieTranslateX + ',' + this.height / 2 + ')');

        let g = svg.selectAll('.arc')
            .data(pie(data))
            .enter().append('g')
            .attr('class', function(d) {
                return 'chart-arc';
            })
            .attr('startAngle', function(d) {
                return d.startAngle;
            })
            .attr('endAngle', function(d) {
                return d.endAngle;
            });

        if(data && data.length) {
            g.call(tip);
        }
        let onPathClick = (d) => {
            d3.select(this)
                .transition()
                .duration(800);
//            console.log('1');
            tip.hide(d);
            this.onChartClick.emit(d.data.contextString);
        };

        g.append('path')
            .attr('id', (d, i) => {
                return 'wavy' + i;
            })
            .attr('d', arc)
            .style('fill', function(d, i) { return color(i); })
            .on('mouseover', function(d) {
                d3.select(this)
                    .transition()
                    .duration(800)
                    .attr('d', arcMouseOver);

                tip.show(d);
            })
            .on('mouseout', function(d) {
                d3.select(this)
                    .transition()
                    .duration(800)
                    .attr('d', arc);

                tip.hide(d);
            })
            .on('click', _.debounce(onPathClick, 500));
        /*g.append('text')
           .append('textPath') //append a textPath to the text element
            .attr('xlink:href', (d, i) => {
                return '#wavy' + i;
            }) //place the ID of the path here
            .style('text-anchor','middle') //place the text halfway on the arc
            .attr('startOffset', '50%')
            .text((d) => {
                return d.data.name;
            });*/
    }

    ngOnChanges(changedNode) {
        switch (this.dashBoardLayout) {
            case 1:
                this.width = 800;
                this.height = 600;
                this.pieRadius = Math.min(this.width, this.height) / 2;
                this.pieOuterRadius = this.pieRadius - 210;
                this.pieInnerRadius = this.pieRadius - 140;
                this.pieInnerRadiusOver = this.pieRadius - 130;
                this.pieTranslateX = this.width / 2 + 220;
                break;
            case 2:
                this.width = 500;
                this.height = 500;
                this.pieRadius = Math.min(this.width, this.height) / 2;
                this.pieOuterRadius = this.pieRadius - 170;
                this.pieInnerRadius = this.pieRadius - 100;
                this.pieInnerRadiusOver = this.pieRadius - 90;
                this.pieTranslateX = this.width / 2 + 50;
                break;
            case 3:
                this.width = 400;
                this.height = 400;
                this.pieRadius = Math.min(this.width, this.height) / 2;
                this.pieOuterRadius = this.pieRadius - 150;
                this.pieInnerRadius = this.pieRadius - 80;
                this.pieInnerRadiusOver = this.pieRadius - 70;
                this.pieTranslateX = this.width / 3 + 50;
                break;
            default:
                this.width = 500;
                this.height = 500;
                this.pieRadius = Math.min(this.width, this.height) / 2;
                this.pieOuterRadius = this.pieRadius - 170;
                this.pieInnerRadius = this.pieRadius - 100;
                this.pieInnerRadiusOver = this.pieRadius - 90;
                this.pieTranslateX = this.width / 2 + 50;
                break;
        }
        if(this.chartType === 'pie') {
            this.renderPieChart(this.data);
        } else if(this.chartType === 'bar') {
            this.renderBarChart(this.data);
        }
    }
}
