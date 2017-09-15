import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NvD3Module } from 'ng2-nvd3';

import { PaService } from "../../../../services/pa.service";

declare var moment: any;
declare let d3: any;
declare var window: any;

@Component({
  selector: 'pa',
  templateUrl: 'pa.html',
  styleUrls: [
    'pa.scss'
  ],
  //encapsulation: ViewEncapsulation.Native
  providers: [PaService]
})

export class PaComponent implements OnInit {
  options;
  data;
  executionData;
  releaseId;

  @ViewChild('nvd3') nvd3;

  currentDate;
  startDate;
  endDate;

  plannedDays;
  plannedTeamSize;
  plannedExecutionCount;

  actualDays;
  actualTeamSize;
  actualExecutionCount;
  actualExecutionCountPerDayPerResource;

  predictedTeamSize;

  selectedTeamSize;
  expectedExecutionCount;
  executionCountPerSelectedResources;


  chartMinDate;
  chartMaxDate;
  chartMaxExecutionCount;


  dateRange(startDate, endDate) {
    var dates = [moment(startDate).clone().toDate()];
    let sd = moment(startDate).clone().startOf('day');
    let ed = moment(endDate).clone().startOf('day');
    while (sd.add(1, 'days').diff(ed) <= 0) {
      dates.push(sd.clone().toDate());
    }
    return dates;
  };

  dateRangeForTicks(startDate, endDate) {
    var dates = [moment(startDate).clone().toDate()];
    let sd = moment(startDate).clone().startOf('day');
    let ed = moment(endDate).clone().startOf('day');
    while (sd.add(7, 'days').diff(ed) <= 0) {
      dates.push(sd.clone().toDate());
    }
    return dates;
  };

  generateTimeSeries() {
    // Generate an array of dates for plotting
    let dateRange = this.dateRange(this.startDate, this.endDate);
    // Plottable will be an array of (x, y) objects
    let plottable = dateRange;
    plottable.forEach(function to_utc(date, index) {
      // set x value to date and y to a random value
      var rand = 0;
      var point = {
        x: date,
        y: rand
      };
      // Replace original element
      plottable[index] = point;
    });
    // Return the plottable array for plotting
    return [
      {
        key: 'Plan',
        values: [
          { x: this.startDate, y: 0 },
          { x: this.endDate, y: this.plannedExecutionCount }
        ],
        color: '#082C43',
        strokeWidth: 2
      },
      {
        key: 'Actual',
        values: [
          { x: this.startDate, y: 0 },
          { x: this.currentDate, y: this.actualExecutionCount }
        ],
        color: '#4CA5E0',
        strokeWidth: 2
      },
      {
        key: 'Projected',
        values: [
          { x: this.currentDate, y: this.actualExecutionCount },
          { x: this.endDate, y: this.expectedExecutionCount }
        ],
        color: '#4CA5E0',
        classed: 'dashed',
        strokeWidth: 2
      },
      {
        key: 'Prediction',
        values: [
          { x: this.currentDate, y: this.actualExecutionCount },
          { x: this.endDate, y: this.executionCountPerSelectedResources }
        ],
        color: '#DB1FA1',
        classed: 'dashed',
        strokeWidth: 4

      }
    ];
  };

  updateChart(event) {
    this.data.splice(0, this.data.length);
    this.executionCountPerSelectedResources = Math.round(this.selectedTeamSize * this.actualExecutionCountPerDayPerResource * this.plannedDays);
    this.data = this.generateTimeSeries();
    this.nvd3.chart.update();
  }

  constructor(private _paService: PaService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.releaseId = JSON.parse(localStorage.getItem(`${window.tab}-currentRelease`)).id;

    this._paService.paGetTestcaseExecution(this.releaseId)
      .subscribe((data) => this.getPaDataSuccess(data), (error) => this.errorMessage(<any>error));
  }

  private getPaDataSuccess(data) {
    this.executionData = data;
    this.currentDate = this.executionData.currentDate;
    this.startDate = this.executionData.startDate;
    this.endDate = this.executionData.endDate;
    this.expectedExecutionCount = this.executionData.expectedExecutionCount;

    this.plannedDays = moment(this.endDate).diff(this.startDate, 'day') + 1;

    this.plannedTeamSize = this.executionData.teamSize;
    this.plannedExecutionCount = this.executionData.plannedExecutionCount;

    this.actualDays = moment(this.endDate).diff(this.currentDate, 'day') + 1;
    //ToDo: API should return
    this.actualTeamSize = this.plannedTeamSize;
    this.actualExecutionCount = this.executionData.actualExecutionCount;
    this.actualExecutionCountPerDayPerResource = this.actualExecutionCount / (this.actualTeamSize * this.actualDays);

    //ToDo: API should return
    this.predictedTeamSize = Math.round(this.plannedExecutionCount / (this.plannedDays * this.actualExecutionCountPerDayPerResource));

    this.selectedTeamSize = this.predictedTeamSize;
    
    this.executionCountPerSelectedResources = Math.round(this.selectedTeamSize * this.actualExecutionCountPerDayPerResource * this.plannedDays);

    //this.chartMinDate = moment(this.startDate).subtract(7, 'day'); //add one week buffer to start date
    //this.chartMaxDate = moment(this.endDate).add(7, 'day'); // add one weeks buffer to end date
    this.chartMaxExecutionCount = this.plannedExecutionCount;

    this.options = {
      "chart": {
        "type": "lineChart",
        "height": 380,
        "margin": {
          "top": 20,
          "right": 20,
          "bottom": 40,
          "left": 55
        },
        x: function (d) {
          return moment.utc(d.x).valueOf();
        },
        y: function (d) {
          return d.y;
        },
        "useInteractiveGuideline": true,
        "dispatch": {},
        "xAxis": {
          axisLabel: 'Timeline (' +' Start Date: ' + moment(this.startDate).format("MM/DD/YYYY") + ' - ' + ' End Date: ' + moment(this.endDate).format("MM/DD/YYYY") + ')',
          tickFormat: (function (d) {
            // 3.1) Format the x ticks
            return d3.time.format("%m/%d")(new Date(d));
          }),
          tickValues: this.dateRangeForTicks(this.startDate, this.endDate),
          //showMaxMin: true
        },
        "yAxis": {
          axisLabel: 'Execution Count',
          axisLabelDistance: -10
        },
        callback: function (chart) { },
        "xDomain": [this.startDate, this.endDate],
        "xRange": null,
        "yDomain": [0, this.chartMaxExecutionCount],
        "yRange": null,
        "tooltips": true,
        "tooltip": {
          contentGenerator: function (key, x, y, e, graph) { 
            return '<h1>Test</h1>';
          }
        }
      }
    };

    this.data = this.generateTimeSeries();
  };

  private errorMessage(err) {
    console.log(err, 'Please try to use different release');
  }
}
