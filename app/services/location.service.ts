import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {getRequestHeader} from '../utils/api/api.utils';
import {LocationModel} from '../models/location.model';
// Constants
import {API_PATH} from '../utils/constants/api.constants';

@Injectable()
export class LocationService {
    _location: LocationModel;
    constructor(public http: any) {}
    getLocationDetailsByUserId(userId) {
        /*
         * Get location details by userId
         */
        let getLocationDetailsByUserIdURL = API_PATH.BASE_ENDPOINT
            + API_PATH.API_VERSION_V3
            + API_PATH.GET_LOCATION_DETAILS_BY_USER_ID + userId;

        return this.http.get(getLocationDetailsByUserIdURL, {
            headers: getRequestHeader()
        })
        .map(response => response.json());
    }
}
