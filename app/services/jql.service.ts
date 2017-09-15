import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';

// Constants
import {API_PATH, getApiPath} from '../utils/constants/api.constants';

declare var jQuery: any;

@Injectable()
export class JQLService {
    constructor(public http: any) {
        //console.log('JQL service');
    }
    /**
     * Get JQL fields
     */
    getJQLFields() {
        let getJQLFieldsURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 +
            getApiPath('GET_JQL_FIELDS', null);
        let authorization = localStorage.getItem('base64Value');
        return this.http.get(getJQLFieldsURL, {
            headers: new Headers({
                'Authorization': authorization
            })
        })
        .map(response => response.json());
    }
}
