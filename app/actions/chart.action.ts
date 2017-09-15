import {Injectable, Inject} from '@angular/core';
import * as types from '../utils/constants/action.types';
import {ChartService} from '../services/chart.service';
import {Http} from '@angular/http';

@Injectable()
export class ChartAction {
    _chartService;
    constructor(@Inject(Http) private _http: any) {
        this._chartService = new ChartService(_http);
    }

    fetchReleaseCalenderData(projectId) {

        return (dispatch) => {
            return this._chartService.getCalenderData(projectId).then((releaseCalendarData) => {
                dispatch(this._fetchReleaseCalenderData(releaseCalendarData));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    fetchReleaseReportData(projectId) {
        return (dispatch) => {
            return this._chartService.getReportData(projectId).then((releaseReportData) => {
                dispatch(this._fetchReleaseReportData(releaseReportData));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    fetchTestcaseTimeSeries() {
        return (dispatch) => {
            return this._chartService.getTestcaseTimeSeries().then((data) => {
                dispatch(this._fetchTimeSeriesData(data));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    clearEvent() {
        return { type: types.CLEAR_CHART_EVENTS };
    }
    private _fetchReleaseCalenderData(data) {
        return { type: types.FETCH_RELEASE_CALENDER_DATA, data };
    }
    private _fetchReleaseReportData(data) {
        return { type: types.FETCH_RELEASE_REPORT_DATA, data };
    }
    private _fetchTimeSeriesData(data) {
        return { type: types.FETCH_TESTCASE_TIME_SERIES_DATA, data };
    }
    private onError(data) {//TODO
        // return { type: types.FETCH_PROJECT_SUMMARIES, data };
    }
}
