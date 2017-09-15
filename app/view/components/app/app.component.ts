import {Component, OnInit, OnDestroy, Inject} from '@angular/core';
import { Routes, Router, NavigationEnd} from '@angular/router';
import { Title } from '@angular/platform-browser';

import { TopNavComponent } from '../../components/common/topnav/topnav.component';
import { FooterComponent } from '../../components/common/footer/footer.component';
import { MessageComponent } from '../../components/common/message/message.component';
import {MANAGER_ROLE_ID} from '../../components/admin/customizations/customizations.constant';

import {NotificationAtmosphereUtil} from '../../../utils/notification/notification_atmosphere.util';
import {constructNotificationStoreMetadata, checkIfAutoApplyRequired} from '../../../utils/notification/notification.util';

import {ZephyrStore} from '../../../store/zephyr.store';
import {NotificationStore} from '../../../store/notification.store';

import {UserAction} from '../../../actions/user.action';
import {AdminAction} from '../../../actions/admin.action';
import {GlobalAction} from '../../../actions/global.action';
import {ProjectAction} from '../../../actions/project.action';
import {ReleaseAction} from '../../../actions/release.action';
import {TeamAction} from '../../../actions/team.action';
import {LoginAction} from '../../../actions/login.action';
import {NotificationAction} from '../../../actions/notification.action';
import {TestcaseAction} from '../../../actions/testcase.action';
import {RequirementsAction as ReqAction} from '../../../actions/requirements.action';
import {ZAutomationAction} from '../../../actions/zautomation.action';
import { Http } from '@angular/http';
import {isLoggedin}  from '../../../utils/constants/is-loggedin';

import {ROUTES_MAIN} from '../../../utils/constants/router-config.constants';
import {
  LOGIN_SUCCESS, SUBSCRIBER_REGISTRATION_SUCCESS, APPLY_NOTIFICATION,
  FETCH_ALLOCATED_PROJECTS_SUCCESS, REDIRECT_TO_LOGIN
} from '../../../utils/constants/action.events';
import {NOTIFICATION_ENTITY_CONSTANTS,NOTIFICATION_APP_CONSTANTS,
  NOTIFICATION_STATE_CONSTANTS} from '../../../utils/constants/notification.constants';
import { ADMIN_PREFERENCES } from '../../components/admin/admin.constant';

import 'rxjs/Rx';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import {LogoutHandlerUtil} from '../../../utils/logout_handler/logout_handler.util';
import {I18N_MESSAGES} from '../../../utils/messages/messages.en';
import {PouchDBPrefsServices} from '../../../services/pouch.db.service';

declare var jQuery: any, _, window: any, PouchDB: any, pagetitle;

/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (LoginComponent, AboutComponent,...).
 */
