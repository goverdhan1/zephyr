import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

import {UserModel} from '../models/user.model';
// Constants
import {API_PATH, getApiPath} from '../utils/constants/api.constants';
import {getRequestHeader} from '../utils/api/api.utils';
import {EventHttpService} from './event-http.service';
@Injectable()
export class TeamService {
    _team: UserModel[];
    constructor(public http: EventHttpService) {}
    getTeamDetailsByUserId(userId) {
        /*
         * Get team details by userId
         */
        let getTeamDetailsByUserIdURL = API_PATH.BASE_ENDPOINT
            + API_PATH.API_VERSION_V3
            + API_PATH.GET_TEAM_DETAILS_BY_USER_ID + userId;

        return this.http.get(getTeamDetailsByUserIdURL, {
            headers: getRequestHeader()
        })
        .map(response => response.json());
    }
    getTeamDetails() {
        /*
         * Get entire team details
         */
        let getTeamDetails = API_PATH.BASE_ENDPOINT
            + API_PATH.API_VERSION_V3
            + API_PATH.GET_TEAM_DETAILS;

        return this.http.get(getTeamDetails, {
            headers: getRequestHeader()
        })
        .map(response => response.json());
    }
    getTeamDetailsProjectId(projectId, skipLoadingBar=false) {
        /*
         * Get entire team details
         */
        let getTeamDetails = API_PATH.BASE_ENDPOINT
            + API_PATH.API_VERSION_V3
            + getApiPath('GET_USERS_BY_PROJECT_ID', [projectId]);;

        return this.http.get(getTeamDetails, {
            headers: getRequestHeader()
        }, skipLoadingBar)
        .map(response => response.json());
    }
}
