import {Component, AfterContentChecked, EventEmitter, Output, Inject} from '@angular/core';

import {ProjectTeamComponent} from '../../projects/project_team.component';
import {ChangePasswordComponent} from '../change_password/change_password.component';

import {Router} from '@angular/router';

import {ZephyrStore} from '../../../../store/zephyr.store';
import {NotificationStore} from '../../../../store/notification.store';

import {LoginAction} from '../../../../actions/login.action';
import {ProjectAction} from '../../../../actions/project.action';
import {ReleaseAction} from '../../../../actions/release.action';
import {TeamAction} from '../../../../actions/team.action';
import {NotificationAction} from '../../../../actions/notification.action';
import {GridAction} from "../../../../actions/grid.action";
import {AdminAction} from "../../../../actions/admin.action";

// Constants
import {I18N_MESSAGES} from '../../../../utils/messages/messages.en';
import {NotificationAtmosphereUtil} from '../../../../utils/notification/notification_atmosphere.util';
import {NOTIFICATION_ENTITY_CONSTANTS, NOTIFICATION_APP_CONSTANTS} from '../../../../utils/constants/notification.constants';
import {constructNotificationStoreMetadata} from '../../../../utils/notification/notification.util';
import {LogoutHandlerUtil} from '../../../../utils/logout_handler/logout_handler.util';
import {PouchDBPrefsServices} from "../../../../services/pouch.db.service";

declare var jQuery: any, _, window, PouchDB;

const OPEN_FIELDS_MODAL = 'OPEN_FIELDS_MODAL';
const SYSTEM_TYPE_4 = 4;

@Component({
	selector: 'top-nav',
	providers: [LoginAction],
	viewProviders: [ProjectAction, TeamAction, NotificationAction, GridAction, AdminAction],
	templateUrl: 'topnav.html',
})

export class TopNavComponent implements AfterContentChecked {
  @Output() logoutEvent: EventEmitter<any> = new EventEmitter();
	lastFiveVisitedProjects;
	remainingProjects;
  confirmationObject:any = {};
	id: string;
  isLogin: boolean = true;
  isDashboardUser: boolean = false;
	public zephyrStore;
	public notificationStore;
	changePasswordObject = {};
  companyName;
  systemName;
	i18nMessages;
    departmentIds = [];
    username;
  invalidDTS=false;
  adminAccessible=false;
	private isSelect = false;
    constructor(public router: Router, private _loginAction: LoginAction, private _notificationAction:NotificationAction,
        private _gridAction: GridAction,private _adminAction: AdminAction,
        @Inject(PouchDBPrefsServices) private pouchDBSercvice: PouchDBPrefsServices,
        private _projectAction: ProjectAction, private _releaseAction: ReleaseAction, private _teamAction: TeamAction) {

		this.zephyrStore = ZephyrStore.getZephyrStore();
		this.notificationStore = NotificationStore.getNotificationStore();
        this.i18nMessages = I18N_MESSAGES;


		this.zephyrStore.subscribe(() => {
			let state = this.zephyrStore.getState();
			if(!Object.keys(state.loggedInUser).length) {
				this.isLogin = true;
              if(window.location.pathname.replace("/flex/html5") !== '/login'
                || window.location.href.indexOf('next_url') > -1 ){
                let isLogoutClicked = JSON.parse(localStorage.getItem('isLogOut'));

                if(window.location.href.indexOf('next_url') === -1 && !isLogoutClicked && isLogoutClicked != null){
                  this.navigateToLogin(window.location.pathname.replace("/flex/html5",''));
                } else if((window.location.href.indexOf('next_url') > -1 && !isLogoutClicked && isLogoutClicked != null) && window.location.search.indexOf("login") === -1) {
                  this.router.navigateByUrl(window.location.pathname.replace("/flex/html5/",'') + window.location.search);
                  localStorage.setItem('isLogOut', 'false');
                }else {
                  this.router.navigate(['/login']);
                  localStorage.setItem('isLogOut', 'false');
                }

              } else {

                // redirect to login if not already there
                this.router.navigate(['/login']);
              }
        this.isDashboardUser = false;
			} else {
			// 	if (this.isLogin) {
			// 		this.zephyrStore.dispatch(this._projectAction.fetchUserProjects(state.loggedInUser.id));
          // this.zephyrStore.dispatch(this._projectAction.fetchUserAllocatedProjects(state.loggedInUser.id));
			// 	}
          this.username = state.loggedInUser.fullName;
				  this.isLogin = false;
          if(state.loggedInUser && state.loggedInUser.userType == 2) {
              this.isDashboardUser = true;
          }
			}
            this.departmentIds = state.loggedInUser.departmentIds || [];

      let adminPref = state.adminPref,
          policy = adminPref['admin.authentication.security.policy'],
          policyArray = adminPref['admin.authentication.security.policy.LOV'] ?
            JSON.parse(adminPref['admin.authentication.security.policy.LOV']) : [],
          policyDescription = policyArray.filter(policy => {
            return policy.policyName === adminPref['admin.authentication.security.policy'];
          });
      this.changePasswordObject = {
        'upperText' : this.i18nMessages['zephyr.changepassword.warning'],
        'policy': policy,
        'description': policyDescription && policyDescription.length ?
        policyDescription[0].description : ''
      };
      this.companyName = adminPref['admin.app.company.name'];
      this.systemName = adminPref['admin.app.system.name'];
			this.getFilteredProjects(state.projects.projects);
      let _adminLefnav = this.zephyrStore.getState().leftnav.administration;
      if(_adminLefnav && _adminLefnav.group && _adminLefnav.group.length) {
        let len=0;
        _.each(_adminLefnav.group, (grp) => {
          if(grp.items && grp.items.length) {
            _.each(grp.items, (item) => {
              if(item.permission) {
                len++;
              }
            });
          } else if(grp.permission && grp.link) {
            len++;
          }
        });
        let dtGroup = _.find(_adminLefnav.group, {key: 'defects-admin'});
        if(dtGroup && dtGroup.permission && len == 1 && !this.checkDTIntegration()) {
          this.invalidDTS = true;
        } else {
          this.invalidDTS = false;
        }
      }
      let adminAccessible = this.zephyrStore.getState().license.adminAccess;

      if (adminAccessible && adminAccessible == 'ALLOWED') {
        this.adminAccessible = true;
      } else {
        this.adminAccessible = false;
      }
		});
  }

