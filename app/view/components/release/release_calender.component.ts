import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

//import {BarChartDirective} from '../../directives/charts/bar_chart.directive';
import {ZephyrStore} from '../../../store/zephyr.store';

// Constants
import {RELEASE_CALENDER_COMPONENT} from './release.constant';
import {ChartAction} from '../../../actions/chart.action';

@Component({
	selector: RELEASE_CALENDER_COMPONENT,
	templateUrl: 'release_calendar.html',
	//directives: [ROUTER_DIRECTIVES, BarChartDirective],
    providers: [ChartAction],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReleaseCalenderComponent {
    releaseCalenderData: Array<any>;
    releaseId;
    zephyrStore;
    constructor(public _chartAction: ChartAction, private route: ActivatedRoute) {
        //this.releaseId = params.getParam('id');
        this.route.params.subscribe(params => {
            this.releaseId = params['id'];
        });
        this.zephyrStore = ZephyrStore.getZephyrStore();
		this.zephyrStore.subscribe((x) => {
            let chartData = this.zephyrStore.getState().chartData;
            this.setReleaseCalenderData(chartData);
		});
        this.getCalendarDetails();
    }
    setReleaseCalenderData(chartData) {
        if(chartData && chartData.releaseCalenderData) {
            this.releaseCalenderData = chartData.releaseCalenderData;
        }
    }
    getCalendarDetails() {
       this.zephyrStore.dispatch(this._chartAction.fetchReleaseCalenderData(this.releaseId));
    }
}
