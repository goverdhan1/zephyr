"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var zephyr_store_1 = require("../../../../store/zephyr.store");
var LineChartComponent = (function () {
    function LineChartComponent(_aqAction) {
        this._aqAction = _aqAction;
        this.lineChartData = [
            { data: [65, 59, 80, 81, 56, 55, 40], label: 'Amount of Automated Testcases' },
            { data: [28, 48, 40, 19, 86, 27, 90], label: 'Total Execution Count' },
            { data: [18, 48, 77, 9, 100, 27, 40], label: 'Release Duration' },
            { data: [18, 48, 77, 9, 100, 27, 40], label: 'Execution Time' }
        ];
        // this array should be the releases, which is the x axis
        this.lineChartLabels = ['Release 1', 'Release 2', 'Release 3', 'Release 4', 'Release 5', 'Release 6', 'Release 7'];
        this.lineChartOptions = {
            responsive: true
        };
        this.lineChartColors = [
            {
                backgroundColor: 'rgba(141,198,94,0.2)',
                borderColor: 'rgba(141,198,94,1)',
                pointBackgroundColor: 'rgba(141,198,94,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(141,198,94,0.8)'
            },
            {
                backgroundColor: 'rgba(31,146,150,0.2)',
                borderColor: 'rgba(31,146,150,1)',
                pointBackgroundColor: 'rgba(31,146,150,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(31,146,150,1)'
            },
            {
                backgroundColor: 'rgba(101,215,222,0.2)',
                borderColor: 'rgba(101,215,222,1)',
                pointBackgroundColor: 'rgba(101,215,222,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(101,215,222,0.8)'
            },
            {
                backgroundColor: 'rgba(101,215,222,0.2)',
                borderColor: 'rgba(101,215,222,1)',
                pointBackgroundColor: 'rgba(101,215,222,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(101,215,222,0.8)'
            }
        ];
        this.lineChartLegend = true;
        this.lineChartType = 'line';
        this.zephyrStore = zephyr_store_1.default.getZephyrStore();
        var state = this.zephyrStore.getState();
        this.releases = state.release.releases;
        this.projectId = state.project.id;
    }
    LineChartComponent.prototype.ngOnInit = function () {
        this.zephyrStore.dispatch(this._aqAction.zpadAutomationQuality(this.projectId, "-zpadAutomationQuality"));
        console.log("stack f");
    };
    LineChartComponent.prototype.randomize = function () {
        var _lineChartData = new Array(this.lineChartData.length);
        for (var i = 0; i < this.lineChartData.length; i++) {
            _lineChartData[i] = { data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label };
            for (var j = 0; j < this.lineChartData[i].data.length; j++) {
                _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
            }
        }
        this.lineChartData = _lineChartData;
    };
    // events
    LineChartComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    LineChartComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    LineChartComponent = __decorate([
        core_1.Component({
            selector: 'line-chart',
            templateUrl: './view/components/automation-quality/charts/line-chart.html'
        })
    ], LineChartComponent);
    return LineChartComponent;
}());
exports.LineChartComponent = LineChartComponent;
