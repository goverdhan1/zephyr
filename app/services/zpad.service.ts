import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';

// Constants
import {API_PATH, getApiPath} from '../utils/constants/api.constants';
import {getRequestHeader} from '../utils/api/api.utils';
@Injectable()
export class ZpadService {
  constructor(public http : Http){}

  zpadPush(data) {
    let setZpadURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.ZPAD_API;
    return this.http.post(setZpadURL, JSON.stringify(data),{
      headers: getRequestHeader({
        'includeAcceptType': true
      })
    })
      .map(response => response.json());
  }

  zpadAutomationQuality(projectId) {
    let setZpadUrl = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('ZPAD_AUTOMATION_QUALITY', [projectId]);
    return this.http.get(setZpadUrl, {
      headers: getRequestHeader({
        'includeAcceptType' : true
      })
    })
      .map(response => response.json());
  }
}
