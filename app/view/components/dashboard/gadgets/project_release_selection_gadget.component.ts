import {Component, Input, AfterViewInit, Output, EventEmitter,
        ViewChild, OnDestroy} from '@angular/core';

declare var $, _;
import {ZephyrStore} from '../../../../store/zephyr.store';
import {ReleaseAction} from '../../../../actions/release.action';
// Constants
import {I18N_MESSAGES} from '../../../../utils/messages/messages.en';
import {FETCH_PROJECTS_SUCCESS, FETCH_RELEASES_SUCCESS} from '../../../../utils/constants/action.events';

@Component({
	selector: 'zui-gadgets-project-release',
	template: `
        <div [class]="'form-group'">
            <label for="dashboard-name">{{'zephyr.project.name' | i18nSelect: i18nMessages}}</label>
            <select [ngModel]="projectId" (change)="onProjectSelect($event)" placeholder="Select Project">
                <option *ngFor="let project of _projects" value="{{project.id}}">{{project.name}}</option>
            </select>
        </div>
        <div [class]="'form-group'">
            <label for="dashboard-name">{{'zephyr.release.name' | i18nSelect: i18nMessages}}</label>
            <select [ngModel]="releaseId" (change)="onReleaseSelect($event)" placeholder="Select Release">
                <option *ngFor="let release of _releases" value="{{release.id}}">{{release.name}}</option>
            </select>
        </div>
    `,
    providers: [ReleaseAction]
})

export class ZQLProjectReleaseSelectionComponent implements AfterViewInit, OnDestroy {
    @Output() onProjectReleaseSelection: EventEmitter<any> = new EventEmitter();
    @Input() releaseId;
    @Input() projectId;
    unsubscribe;
    i18nMessages = I18N_MESSAGES;
    _projects = [];
    _releases = [];
    private _zephyrStore;
    private _params = {
        projectId: null,
        projectName: '',
        releaseId: null,
        releaseName: ''
    };
    constructor(private _releaseAction: ReleaseAction) {
        this._zephyrStore = ZephyrStore.getZephyrStore();
		this.unsubscribe = this._zephyrStore.subscribe((x) => {
            let _state = this._zephyrStore.getState();
            this.setProjects(_state);
            if(_state.release.event === FETCH_RELEASES_SUCCESS) {
                if(_state.release.releases && _state.release.releases.length) {
                    this.setReleases(_state.release.releases, true);
                }
            } else {
                if(_state.release.releases && _state.release.releases.length) {
                    this.setReleases(_state.release.releases, false);
                } else {
                    this.getReleasesIfProjects(_state);
                }
            }
		});
    }
    ngAfterViewInit() {
        let _state = this._zephyrStore.getState();
        this.getReleasesIfProjects(_state);
    }
    ngOnDestroy() {
      this.unsubscribe();
    }
    getReleasesIfProjects(state) {

        // If projects are already fetched then set them else fetch them

        if(state.projects && _.isArray(state.projects.projects) && state.projects.projects.length) {
            setTimeout(() => {
                this.setProjects(state);
                this._params.projectId = this._projects[0].id;
                this.projectId = this._params.projectId;
                this._params.projectName = this._projects[0].name;
                if(this._params.projectId) {
                    if(state.release.releases && state.release.releases.length) {
                        this.setReleases(state.release.releases, false);
                    } else {
                        this.getReleasesById(this._params.projectId);
                    }
                }
            }, 10);
        }
    }
    /*
     *
     */
    onProjectSelect(ev) {
        this._params.projectId = _.toInteger(ev.target.value);
        this.projectId = this._params.projectId;
        this._params.projectName = $(ev.target).find('option:selected').text();
        this._releases = this.getReleasesByProjectId();
        if(this._releases.length) {
            this._params.releaseId = this._releases[0].id;
            this.releaseId = this._params.releaseId;
            this._params.releaseName = this._releases[0].name;
        }
        this.onProjectReleaseSelection.emit(this._params);
    }
    updateParamsOnCancel(projectId, releaseId) {
        this._params.projectId = projectId;
        this.projectId = projectId;
        this._params.releaseId = releaseId;
        this.releaseId = releaseId;
        this._releases = this.getReleasesByProjectId();
    }
    getReleasesByProjectId() {
        return this._zephyrStore.getState().release.releases.filter((obj) => {
            return (this._params.projectId == obj.projectId);
        });
    }
    getReleasesById(projectId) {
        /**
         * Triggering this call instead of fetchReleasesByProjectId, as currently
         * fetchReleasesByProjectId call is returning all the releases not filtered by projectId
         */
		this._zephyrStore.dispatch(this._releaseAction.fetchAllReleases());
    }
    setProjects(state) {
        this._projects = state.projects.projects; /*.map((obj, i) => {
            if(i === 0) {
                this._params.projectId = obj.id;
            }
            return {id: obj.id, text: obj.name};
        });*/
    }
    setReleases(releases, clearState) {
        let _releaseId = this._params.releaseId;

        if(clearState) {
            setTimeout(() => {
                this._zephyrStore.dispatch(this._releaseAction.clearReleaseEvent(FETCH_RELEASES_SUCCESS));
            }, 10);
        }
        if(this._releases.length || !this._params.projectId)
            return;
        this._releases = this.getReleasesByProjectId();
        this._params.releaseId = this._releases[0].id;
        this.releaseId = this._params.releaseId;
        this._params.releaseName = this._releases[0].name;
        if(_releaseId != this._params.releaseId) {
            this.onProjectReleaseSelection.emit(this._params);
        }
    }
    onReleaseSelect(ev) {
        this._params.releaseId = _.toInteger(ev.target.value);
        this.releaseId = this._params.releaseId;
        this._params.releaseName = $(ev.target).find('option:selected').text();
        this.onProjectReleaseSelection.emit(this._params);
    }
}
