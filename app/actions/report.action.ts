import {Injectable, Inject} from '@angular/core';
import * as types from '../utils/constants/action.types';
import {ReportService} from '../services/report.service';
import {Http} from '@angular/http';
import * as messageTypes from '../utils/constants/messages.types';

@Injectable()
export class ReportAction {
    private _reportService;
    constructor(@Inject(Http) private _http: any) {
        this._reportService = new ReportService(_http);
    }
    generateReportTemplate(report, componentId) {
        return dispatch => {
            return this._reportService.generateReportTemplate(report).subscribe(response => {
                dispatch(this._syncJob(response, componentId));
            }, error => {
                dispatch(this.onError(error));
            });
        };
    }
    _syncJob (data, componentId) {
        return { type: types.JOB_PROGRESS_STATUS_STARTS, data, componentId };
    }
    _onGenerateReportTemplate(data, fieldOptionId) {
        return { type: types.GENERATE_REPORT_TEMPLATE, data, fieldOptionId };
    }
    getReportTemplate(type) {
        return dispatch => {
            return this._reportService.getReportTemplate(type).subscribe(response => {
                dispatch(this._onGetReportTemplate(response));
            }, error => {
                dispatch(this.onError(error));
            });
        };
    }
    _onGetReportTemplate(data) {
        return {type: types.GET_REPORT_TEMPLATE, data};
    }
    /**
     * Clear report event
     */
    clearReportEvent() {
        return {type: types.CLEAR_REPORT_EVENTS};
    }
    onError(data) {
        return {
            type: types.SHOW_TOAST,
            data: ({type: messageTypes.ERROR, data})
        };
    }
}
