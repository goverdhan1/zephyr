import {Injectable, Inject} from '@angular/core';
import * as types from '../utils/constants/action.types';
import * as Observable from 'rxjs/Observable';
import {UserService} from '../services/user.service';
import {Http} from '@angular/http';
import * as messageTypes from '../utils/constants/messages.types';
import {EventHttpService} from '../services/event-http.service';
import {ProjectService} from '../services/project.service';
import {ZephyrStore} from '../store/zephyr.store';
declare var _: any;

@Injectable()
export class UserAction {
    private _userService;
    private _projectService;
    private _observable;
    constructor(@Inject(Http) private _http: any) {
        this._userService = new UserService(_http);
        this._projectService = new ProjectService(_http);
        this._observable = Observable.Observable;
    }
    fetchAllLoggedInUsers(skipLoadingBar=false) {
        return (dispatch) => {
            return this._userService.getAllLoggedInUsers(skipLoadingBar).subscribe((users) => {
                dispatch(this._fetchAllLoggedInUsers(users));
            }, (error) => {
                let errorMsg = {
                  zeeErrorCode: error.status,
                  errorMsg: error.json().code
                };
                dispatch(this.onError(error.json()));
            });
        };
    }
    _fetchAllLoggedInUsers(data) {
        return { type: types.FETCH_LOGGED_IN_USERS, data };
    }
    fetchUsers(skipLoadingBar=false) {
        return (dispatch) => {
            return this._userService.getUsers(skipLoadingBar).subscribe((users) => {
                dispatch(this._fetchUsers(users));
            }, (error) => {
                let errorMsg = {
                    zeeErrorCode: error.status,
                    errorMsg: error.json().code
                };
                dispatch(this.onError(error.json()));
            });
        };
    }
    _fetchUsers(data) {
        return { type: types.FETCH_USERS, data };
    }
    fetchAllResourceDetails() {
         return (dispatch) => {
            // return this._observable.forkJoin(
            //     this._userService.getUsers(),
            //     this._userService.getAllLoggedInUsers()
            // )
            return this._userService.getAllResources()
            .subscribe((data) => {
                dispatch(this._fetchAllResourceDetails(data));
            }, (err) => {
                console.error(err);
                dispatch(this.onError(err.json()));
            });
        };
    }

    refreshResourceGrid (data) {
        return { type: types.REFRESH_USERS_GRID, data};
    }
    setReleasesAction() {
        return {type: types.RELEASESACTION};
    }

    logOutUser (data) {
        return (dispatch) => {
            return this._userService.logOutUser(data).subscribe((data) => {
                dispatch(this._logOutUser(data));
            }, (error) => {
                let errorMsg = {
                    zeeErrorCode: error.status,
                    errorMsg: error.json().code
                };
                dispatch(this.onError(errorMsg));
            });
        };
    }
    projectsAssignedToUserById (id) {
       return (dispatch) => {
            return this._userService.projectsAssignedToUserById(id).subscribe((data) => {
                dispatch(this._projectsAssignedToUserById(data));
            }, (error) => {
                let errorMsg = {
                    zeeErrorCode: error.status,
                    errorMsg: error.json().code
                };
                dispatch(this.onError(error.json()));
            });
        };
    }
    editUserComplete (userDetails , userPic , projectsAllocated) {
       return (dispatch) => {
            return this._userService.editUserPic(userPic).success((data) => {
               // console.log('data', data);
                let pictureAttribute = data[0] && data[0].file;
                    pictureAttribute = 'file:' + pictureAttribute;
                userDetails.picture = pictureAttribute;
                return this._observable.forkJoin(
                    this._userService.editUser(userDetails),
                    this._userService.allcateProjectsToUser(projectsAllocated)
                ).subscribe((data) => {
                    dispatch(this._editUser(data));
                    dispatch(this._onEditUser(data[0]));
                    dispatch(this.fetchUserProjects());
                    dispatch(this.fetchUserAllocatedProjects());
                }, (err) => {
                    console.error(err);
                    dispatch(this.onError(err.json()));
                });
            }).fail((error) => {
                let errorMsg = {
                    zeeErrorCode: error.status,
                    errorMsg: error.json().code
                };
                if(error.json().errorCode === '5223') {
                    dispatch(this.licenseError(error.json()));
                } else {
                    dispatch(this.onError(error.json()));
                }
            });
        };
    }
    editUserDetails (userDetails, projectsAllocated) {
       return (dispatch) => {
            return this._observable.forkJoin(
                this._userService.editUser(userDetails),
                this._userService.allcateProjectsToUser(projectsAllocated)
            ).subscribe((data) => {
                dispatch(this._editUser(data));
                dispatch(this._onEditUser(data[0]));
                dispatch(this.fetchUserProjects());
                dispatch(this.fetchUserAllocatedProjects());
            }, (err) => {
                //console.error(err);
                if(err.json().errorCode === '5223') {
                    dispatch(this.licenseError(err.json()));
                } else {
                    dispatch(this.onError(err.json()));
                }
            });
        };
    }
    _editUser (data) {
        return { type: types.EDIT_USER, data };
    }

