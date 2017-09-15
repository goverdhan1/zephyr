import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';

import {TeststepModel} from '../models/teststep.model';

// Constants
import {API_PATH, getApiPath} from '../utils/constants/api.constants';
import {getRequestHeader} from '../utils/api/api.utils';

@Injectable()
export class TeststepService {
    teststeps: TeststepModel[];
    public teststep: TeststepModel;
    constructor(public http: any) {
        // console.log('teststep service');
    }
    getTeststepByTestcaseId(tcid) {
        let getTeststepsURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
            + getApiPath('GET_STEPS_BY_TESTCASE_ID', [tcid]);
        return this.http.get(getTeststepsURL, {
            headers: getRequestHeader()
        }, true)
        .map(
            (response) => {
                if(response['_body']) {
                    return response.json();
                } else {
                    return {};
                }
            }
        );
    }

    getTeststepResult(id) {
        // let getTeststepResultsURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_LATEST + API_PATH.EXECUTION
        //     + API_PATH.TEST_STEP_RESULT + '?teststepid=' + teststepid;
        let getTeststepResultsURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.EXECUTION
            + API_PATH.TEST_STEP_RESULT + '/bytctid?tctid=' + id;
        return this.http.get(getTeststepResultsURL, {
            headers: getRequestHeader()
        }, true)
        .map((response) => {
            return response.json();
        });
    }

    addTeststep(tcid, data) {
        let getTeststepsURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
            + getApiPath('UPDATE_TESTSTEP_BY_TCID', [tcid]);
        return this.http.post(getTeststepsURL, JSON.stringify(data), {
            headers: getRequestHeader()
        })
        .map((response) => {
            return response.json();
        });
    }
    updateTeststep(tcid, data) {
        let getTeststepsURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
            + getApiPath('CREATE_TESTSTEP_BY_TCID', [tcid]);
        return this.http.put(getTeststepsURL, JSON.stringify(data), {
            headers: getRequestHeader()
        })
        .map((response) => {
            return response.json();
        });
    }

    // updateSingleTestStepById (data) {
    //     let getTeststepsURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_LATEST + API_PATH.EXECUTION +
    //         API_PATH.TEST_STEP_RESULT + '/'+ data.id + '?status=' + data.status + '&comment=' + data.comment;
    //     return this.http.put(getTeststepsURL, null, {
    //         headers: getRequestHeader()
    //     })
    //     .map((response) => {
    //         return response.json();
    //     });
    // }

    updateSingleTestStepResult(data) {
        //delete data[0]['id'];
        let getTeststepsURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.EXECUTION +
            API_PATH.TEST_STEP_RESULT + API_PATH.UPDATE_TESTSTEP_RESULT;
        return this.http.post(getTeststepsURL, JSON.stringify(data), {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        })
        .map((response) => {
            return response.json();
        });
    }
}
