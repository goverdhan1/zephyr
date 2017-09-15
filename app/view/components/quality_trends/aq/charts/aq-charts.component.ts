import { Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import {ZephyrStore} from "../../../../../store/zephyr.store";
import {AutomationQualityAction} from "../../../../../actions/aq.action";

@Component({
  selector: 'line-chart',
  templateUrl: 'line-chart.html'
})
export class LineChartAqComponent implements OnInit, OnDestroy, AfterViewInit {

  public lineChartData:Array<any> = [
    {data: [], label: 'Number of Automated Testcases'},
    {data: [], label: 'Total Execution Count'},
    {data: [], label: 'Release Duration (Days)'},
    {data: [], label: 'Average Execution Time'},
    {data: [], label: 'DATAMAX', hidden: true}
  ];
  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      labels: {
        filter: function(legendItem, data){
          console.log("Legend", legendItem, data);
          let newLegendItem = legendItem;
          if (newLegendItem.text === "DATAMAX") {
            newLegendItem = null;
          }
          return newLegendItem;
        }
      }
    },
    tooltips: {
      mode: 'index',
      intersect: false,
      titleSpacing: 10,
      titleFontSize: 20,
      bodySpacing: 15,
      bodyFontSize: 18,
      callbacks: {
        label: function(tooltipItem, data ) {
          let datasetLabel = data.datasets[tooltipItem.datasetIndex].label || 'Other';
          let label;
          if (datasetLabel !== 'DATAMAX') {
            label = (data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] * .01 * data.datasets[4].data[tooltipItem.datasetIndex]).toFixed(0);
          } else {

          }
          return datasetLabel + ': ' + label;
        }
      }
    },
    elements: {
      line: {
        tension: 0.2
      }
    }
  };

  public lineChartColors:Array<any> = [
    { // Amount of Automated Testcases
      backgroundColor: 'rgba(76,165,224,0)',
      borderColor: 'rgba(76,165,224,1)',
      pointBackgroundColor: 'rgba(76,165,224,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(76,165,224,0.8)'
    },
    { // Total Execution Count
      backgroundColor: 'rgba(8,44,67,0)',
      borderColor: 'rgba(8,44,67,1)',
      pointBackgroundColor: 'rgba(8,44,67,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(8,44,67,1)'
    },
    { // Release Duration
      backgroundColor: 'rgba(219,31,161,0)',
      borderColor: 'rgba(219,31,161,1)',
      pointBackgroundColor: 'rgba(219,31,161,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(219,31,161,0.8)'
    },
    { // Execution Time
      backgroundColor: 'rgba(141,198,94,0)',
      borderColor: 'rgba(141,198,94,1)',
      pointBackgroundColor: 'rgba(141,198,94,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(141,198,94,0.8)'
    },
    { // DATAMAX
      backgroundColor: 'rgba(141,198,94,0)',
      borderColor: 'rgba(141,198,94,0)',
      pointBackgroundColor: 'rgba(141,198,94,0)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(141,198,94,0)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  private zephyrStore;
  private releases;
  private projectId;
  private projectMetadata;
  private intervalId;
  private tooltipData;

  constructor(private _aqAction: AutomationQualityAction){
    this.zephyrStore = ZephyrStore.getZephyrStore();
    let state = this.zephyrStore.getState();
    this.releases = state.release.releases;
    this.projectId = state.project.id;
    this.zephyrStore.dispatch(this._aqAction.zpadAutomationQuality(this.projectId));
    this.tooltipData = [];
  }

  ngOnInit(){
  }

  ngOnDestroy(){
    clearInterval(this.intervalId);
  }

  ngAfterViewInit(){
    this.getAutomationQualityData();
  }

  getAutomationQualityData(){
    this.intervalId = setInterval(this.fetchMetadata, 500);
  }

  fetchMetadata() {
    this.projectMetadata = this.zephyrStore.getState().qualityTrend.automationQuality;
    if (this.projectMetadata !== null && typeof this.projectMetadata === 'object'){
      this.loadMetadata();
      clearInterval(this.intervalId);
      console.log("IN IF");
    }
    console.log("IN INTERVAL");
  }

  public loadMetadata():void {
    this.projectMetadata = this.zephyrStore.getState().qualityTrend.automationQuality;
    let presentData = this.projectMetadata.length;
    let automatedTestcaseCounts = [];
    let totalExecutionCounts = [];
    let releaseDurations = [];
    let executionTimes = [];
    let DATAMAX = [0,0,0,0];

    for(let i = 0; i < presentData; i++){
      automatedTestcaseCounts[i] = this.projectMetadata[i].automatedTestcaseCount;
      totalExecutionCounts[i] = this.projectMetadata[i].totalExecutionCount;
      releaseDurations[i] = this.projectMetadata[i].releaseDuration;
      executionTimes[i] = this.projectMetadata[i].executionTime;

      if(automatedTestcaseCounts[i] > DATAMAX[0]){
        DATAMAX[0] = automatedTestcaseCounts[i];
      }
      if(totalExecutionCounts[i] > DATAMAX[1]){
        DATAMAX[1] = totalExecutionCounts[i];

      }
      if(releaseDurations[i] > DATAMAX[2]){
        DATAMAX[2] = releaseDurations[i];
      }
      if(executionTimes[i] > DATAMAX[3]){
        DATAMAX[3] = executionTimes[i];
      }
    }

    for (let i = 0; i < presentData; i++){
      this.lineChartLabels[i] = this.releases[i].name;
    }

    let _lineChartData:Array<any> = new Array(5);

    for (let i = 0; i < 4; i++) {
      _lineChartData[i] = {data: new Array(presentData), label: this.lineChartData[i].label};
      for (let j = 0; j < presentData; j++) {
        switch (i) {
          case 0:
            _lineChartData[i].data[j] = (automatedTestcaseCounts[j]*100)/DATAMAX[i];
            break;
          case 1:
            _lineChartData[i].data[j] = (totalExecutionCounts[j]*100)/DATAMAX[i];
            break;
          case 2:
            _lineChartData[i].data[j] = (releaseDurations[j]*100)/DATAMAX[i];
            break;
          case 3:
            _lineChartData[i].data[j] = (executionTimes[j]*100)/DATAMAX[i];
            break;
        }
      }
    }
    _lineChartData[4] = { data: DATAMAX, label: "DATAMAX"};
    this.lineChartData = _lineChartData;
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }


}
