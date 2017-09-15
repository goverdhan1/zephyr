import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';

// Constants
import {API_PATH} from '../utils/constants/api.constants';
import {getRequestHeader} from '../utils/api/api.utils';

declare var jQuery: any;

@Injectable()
export class DefectsAdminService {
    constructor(public http: any) {
        //console.log('Defects Admin service');
    }

    getAllPreferences() {
        let _allPreferences = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_ALL_DEFECT_PREFERENCES;
        return this.http.get(_allPreferences, {
            headers: getRequestHeader()
        })
        .map(response => response.json());
    }

    getPreferenceByDTSId(id) {
        let _preferencesById = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_ALL_DEFECT_PREFERENCES
        + API_PATH.DTS_TYPE + '?dtstype=' + id;
        return this.http.get(_preferencesById, {
            headers: getRequestHeader()
        })
        .map(response => response.json());
    }

    savePreference(data, id, obj, action) {
        let _preferencesById = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_ALL_DEFECT_PREFERENCES
         + '?dtstype=' + id;
        return this.http.put(_preferencesById, JSON.stringify(data), {
            headers: getRequestHeader()
        })
        .map(response => {
            let result = {};
            result['action'] = action;
            result['preference'] = obj;
            result['status'] = response.status;
            return result;
        });
    }

    clearDefectsCache(key) {
        let _clearCacheURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.CLEAR_DEFECT_CACHE +
        '?key=' + key;
        return this.http.delete(_clearCacheURL, {
            headers: getRequestHeader()
        })
        .map(response => {
            let result = {};
            result['action'] = 'clear';
            result['status'] = response.status;
            return result;
        });
    }

    uploadMetaData(url, offline) {
        let _uploadMetaDataURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.CLEAR_DEFECT_CACHE +
        '?url=' + url + '&offline=' + offline;
        //console.log('url', _uploadMetaDataURL);
        return this.http.put(_uploadMetaDataURL, {}, {
            headers: getRequestHeader()
        })
        .map(response => response.json());
    }
}
