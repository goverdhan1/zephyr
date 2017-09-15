import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AaService} from "../../../../services/aa.service";
declare var window: any;

@Component({
  selector: 'aa1',
  templateUrl: 'aa1.html',
  providers: [AaService]

})

export class aa1Component implements OnInit {

  options;
  data;
  releaseId;
  actualdata;

  constructor(private _aaService: AaService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.releaseId = JSON.parse(localStorage.getItem(`${window.tab}-currentRelease`)).id;

    this._aaService.aaGetReleaseTestCasesExecutionsCount(this.releaseId)
    .subscribe((data) => this.getAaDataSuccess(data), (error) => this.errorMessage(<any>error));
  }

  private errorMessage(err) {
    console.log(err, 'please try to use different release');
  }

  private getAaDataSuccess(actualdata) {
    this.actualdata= actualdata;
  // here is the data which we are going to get from API
    // console.log(actualdata,preddata,'test')
  // if(actualdata && preddata) {
        actualdata = actualdata ? actualdata :[];
        this.bindChart(actualdata);
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
        label: d.failedCount,
        value: d.testcaseName,
        id: d.testcaseId,
        // class: "nv-bar positive",
        passedCount: d.passedCount,
        legend: d.testcaseId
        });
    }); // create object with the data which need to plot bar chart
    return actualData;
  }

  private bindChart (actualdata){

    var apiObject = [],actualData= [];

    actualData = this.sorting(actualdata, "label"); //sort api object

    var initialData = actualData.sort(function(a, b) { return b.label < a.label  ? 1 : -1; }).reverse().slice(0, 15);

    // console.log("initialData" , initialData);
    var chartData = [
      {
        key: "Failed Executions",
        "color":"#DB1FA1",
        values: initialData
      }
    ];
    // console.log("chartData" , chartData);

    this.data = chartData;
    this.options = {
      chart: {
        type: 'multiBarHorizontalChart',
        height: 450,
        margin: {
          top: 40,
          right: 20,
          bottom: 45,
          left: 100
        },
        // clipEdge: true,
        duration: 500,
        x: function (d) { return d.legend; },
        y: function (d) { return d.label; },
        stacked: false,
        showControls: false,
        showLegend: false,
        xAxis: {
          axisLabel: 'Testcases ID',
          axisLabelDistance: 10,
          staggerLabels: true,
        },
        yAxis: {
          axisLabel: 'Failed Executions',
          tickFormat: function(d) {
            return d3.format(',.')(d);
          }
        },
        // tooltip: {
        //   contentGenerator: function (d) { console.log(d); return d.value; },
        // },
        dispatch: {
          tooltipShow: function (e) { },
          tooltipHide: function (e) { },
          beforeUpdate: function (e) { }
        },
        tooltip: {
          //       contentGenerator: function (d) {
          //         return '<table><thead><tr><td colspan="3"><strong class="x-value">Testcase ID:' + key.data.id+'</strong></td></tr></thead><tbody><tr><td class="key">Failed Executions</td><td class="value">'+ key.data.label+'</td></tr></tbody></table>';
            contentGenerator: function (key, x, y, e, graph) {
                return '<table><thead><tr><td colspan="3">Testcase ID: <strong class="x-value">' + key.data.id+'</strong></td></tr></thead><tbody><tr><td class="key">Failed Executions: </td><td class="value">'+ key.data.label+'</td></tr></tbody></table>';
            }
        },
        multibar: {
          dispatch: {
            //chartClick: function(e) {console.log("! chart Click !")},
            elementClick: function (e) { },
            elementDblClick: function (e) { },
            elementMouseout: function (e) { },
            elementMouseover: function (e) { }
          }
        },
        callback: function (e) {
                                  d3.selectAll(".nv-bar.positive rect").style("height", "5").style("y", "1.5%");
                                  function plotTable(e) {
                                    var table='<div class= "advanced-analytics--table-result"><div class="div-table-row"><div class="table__testcase-legend-title">ID</div><div class="table__testcase-failed-count-title">Count</div><div class="table__testcase-name-title">TestCase Name</div></div>';
                                    /* loop over each object in the array to create rows*/
                                    $.each( e, function( index, item){
                                          /* add to html string started above*/
                                      table+='<div class="div-table-row"><div class="table__testcase-legend">' +item.legend+
                                                  '</div><div class="table__testcase-failed-count">'+item.label+
                                                '</div><div class="table__testcase-name">'+item.value+'</div></div>';
                                          });
                                          table+='</div>';
                                    /* insert the html string*/
                                          $(".advanced-analytics--table").html( table );
                                    };
                                    plotTable(initialData);
                                }
      }
    };
  };
}
