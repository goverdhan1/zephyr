import {Component,OnDestroy} from '@angular/core';
import {Router} from '@angular/router';

import {ZephyrStore} from '../../../store/zephyr.store';
import {ReleaseAction} from '../../../actions/release.action';

import {LeftNavComponent} from '../common/leftnav/leftnav.component';

// Constants
import {MANAGER_ROLE_ID} from '../admin/customizations/customizations.constant';
import {PROJECTS_COMPONENT} from './project.constant';
import {ZEE_NAV_COLUMNS} from './project_leftnav.data';

import {ZephyrEventService} from '../../../services/zephyr.event.service';

declare var _, window;

@Component({
	selector: PROJECTS_COMPONENT,
    viewProviders: [ReleaseAction],
	templateUrl: 'projects.html'
})

export class ProjectsComponent implements OnDestroy {
    public navColumns;
    public releases;
    zephyrStore;
    projectId: string;
    unsubscribe;
    loggedInUser;
	constructor(private _zephyrEventService: ZephyrEventService, private router: Router, private _releaseAction: ReleaseAction) {

		this.navColumns = ZEE_NAV_COLUMNS;
		this._zephyrEventService.routeChange.subscribe(data=>this.onRouteChange(data));
        this.zephyrStore = ZephyrStore.getZephyrStore();
        this.loggedInUser = this.zephyrStore.getState().loggedInUser;
        this.unsubscribe = this.zephyrStore.subscribe(() => {
			let state = this.zephyrStore.getState();
            this.loggedInUser = state.loggedInUser;
            this.setLeftNavData(state);
            this.releases = state.release.releases;
            this.setReleasesDropdown(this.releases);
		});
	}

    ngOnDestroy() {
        this.unsubscribe();
    }
    setLeftNavData(state) {
        if(state.project.id) {
            if (!(state.loggedInUser.roles && state.loggedInUser.roles[0] &&
                state.loggedInUser.roles[0].id == MANAGER_ROLE_ID)) {

				let projects = state.projects.userAllocatedProjects;
                projects = projects.filter(project => state.project.id == project);
                if(!projects || !projects.length) {
                    return;
                }
            }
            this.navColumns.header.id = state.project.id;
            this.navColumns.header.title = state.project.name;
            this.navColumns.header.subtitle = state.project.description;
            this.navColumns.header.link = `/project/${state.project.id}`;
            this.navColumns.header.isSelected = true;
            _.filter(this.navColumns.group.items, item => {
                item.isActive = false;
            });
        }

        localStorage.setItem(`${window.tab}-currentProject`, JSON.stringify(state.project));

    }
    navigateToProject(ev) {
        if(this.navColumns.header.link) {
            this.router.navigateByUrl(this.navColumns.header.link);
        }
    }
    setReleasesDropdown(releases) {
        this.navColumns.isProjectFirstInstance = true;

        this.releases = releases.map(obj => ({id: obj.id, text: obj.name}));
        this.navColumns.releases = this.releases;
    }
	private onRouteChange(value) {
		this.router.navigate(value);
    }
}
