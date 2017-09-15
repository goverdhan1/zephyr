import {Injectable, Inject} from '@angular/core';
import * as types from '../utils/constants/action.types';
import {ProjectService} from '../services/project.service';
import {RolesService} from '../services/roles.service';
import {ReleaseService} from '../services/release.service';
import {I18N_MESSAGES} from '../utils/messages/messages.en';
import * as messageTypes from '../utils/constants/messages.types';
import {Http} from '@angular/http';
import {EventHttpService} from '../services/event-http.service';
import * as Observable from 'rxjs/Observable';
import {AdminPreferenceService} from "../services/admin_preference.service";
import {AdminAction} from "./admin.action";
import {ReleaseAction} from "./release.action";

declare var window: any;
@Injectable()
export class ProjectAction {

    _projectService;
    _rolesService;
    _releaseService;
    _adminPreferencesService;
    private _observable;

    constructor(@Inject(Http) private _http: EventHttpService,
                @Inject(AdminAction) private adminAction: AdminAction,
                @Inject(ReleaseAction) private releaseAction: ReleaseAction) {
        this._projectService = new ProjectService(_http);
        this._rolesService = new RolesService(<any>_http);
        this._releaseService = new ReleaseService(_http);
        this._observable = Observable.Observable;
        this._adminPreferencesService = new AdminPreferenceService(<any>_http);
    }