@Component({
  selector: 'zui-app',
  templateUrl: 'app.html',
  providers: [UserAction, AdminAction, GlobalAction, ProjectAction, ReleaseAction, NotificationAction, TeamAction,
    LoginAction, TestcaseAction, ReqAction]
})
// @Routes(ROUTES_MAIN)
export class AppComponent implements OnInit, OnDestroy {
  _zephyrStore;
  _notificationStore;
  isLoggedin = isLoggedin;
  navColumns;
  clientDBReset = false;
  activeItemKey;
  _notificationAtmUtil:NotificationAtmosphereUtil;
  _notificationSubId:any;
  _atmWaitTimeout;
  projectNavigated=false;
  _userProjectsFetchComplete=false;
  _handleAutoLogout=false;
  _handleProjectDelete=false;
  _time=120;
  _timer;
  username;
  mapping: any = {
    'admin': 1,
    'resource_management' : 2,
    'project_setup' : 3,
    'project' : 150,
    'defects_admin' : 6,
    'tcr': 15,
    'requirements': 9,
    'release_setup': 8,
    'release' : 200,
    'dashboards' : 100,
    'dashboard': 100,
    'testcase-eas': 11,
    'tce': 16,
    'defect-tracking': 17,
    'zautomation': 210
  };
  appTitleMapping: any = {
    'admin': 'Administration',
    'resource_management' : 'Manage Users',
    'project_setup' : 'Project Setup',
    'project' : 'Project',
    'defects_admin' : 'Defects Admin',
    'tcr': 'Test Repository',
    'requirements': 'Requirements',
    'release_setup': 'Release Setup',
    'release' : 'Release',
    'dashboards' : 'Dashboards',
    'dashboard': 'Dashboard',
    'testcase-eas': 'Test Planning',
    'tce': 'Test Execution',
    'defect-tracking': 'Defect Tracking',
    'zautomation': 'ZAutomation',
    'login': 'Login',
    'quality-trends' : 'Cyclone',
    'reports' : 'Reports'
  };
  expiryMessage='';
  displayMessage=true;
  public selectedEntity:any;
  i18nMessages = I18N_MESSAGES;
  _isMobile;
  private _globalUserAppTriggerState = NOTIFICATION_STATE_CONSTANTS.WAITING;
  private _globalProjectAppTriggerState = NOTIFICATION_STATE_CONSTANTS.WAITING;
  private _globalLoggedUserAppTriggerState = NOTIFICATION_STATE_CONSTANTS.WAITING;
  private _globalReleaseAppTriggerState = NOTIFICATION_STATE_CONSTANTS.WAITING;
  private _getGlobalDataTriggerState = NOTIFICATION_STATE_CONSTANTS.WAITING;
  constructor(private _userAction: UserAction, private router: Router, private _adminAction: AdminAction,
              private _globalAction: GlobalAction, private _projectAction: ProjectAction, private _teamAction:TeamAction,
              private _loginAction: LoginAction, private _testcaseAction: TestcaseAction, private _reqAction: ReqAction,
              @Inject(PouchDBPrefsServices) private pouchDBSercvice: PouchDBPrefsServices,
              private _releaseAction: ReleaseAction, private _notificationAction: NotificationAction, private http: Http, private titleService: Title ) {

    ZephyrStore.createZephyrStore({});
    NotificationStore.createNotificationStore({});
    this._zephyrStore = ZephyrStore.getZephyrStore();
    this._notificationStore = NotificationStore.getNotificationStore();
    this._notificationAtmUtil = NotificationAtmosphereUtil.getInstance();
    let urlMapping = {};
    let previousPath = '';
    router.events.subscribe(event => {
        if(event instanceof NavigationEnd) {
            let path = this.getPath(event.url);
            let pageTitle = this.appTitleMapping[path];
            this.titleService.setTitle(`${pageTitle} - ${pagetitle}`);

            let appId = this.mapping[path];

            if (~[9, 11, 15, 16].indexOf(appId)) {
                // remember view only for requirements, Repository, Planning, and Execution.
                let state = this._zephyrStore.getState();
                if (state.loggedInUser && !_.isEmpty(state.loggedInUser)) {
                    let params = event.url.split(';');
                    let releaseId = params.shift().split(`${path}/`)[1];
                    let mapId = `location-${state.loggedInUser.id}-${releaseId}-${appId}`;
                    if (previousPath !== path) {
                        // user has moved to different app, if last state is stored redirect to it
                        if (urlMapping.hasOwnProperty(mapId)) {
                            this.router.navigate([path, releaseId, urlMapping[mapId]]);
                        }
                    } else {
                        let key;
                        urlMapping[mapId] = {};
                        params.forEach(item => {
                            key = item.split('=');
                            urlMapping[mapId][key[0]] = decodeURIComponent(key[1]);
                        });
                    }
                }
            }
            previousPath = path;
        }
    });
    this._zephyrStore.subscribe(() => {

      let state = this._zephyrStore.getState();
      if ('LICENSE_EXPIRY' === state.loggedUsers.event) {
        this._zephyrStore.dispatch(this._loginAction.clearEvent());
        this.expiryMessage= state.loggedUsers.message;
        this.displayMessage = true;
      }
      if ('FETCH_RELEASE_DETAILS_ONLY' === state.release.event) {
        this._zephyrStore.dispatch(this._releaseAction.clearReleaseEvent());
        let projectID = state.release.projectID;
        this.navigateToProject({projectID});
      }
      this._isMobile = state.global.isMobile;
      let user = state.loggedInUser,
        projectPermissions = state.projects;

      if(user.event == 'LOGGEDIN_USER_PERMISSIONS_SUCCESS' && user.urlChange && user.urlChange.event == 'URL_CHANGE_PERMISSION') {
        let path, appId, currentUrl = this.router.url;

        if (currentUrl) {
          path = this.getPath(currentUrl);
          appId = this.mapping[path];

          if (!appId && !(path == 'login')) {
            return;
          }

          let vId = currentUrl.split('/')[currentUrl.split('/').length - 1].split(';')[0],
            projectId = projectPermissions.releaseDetails && projectPermissions.releaseDetails.projectId;

          if(path.indexOf('saml') > -1) {
            return;
          } else if(user.accessibleAppIds.indexOf(appId) > -1 || appId == 100 || appId == 150 || appId == 200) {
            this.handleUIRouting(vId, user, appId);
          } else if(path.indexOf('dashboard') > -1 || (path == 'admin' && vId == 'aboutZephyr')) {
            return;
          } else if(path.indexOf('zautomation') > -1){
            return;
          } else if(!path || path.indexOf('next_url') > -1) {
           // this.router.navigate(['/']);
            let nextURL = this.getNextPageURL();
            this.router.navigateByUrl(decodeURIComponent(nextURL));
          } else if(!path || path.indexOf('login') > -1) {
            this.router.navigate(['/']);
          } else {
            this.displayUnauthorisedPopup();
          }
        }
        // NOT clearing it..Its being cleared in left nav which handles app permissions for the same event and clears it there
        // this._zephyrStore.dispatch(this._userAction.clearUserEvent());
      }

      if(user.event == REDIRECT_TO_LOGIN) {
        this.handleAutoLogout(state.loggedUsers, user);
        this._zephyrStore.dispatch(this._userAction.clearUserEvent());
      }

      if(user && user.event == LOGIN_SUCCESS) {
        //clear user events
        this._zephyrStore.dispatch(this._userAction.clearUserEvent());
        this._handleAutoLogout = false;
        this._handleProjectDelete = false;
        this._zephyrStore.dispatch(this._projectAction.fetchUserAllocatedProjectsPostLogin(user.id));
        // register resource again since logout would have closed it
        this._notificationAtmUtil.registerAtmResource(this.onWebsocketOpen.bind(this, this), this.processNotificationMessage.bind(this,this), this.onWebsocketOpen.bind(this, this));

        this._atmWaitTimeout = setTimeout(() => {
            NotificationAtmosphereUtil.getInstance().updateSubscriberId('');
            this._notificationAtmUtil.setRegisterComplete(true);
            this.getGlobalData();
            this.navigateUserToProject();
          }, 5000);
        }
        if (state.fields.isZephyrAccessLocked == true && state.loggedInUser.id) {
            setTimeout(() => {
                console.log('zephyr locked');
                this.router.navigate(['/admin/customizations']);
                localStorage.setItem('openFieldsModal', 'true');
            }, 20);
        } else {
            localStorage.setItem('openFieldsModal', 'false');
        }

        if(state.projects && state.projects.event == FETCH_ALLOCATED_PROJECTS_SUCCESS && !this.projectNavigated) {
            this.projectNavigated = true;
            this._zephyrStore.dispatch(this._projectAction.clearProjectsEvent());
            setTimeout(() => {
                this.projectNavigated = false;
                this._userProjectsFetchComplete = true;
                this.navigateUserToProject();
            }, 10);
        }

        if ('FETCH_PHASE_TREE' === state.release.event) {
            this._zephyrStore.dispatch(this._releaseAction.clearReleaseEvent());
            this._zephyrStore.dispatch(this._projectAction.fetchAllocatedProjectsAndPermission(user.id, user.roles[0].id, state.release.releaseId));
            this._zephyrStore.dispatch(this._releaseAction.fetchOnlyReleaseById(state.release.releaseId));
        }
        if(jQuery('#environment-type').val() !== 'dev') {
            this.handleAutoLogout(state.loggedUsers, user);
        }
        this.handleCurrentProjectDeleted();
    });
    this._notificationStore.subscribe((x) => {
      let state = this._notificationStore.getState();
      let notification = state.notification;
      if(notification && notification.event == SUBSCRIBER_REGISTRATION_SUCCESS &&
        this._getGlobalDataTriggerState == NOTIFICATION_STATE_CONSTANTS.WAITING) {
        this._getGlobalDataTriggerState = NOTIFICATION_STATE_CONSTANTS.APPLY_IN_PROGRESS;
        this._notificationStore.dispatch(this._notificationAction.clearNotificationEvent());
        this.getGlobalData();
        setTimeout(() => {
          this._getGlobalDataTriggerState = NOTIFICATION_STATE_CONSTANTS.WAITING;
          this.subscribeToGlobalTopics();
          this._notificationAtmUtil.setRegisterComplete(true);
          this.navigateUserToProject();
        },5);
      }
      this.handleUnsubscriptions(notification);
      this.handleGlobalAutoNotifications(notification);
    });
    let isExpired = localStorage.getItem('isTokenExpired');
    let state = this._zephyrStore.getState();
    let user = state.loggedUsers;
    if(isExpired && isExpired == 'true') {
      localStorage.removeItem('isTokenExpired');
    } else if(Object.keys(user).length){
      this.getGlobalData();
    }
  }

