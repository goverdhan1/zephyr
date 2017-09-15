import {Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
// import {OnActivate, RouteSegment} from '@angular/router';
import {Router, ActivatedRoute} from '@angular/router';
//import {HeaderComponent} from '../../common/components/header/header';

import {ProjectDetailsComponent} from './project_details.component';
import {ProjectReleasesComponent} from './project_releases.component';
import {ProjectTeamLocationComponent} from './project_team_location.component';
// import {ProjectNewsComponent} from './project_news.component';
import {ProjectModel} from '../../../models/project.model';
import {ZephyrStore} from '../../../store/zephyr.store';
// Constants
import {PROJECT_COMPONENT} from './project.constant';
import {NOTIFICATION_APP_CONSTANTS} from '../../../utils/constants/notification.constants';

import {ProjectAction} from '../../../actions/project.action';
import {NotificationStore} from '../../../store/notification.store';
import {NotificationAction} from '../../../actions/notification.action';
import {RELEASE_SETUP_APPLICATION_ID} from '../admin/customizations/customizations.constant';

declare var _,jQuery: any;


@Component({
	selector: PROJECT_COMPONENT,
	templateUrl: 'project.html',
  	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectComponent implements OnInit {
	@ViewChild(ProjectDetailsComponent) projDetails: ProjectDetailsComponent;
	@ViewChild(ProjectTeamLocationComponent) projTeamDetails: ProjectTeamLocationComponent;
	id: string;
	title: string;
	category: string;
	public projects: ProjectModel[];
	public project;

  public items = [
    {id : '1', text: ' Test 1 '},
    {id : '2', text: ' Test 2 '},
    {id : '3', text: ' Test 3 '},
    {id : '4', text: ' Test 4 '},
    {id : '5', text: ' Test 5 '},
    {id : '6', text: ' Test 6 '},
    {id : '7', text: ' Test 7 '},
    {id : '8', text: ' Test 8 '},
    {id : '9', text: ' Test 9 '},
    {id : '10', text: ' Test 10 '},
  ];

	zephyrStore;
	_notificationStore;
	appId;
  public navColumns;
  ifReleaseSetupPermitted: boolean = false;
  activeItemKey: string;
	constructor(private route: ActivatedRoute, private _projectAction: ProjectAction, private _notificationAction:NotificationAction, private router: Router, private cdr: ChangeDetectorRef) {

		this.zephyrStore = ZephyrStore.getZephyrStore();
		this._notificationStore = NotificationStore.getNotificationStore();
		this.appId = NOTIFICATION_APP_CONSTANTS.PROJECT_APP.name;

		this.zephyrStore.subscribe(() => {
			let state = this.zephyrStore.getState();
			this.project = state.project;
			this.isReleaseSetupPermit(state);


			// this show the automation license modal if liscense id expired/invalid
			let autoLicense = state.license.automation;
			let IS_FIRST_LOAD = localStorage.getItem('IS_FIRST_LOAD');
			if(autoLicense === 'INVALID' && IS_FIRST_LOAD === 'true'){
				jQuery('#zui-license-expired-authentication-warning').modal('show');
			}

			if(this.cdr) { this.cdr.markForCheck(); }
		});
		this.activeItemKey ='project-dashboard';
		if(this.cdr) { this.cdr.markForCheck(); }
	}

	ngOnInit() {
		localStorage.removeItem('releases');
    	this.route.params.subscribe(params => {
        	this.projDetails.refreshView();
        	this.projTeamDetails.refreshView();
    	});
	}

	applyNotifications(ev) {
        this.projDetails.refreshView();
      	this.projTeamDetails.refreshView();
        this._notificationStore.dispatch(this._notificationAction.applyNotification(this.appId, true));
  	}

	isReleaseSetupPermit(state) {
		let isPermission = false;
		try {
			isPermission = (state.loggedInUser.permissions || []).some(_app => RELEASE_SETUP_APPLICATION_ID == _app.applicationName);
		} catch (err) {
			console.log('permission for release setup cannot be determined', err);
		}
	    this.ifReleaseSetupPermitted = isPermission;
    }

    navigateToreleaseSetup () {
        this.router.navigateByUrl('/release_setup/details');
    }

  closelicenExpModal() {
        localStorage.setItem('IS_FIRST_LOAD', 'false');
       jQuery('#zui-license-expired-authentication-warning').modal('hide');
  }

}
