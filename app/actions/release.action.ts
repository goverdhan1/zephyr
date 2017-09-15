import {Injectable, Inject} from '@angular/core';
import {Http} from '@angular/http';

import * as types from '../utils/constants/action.types';
import {ReleaseService} from '../services/release.service';
import {ProjectService} from '../services/project.service';
import * as messageTypes from '../utils/constants/messages.types';
import {I18N_MESSAGES} from '../utils/messages/messages.en';
import {EventHttpService} from '../services/event-http.service';

@Injectable()
export class ReleaseAction {
    _releaseService;
    _projectService;
    constructor(@Inject(Http) private _http: any) {
        this._releaseService = new ReleaseService(_http);
        this._projectService = new ProjectService(_http);
    }

    fetchReleasesByProjectId(projectId , isTriggerLastOne, skipLoadingIndicator=false) {
        return (dispatch) => {
            return this._releaseService.getReleasesByProjectId(projectId, skipLoadingIndicator).subscribe((releases) => {
                dispatch(this._fetchReleasesByProjectId(releases, isTriggerLastOne));
                dispatch(this._fetchReleaseAndProject(releases, projectId));
            }, (error) => {
                dispatch(this.onError(error));
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
    fetchOnlyReleaseById(id) {
        return dispatch => {
            return this._releaseService.getReleaseById(id).subscribe(release => {
                dispatch(this._fetchOnlyReleaseById(release.projectId));
            });
        };
    }
    _fetchOnlyReleaseById(projectID) {
        return {type: types.FETCH_RELEASE_DETAILS_ONLY, projectID};
    }
    fetchReleaseById(id, skipLoadingBar=false) {
        return (dispatch) => {
            return this._releaseService.getReleaseById(id, skipLoadingBar).subscribe((release) => {
                dispatch(this.fetchProjectDetailsById(release.projectId, skipLoadingBar));
                dispatch(this.fetchReleasesByProjectId(release.projectId , false, skipLoadingBar));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _fetchReleaseById(data) {
        return { type: types.FETCH_RELEASE_BY_ID, data };
    }
    fetchProjectDetailsById(id, skipLoadingBar=false) {
        return (dispatch) => {
            return this._projectService.getProjectDetailsById(id, skipLoadingBar).subscribe((projectDetails) => {
                dispatch(this._fetchProjectDetailsById(projectDetails));
            }, (error) => {
                dispatch(this.onError('error'));
            });
        };
    }
    _fetchProjectDetailsById(data) {
        return { type: types.FETCH_PROJECT_DETAILS_BY_ID, data };
    }
    fetchReleaseSummaries(id, skipLoadingIndicator=false) {
        return (dispatch) => {
            return this._releaseService.getReleaseSummaries(id, skipLoadingIndicator).subscribe(releaseSummaries => {
                dispatch(this._fetchReleaseSummaries(releaseSummaries));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _fetchReleaseSummaries(data) {
        return { type: types.FETCH_RELEASE_SUMMARIES, data };
    }
    setReleaseId (data) {
        return { type: types.SET_RELEASE_ID, data };
    }
    fetchAllReleases () {
       return (dispatch) => {
            return this._releaseService.getReleases().subscribe(data => {
                dispatch(this._fetchAllReleases(data));
            }, (error) => {
                let errorMsg = {
                    zeeErrorCode: error.status,
                    errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
                };
                dispatch(this.onError(errorMsg));
            });
        };
    }
    editRelease (data) {
        return (dispatch) => {
            return this._releaseService.editRelease(data).subscribe(data => {
                dispatch(this._editRelease(data));
                dispatch(this.onSuccess(I18N_MESSAGES['zephyr.tescase.release.setup.edit.success']));
            }, (error) => {
                let errorMsg = {
                    zeeErrorCode: error.status,
                    errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
                };
                dispatch(this.onError(errorMsg));
            });
        };
    }
    _editRelease (data) {
        return { type: types.EDIT_RELEASE, data };
    }

    addRelease (data) {
        return (dispatch) => {
            return this._releaseService.addRelease(data).subscribe(data => {
                dispatch(this._addRelease(data));
                dispatch(this.onSuccess(I18N_MESSAGES['zephyr.tescase.release.setup.add.success']));
            }, (error) => {
                let errorMsg = {
                    zeeErrorCode: error.status,
                    errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
                };
                dispatch(this.onError(errorMsg));
            });
        };
    }
    _addRelease (data) {
        return { type: types.ADD_RELEASE, data };
    }

    deleateRelease (id) {
       return (dispatch) => {
            return this._releaseService.deleateRelease(id).subscribe(data => {
                dispatch(this._deleateRelease(data));
                dispatch(this.onSuccess(I18N_MESSAGES['zephyr.tescase.release.setup.delete.success']));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }

    _deleateRelease(data) {
        return { type: types.DELETE_RELEASE, data };
    }

    cloneRelease (data, componentId) {
       return (dispatch) => {
            return this._releaseService.cloneRelease(data).subscribe(data => {
                dispatch(this._cloneRelease(data, componentId));
            }, (error) => {
                let errorMsg = {
                    zeeErrorCode: error.status,
                    msg:  JSON.parse(error._body).errorMsg
                };
                dispatch(this.onError(errorMsg.msg));
            });
        };
    }

    fetchReleaseAutomationSummary(projectId, releaseId, gadgetId) {
      return (dispatch) => {
        return this._releaseService.getReleaseAutomationDetails(projectId, releaseId).subscribe(releaseSummaries => {
          dispatch(this._fetchReleaseAutomationSummary(releaseSummaries, gadgetId));
        }, (error) => {
          dispatch(this.onError(error));
        });
      };
    }

    _fetchReleaseAutomationSummary(data, gadgetId) {
      return { type: types.FETCH_RELEASE_AUTOMATION_SUMMARY, data, gadgetId: gadgetId };
    }

    _cloneRelease (data, componentId) {
        return { type: types.JOB_PROGRESS_STATUS_STARTS, data, componentId };
    }

    _fetchAllReleases(data) {
        return { type: types.FETCH_RELEASES, data };
    }
    /**
     * Clear release event
     */
    clearReleaseEvent(event: string = '') {
        return { type: types.CLEAR_RELEASE_EVENTS, data: event};
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