  getPath(url) {
    return url.indexOf('html5') > -1 ? url.split('html5/')[1].split('/')[0].split('?')[0] : url.split('/')[1].split('?')[0];
  }
  handleUIRouting(vId, user, appId) {
    let state = this._zephyrStore.getState();
    let projectPermissions = state.projects;
    let projectId = projectPermissions.releaseDetails && projectPermissions.releaseDetails.projectId;
    let currentRelease = state.release.releases.filter((release) => release.id === parseInt(vId));

    if (currentRelease && currentRelease.length) {
      projectId = currentRelease[0].projectId;
    }
    if (projectId) {
      if([200].indexOf(appId) > -1 && user.userType == 2) {
        this.displayUnauthorisedPopup();
      } else if(
        ([9, 15, 16, 11, 17, 200].indexOf(appId) > -1 && !isNaN(Number(vId)) && projectPermissions.userAllocatedProjects.indexOf(projectId) > -1) ||
        (appId == 150 && projectPermissions.userAllocatedProjects.indexOf(Number(vId)) > -1) || ([1, 2, 3, 6, 8, 100].indexOf(appId) > -1)) {

        return;
      } else {
        this.displayUnauthorisedPopup();
      }
    } else {
      setTimeout(() => {
        this.handleUIRouting(vId, user, appId);
      }, 2000);
    }
  }

