import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import {Http} from '@angular/http';
import {PipService} from "../../../../services/pip.service";
declare var window: any;

@Component({
  selector: 'pip',
  templateUrl: 'pip.html',
  providers: [PipService]
})

export class PipComponent implements OnInit {
  options;
  data;

  projectId;
  releaseId;
  releaseName;

  actualdata;
  preddata;
  constructor(private _pipService: PipService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.projectId = JSON.parse(localStorage.getItem(`${window.tab}-currentProject`)).id;
    this.releaseId = JSON.parse(localStorage.getItem(`${window.tab}-currentRelease`)).id;
    this.releaseName = JSON.parse(localStorage.getItem(`${window.tab}-currentRelease`)).text;

    this._pipService.pipGetReleaseDefectCounts(this.projectId)
      .subscribe((data) => this.getPipDataSuccess(<any>data, this.preddata), (error) => this.errorMessage(<any>error));
    this._pipService.pipGetReleasePredDefectCounts(this.releaseId)
    .subscribe((data) => this.getPipDataSuccess(this.actualdata,<any>data), (error) => this.errorMessage(<any>error));
  }

  private errorMessage(err) {
    console.log(err, 'please try to use different release');
  }

  private getPipDataSuccess(actualdata , preddata) {
    this.actualdata= actualdata;
    this.preddata= preddata;
  // here is the data which we are going to get from API
  // if(actualdata && preddata) {
    actualdata = actualdata ? actualdata :[];
    preddata = preddata ? preddata :0;
    this.bindChart(actualdata,preddata);
  // } else {
  //   alert("please try to use different release or add end date of current release to show the PIP");
  // }
  };

  private sorting(json_object, key_to_sort_by) {
    var actualData = [];
    function sortByKey(a, b) {
      var x = a[key_to_sort_by];
      var y = b[key_to_sort_by];
      return x < y ? -1 : x > y ? 1 : 0;
    }

    json_object.sort(sortByKey); //sort object based on key

    json_object.forEach(function(d) {
      actualData.push({
         x: d.release_name,
         y: d.numDefects,
         id: d.release_id,
         class: "nv-bar positive",
      });
    }); // create object with the data which need to plot bar chart
    return actualData;
  }

  private bindChart (actualdata, preddata){


    var apiObject = [],actualData= [],predictionData = [];

    actualData = this.sorting(actualdata, "release_id"); //sort api object

    var currentReleaseId = this.releaseId;
    var fakeCount;
    actualData.forEach(function(d){
      if(d.id == currentReleaseId){
        return fakeCount = d.y+5;
      }
    });

    var predData = {
      key: "Prediction",
      values: [
        {
          x: this.releaseName,
          y: preddata ? preddata:0,
          // y: preddata ? preddata:fakeCount,
          id: this.releaseId,
          class: "nv-bar positive prediction-bar",
        }
      ]
    }; // prediction data object which we get from api

    // console.log("dummy fake pred data: ",predData);    
    var initialData = actualData.sort(function(a, b) { return b.id < a.id  ? 1 : -1; }).reverse().slice(0, 10).reverse();

    var chartData = [
      {
        key: "Actual",
        values: initialData
      }
    ];

    chartData.push(predData); // merge both plotting data to data chart array
    this.data = chartData;

    const colors = ["#4CA5E0", "#DB1FA1"];  
    this.options = {
      chart: {
        type: 'multiBarChart',
        height: 450,
        margin: {
          top: 40,
          right: 20,
          bottom: 45,
          left: 100
        },
        clipEdge: true,
        duration: 500,
        stacked: false,
        showControls: false,
        legend: {
          updateState: false,
        },
        color: function(d,i){
          return (d.data && d.data.color) || colors[i % colors.length];
        },
        // useInteractiveGuideline: true, // it might need in line chart not bar chart
        reduceXTicks:false,
        xAxis: {
          axisLabel: 'Releases',
          axisLabelDistance: 5
        },
        yAxis: {
          axisLabel: 'Defect Count',
          axisLabelDistance: 10
        },
        dispatch: {
          tooltipShow: function (e) { },
          tooltipHide: function (e) { },
          beforeUpdate: function (e) { }
        },
        multibar: {
          dispatch: {
            //chartClick: function(e) {},
            elementClick: function (e) { },
            elementDblClick: function (e) { },
            elementMouseout: function (e) { },
            elementMouseover: function (e) { }
          }
        },
        callback: function (e) {
                                  d3.selectAll(".nv-bar").attr('class', function(d, i) {return d.class;}).style("width", "1%").style("x", "3.7%");
                                  d3.select(".prediction-bar").style("x", 20).style("width", "0.00001%").style("stroke-dasharray", "10")
                                    .style("stroke-opacity", "1").style("stroke-width", "1%").style("fill", "none");
                                }
      }
    };
  };
};
