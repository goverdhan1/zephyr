import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {getRequestHeader} from '../utils/api/api.utils';

// Constants
import {API_PATH, getApiPath} from '../utils/constants/api.constants';

@Injectable()
export class MapTestReqService {
    constructor(public http: any) {
        //console.log('Map Test/Requirement service');
    }

    saveTestCase(data) {
        /*
         * map testcase to requirement
         */

        let getAllocateURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.ALLOCATE_TESTCASE;

        return this.http.put(getAllocateURL, JSON.stringify(data), {
            headers: getRequestHeader()
        }).map(response => response.json());
    }

    saveRequirement(data) {
        /*
        * map requirement to testcase
        */

        let getAllocateURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
                            + getApiPath('ALLOCATE_REQUIREMENT', [data.testcaseid, data.releaseId]);

        return this.http.post(getAllocateURL, JSON.stringify(data), {
            headers: getRequestHeader()
        }).map(response => response.json());
    }
    saveBulkRequirement(data) {
        /*
        * map requirement to testcase
        */

        let getAllocateURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.ALLOCATE_BULK_REQUIREMENT + data.releaseId;

        return this.http.post(getAllocateURL, JSON.stringify(data), {
            headers: getRequestHeader()
        }).map(response => response.json());
    }

}