  navigateToLogin(url) {

      if (url && url.indexOf("login") === -1) {
          this.router.navigateByUrl('/login?next_url=' + url);
      } else {
          this.router.navigate(['/login']);
      }

      localStorage.setItem('isLogOut', 'false');
  }

	ngAfterContentChecked() {
		jQuery('#projectDropDown').parent().off('hidden.bs.dropdown').on('hidden.bs.dropdown', (ev) => {

			setTimeout(() => {
				if (this.isSelect && !ev.relatedTarget.parentNode.classList.contains('open')) {
					jQuery(ev.relatedTarget).dropdown('toggle');
	        		setTimeout(() => {
	          			jQuery('.select2-search__field').focus();
	        		});
				}
			}, 10);
		});
	}
  ifZephyrLocked() {
      if (!(jQuery("#fields-modal").hasClass('in'))) {
        let confirmationObject = {};
          confirmationObject['heading'] = 'Alert';
          confirmationObject['text'] = ' Due to an uncompleted custom fields edit session, '
            +'the system is currently in a locked state where users are not allowed to login, '
            +'please finish editing the custom fields and enable access.';
          confirmationObject['buttonText'] = 'Ok';
          confirmationObject['showCancelButton'] = false;
          confirmationObject['cancelButtonText'] = 'No';
          confirmationObject['action'] = OPEN_FIELDS_MODAL;
         this.confirmationObject = confirmationObject;
         jQuery('#confirmation-modal-topnav').modal();
         localStorage.setItem('openFieldsModal', 'false');
      }
  }

  confirmationActionCall($event) {
      let actionString = $event.target.value;
      jQuery('#confirmation-modal-topnav').modal('hide');
      if (actionString === OPEN_FIELDS_MODAL) {
        jQuery('#fields-modal').modal();
      }
    }
  onLogout(ev) {
      if (this.zephyrStore.getState().fields.isZephyrAccessLocked == true) {
        this.ifZephyrLocked();
    	}	else {
          ev.preventDefault();
          localStorage.setItem('isLogOut', 'true');
          this.zephyrStore.dispatch(this._gridAction.resetAllGridStates());

          LogoutHandlerUtil.getInstance().clearTimer();
          this.zephyrStore.dispatch(this._loginAction.doLogout());
          this.logoutEvent.emit();
          NotificationStore.getNotificationStore().dispatch(this._notificationAction.unsubscribeAll());
          NotificationAtmosphereUtil.getInstance().unregisterSocket();
          setTimeout(() => {
            this.zephyrStore.dispatch(this._loginAction.clearZephyrStore());
          },20);
        }
    }

