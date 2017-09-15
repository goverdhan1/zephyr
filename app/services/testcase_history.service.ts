import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

// Constants
import {API_PATH, getApiPath} from '../utils/constants/api.constants';
import {getRequestHeader} from '../utils/api/api.utils';
@Injectable()
export class TestcaseHistoryService {
    constructor(public http: any) {
    }
    getTestcaseHistoryByTcid(tcid) {
        let getProjectURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
            + getApiPath('GET_TESTCASE_HISTORY_BY_TCID', [tcid]);
        return this.http.get(getProjectURL, {
            headers: getRequestHeader()
        }, true)
        .map(response => response.json());
    }
}
