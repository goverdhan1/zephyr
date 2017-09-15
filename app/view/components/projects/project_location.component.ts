import {Component} from '@angular/core';
import {PROJECT_LOCATION_COMPONENT} from './project.constant';
import {ZephyrStore} from '../../../store/zephyr.store';
import {TeamAction} from '../../../actions/team.action';
//import {PieChartDirective} from '../../directives/charts/pie_chart.directive';

@Component({
	selector: PROJECT_LOCATION_COMPONENT,
	templateUrl: 'project_location.html',
	viewProviders: [TeamAction]
	//directives: [PieChartDirective]
})
export class ProjectLocationComponent {
	locationData: Array<any> = [];
	private _userId;
    private _zephyrStore;
    constructor(private _teamAction: TeamAction) {
		this._zephyrStore = ZephyrStore.getZephyrStore();
		this._userId = this._zephyrStore.getState().loggedInUser.id;
		this._zephyrStore.subscribe((x) => {
			let team = this._zephyrStore.getState().team;
			if(team) {
				this.locationData = team.location;
			}
		});
		this.getLocation();
    }
    getLocation() {
        this._zephyrStore.dispatch(this._teamAction.fetchTeamLocationDetails(''));
    }
}
