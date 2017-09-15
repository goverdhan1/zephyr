import {Injectable, Inject} from '@angular/core';
import * as types from '../utils/constants/action.types';
import {GadgetService} from '../services/gadget.service';
import {Http} from '@angular/http';
import * as messageTypes from '../utils/constants/messages.types';
import {ReleaseService} from '../services/release.service';
import {ProjectService} from '../services/project.service';

@Injectable()
export class GadgetAction {
    _gadgetService;
    _releaseService;
    _projectService;

    constructor(@Inject(Http) private _http: any) {
        this._gadgetService = new GadgetService(_http);
        this._releaseService = new ReleaseService(_http);
        this._projectService = new ProjectService(_http);
    }

    getGadgetData(gadgetId, queryString = "") {
      return (dispatch) => {
        return this._gadgetService.getGadgetData(gadgetId, queryString).subscribe((data) => {
          dispatch(this._getGadgetDataSuccess(data, gadgetId));
        }, (error) => {
          try {
            let errorMsg = {
              zeeErrorCode: error.status,
              errorMsg: error.json().code || JSON.parse(error.json()).message
            };
            dispatch(this._getGadgetDataError(gadgetId));
          } catch(e) {
            dispatch(this._getGadgetDataError(gadgetId));
          }
        });
      };
    }

    _getGadgetDataSuccess(data, gadgetId) {
      return { type: types.GET_GADGET_DATA_EVENT, data, gadgetId };
    }

    _getGadgetDataError(gadgetId) {
      return { type: types.GET_GADGET_DATA_EVENT_FAIL, gadgetId };
    }


    getDrillDownData(query, isOnLoad, gadgetId) {
        return (dispatch) => {
            return this._gadgetService.getDrillDownData(query).subscribe((data) => {
                dispatch(this._getDrillDownData(data, isOnLoad, gadgetId));
            }, (error) => {
                let errorMsg = {
                    zeeErrorCode: error.status,
                    errorMsg: error.json().code || JSON.parse(error.json()).message
                };
                dispatch(this.onError(errorMsg));
            });
        };
    }
    _getDrillDownData(data, isOnLoad, gadgetId) {
        return { type: types.GET_DRILL_DOWN_DATA, data, isOnLoad, gadgetId };
    }
    updateChartStack(index, gadgetId) {
        return { type: types.UPDATE_CHART_STACK, data: index, gadgetId };
    }
    popFromChartStack(gadgetId) {
        return { type: types.POP_FROM_CHART_STACK, data: null, gadgetId };
    }
    onError(data) {
        return {
            type: types.SHOW_TOAST,
            data: ({type: messageTypes.ERROR, data})
        };
    }

    clearGadgetEvents(event: string = '', gadgetId: string) {
      return { type: types.CLEAR_GADGET_EVENTS, data: event, gadgetId};
    }

    fetchReleaseSummaries(id, gadgetId) {
      return (dispatch) => {
        return this._releaseService.getReleaseSummaries(id).subscribe(releaseSummaries => {
          dispatch(this._fetchReleaseSummaries(releaseSummaries, gadgetId));
        }, (error) => {
          dispatch(this.onError(error));
        });
      };
    }


    _fetchReleaseSummaries(data, gadgetId) {
      return { type: types.FETCH_GADGET_DATA, data, gadgetId: gadgetId };
    }
    fetchProjectSummaries(projectId, gadgetId) {
      return (dispatch) => {
        return this._projectService.getProjectSummaries(projectId).subscribe((projectSummaries) => {
          dispatch(this._fetchProjectSummaries(projectSummaries, gadgetId));
        }, (error) => {
          dispatch(this.onError(error));
        });
      };
    }
    _fetchProjectSummaries(data, gadgetId) {
      return { type: types.FETCH_GADGET_DATA, data, gadgetId: gadgetId };
    }
}
