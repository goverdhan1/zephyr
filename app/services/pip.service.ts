import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';

// Constants
import {API_PATH, getApiPath} from '../utils/constants/api.constants';
import {getRequestHeader} from '../utils/api/api.utils';
@Injectable()
export class PipService {
  constructor(public http : Http){}

  pipPush(data) {
    let setPipURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('ZPAD_API', []);
    // console.log(setPipURL);
    return this.http.post(setPipURL, JSON.stringify(data),{
      headers: getRequestHeader({
        'includeAcceptType': true
      })
    })
      .map(response => response.json());
  }

  pipGetReleaseDefectCounts(projectId) {
    let setPipURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('ZPAD_RELEASE_DEFECT_COUNT', [projectId]);
    // console.log(setPipURL);
    return this.http.get(setPipURL, {
      headers: getRequestHeader({
        'includeAcceptType' : true
      })
    })
      .map(response => response.json());
  }

  pipGetReleasePredDefectCounts(releaseId) {
    let setPipURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('ZPAD_RELEASE_PRED_DEFECT_COUNT', [releaseId]);
    // console.log(setPipURL);
    return this.http.get(setPipURL, {
      headers: getRequestHeader({
        'includeAcceptType' : true
      })
    })
      .map(response => response.json());
  }
}
