import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {getRequestHeader} from '../utils/api/api.utils';
// Constants
import {API_PATH, getApiPath} from '../utils/constants/api.constants';
import {EventHttpService} from './event-http.service';

@Injectable()
export class LicenseService {
    constructor(public http: EventHttpService) {
        //console.log('LicenseService');
    }
    getAppLicense() {
      let getAppLicenseURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_APP_LICENSE;
        return this.http.get(getAppLicenseURL, {
            headers: getRequestHeader()
        })
        .map(response => response.json());
    }
    getAutomationLicense(){
      let automationLicenseUrl  = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_AUTOMATION_LICENSE;
      return this.http.get(automationLicenseUrl, {
          headers: getRequestHeader({
            'includeAcceptType' : true
          })
      })
      .map(response => response.json() );
    }

  getAdminAccessCheck(){
    let automationLicenseUrl  = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_ADMIN_ACCESS;
    return this.http.get(automationLicenseUrl, {
      headers: getRequestHeader({
        'includeAcceptType' : true
      })
    });
  }

    getSystemLicense() {
      let getSystemLicenseURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_SYSTEM_LICENSE;
        return this.http.get(getSystemLicenseURL, {
            headers: getRequestHeader()
        })
        .map(response => response.json());
    }

    getAppInfo() {
      let getAppInfoURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_APP_INFO;
      return this.http.get(getAppInfoURL, {
        headers: getRequestHeader({
                'includeAcceptType': true
            })
      })
        .map(response => response.json());
    }

    getUsersCount(licenseType) {
      let getCountURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_ALL_USERS;
          getCountURL+= licenseType === 'NAMED' ? '/active/count' : '/loggedin/count';
      return this.http.get(getCountURL, {
        headers: getRequestHeader({
                'includeAcceptType': true
            })
      })
        .map(response => response.json());
    }

    setAppInfo(value) {
      let setAppInfoURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_APP_INFO;
      let queryParams = '?frequencypreference=' + value;
      setAppInfoURL += queryParams;
      return this.http.put(setAppInfoURL,'', {
          headers: getRequestHeader()
      })
        .map(response => {
          let result = {};
          result['response'] = response.json();
          result['status'] = response.status;
          result['value'] = value;
          return result;
        });
    }
    getAppLicenseInfo() {
      let getAppLicenseURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_SYSTEM_LICENSE;
        return this.http.get(getAppLicenseURL, {
            headers: getRequestHeader()
        })
        .map(response => response.json());
    }
    getAppDBInfo() {
      let getAppInfoURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.APP_DB_INFO;
      return this.http.get(getAppInfoURL, {
        headers: getRequestHeader({
                'includeAcceptType': true
            })
      })
        .map(response => response.json());
    }
    getAppDFPInfo() {
      let getAppInfoURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.APP_DFP;
      return this.http.get(getAppInfoURL, {
        headers: getRequestHeader({
                'includeAcceptType': true
            })
      })
        .map(response => response.json());
    }
    doVersionPing(data) {
        var versionPingURL = getApiPath('VERSION_PING', [data.loggedInUsers, data.licEdition, data.licType, data.licenseId, data.buildNumber, data.licensedUsers,
        data.activeUsers, data.chksum, data.db, data.custId, data.dbv]);
        versionPingURL = window.location.protocol + versionPingURL;
        /**
         * License info
         */
        return this.http.get(versionPingURL, {headers:new Headers()}, true, true);
    }
}
