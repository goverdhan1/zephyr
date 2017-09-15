import {Component, Input, Output, EventEmitter, ElementRef, OnChanges, HostListener} from '@angular/core';

// import './drilldown-stacked-bar.scss';

declare var jQuery, _, Highcharts:any;

@Component({
  selector: 'zui-bar-drilldown-chart',
  templateUrl: 'drilldown-stacked-bar.html'
})
export class DrillDownBarChartComponent implements OnChanges {
  @Input() data = [];
  @Input() identifier = [];
  @Input() title = '';
  @Input() legendsMetadata = [];
  @Input() colors = [];
  @Input() fileName = '';
  @Input() height = '';

  drillDownStack = [];

  chart;
  @Output() onDrillDown : EventEmitter<any> = new EventEmitter();
  @Output() onDrillUp : EventEmitter<any> = new EventEmitter();

  constructor(private elementRef: ElementRef) {

  }

  redrawChart() {
    var evt = window.document.createEvent('UIEvents');
    evt.initUIEvent('resize', true, false, window, 0);
    window.dispatchEvent(evt);
  }

  renderChart() {
    setTimeout(() => {
      let selfChartComponent = this;
      let clickDetected = false;

      if (this.chart) {
        this.chart.setTitle({text : this.title});
        this.chart.hideLoading();

        this.chart.series.forEach((series, index) => {
          series.setData(this.data[index].data);
        });

        this.chart.xAxis[0].setCategories(_.map(this.legendsMetadata, 'name'));
        this.redrawChart();
      } else {

        this.chart = Highcharts.chart(`container-${this.identifier}`, {
          colors : this.colors,
          credits: {
            enabled: false
          },
          chart: {
            type: 'bar',
            events: {
              click: function(event) {

                if(clickDetected) {
                  selfChartComponent.drillUp();
                  clickDetected = false;
                } else {
                  clickDetected = true;

                  setTimeout(function() {
                    clickDetected = false;
                  }, 500);
                }

              }
            }
          },
          legend: {
            itemStyle: {
              fontWeight: 'normal'
            },
          },
          exporting: {
            buttons: {
              contextButton: {
                menuItems: [{
                  text: 'Export to PDF',
                  onclick: function () {
                    this.exportChart({
                      type: 'application/pdf',
                      filename : selfChartComponent.title.length ? selfChartComponent.fileName + ' - ' + selfChartComponent.title : selfChartComponent.fileName,
                    });
                  }
                }, {
                  text: 'Export to JPG',
                  onclick: function () {
                    this.exportChart({
                      type: 'image/jpeg',
                      filename : selfChartComponent.title.length ? selfChartComponent.fileName + ' - ' + selfChartComponent.title : selfChartComponent.fileName,
                    });
                  }
                }]
              }
            }
          },
          tooltip: {
            formatter: function() {
              // let value = super.formatter();
              return `${this.x} <br /> ● ${this.y} ${selfChartComponent.data[this.colorIndex].name} out of ${this.total} Total. <b>(${(this.y * 100 / this.total).toFixed(2)} %)</b>`;
            }
          },
          title: {
            text: selfChartComponent.title,
            style : {
              "fontSize" : '14px'
            }
          },
          xAxis: {
            categories: _.map(selfChartComponent.legendsMetadata, 'name'),
          },
          // yAxis: {
          //   categories: _.map(selfChartComponent.legendsMetadata, 'name'),
          //   title : {
          //     enabled : true,
          //     text : 'Count'
          //   }
          // },
          yAxis: {
            min: 0,
            // stackLabels: {
            //   enabled : true
            // },
            allowDecimals: false,
            title: {
              text: 'Count'
            }
          },
          plotOptions: {
            series: {
              stacking: 'normal'
              // pointWidth : 30,
            },
            bar: {
              maxPointWidth: 50,
              cursor: 'pointer',
              // maxPointLength : 15,
              point: {
                events: {
                  click: function () {
                    let clickedSeries = selfChartComponent.legendsMetadata[this.index];

                    if (clickedSeries && clickedSeries.drilldown) {
                      selfChartComponent.drillDownStack.push(clickedSeries);

                      selfChartComponent.chart.showLoading("Loading...");

                      selfChartComponent.onDrillDown.emit({
                        currentLevel : selfChartComponent.drillDownStack.length + 1,
                        id : clickedSeries.id,
                        name : clickedSeries.name
                      });
                    }

                  }
                }
              }
            }
          },
          // colors : this.colors,
          series: selfChartComponent.data,
          drilldown: {
            series: []
          }
        });

      }

      if (this.drillDownStack.length >= 1 && !jQuery(`#customDrillUpButton-${selfChartComponent.identifier}`).length) {

        var custombutton = this.chart.renderer.button('|< Back', null, null, () => {
          selfChartComponent.drillUp();
        }, {zIndex: 20}).attr({
          id: 'customDrillUpButton-' + selfChartComponent.identifier,
          align: 'left',
          height: 15,
          width: 40
        }).add().align({
          align: 'right',
          x: -65,
          y: 35
        }, false, null).css({
          fontSize: '11px'
        });

      } else if (this.drillDownStack.length === 0) {
        jQuery(`#customDrillUpButton-${selfChartComponent.identifier}`).remove();
      }

      this.redrawChart();
    });
  }

  drillUp() {
    if (this.drillDownStack.length) {
      this.drillDownStack.pop();
      this.chart.showLoading("Loading...");
      let lastCycle = this.drillDownStack[this.drillDownStack.length - 1];

      this.onDrillUp.emit({
        currentLevel : this.drillDownStack.length,
        id : lastCycle ? lastCycle.id : -1,
        name : lastCycle ? lastCycle.name : ''
      });
    }

  }

  resetLevel() {
    this.drillDownStack = [];
  }

  ngOnChanges(changedNode) {
    if (this.data && this.data.length) {
      this.renderChart();
    }
  }

}
