import {Injectable, Inject} from '@angular/core';
import {Http} from '@angular/http';

import * as types from '../utils/constants/action.types';
import {ZQLService} from '../services/zql.service';
import * as messageTypes from '../utils/constants/messages.types';

@Injectable()
export class ZQLAction {
    private _zqlService;
    constructor(@Inject(Http) private _http: any) {
        this._zqlService = new ZQLService(_http);
    }
    /**
     * Fetch zql metadata
     */
    fetchZQLMetadata() {
        return (dispatch) => {
            return this._zqlService.getZQLMetadata().subscribe((metadata) => {
                dispatch(this._onFetchZQLMetadata(metadata));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _onFetchZQLMetadata(data) {
        return { type: types.FETCH_ZQL_METADATA, data };
    }
    /**
     * Fetch zql values
     */
    fetchZQLValues(key, queryParams) {
        return (dispatch) => {
            return this._zqlService.getZQLValues(key, queryParams).subscribe((values) => {
                dispatch(this._onFetchZQLValues(values));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _onFetchZQLValues(data) {
        return { type: types.FETCH_ZQL_VALUES, data };
    }
    createPreviousFilter(dataParams) {

        switch(dataParams.key) {
            case 'ZEPHYR_TESTCASE_FILTERS':
                return (dispatch) => {
                    var response = this._zqlService.createPreviousFilter(dataParams);
                    dispatch(this._onFetchTestcasePreviousFilters(response));
                };
            case 'ZEPHYR_REQUIREMENT_FILTERS':
                return (dispatch) => {
                    var response = this._zqlService.createPreviousFilter(dataParams);
                    dispatch(this._onFetchRequirementPreviousFilters(response));
                };
            case 'ZEPHYR_TEST_SCHEDULE_FILTERS':
                return (dispatch) => {
                    var response = this._zqlService.createPreviousFilter(dataParams);
                    dispatch(this._onFetchExecutionPreviousFilters(response));
                };
            default:
                return;
        }

    }
    fetchPreviousFilters(params) {
        return (dispatch) => {
            var response = this._zqlService.getPreviousFilters(params);
            if(params.key === 'ZEPHYR_TESTCASE_FILTERS') {
                dispatch(this._onFetchTestcasePreviousFilters(response));
            } else if(params.key === 'ZEPHYR_REQUIREMENT_FILTERS') {
                dispatch(this._onFetchRequirementPreviousFilters(response));
            } else if(params.key === 'ZEPHYR_TEST_SCHEDULE_FILTERS') {
                dispatch(this._onFetchExecutionPreviousFilters(response));
            }
        };
    }
    _onFetchTestcasePreviousFilters(data) {
        return { type: types.FETCH_PREVIOUS_TESTCASE_FILTERS, data };
    }
    _onFetchRequirementPreviousFilters(data) {
        return { type: types.FETCH_PREVIOUS_REQUIREMENT_FILTERS, data };
    }
    _onFetchExecutionPreviousFilters(data) {
        return { type: types.FETCH_PREVIOUS_EXECUTION_FILTERS, data };
    }
    /**
     * Clear zql event
     */
    clearZQLEvent(event: string) {
        return { type: types.CLEAR_ZQL_EVENTS, data: event};
    }
    /**
     * On error action
     */
    onError(data) {
        return {
            type: types.SHOW_TOAST,
            data: ({type: messageTypes.ERROR, data})
        };
    }
}