  handleAutoLogout(loggedUser, user){
    if(!this._handleAutoLogout) {
      return;
    }
    if(user && user.userType == 2) {
      // Do not need to handle auto logout for dashboard user - So quit the check
      return;
    }
    if(loggedUser && loggedUser.loggedInUser && user && user.id) {
      let userDetails = loggedUser.loggedInUser[user.id];
      if((!userDetails) || (userDetails && userDetails.clientId && user.clientId && userDetails.clientId!=user.clientId)) {
        this._handleAutoLogout = false;
        this.performCleanup();
        setTimeout(() => {
          jQuery('#zee-logout-info').modal('show');
        }, 10);
      }
    }
  }
  resetOnLogout(ev) {
    this._handleAutoLogout = false;
    this._handleProjectDelete = false;
  }
  handleCurrentProjectDeleted() {
    if(!this._handleProjectDelete) {
      return;
    }
    let state = this._zephyrStore.getState();
    let user = state.loggedInUser;
    if(user && user.userType == 2) {
      // Do not need to handle auto logout for dashboard user - So quit the check
      return;
    }
    let currentProject = localStorage.getItem(`${window.tab}-currentProject`)|| {};
    if(currentProject && currentProject['id']) {
      let projects = state.projects.userAllocatedProjects;
      projects = projects.filter(project => currentProject['id'] == project);
      if(!projects.length) {
        this._handleProjectDelete = false;
        this.performCleanup();
        setTimeout(() => {
          localStorage.setItem(`${window.tab}-currentProject`, JSON.stringify({}));
          jQuery('#zee-logout-info').modal('show');
        }, 15);
      }
    }
  }
  getNextPageURL() {
    let _urls = this.router.url.split('?next_url=');
    let _nextURL = _urls[1] || '';
    if(_nextURL) {
      try {
        _nextURL = _nextURL.split(';')[0] || '';
      } catch (e) {
        //  console.log(e);
      }
    }
    return _nextURL;
  }
  navigateUserToProject() {
    if(this._notificationAtmUtil.getRegisterComplete() && this._userProjectsFetchComplete) {
      let state = this._zephyrStore.getState();

      let nextURL = this.getNextPageURL();
      let user = state.loggedInUser;

      // If next url present then navigate to the url

      let location = localStorage.getItem('lastLocation');

      if (location) {
        this.pouchDBSercvice.redirectToLastUrl();
        return;
      }

      if(nextURL) {
        this.router.navigateByUrl(decodeURIComponent(nextURL));
      } else if (user && user.userType == 2) {
        this.router.navigate(['/dashboards']);
      }

      let currentUrl = nextURL ? decodeURIComponent(nextURL) : window.location.pathname;
      let path = this.getPath(currentUrl);
      let appId = this.mapping[path];
      let cId = currentUrl.split('/')[currentUrl.split('/').length - 1].split(';')[0];


      if (~[9, 11, 15, 16, 17, 200].indexOf(appId) && !isNaN(Number(cId))) {

        // if url is any of requirement, tcr, planning, execution, defect-tracking or release, cId is release id, fetch release details to get project id
        if (!(11 === appId && ~currentUrl.indexOf('phase'))) {
            // for eas phase cid is phase id, not release id, wait for phase tree call to be triggered by eas-phase component, else call project and permission
            this._zephyrStore.dispatch(this._releaseAction.fetchOnlyReleaseById(cId));
        }
      } else if (150 === appId) {

        // if url is project, cid is project id
        this.navigateToProject({projectID: cId});
      }

      this._userProjectsFetchComplete = false;
      this._notificationAtmUtil.setRegisterComplete(false);
    }
  }