    fetchProjectSummaries(projectId) {
        return (dispatch) => {
            return this._projectService.getProjectSummaries(projectId).subscribe((projectSummaries) => {
                dispatch(this._fetchProjectSummaries(projectSummaries));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _fetchProjectSummaries(data) {
        return { type: types.FETCH_PROJECT_SUMMARIES, data };
    }


    fetchProjectDetailsById(projectId) {
        return (dispatch) => {
            return this._projectService.getProjectDetailsById(projectId).subscribe((projectDetails) => {
                dispatch(this._fetchProjectDetailsById(projectDetails));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }

    updateProjectReleaseGrid() {
      return { type: types.UPDATE_EVENT_FOR_GRID};
    }

    _fetchProjectDetailsById(data) {
        return { type: types.FETCH_PROJECT_DETAILS_BY_ID, data };
    }

    fetchProjectsLite(skipLoadingBar=false) {
        return (dispatch) => {
            return this._projectService.getAllProjectsLite(skipLoadingBar).subscribe((data) => {
              dispatch(this._fetchProjectsLite(data));
            }, (error) => {
              dispatch(this.onError(error));
            });
        };
    }

    _fetchProjectsLite (data) {
        return { type: types.FETCH_ALL_PROJECTS_LITE, data };
    }

    fetchingAllProjects () {
      return (dispatch) => {
            return this._projectService.getAllUIProjects().subscribe((data) => {
                dispatch(this._fetchingAllProjects(data));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }

    _fetchingAllProjects (data) {
        return { type: types.FETCH_ALL_PROJECTS, data };
    }
    editProject (data, userId) {
        return (dispatch) => {
            return this._projectService.editProject(data).subscribe((data) => {
                dispatch(this.fetchUserProjects(userId));
                dispatch(this.fetchUserAllocatedProjects(userId));
                dispatch(this._editProject(data));
                dispatch(this.onSuccess(I18N_MESSAGES['zephyr.tescase.project.setup.edit.success']));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _editProject (data) {
        return { type: types.EDIT_PROJECT, data };
    }
    deleteProject (id, userId) {
       return (dispatch) => {
            return this._projectService.deleteProject(id).subscribe((data) => {
                dispatch(this.fetchUserProjects(userId));
                dispatch(this.fetchUserAllocatedProjects(userId));
                dispatch(this._deleteProject(data));
                dispatch(this.onSuccess(I18N_MESSAGES['zephyr.tescase.project.setup.delete.success']));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _deleteProject (data) {
        return { type: types.DELETE_PROJECT, data };
    }

    addNewProject (data, userId) {
       return (dispatch) => {
            return this._projectService.addNewProject(data).subscribe((data) => {
                dispatch(this.fetchUserProjects(userId));
                dispatch(this.fetchUserAllocatedProjects(userId));
                dispatch(this._addNewProject(data));
                dispatch(this.onSuccess(I18N_MESSAGES['zephyr.tescase.project.setup.add.success']));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _addNewProject (data) {
        return { type: types.ADD_PROJECT, data };
    }
    fetchUserProjects(userId, skipLoadingBar=false) {
        return (dispatch) => {
            return this._projectService.getUserProjects(userId, skipLoadingBar).subscribe((projectDetails) => {
                dispatch(this._fetchProjects(projectDetails));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _fetchProjects(data) {
        return { type: types.FETCH_PROJECT_DETAILS, data };
    }
    fetchUserAllocatedProjects(userId, skipLoadingBar=false) {
      return (dispatch) => {
        return this._projectService.getUserAllocatedProjects(userId, skipLoadingBar).subscribe((projectDetails) => {
          dispatch(this._fetchUserAllocatedProjects(projectDetails));
        }, (error) => {
          dispatch(this.onError(error));
        });
      };
    }
    _fetchUserAllocatedProjects(data) {
      return { type: types.FETCH_USER_ALLOCATED_PROJECT_DETAILS, data };
    }
    fetchUserAllocatedProjectsPostLogin(userId) {

      return (dispatch) => {

        return this._observable.forkJoin(
          this._projectService.getUserAllocatedProjects(userId),
          this._adminPreferencesService.getAllGridPrefs(true)
        ).subscribe((data) => {
          let projectReleaseDetails = this.adminAction.patchGridPrefs(data[1], userId);

          if (projectReleaseDetails.releaseId) {

            return this._observable.forkJoin(
              this._releaseService.getReleaseById(projectReleaseDetails.releaseId, true),
              this._projectService.getProjectDetailsById(projectReleaseDetails.projectId, true),
              this._releaseService.getReleasesByProjectId(projectReleaseDetails.projectId, true)
            ).subscribe((response) => {
              localStorage.setItem(`${window.tab}-currentProject`, JSON.stringify(response[1]));
              localStorage.setItem(`${window.tab}-currentRelease`, JSON.stringify({id: response[0].id, text : response[0].name}));

              dispatch(this._fetchProjectDetailsById(response[1]));
              dispatch(this._fetchReleasesByProjectId(response[2], false));
              dispatch(this._fetchUserAllocatedProjectsPostLogin(data[0]));
              dispatch(this._fetchReleaseAndProject(response[2], projectReleaseDetails.projectId));
            });

          } else if (projectReleaseDetails.projectId) {

          return this._observable.forkJoin(
            this._projectService.getProjectDetailsById(projectReleaseDetails.projectId),
            this._releaseService.getReleasesByProjectId(projectReleaseDetails.projectId)
          ).subscribe(response => {
              dispatch(this._fetchProjectDetailsById(response[0]));
              dispatch(this._fetchUserAllocatedProjectsPostLogin(data[0]));
              dispatch(this._fetchReleaseAndProject(response[1], projectReleaseDetails.projectId));
            }, (error) => {
              dispatch(this.onError(error));
            });

          } else {
            dispatch(this._fetchUserAllocatedProjectsPostLogin(data[0]));
          }

        }, (error) => {
          dispatch(this.onError(error));
          dispatch(this.redirectToLogin(error));
        });

      };
    }

    _fetchReleaseAndProject(releases, projectId) {
        return {type: types.FETCH_RELEASES_AND_PROJECT, releases, projectId};
    }

    _fetchReleasesByProjectId(releases, isTriggerLastOne) {
      let data = {};
      data[0] = releases;
      data[1] = isTriggerLastOne;
      return { type: types.FETCH_RELEASES_BY_PROJECT_ID_UPDATING_GRID, data };
    }

    fetchAllocatedProjectsAndPermission(userId, roleId, fetchReleaseDetails) {
      return (dispatch) => {
        if(fetchReleaseDetails) {
            return this._observable.forkJoin(
                this._projectService.getUserAllocatedProjects(userId),
                this._rolesService.getRolePermissionsById(roleId, false),
                this._releaseService.getReleaseSummaries(fetchReleaseDetails)
            ).subscribe((data) => {
              dispatch(this._fetchUserAllocatedProjectsWoEvent(data));
              dispatch(this._fetchAllocatedPermission(data[1], true));
            }, (error) => {
              dispatch(this.onError(error));
              dispatch(this.redirectToLogin(error));
            });
        } else {
             return this._observable.forkJoin(
                this._projectService.getUserAllocatedProjects(userId),
                this._rolesService.getRolePermissionsById(roleId, false)
            ).subscribe((data) => {
              //dispatch(this._fetchUserAllocatedProjectsPostLogin(data[0]));
              dispatch(this._fetchUserAllocatedProjectsWoEvent(data));
              dispatch(this._fetchAllocatedPermission(data[1], true));
            }, (error) => {
              dispatch(this.onError(error));
              dispatch(this.redirectToLogin(error));
            });
        }


      };
    }

    redirectToLogin(data) {
       return { type: types.REDIRECT_LOGIN, data };
    }

    _fetchAllocatedPermission(data, urlChange=false) {
      return { type: types.LOGGEDIN_USER_PERMISSIONS, data, urlChange };
    }

    _fetchUserAllocatedProjectsWoEvent(data) {
      return { type: types.FETCH_USER_ALLOCATED_PROJECT_DETAILS_WITHOUT_EVENT, data };
    }

    _fetchUserAllocatedProjectsPostLogin(data) {
      return { type: types.FETCH_USER_ALLOCATED_PROJECT_DETAILS_WITH_EVENT, data};
    }

    fetchUsersAllocatedToAllProjects () {
      return (dispatch) => {
        return this._projectService.getUsersAllocatedToAllProjects().subscribe((data) => {
          dispatch(this._fetchUsersAllocatedToAllProjects(data));
        }, (error) => {
          dispatch(this.onError(error));
        });
      };
    }

    _fetchUsersAllocatedToAllProjects (data) {
        return { type: types.FETCH_USERS_ALLOCATED_TO_PROJECTS, data };
    }
    /**
     * Clear Projects event
     */
    clearProjectsEvent() {
        return { type: types.CLEAR_PROJECTS_EVENTS};
    }
    clearProjectSetupEvents() {
        return { type: types.CLEAR_PROJECT_SETUP_EVENTS};
    }
    onError(data) {
        return {
            type: types.SHOW_TOAST,
            data: ({type: messageTypes.ERROR, data})
        };
    }
    onSuccess(data) {
        return {
            type: types.SHOW_TOAST,
            data: ({type: messageTypes.SUCCESS, data})
        };
    }

}
