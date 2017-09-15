import {Http, Headers, URLSearchParams} from '@angular/http';
import {Injectable} from '@angular/core';

// Constants
import {API_PATH, getApiPath} from '../utils/constants/api.constants';
import {LOCAL_STORAGE} from '../utils/constants/local-storage.constants';
import {ZephyrLocalStorage} from '../utils/localstorage/local-storage.util';
import {getRequestHeader} from '../utils/api/api.utils';

@Injectable()
export class ZQLService {
    constructor(public http: any) {
        //console.log('ZQL service');
    }
    getZQLMetadata() {
        let _zqlMetadataURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
             + API_PATH.GET_ZQL_METADATA;

        return this.http.get(_zqlMetadataURL, {
            headers: getRequestHeader()
        }).map(response => response.json());
    }
    getZQLValues(key, queryParams) {
        let _zqlValuesURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('GET_ZQL_VALUES', [key]);

        /**Set query Params */

        let params = new URLSearchParams();
        params.set('partialtext', queryParams.partialtext);
        params.set('releaseid', queryParams.releasid);
        params.set('offset', queryParams.offset);
        params.set('pagesize', queryParams.pagesize);

        return this.http.get(_zqlValuesURL, {
            headers: getRequestHeader(),
            search: params
        }).map(response => response.json());
    }
    createPreviousFilter(dataParams) {
        ZephyrLocalStorage.addItemToArray(dataParams);
        return this.getPreviousFilters(dataParams);
    }
    getPreviousFilters(dataParams) {

        let previousFilters: any = '';
        if(dataParams) {
            switch(dataParams.key) {
                case 'ZEPHYR_TESTCASE_FILTERS':
                    previousFilters = ZephyrLocalStorage.getItems(LOCAL_STORAGE.ZEPHYR_TESTCASE_FILTERS);
                    break;
                case 'ZEPHYR_REQUIREMENT_FILTERS':
                    previousFilters = ZephyrLocalStorage.getItems(LOCAL_STORAGE.ZEPHYR_REQUIREMENT_FILTERS);
                    break;
                case 'ZEPHYR_TEST_SCHEDULE_FILTERS':
                    previousFilters = ZephyrLocalStorage.getItems(LOCAL_STORAGE.ZEPHYR_TEST_SCHEDULE_FILTERS);
                    break;
                default:
                    break;
            }
        }

        // Filter null/empty values
        return previousFilters.filter(filter => filter);
    }
}
