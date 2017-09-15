import {Component, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

//import {BarChartDirective} from '../../directives/charts/bar_chart.directive';
import {ZephyrStore} from '../../../store/zephyr.store';

// Constants
import {RELEASE_REPORT_COMPONENT} from './release.constant';
import {ChartAction} from '../../../actions/chart.action';

@Component({
	selector: RELEASE_REPORT_COMPONENT,
	templateUrl: 'release_report.html',
	//directives: [ROUTER_DIRECTIVES, BarChartDirective],
    viewProviders: [ChartAction],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReleaseReportComponent {
    public releaseReportData: Array<any>;
    zephyrStore;
    releaseId;
    constructor(public _chartAction: ChartAction, private route: ActivatedRoute,
                private cdr: ChangeDetectorRef) {
        //this.releaseId = params.getParam('id');
        this.route.params.subscribe(params => {
            this.releaseId = params['id'];
        });
        this.zephyrStore = ZephyrStore.getZephyrStore();
		this.zephyrStore.subscribe((x) => {
            let chartData = this.zephyrStore.getState().chartData;
            this.setReleaseReportData(chartData);
		});
        this.getReleaseReportData();
    }
    setReleaseReportData(chartData) {
        if(chartData && chartData.releaseReportData) {
            this.releaseReportData = chartData.releaseReportData;
        }
        if(this.cdr) { this.cdr.markForCheck(); }
    }
    getReleaseReportData() {
       this.zephyrStore.dispatch(this._chartAction.fetchReleaseReportData(this.releaseId));
    }
}
