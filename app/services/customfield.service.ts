import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {getRequestHeader} from '../utils/api/api.utils';
// Constants
import {API_PATH} from '../utils/constants/api.constants';

@Injectable()
export class CustomFieldService {
    constructor(public http: any) {
        // console.log('Custom field service');
    }
    getCustomFieldsByEntity(id) {
        let _customFieldURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
            + API_PATH.GET_CUSTOMFIELDS_BY_ENTITY + id;

        return this.http.get(_customFieldURL, {
            headers: getRequestHeader()
        }).map(response => response.json());
    }
    getCustomFieldTypes() {
        let _customFieldTypesURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
            + API_PATH.GET_CUSTOMFIELDS_TYPES;

        return this.http.get(_customFieldTypesURL, {
            headers: getRequestHeader()
        }).map(response => response.json());
    }
}
