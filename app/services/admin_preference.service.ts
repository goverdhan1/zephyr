import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';

import {getRequestHeader} from '../utils/api/api.utils';
// Constants
import {API_PATH} from '../utils/constants/api.constants';
import {ADMIN_PREFERENCES} from '../utils/constants/application.constants';
import {EventHttpService} from './event-http.service';


@Injectable()
export class AdminPreferenceService {
    constructor(public http: EventHttpService) {
        // console.log('Admin preference service');
    }

   getAnonymousPrefByKey(keyValue) {
        let getPreferenceURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_ANNONYMOUS_PREFERENCES+"?key="+keyValue ;

         return this.http.get(getPreferenceURL, {
            headers: getRequestHeader()
        })
        .map(response => response.json());
    }

    getPreferenceByKey(key, skipLoadingBar) {
        let _preferenceKey = ADMIN_PREFERENCES[key] || key;
        let getPreferenceURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_PREFERENCES + _preferenceKey;

        return this.http.get(getPreferenceURL, {
            headers: getRequestHeader()
        }, skipLoadingBar).map(response => response['_body'] ? response.json() : {});
    }


    getAllPref(skipLoadingBar=false) {
        let getPreferenceURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_ALL_PREFERENCES;

        return this.http.get(getPreferenceURL, {
            headers: getRequestHeader()
        }, skipLoadingBar).map(response => response.json());
    }

    getAllGridPrefs(skipLoadingBar=false) {
      let getPreferenceURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_GRID_PREFS;

      return this.http.get(getPreferenceURL, {
        headers: getRequestHeader()
      }, skipLoadingBar).map(response => response.json());
    }

    updatePreferenceByKey(data) {
        let getUPdatePreferenceByKeyURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.UPDATE_PREFERENCE_BY_KEY;

        return this.http.put(getUPdatePreferenceByKeyURL, JSON.stringify(data), {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        }).map(response => ({
            key: data.name,
            value: data.value,
            status: response.status
        }));
    }


    updateMultiPreferenceByKey(data) {
        let updateMultiPreferenceByKeyURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.UPDATE_MULTI_PREFERENCES;

        return this.http.put(updateMultiPreferenceByKeyURL, JSON.stringify(data), {
            headers: getRequestHeader({
                'contentType': '*/*'
            })
        }).map(response => response.json());
    }

    updateUserAuthentication(data) {
        let updateUserAuthenticationURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.UPDATE_USER_AUTHENTICATION;

        return this.http.put(updateUserAuthenticationURL, JSON.stringify(data), {
            headers: getRequestHeader({
                'contentType': '*/*'
            })
        }).map(response => response.json());
    }

    addPreferenceByKeyAndItem(dataObject , key) {
        let updatePreferenceByKeyAndItemURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
        + API_PATH.UPDATE_PREFERENCE_BY_KEY_ITEM + key;

        return this.http.post(updatePreferenceByKeyAndItemURL, JSON.stringify(dataObject), {
            headers: getRequestHeader()
        }).map(response => response.json());

    }

    updatePreferenceByKeyAndItem(dataObject, key) {
        let addPreferenceByKeyAndItemURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
        + API_PATH.UPDATE_PREFERENCE_BY_KEY_ITEM + key;

        return this.http.post(addPreferenceByKeyAndItemURL, JSON.stringify(dataObject), {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        }).map(response => response.json());
    }
    updatePreferenceItemStatus (id , key , status) {
        let updatePreferenceItemStatusURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.UPDATE_PREFERENCE_ITEM_STATUS;
            updatePreferenceItemStatusURL = updatePreferenceItemStatusURL + key  + '&active=' + status + '&id=' + id;

        return this.http.put(updatePreferenceItemStatusURL, null, {
            headers: getRequestHeader({
                'contentType': '*/*'
            })
        }).map(response => response.json());
    }

    authenticatinCheck (data) {
        let authenticationCheckurl = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.AUTHENTICATION_CHECK;

        return this.http.put(authenticationCheckurl, JSON.stringify(data), {
            headers: getRequestHeader()
        }).map(response => response.json());
    }
}
