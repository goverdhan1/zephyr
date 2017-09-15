import {Injectable, Inject} from '@angular/core';
import * as types from '../utils/constants/action.types';
import * as Observable from 'rxjs/Observable';
import {TCEPService} from '../services/TCEPService.service';
import {Http} from '@angular/http';
import {I18N_MESSAGES} from '../utils/messages/messages.en';
import * as messageTypes from '../utils/constants/messages.types';
import {ProjectService} from '../services/project.service';
import { ZephyrStore } from '../store/zephyr.store';
declare var _: any;

@Injectable()
export class TCEPAction {
	private _TCEPService;

	constructor(@Inject(Http) private _http: Http) {
		this._TCEPService = new TCEPService(_http);
	}

	getTCEPCycleForReleaseAndProject(releaseId , projectId, chartKey){
		return (dispatch) => {
			return this._TCEPService.getTCEPCycleForReleaseAndProject(releaseId, projectId, chartKey).subscribe((data) =>{
				dispatch(this._getTCEPCycleForReleaseAndProject(data));
			}, (error) => {
				let errorMessge = {
				  zeeErrorCode: error.status,
                  errorMsg: error.json().code
				};
				dispatch(this.onError(error.json()));
			});
		};
	}

	_getTCEPCycleForReleaseAndProject(data){
		return {type : types.GET_TCEP_CYCLE_FOR_RELEASE_PROJECT, data};
	}

	getTCEPPhaseForReleaseAndProject(releaseId , projectId, phaseId, chartKey){
		return (dispatch) => {
			return this._TCEPService.getTCEPPhaseForReleaseAndProject(releaseId , projectId, phaseId, chartKey).subscribe((data) =>{
			console.log("tcep.action file", data);
				dispatch(this._getTCEPPhaseForReleaseAndProject(data));
			}, (error) => {
				let errorMessge = {
					zeeErrorCode: error.status,
									errorMsg: error.json().code
				};
				dispatch(this.onError(error.json()));
			});
		};
	}

	_getTCEPPhaseForReleaseAndProject(data){
		return {type : types.GET_TCEP_PHASE_FOR_RELEASE_PROJECT, data};
	}
	updateGridPageSize(size, currentPage) {
         return { type: types.UPDATE_ZAUTO_GRID, size, currentPage };
     }

	onError(data) {
				return {
						type: types.SHOW_TOAST,
						data: ({type: messageTypes.ERROR, data})
				};
		}

};
