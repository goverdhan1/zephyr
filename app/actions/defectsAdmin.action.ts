import {Injectable, Inject} from '@angular/core';
import * as types from '../utils/constants/action.types';
import * as Observable from 'rxjs/Observable';
import {DefectsAdminService} from '../services/defectsAdmin.service';
import {Http} from '@angular/http';
import * as messageTypes from '../utils/constants/messages.types';
declare var _: any;

@Injectable()
export class DefectsAdminAction {
    private _defectsAdminService;
    private _observable;
    constructor(@Inject(Http) private _http: any) {
        this._defectsAdminService = new DefectsAdminService(_http);
        this._observable = Observable.Observable;
    }
    fetchAllPreferences() {
        return (dispatch) => {
            return this._defectsAdminService.getAllPreferences().subscribe((preferences) => {
                dispatch(this._fetchAllPreferences(preferences));
            }, (error) => {
                let errorMsg = {
                  zeeErrorCode: error.status,
                  errorMsg: error.json().code
                };
                dispatch(this.onError(error.json()));
            });
        };
    }
    _fetchAllPreferences(data) {
        return { type: types.FETCH_ALL_PREFERENCES, data };
    }


    fetchPreferenceByDtsId(id) {
        return (dispatch) => {
            return this._defectsAdminService.getPreferenceByDTSId(id).subscribe((preferences) => {
                dispatch(this._fetchPreferenceByDtsId(preferences));
            }, (error) => {
                let errorMsg = {
                  zeeErrorCode: error.status,
                  errorMsg: error.json().code
                };
                dispatch(this.onError(error.json()));
            });
        };
    }

    _fetchPreferenceByDtsId(data) {
        return { type: types.FETCH_ALL_PREFERENCES, data };
    }

    savePreferenceByDtsId(formValues, id, obj, action) {
        return (dispatch) => {
            return this._defectsAdminService.savePreference(formValues, id, obj, action).subscribe((data) => {
                dispatch(this._savePreferenceByDtsId(data));
                dispatch(this._onEditPreference(data));
            }, (error) => {
                let errorMsg = {
                  zeeErrorCode: error.status,
                  errorMsg: error.json().code
                };
                dispatch(this.onError(error.json()));
            });
        };
    }

    _savePreferenceByDtsId(data) {
        return { type: types.SAVE_PREFERENCE, data };
    }

    _onEditPreference(data: any) {
        return {
            type: types.SHOW_TOAST,
            data: (<any>Object).assign({type: messageTypes.SUCCESS}, _setUserToastrMessage(data, data.action))
        };
    }

    clearDefectsCache(key) {
        return (dispatch) => {
            return this._defectsAdminService.clearDefectsCache(key).subscribe((data) => {
                dispatch(this._clearDefectsCache(data));
                dispatch(this._clearPreference(data));

            }, (error) => {
                let errorMsg = {
                  zeeErrorCode: error.status,
                  errorMsg: error.json().code
                };
                dispatch(this.onError(error.json()));
            });
        };
    }

    _clearPreference(data: any) {
        return {
            type: types.SHOW_TOAST,
            data: (<any>Object).assign({type: messageTypes.SUCCESS}, _setUserToastrMessage(data, data.action))
        };
    }

    _clearDefectsCache(data) {
        return { type: types.SAVE_PREFERENCE, data };
    }

    uploadMetaData(url, offline) {
        return (dispatch) => {
            return this._defectsAdminService.uploadMetaData(url, offline).subscribe((data) => {
                dispatch(this._uploadMetaData(data));
            }, (error) => {
                let errorMsg = {
                  zeeErrorCode: error.status,
                  errorMsg: error.json().code
                };
                dispatch(this.onError(error.json()));
            });
        };
    }

    _uploadMetaData(data) {
        return { type: types.SAVE_PREFERENCE, data };
    }

    clearUserEvent() {
        return { type: types.CLEAR_USER_EVENTS};
    }

    onError(data) {
        return {
            type: types.SHOW_TOAST,
            data: (<any>Object).assign({type: messageTypes.ERROR}, _setUserToastrMessage(data, 'error'))
        };
    }
}

function _setUserToastrMessage(response, type) {
    let description,
        title = 'Success';

    if(type == 'create') {
        description = 'Created preference ' + response.preference.name;
    } else if(type == 'edit') {
        description = 'Edited preference ' + response.preference.name;
    } else if(type == 'delete') {
        description = 'Deleted preference ' + response.preference.name;
    } else if(type == 'clear') {
        description = 'Cache of online JIRA Custom fields has been cleared successfully';
    } else if(type == 'error') {
        title = 'Error';
        description = response.errorMsg || response.code ;
    }
    return {
        title: title,
        description: description
    };
}