    licenseError (data) {
        return { type: types.LICENSE_ERROR, data };
    }

    _onEditUser(data: any) {
        return {
            type: types.SHOW_TOAST,
            data: (<any>Object).assign({type: messageTypes.SUCCESS}, _setUserToastrMessage(data, 'edit'))
        };
    }

    _onAddUser(data: any) {
        return {
            type: types.SHOW_TOAST,
            data: (<any>Object).assign({type: messageTypes.SUCCESS}, _setUserToastrMessage(data, 'create'))
        };
    }

    addUserComplete (userDetails , userPic) {
        return (dispatch) => {
            return this._userService.editUserPic(userPic).success((data) => {
                let pictureAttribute = data[0] && data[0].file;
                    pictureAttribute = 'file:' + pictureAttribute;
                userDetails.picture = pictureAttribute;
                return this._userService.addUser(userDetails).subscribe((data) => {
                    dispatch(this._addUser(data));
                    dispatch(this._onAddUser(data));
                    dispatch(this.fetchUserProjects());
                    dispatch(this.fetchUserAllocatedProjects());
                }, (error) => {
                    let errorMsg = {
                        zeeErrorCode: error.status,
                        errorMsg: error.json().code
                    };
                    dispatch(this.onError(error.json()));
                });
            }).fail((error) => {
                let errorMsg = {
                    zeeErrorCode: error.status,
                    errorMsg: error.json().code
                };
                if(error.json().errorCode === '5223') {
                    dispatch(this.licenseError(error.json()));
                } else {
                    dispatch(this.onError(error.json()));
                }
            });
        };
    }

    addUser (data) {
      return (dispatch) => {
            return this._userService.addUser(data).subscribe((data) => {
                dispatch(this._addUser(data));
                dispatch(this._onAddUser(data));
                dispatch(this.fetchUserProjects());
                dispatch(this.fetchUserAllocatedProjects());
            }, (error) => {
               // console.log('error', error);
                let errorMsg = {
                    zeeErrorCode: error.status,
                    errorMsg: error.json().code
                };
                if(error.json().errorCode === '5223') {
                    dispatch(this.licenseError(error.json()));
                } else {
                    dispatch(this.onError(error.json()));
                }
            });
        };
    }

    fetchUserProjects() {
      return (dispatch) => {
        let user = ZephyrStore.getZephyrStore().getState().loggedInUser;
        if(user){
          return this._projectService.getUserProjects(user.id, true).subscribe((projectDetails) => {
            dispatch(this._fetchProjects(projectDetails));
          }, (error) => {
            dispatch(this.onError('error'));
          });
        }
      };
    }
    _fetchProjects(data) {
      return { type: types.FETCH_PROJECT_DETAILS, data };
    }

    fetchUserAllocatedProjects() {
      return (dispatch) => {
        let user = ZephyrStore.getZephyrStore().getState().loggedInUser;
        if(user){
          return this._projectService.getUserAllocatedProjects(user.id, true).subscribe((projectDetails) => {
            dispatch(this._fetchUserAllocatedProjects(projectDetails));
          }, (error) => {
            dispatch(this.onError('error'));
          });
        }
      };
    }
    _fetchUserAllocatedProjects(data) {
      return { type: types.FETCH_USER_ALLOCATED_PROJECT_DETAILS, data };
    }

    _addUser (data) {
        return { type: types.ADD_USER , data};
    }
    _allcateProjectsToUser (data) {
        return { type: types.ALLOCATE_PROJECTS_TO_USER , data};
    }

    clearResourceManagementEvent () {
        return { type: types.CLEAR_RESOURCE_MANAGEMENT_EVENTS};
    }

    clearUserEvent() {
        return { type: types.CLEAR_USER_EVENTS};
    }
    clearLoggedUserEvent() {
      return { type: types.CLEAR_EVENT};
    }
    _projectsAssignedToUserById (data) {
        return { type: types.PROJECTS_ASSIGNED_TO_USERE_BY_ID, data };
    }
    _logOutUser (data) {
        return { type: types.LOG_OUT_USER, data };
    }
    _fetchAllResourceDetails (data) {
        return { type: types.FETCH_RESOURCE_DETAILS, data };
    }
    configureResourceManagementGridColumn (data) {
        return { type: types.CONFIGURE_RESOURCE_MANAGEMENT_GRID_COLUMN, data };
    }
    onError(data) {
        return {
            type: types.SHOW_TOAST,
            data: (<any>Object).assign({type: messageTypes.ERROR}, _setUserToastrMessage(data, 'error'))
        };
    }
}

function _setUserToastrMessage(response, type) {
    let _ids = [],
        description,
        title = 'Success';
    if(_.isArray(response)) {
        _ids = _.map(response, function(obj) {return obj.id;});
    } else if(response.id) {
        _ids.push(response.id);
    }
    if(type == 'create') {
        description = 'Created user with id(s) ' + _ids.join(', ');
    } else if(type == 'edit') {
        description = 'Edited user with id(s) ' + _ids.join(', ');
    } else if(type == 'error') {
        title = 'Error';
        description = response.errorMsg || response.code ;
    }
    return {
        title: title,
        description: description
    };
}
