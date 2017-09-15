import {Injectable, Inject} from '@angular/core';
import * as types from '../utils/constants/action.types';
import {TeamService} from '../services/team.service';
import {Http} from '@angular/http';
import * as messageTypes from '../utils/constants/messages.types';
import {EventHttpService} from '../services/event-http.service';

@Injectable()
export class TeamAction {
    private _teamService;
    constructor(@Inject(Http) private _http: any) {
        this._teamService = new TeamService(_http);
    }

    fetchTeamDetailsByUserId(userId) {
        return (dispatch) => {
            return this._teamService.getTeamDetailsByUserId(userId).subscribe((team) => {
                dispatch(this._fetchTeamDetailsByUserId(team));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    fetchTeamDetails() {
        return (dispatch) => {
            return this._teamService.getTeamDetails().subscribe((team) => {
                dispatch(this._fetchTeamDetails(team));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    fetchTeamDetailsByProjectId(projectId, skipLoadingBar=false) {
        return (dispatch) => {
            return this._teamService.getTeamDetailsProjectId(projectId, skipLoadingBar).subscribe((team) => {
                dispatch(this._fetchTeamDetails(team));
            }, (error) => {
                // dispatch(this.onError(error));
            });
        };
    }
    fetchTeamDetailsByProjectIdForGadget(projectId, gadgetId) {
        return (dispatch) => {
            return this._teamService.getTeamDetailsProjectId(projectId).subscribe((team) => {
                dispatch(this._fetchTeamDetailsForGadget(team, gadgetId));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _fetchTeamDetails(data) {
        return { type: types.FETCH_TEAM_DETAILS, data };
    }
    _fetchTeamDetailsForGadget(data, gadgetId) {
        return { type: types.FETCH_TEAM_DETAILS_FOR_GADGET, data, 'gadgetId' : gadgetId };
    }
    _fetchTeamDetailsByUserId(data) {
        return { type: types.FETCH_TEAM_DETAILS_BY_USER_ID, data };
    }
    fetchTeamLocationDetails(data) {
        return { type: types.FETCH_TEAM_LOCATION_DETAILS, data };
    }
    onError(data) {
        return {
            type: types.SHOW_TOAST,
            data: ({type: messageTypes.ERROR, data})
        };
    }
}
