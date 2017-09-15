import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';

// Constants
import {API_PATH, getApiPath} from '../utils/constants/api.constants';
import {getRequestHeader} from '../utils/api/api.utils';
@Injectable()
export class AaService {
  constructor(public http : Http){}

  aaPush(data) {
    let setAaURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('ZPAD_API', []);
    // console.log(setAaURL);
    return this.http.post(setAaURL, JSON.stringify(data),{
      headers: getRequestHeader({
        'includeAcceptType': true
      })
    })
      .map(response => response.json());
  }

  aaGetReleaseTestCasesExecutionsCount(releaseId) {
    let setAaURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('ZPAD_TESTCASES_FAILED_EXECUTIONS', [releaseId]);
    // console.log(setAaURL);
    return this.http.get(setAaURL, {
      headers: getRequestHeader({
        'includeAcceptType' : true
      })
    })
      .map(response => response.json());
  }
}
