import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

import {ReleaseModel} from '../models/release.model';
// Constants
import {API_PATH, getApiPath} from '../utils/constants/api.constants';
import {getRequestHeader} from '../utils/api/api.utils';
import {EventHttpService} from './event-http.service';

@Injectable()
export class ReleaseService {
    releases: ReleaseModel[];
    releaseCalenderData;
    releaseReportData;
    constructor(public http: EventHttpService) {}
    getReleases() {
        /*
         * Get releases
         */
        let getReleasesURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_RELEASES;
        return this.http.get(getReleasesURL, {
            headers: getRequestHeader()
        })
        .map(response => response.json());
    }
    getReleasesByProjectId(projectId, skipLoadingIndicator=false) {
        /*
         * Get releases by projectId
         */
        let getReleasesByProjectIdURL = API_PATH.BASE_ENDPOINT
            + API_PATH.API_VERSION_V3
            + getApiPath('GET_RELEASES_BY_PROJECT_ID', [projectId]);

        return this.http.get(getReleasesByProjectIdURL, {
            headers: getRequestHeader()
        },skipLoadingIndicator)
        .map(response => response.json());
    }
    getReleaseById(id, skipLoadingBar=false) {
        /*
         * Get release by ID
         */
        let getReleaseByIdURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_RELEASE_BY_ID + '/' + id;
        return this.http.get(getReleaseByIdURL, {
            headers: getRequestHeader()
        }, skipLoadingBar)
        .map(response => response.json());
    }
    getReleaseSummaries(releaseId, skipLoadingIndicator=false) {
        let getReleasesURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('GET_RELEASE_SUMMARY', [releaseId]);
        return this.http.get(getReleasesURL, {
            headers: getRequestHeader()
        }, skipLoadingIndicator)
        .map(response => response.json());
        // return Promise.resolve(this.releaseSummaries);
    }

    getReleaseAutomationDetails(projectId, releaseId) {
      let getReleasesURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
      + getApiPath('GET_RELEASE_AUTOMATION_SUMMARY', [projectId, releaseId]);

      return this.http.get(getReleasesURL, {
        headers: getRequestHeader()
      })
        .map(response => response.json());
      // return Promise.resolve(this.releaseSummaries);
    }


    editRelease (data) {
        let getPreferenceURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.EDIT_ADD_DELETE_RELEASE + data.id;
        return this.http.put(getPreferenceURL, JSON.stringify(data) , {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        })
        .map(response => response.json());
    }

    addRelease (data) {
        let getPreferenceURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.EDIT_ADD_DELETE_RELEASE;
        return this.http.post(getPreferenceURL, JSON.stringify(data) , {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        })
        .map(response => response.json());
    }

    deleateRelease (id) {
        let getPreferenceURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.EDIT_ADD_DELETE_RELEASE + id;
        return this.http.delete(getPreferenceURL, {
            headers: getRequestHeader()
        })
        .map(response => {
            let result = {};
            result['id'] = id;
            result['status'] = response.status;
            return result;
        });
    }

    cloneRelease (data) {
       let getURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.CLONE_RELEASE;
        return this.http.post(getURL, JSON.stringify(data) , {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        })
        .map(response => response.json());
    }

}
