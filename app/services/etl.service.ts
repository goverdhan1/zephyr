import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {getRequestHeader} from '../utils/api/api.utils';
import {EventHttpService} from './event-http.service';
// Constants
import {API_PATH} from '../utils/constants/api.constants';

@Injectable()
export class EtlServices {
    constructor(public http: EventHttpService) {
        //console.log('ETL service');
    }
    getETLTiming(skipLoadingBar = true) {
        let getETLTimingURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_ETL_TIMING;

        return this.http.get(getETLTimingURL, {
            headers: getRequestHeader()
        }, skipLoadingBar).map(response => response.json());
    }

    updateETLTiming(data) {
        let getETLTimingURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_ETL_TIMING + '?hr=' + data['hrs'] + '&mm=' + data['mm'];

        return this.http.put(getETLTimingURL, null ,  {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        }).map(response => response.json());
    }

    getETLHistory(skipLoadingBar = true) {
        let getETLHistoryURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_ETL_HISTORY;

        return this.http.get(getETLHistoryURL, {
            headers: getRequestHeader()
        }, skipLoadingBar).map(response => response.json());
    }
    etlSchedule(data) {
        let getETLScheduleURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.ETL_SCHEDULE + '?';
        Object.keys(data).forEach(key => {
            getETLScheduleURL += key + '=' + data[key] + '&';
        });
        getETLScheduleURL = getETLScheduleURL.slice(0, getETLScheduleURL.length - 1);

        return this.http.put(getETLScheduleURL, null, {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        }).map(response => response.json());
    }
    getRefreshHistory(data){
        let getURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.JOB_HISTORY + '?';
        Object.keys(data).forEach(key => {
            getURL += key + '=' + data[key] + '&';
        });
        getURL = getURL.slice(0, getURL.length - 1);

        return this.http.get(getURL, {
            headers: getRequestHeader({
                 'includeAcceptType': true
             })
        }).map(response => response.json());
    }

}