  navigateToProject(data) {
      this._zephyrStore.dispatch(this._projectAction.fetchProjectDetailsById(data.projectID));
      this._zephyrStore.dispatch(this._projectAction.fetchProjectSummaries(data.projectID));
      this._zephyrStore.dispatch(this._releaseAction.fetchReleasesByProjectId(data.projectID, false));
  }
  displayUnauthorisedPopup() {
    let user = this._zephyrStore.getState().loggedInUser;
    this.username = user.fullName;
    jQuery('#zee-redirect').modal('show');
    jQuery('#zee-redirect').css({'background': '#FFF'});
  }

  fetchCustomFields() {
    this._zephyrStore.dispatch(this._globalAction.fetchCustomFields());
  }

  getGlobalData() {
    this._zephyrStore.dispatch(this._globalAction.isMobile());
    this._zephyrStore.dispatch(this._globalAction.browser());
    let state = this._zephyrStore.getState();
    let user = state.loggedInUser;

    if(Object.keys(user).length) {
      this.fetchCurrentProjectTeam();
      this.fetchCustomFields();

      this._zephyrStore.dispatch(this._userAction.fetchUsers(true));
      this._zephyrStore.dispatch(this._userAction.fetchAllLoggedInUsers(true));
      this._zephyrStore.dispatch(this._projectAction.fetchProjectsLite(true));
      this._zephyrStore.dispatch(this._projectAction.fetchUserProjects(user.id), true);
      this._zephyrStore.dispatch(this._projectAction.fetchAllocatedProjectsAndPermission(user.id, user.roles[0].id, null));

      // get information of defect
      this._zephyrStore.dispatch(this._globalAction.fetchDefectSystemDetails());

      // above condition is not required - this is being fixed server side and now we'll get all preference as
      // per the logged in user role
      this._zephyrStore.dispatch(this._adminAction.getAllPref(true));

      this._zephyrStore.dispatch(this._adminAction.getRolePermissions(user.roles[0].id , true));
      if (user.roles && user.roles[0] && user.roles[0].id == MANAGER_ROLE_ID) {
        this._zephyrStore.dispatch(this._globalAction.serverPaused());
      }
      setTimeout(() => {
        LogoutHandlerUtil.getInstance().initHandler();
        this.registerLogoutTicker();
        this._time = LogoutHandlerUtil.getInstance().getTickerTime();
      }, 2000);


      }


  }
  redirectToLogin() {
    jQuery('#zee-logout-info').modal('hide');
    this.router.navigate(['/login']);
  }

  redirectDefault() {
    jQuery('#zee-redirect').modal('hide');
    jQuery('.modal-backdrop').remove();
    let state = this._zephyrStore.getState();
    let projects = state.projects,
      user = state.loggedInUser;

    if(user && user.userType == 2) {
        this.router.navigate(['/dashboards']);
    } else {
        this.router.navigate(['/project', projects.userAllocatedProjects[0]]);
    }
  }

