import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

// Constants
import { API_PATH, getApiPath } from '../utils/constants/api.constants';
import { getRequestHeader } from '../utils/api/api.utils';
@Injectable()
export class PaService {
  constructor(public http: Http) { }

  paPush(data) {
    let setPaUrl = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('ZPAD_API', []);
    return this.http.post(setPaUrl, JSON.stringify(data), {
      headers: getRequestHeader({
        'includeAcceptType': true
      })
    })
      .map(response => response.json());
  }

  paGetTestcaseExecution(releaseId) {
    let setPaUrl = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('GET_ZPAD_TESTCASE_PLAN_ACTUAL_EXECUTION', [releaseId]);
    return this.http.get(setPaUrl, {
      headers: getRequestHeader({
        'includeAcceptType': true
      })
    })
      .map(response => response.json());
  }
}
