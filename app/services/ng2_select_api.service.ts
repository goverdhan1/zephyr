import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

import {API_PATH, getApiPath} from '../utils/constants/api.constants';
import {getRequestHeader} from '../utils/api/api.utils';
@Injectable()
export class Ng2ApiService {
    constructor(public http: any) {
    }
    getOptionsFromApi(apiUrl, key) {
        let getApiURL = apiUrl,
            queryParams = '&startingwith=' + key;
        getApiURL += queryParams;
        return this.http.get(getApiURL, {
            headers: getRequestHeader()
        })
        .map(response => response.json());
    }
}