   changePassword(ev) {
    if (this.zephyrStore.getState().fields.isZephyrAccessLocked == true) {
        this.ifZephyrLocked();
      }  else {
        jQuery('#change-password-modal').modal();
      }
   }
	changePasswordUpdateClicked(value) {
    this.zephyrStore.dispatch(this._loginAction.doChangePassw(value));
	}
	passwordValidation(password) {
		if (password.length > 3) {
			return true;
		} else {
			return false;
		}
	}
    getFilteredProjects(allProjects) {
    	let projectsInLocalStorage = JSON.parse(localStorage.getItem('projects'));
    	this.remainingProjects = [];

      if (Array.isArray(allProjects) && allProjects.length) {
        if(projectsInLocalStorage === null) {
          // add projects to local storage
          localStorage.setItem('projects', JSON.stringify(allProjects));
        }

        let user = this.zephyrStore.getState().loggedInUser;
        let isManager = (user.roles || []).filter((role) => 'manager' === role.name);
        if (!isManager.length) {
            let allocatedProjIds = this.zephyrStore.getState().projects.userAllocatedProjects;
            if(allocatedProjIds) {
                allProjects = allProjects.filter(project => allocatedProjIds.indexOf(project.id) > -1);
            }
        }

        if(projectsInLocalStorage !== null) {

          // maintain the order of the projects
          let projectIds = projectsInLocalStorage.map(proj => proj.id);
          allProjects.sort((a, b) => projectIds.indexOf(a.id) - projectIds.indexOf(b.id));

          localStorage.setItem('projects', JSON.stringify(allProjects));

          projectsInLocalStorage = JSON.parse(localStorage.getItem('projects'));

          this.lastFiveVisitedProjects = projectsInLocalStorage.slice(0,5);

          // extracting last five visited projects ids
          let lastFiveVisitedProjectIds = this.lastFiveVisitedProjects.map(project => project.id);

          // filtering out remaining projects after showing last five visited
          let remainingProjects = allProjects.filter(project => lastFiveVisitedProjectIds.indexOf(project.id) === -1);

          // extracting id and name for remaining projects to be put in autocomplete
          this.remainingProjects = remainingProjects.map(obj => ({id: obj.id, text: obj.name}));
        }
      }
    }
    onProjectChange(currProject) {
      let existingProject = localStorage.getItem(`${window.tab}-currentProject`) ? JSON.parse(localStorage.getItem(`${window.tab}-currentProject`)) : {};
      let prevMeta;

      if(existingProject && existingProject['id']) {
        prevMeta = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.RELEASE,existingProject['id'],'');
      }

      let _curTopic = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.RELEASE,currProject['id'],'');
      this.notificationStore.dispatch(this._notificationAction.subscribeToTopic(_curTopic, prevMeta, NOTIFICATION_APP_CONSTANTS.GLOBAL_RELEASE_APP.name));

	  let projects = JSON.parse(localStorage.getItem('projects'));
	  projects = projects.filter(project => currProject.id !== project.id);

	  projects.unshift(currProject);

	  localStorage.setItem('projects', JSON.stringify(projects));
    localStorage.removeItem(`${window.tab}-currentProject`);
    localStorage.removeItem(`${window.tab}-currentRelease`);
    localStorage.setItem(`${window.tab}-currentProject`, JSON.stringify(currProject));

    this.zephyrStore.dispatch(this._gridAction.resetAllGridStates());

      this.clearCurrentRelease();
      setTimeout(() => {
        this.zephyrStore.dispatch(this._projectAction.updateProjectReleaseGrid());
      }, 100);
    }
    goToProject(project) {
      let projects = JSON.parse(localStorage.getItem('projects'));
      let currentProject = projects.filter(projectObj => project.id === projectObj.id)[0];
      this.onProjectChange(currentProject);
      jQuery('#projectDropDown').parent('.dropdown').removeClass('open');
      this.router.navigate(['/project/', project.id]);
      this.clearCurrentRelease();
    }
	onToggle(ev) {
		this.isSelect = 'open' === ev.type;
	}
    clearCurrentRelease() {
        localStorage.removeItem(`${window.tab}-currentRelease`);
    }
    navigateToAdmin() {
        let _adminLefnav = this.zephyrStore.getState().leftnav.administration,
            breakLoop = false;
        if(_adminLefnav && _adminLefnav.group && _adminLefnav.group.length) {
            _.each(_adminLefnav.group, (grp) => {
                if(breakLoop)
                    return;
                if(grp.items && grp.items.length) {
                    _.each(grp.items, (item) => {
                        if(breakLoop)
                            return;
                        if(item.permission && item.link) {
                            breakLoop = true;
                            this.router.navigate([item.link]);
                        }
                    });
                } else if(grp.permission && grp.link) {
                    breakLoop = true;
                    if(grp.key === 'defects-admin' && !this.checkDTIntegration()) {
                        jQuery('#zee-admin-defect-noaccess').modal();
                        breakLoop = true;
                    } else {
                        this.router.navigate([grp.link]);
                    }
                }
            });
        } else {
            this.router.navigate(['/admin']);
        }
    }
    checkDTIntegration() {
        let defectsystem = this.zephyrStore.getState().global.defectSystem;
        if(defectsystem && defectsystem['systemType'] == SYSTEM_TYPE_4) {
          return true;
        }
        return false;
    }
	addHTMLSpace(value) {
		return _.escape(value || '');
	}
}