  refreshToken() {
    this._zephyrStore.dispatch(this._loginAction.refreshToken());
    setTimeout(() => {
      clearInterval(this._timer);
      this._time = LogoutHandlerUtil.getInstance().getTickerTime();
      jQuery('#zee-admin-auto-logout-warning').modal('hide');
    }, 20);
  }
  registerLogoutTicker() {
    jQuery('#zee-admin-auto-logout-warning').on('shown.bs.modal' , (e) => {
      e.stopImmediatePropagation();
      this._timer = setInterval(() => {
        this._time--;
        if(this._time == 0) {
          clearInterval(this._timer);
          this._time = LogoutHandlerUtil.getInstance().getTickerTime();
          jQuery('#zee-admin-auto-logout-warning').modal('hide');
          this.performCleanup();
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 5);
        }
      }, 1000);
    });
    jQuery('#zee-admin-auto-logout-warning').on('hide.bs.modal', () => {
      clearInterval(this._timer);
    });
  }
  ngOnInit() {

    this.router.events.subscribe((event) => {

      if (event instanceof NavigationEnd && event.urlAfterRedirects !== '/login') {

        if (this.pouchDBSercvice.prefsLoaded) {
          this.pouchDBSercvice.saveLastUrl(event.urlAfterRedirects);
        }

        // localStorage.setItem('lastVisited', event.urlAfterRedirects);
      }

    });

    this._notificationAtmUtil.updateCallBacks(this.onWebsocketOpen.bind(this, this), this.processNotificationMessage.bind(this, this), this.onWebsocketOpen.bind(this, this));

      let state = this._zephyrStore.getState();
      if ('LICENSE_EXPIRY' === state.loggedUsers.event) {
        this._zephyrStore.dispatch(this._loginAction.clearEvent());
        this.expiryMessage = state.loggedUsers.message;
        this.displayMessage = true;
      } else {
        this.displayMessage = false;
      }

    let user = this._zephyrStore.getState().loggedInUser;
    if(this.isLoggedin()) {
      let subscriberId = this._notificationAtmUtil.getSubscriberId();
      let resourceId = this._notificationAtmUtil.getSocketId();
      this._notificationStore.dispatch(this._notificationAction.updateSubscriberAndResourceId(subscriberId, resourceId));
      // wait for 20ms before subsid is updated in the store from the previous call,
      // so that it can be sent as part of header for the global data fetch
      // fetch automation license info
      this._zephyrStore.dispatch(this._loginAction.getAutomationLicense());
      setTimeout(() => {
        this.subscribeToGlobalTopics();
      }, 20);

      this._zephyrStore.dispatch(this._loginAction.getAdminAccessCheck());

      this._handleAutoLogout = false;
      this._handleProjectDelete = false;
      if(user) {

        try {
            let currentUrl = window.location.pathname;
            let path = this.getPath(currentUrl);
            let appId = this.mapping[path];
            let cId = currentUrl.split('/')[currentUrl.split('/').length - 1].split(';')[0];

          if([9, 15, 16, 11, 17, 200].indexOf(appId) > -1 && !isNaN(Number(cId))) {
            if (!(11 === appId && ~currentUrl.indexOf('phase'))) {
                // for eas phase cid is phase id, not release id, wait for phase tree call to be triggered by eas-phase component, else call project and permission
                this._zephyrStore.dispatch(this._projectAction.fetchAllocatedProjectsAndPermission(user.id, user.roles[0].id, cId));
            }

          } else {
            this._zephyrStore.dispatch(this._projectAction.fetchAllocatedProjectsAndPermission(user.id, user.roles[0].id, null));
          }
          this._zephyrStore.dispatch(this._projectAction.fetchUserAllocatedProjectsPostLogin(user.id));
        } catch (e) {
          this.router.navigate(['/project', 1]);
        }

      } else {
        this.router.navigate(['/project', 1]);
      }

      //Modal behavior on backspace
      jQuery('body').on('keydown', (e) => {
/*        if (jQuery('.modal').is(':visible')) {
        }*/
        var rx = /INPUT|SELECT|TEXTAREA/i;
        //Complete disabling back button navigation on IE
        if (e.keyCode == 8) {
            if(!rx.test(e.target.tagName)){
                e.preventDefault();
            }
        }
       });

    } else {


        if(window.location.pathname.replace('/flex/html5') !== '/login' || window.location.href.indexOf('next_url') > -1) {

            // navigate to url if nexturl already present else append
            if(window.location.href.indexOf('next_url') !== -1 && window.location.search.indexOf('login') === -1) {
                this.router.navigateByUrl(window.location.pathname.replace('/flex/html5', '') + window.location.search);
            } else if(window.location.pathname.replace('/flex/html5') !== '/login') {
                this.router.navigateByUrl('/login?next_url='+ window.location.pathname.replace('/flex/html5', ''));
            }
        } else {
            // redirect to login if not already there
            this.router.navigate(['/login']);
        }

        /*              // Setting user info
        ZephyrAnalytics.register({
            'id': user.id,
            'name': user.fullName,
            'email': user.email
        });
        ZephyrAnalytics.people.set({
            'id': user.id,
            'name': user.fullName,
            'email': user.email
        });
        ZephyrAnalytics.identify(user.id);*/

    }

  }

  ngOnDestroy() {
    jQuery('#custom-backdrop').off('click');
  }

  //NOTIFICATION FUNCTIONS
  handleGlobalAutoNotifications(notification) {
    let appData = notification.ui_details[NOTIFICATION_APP_CONSTANTS.GLOBAL_USER_APP.name];
    if(appData && appData.event == APPLY_NOTIFICATION && this._globalUserAppTriggerState == NOTIFICATION_STATE_CONSTANTS.WAITING) {
      this._globalUserAppTriggerState = NOTIFICATION_STATE_CONSTANTS.APPLY_IN_PROGRESS;
      let waitTime = checkIfAutoApplyRequired(NOTIFICATION_APP_CONSTANTS.GLOBAL_USER_APP.name, notification);
      this._notificationStore.dispatch(
        this._notificationAction.applyNotification(NOTIFICATION_APP_CONSTANTS.GLOBAL_USER_APP.name,true));
      setTimeout(() => {
        this._handleProjectDelete = true;
        this._zephyrStore.dispatch(this._userAction.fetchUsers(true));
        this.fetchCurrentProjectTeam();
        this._globalUserAppTriggerState = NOTIFICATION_STATE_CONSTANTS.WAITING;
      }, waitTime);
    }
    appData = notification.ui_details[NOTIFICATION_APP_CONSTANTS.GLOBAL_PROJECT_APP.name];
    if(appData && appData.event == APPLY_NOTIFICATION && this._globalProjectAppTriggerState == NOTIFICATION_STATE_CONSTANTS.WAITING) {
      this._globalProjectAppTriggerState = NOTIFICATION_STATE_CONSTANTS.APPLY_IN_PROGRESS;
      let waitTime = checkIfAutoApplyRequired(NOTIFICATION_APP_CONSTANTS.GLOBAL_PROJECT_APP.name, notification);
      this._notificationStore.dispatch(
        this._notificationAction.applyNotification(NOTIFICATION_APP_CONSTANTS.GLOBAL_PROJECT_APP.name,true));
      setTimeout(() => {
        this._handleProjectDelete = true;
        this._zephyrStore.dispatch(this._projectAction.fetchUserProjects(this._zephyrStore.getState().loggedInUser.id, true));
        this._zephyrStore.dispatch(this._projectAction.fetchProjectsLite(true));
        this._zephyrStore.dispatch(
          this._projectAction.fetchUserAllocatedProjects(this._zephyrStore.getState().loggedInUser.id, true));
        this.fetchCurrentProjectTeam();
        //initial call from TopNavComponent
        // this._zephyrStore.dispatch(this._projectAction.fetchingAllProjects());
        this._globalProjectAppTriggerState = NOTIFICATION_STATE_CONSTANTS.WAITING;
      }, waitTime);
    }

    appData = notification.ui_details[NOTIFICATION_APP_CONSTANTS.GLOBAL_LOGGED_IN_USER_APP.name];
    if(appData && appData.event == APPLY_NOTIFICATION &&
      this._globalLoggedUserAppTriggerState == NOTIFICATION_STATE_CONSTANTS.WAITING) {
      this._globalLoggedUserAppTriggerState = NOTIFICATION_STATE_CONSTANTS.APPLY_IN_PROGRESS;
      let waitTime = checkIfAutoApplyRequired(NOTIFICATION_APP_CONSTANTS.GLOBAL_LOGGED_IN_USER_APP.name, notification);
      this._notificationStore.dispatch(
        this._notificationAction.applyNotification(NOTIFICATION_APP_CONSTANTS.GLOBAL_LOGGED_IN_USER_APP.name,true));
      setTimeout(() => {
        this._zephyrStore.dispatch(this._userAction.fetchAllLoggedInUsers(true));
        this._handleAutoLogout=true;
        this._globalLoggedUserAppTriggerState = NOTIFICATION_STATE_CONSTANTS.WAITING;
      }, waitTime);
    }
    let currentProject = localStorage.getItem(`${window.tab}-currentProject`) || {};
    if(currentProject && currentProject['id']) {
      appData = notification.ui_details[NOTIFICATION_APP_CONSTANTS.GLOBAL_RELEASE_APP.name];
      if(appData && appData.event == APPLY_NOTIFICATION &&
        this._globalReleaseAppTriggerState == NOTIFICATION_STATE_CONSTANTS.WAITING) {
        this._globalReleaseAppTriggerState = NOTIFICATION_STATE_CONSTANTS.APPLY_IN_PROGRESS;
        let waitTime = checkIfAutoApplyRequired(NOTIFICATION_APP_CONSTANTS.GLOBAL_RELEASE_APP.name, notification);
        this._notificationStore.dispatch(
          this._notificationAction.applyNotification(NOTIFICATION_APP_CONSTANTS.GLOBAL_RELEASE_APP.name,true));
        setTimeout(() => {
          this._zephyrStore.dispatch(this._releaseAction.fetchReleasesByProjectId(currentProject['id'], '', true));
          this._globalReleaseAppTriggerState = NOTIFICATION_STATE_CONSTANTS.WAITING;
        }, waitTime);
      }
    }
  }
  fetchCurrentProjectTeam() {
    let currentProject = localStorage.getItem(`${window.tab}-currentProject`) || {};
    let user = this._zephyrStore.getState().loggedInUser;
    if(currentProject && currentProject['id'] && user && user.userType != 2) {
      this._zephyrStore.dispatch(this._teamAction.fetchTeamDetailsByProjectId(currentProject['id'], true));
    }
  }
  handleUnsubscriptions(notification) {
    if(notification.topicsForUnsubscription && !notification.unsubscriptionInProgress &&
      Object.keys(notification.topicsForUnsubscription).length > 0) {
      let topics = Object.keys(notification.topicsForUnsubscription);
      if(notification.topics[topics[0]] && notification.topics[topics[0]].subcribers.length > 0) {
        //  console.log('skipping unsubscription for topic '+topics[0]+' since there is a new httpStartSubscriber for the same. ');
      } else {
        this._notificationStore.dispatch(
          this._notificationAction.requestUnsubscription(notification.topicsForUnsubscription[topics[0]]));
      }
    }
  }
  subscribeToGlobalTopics() {
    let _curTopic = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.USER, '','','');
    this._notificationStore.dispatch(this._notificationAction.subscribeToTopicOnServer(
      _curTopic,NOTIFICATION_APP_CONSTANTS.GLOBAL_USER_APP.name));
    _curTopic = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.PROJECT, '','','');
    this._notificationStore.dispatch(
      this._notificationAction.subscribeToTopicOnServer(_curTopic,NOTIFICATION_APP_CONSTANTS.GLOBAL_PROJECT_APP.name));
    _curTopic = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.PROJECT_USER,
      this._zephyrStore.getState().loggedInUser.id,'','');
    this._notificationStore.dispatch(
      this._notificationAction.subscribeToTopicOnServer(_curTopic,NOTIFICATION_APP_CONSTANTS.GLOBAL_PROJECT_APP.name));
    let currentProject = localStorage.getItem(`${window.tab}-currentProject`) || {};
    if(currentProject && currentProject['id']) {
      _curTopic = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.RELEASE,currentProject['id'],'');
      this._notificationStore.dispatch(
        this._notificationAction.subscribeToTopicOnServer(_curTopic,NOTIFICATION_APP_CONSTANTS.GLOBAL_RELEASE_APP.name));
    }
    _curTopic = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.LOGIN_STATUS,
      '','','');
    this._notificationStore.dispatch(
      this._notificationAction.subscribeToTopicOnServer(_curTopic,NOTIFICATION_APP_CONSTANTS.GLOBAL_LOGGED_IN_USER_APP.name));
  }
  onWebsocketOpen(self, response) {
    //   console.log('Atmosphere connected using ' + response.transport);
    clearTimeout(this._atmWaitTimeout);
    if(self.isLoggedin()) {
      let socketId = self._notificationAtmUtil.getSocketId();
      self._notificationStore.dispatch(self._notificationAction.createSubscriberId(socketId));
    }
  }

  /**
   * Function to process NotificationMessage - Format :
   * {'subscriberId':'12B7C994-8008-A569-48E4-F8CEB51DA70A','action':'DELETE','entityName':'release',
     *      'description':'Action: DELETE is performed on Release for with ids ::19','entityId':'19',
     *      'multiple':false,'time':'Dec 10, 2016 11:04:44 PM','uuid':'a3f6989d-6920-4077-8e77-fe81c3dd85cb',
     *      'topic':'/release/3','topicEntityId':'3','serverInitiated':true}
   *
   * @param {any} self
   * @param {any} response
   *
   * @memberOf AppComponent
   */
  processNotificationMessage(self, response) {
    let data = response.responseBody;
    let message = JSON.parse(data);
    //console.log('received websocket msg:' + data);
    self._notificationStore.dispatch(self._notificationAction.processNotificationMessage(message));
  }

  performCleanup()  {
    LogoutHandlerUtil.getInstance().clearTimer();
    localStorage.removeItem('base64Value');
    localStorage.removeItem('userInfo');
    localStorage.clear();
    NotificationStore.getNotificationStore().dispatch(this._notificationAction.clearNotificationStore());
    NotificationAtmosphereUtil.getInstance().unregisterSocket();
    this._zephyrStore.dispatch(this._loginAction.clearZephyrStore());
    jQuery('.modal').modal('hide');
  }

  performChangePassw(data)  {
    this._zephyrStore.dispatch(this._loginAction.doChangePassw(data));
  }

  closeMessage(){
    this.displayMessage=false;
  }

  // setI18nTranslateService() {
  //     // not required as 'en' is the default
  //    this.translate.setDefaultLang('en');
  //    console.log(I18N_MESSAGES);
  //     // we set the translations for english manually (instead of using a json file & the static loader)
  //     this.translate.setTranslation('en', I18N_MESSAGES);
  // }
}

window.onbeforeunload = function () {
  localStorage.setItem('tabId', window.tab);
  localStorage.removeItem('location');
};
