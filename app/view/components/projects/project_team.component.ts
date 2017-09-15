import {Component} from '@angular/core';
import {PROJECT_TEAM_COMPONENT} from './project.constant';
import {ZephyrStore} from '../../../store/zephyr.store';
import {TeamAction} from '../../../actions/team.action';
import {ActivatedRoute} from '@angular/router';

@Component({
	selector: PROJECT_TEAM_COMPONENT,
	templateUrl: 'project_team.html',
	viewProviders: [TeamAction]
	//directives: [ROUTER_DIRECTIVES]
})
export class ProjectTeamComponent {
	_team: Array<any> = [];
	projectId;
	private _userId;
    private _zephyrStore;
    constructor(private route: ActivatedRoute, private _teamAction: TeamAction) {
        this._zephyrStore = ZephyrStore.getZephyrStore();
		this._userId = this._zephyrStore.getState().loggedInUser.id;

		this.route.params.subscribe(params => {
            this.projectId = params['id'];
        });

		this._zephyrStore.subscribe((x) => {
			let team = this._zephyrStore.getState().team;
			if(team) {
				this._team = team.teamDetails;

				this._team.forEach((member) => {
				  if (member.picture) {
            member.image = `/flex/download?action=view&fileId=${member.picture}`;
          }
        });

			}
		});
		this.getTeam();
    }
    refreshView() {
        this.getTeam();
    }
    getTeam() {
        this._zephyrStore.dispatch(this._teamAction.fetchTeamDetailsByProjectId(this.projectId));
    }
}
