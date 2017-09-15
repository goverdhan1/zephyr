import {Component, AfterViewInit, OnDestroy, Input} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Constants
import {ProjectAction} from '../../../actions/project.action';
import {ReleaseAction} from '../../../actions/release.action';
import {NotificationAction} from '../../../actions/notification.action';

import {ZephyrStore} from '../../../store/zephyr.store';
import {NotificationStore} from '../../../store/notification.store';
import {ZephyrEventService} from '../../../services/zephyr.event.service';

import {PROJECT_DETAILS_COMPONENT, PROJECT_SUMMARY_FIELDS} from './project.constant';
import {constructNotificationStoreMetadata} from '../../../utils/notification/notification.util';
import {NOTIFICATION_ENTITY_CONSTANTS} from '../../../utils/constants/notification.constants';

// Declaring AJS as global
declare var window: any;

@Component({
	selector: PROJECT_DETAILS_COMPONENT,
	viewProviders: [ProjectAction, ReleaseAction, NotificationAction],
	templateUrl: 'project_details.html'
})
export class ProjectDetailsComponent implements AfterViewInit, OnDestroy {
  @Input() appId;
  projectId: string;
	summaryFields = PROJECT_SUMMARY_FIELDS;
	projectSummary = {};
  unsubscribe;
	public project;
  public releases;
  public summaries = [];
	public zephyrStore;
  _notificationStore;
	constructor(private _projectAction: ProjectAction, public router: Router, private _releaseAction: ReleaseAction,
    private _notificationAction:NotificationAction, public _zephyrEventService: ZephyrEventService, private route: ActivatedRoute) {

		this.zephyrStore = ZephyrStore.getZephyrStore();
		this._notificationStore = NotificationStore.getNotificationStore();

		this.unsubscribe = this.zephyrStore.subscribe((x) => {
        	this.project = this.zephyrStore.getState().project;
        	this.projectSummary = this.zephyrStore.getState().projectSummaries;
        	// console.log(this.projectSummary);
        	this.summaries = this.parseProjectSummaries(this.projectSummary);
        	this.releases = this.zephyrStore.getState().release.releases;
        	this.setReleasesDropdown(this.releases);
      	});
      	this.route.params.subscribe(params => {
        	if(this.projectId && this.appId) {
          		this.handleUnSubscriptions();
        	}
        	this.projectId = params['id'];
        	if(this.projectId && this.appId) {
          		this.handleSubscriptions();
        	}

      	});
    }
    handleSubscriptions() {
      let curMetadata = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.PROJECT_USER,this.projectId,'');
      this._notificationStore.dispatch(this._notificationAction.subscribeToTopic(curMetadata, '',this.appId));
      curMetadata = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.RELEASE,this.projectId,'');
      this._notificationStore.dispatch(this._notificationAction.subscribeToTopic(curMetadata, '',this.appId));
      curMetadata = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.PROJECT,'','');
      this._notificationStore.dispatch(this._notificationAction.subscribeToTopic(curMetadata, '',this.appId));
    }
    handleUnSubscriptions() {
      let curMetadata = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.PROJECT_USER,this.projectId,'');
      this._notificationStore.dispatch(this._notificationAction.unSubscribeFromTopic(curMetadata, this.appId));
      curMetadata = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.RELEASE,this.projectId,'');
      this._notificationStore.dispatch(this._notificationAction.unSubscribeFromTopic(curMetadata,this.appId));
      curMetadata = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.PROJECT,'','');
      this._notificationStore.dispatch(this._notificationAction.unSubscribeFromTopic(curMetadata,this.appId));
    }
	parseProjectSummaries(projectSummary) {
		return this.summaryFields.map(summary => {

			summary['count'] = projectSummary[summary.key];

			if(summary['count'] < 10) {
        		summary['count'] = '0' + summary['count'];
			}
			return summary;
		});
	}
	  refreshView() {
        this.getReleases();
        this.getProjectDetails();
        this.setReleasesDropdown(this.releases);
    }
    ngAfterViewInit() {
		this.getReleases();
		this.getProjectDetails();
		this.setReleasesDropdown(this.releases);
    	this.handleSubscriptions();
    }
	getProjectDetails() {
		this.zephyrStore.dispatch(this._projectAction.fetchProjectDetailsById(this.projectId));
		this.zephyrStore.dispatch(this._projectAction.fetchProjectSummaries(this.projectId));
    }
    getReleases() {
		this.zephyrStore.dispatch(this._releaseAction.fetchReleasesByProjectId(this.projectId, false));
    }
    setReleasesDropdown(releases) {
    	releases = releases.filter(function(release) {
            return !release.status;
        });
        this.releases = releases.map((obj) => {
            return {id: obj.id, text: obj.name};
        });
    }
    getCurrentReleaseFromReleases(event) {
      let currentRelease = null;
      this.releases.filter(function(release){
        if(release.id === event.id) {
          currentRelease = release;
        }
      });
      return currentRelease;
    }
    setCurrentReleaseinLocalStorage(currentRelease) {
      localStorage.setItem(`${window.tab}-currentRelease`, JSON.stringify(currentRelease));
    }
    goToRelease(event) {
    	let currentRelease = this.getCurrentReleaseFromReleases(event);
        this.setCurrentReleaseinLocalStorage(currentRelease);
        this.router.navigate(['/release', event.id]);
    }

    ngOnDestroy() {
      if(this.projectId && this.appId) {
        this.handleUnSubscriptions();
      }
      this.unsubscribe();
    }

}
