import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {getRequestHeader} from '../utils/api/api.utils';
// Constants
import {API_PATH} from '../utils/constants/api.constants';
import 'rxjs/add/operator/map';


@Injectable()
export class HotBackupService {
    constructor(public http: any) {
        // console.log('Hot backup service');
    }

    getHotBackupInfo() {
        let getHotBackupInfoURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_HOT_BACKUP_INFO;
        return this.http.get(getHotBackupInfoURL, {
            headers: getRequestHeader()
        })
        .map(response => response.json());
    }

    setHotBackupInfo(hr, enableFlag) {
        let setHotBackupInfoURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_HOT_BACKUP_INFO;
        let queryParams = '?hrvalue=' + hr + '&enableAutoBackup=' + enableFlag;
        setHotBackupInfoURL += queryParams;
        return this.http.put(setHotBackupInfoURL, '', {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        })
            .map(response => {
                       let result = {};
                       result['response'] = response.json();
                       result['status'] = response.status;
                       result['value'] = hr;
                       result['enableAutoBackup'] = enableFlag;
                       return result;
                    });
    }

    getJobHistory() {
        let getJobHistoryURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_JOB_HISTORY;
        return this.http.get(getJobHistoryURL, {
            headers: getRequestHeader()
        })
        .map(response => response.json());
    }

    getJobBackupHistory() {
        let getJobBackupHistoryURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_JOB_BACKUP_HISTORY;
        return this.http.get(getJobBackupHistoryURL, {
            headers: getRequestHeader()
        })
        .map(response => response.json());
    }

    performHotBackup() {
        let hotBackupURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.SCHEDULE_IMMEDIATE_BACK;
        return this.http.post(hotBackupURL, null, {
            headers: getRequestHeader()
        })
        .map(response => response.json());
    }
}
