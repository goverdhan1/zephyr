import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {RELEASE_CALENDER_DATA, RELEASE_REPORT_DATA, TESTCASE_TIME_SERIES_DATA} from '../mocks/releases.mock'; // tODO: remove
// Constants

@Injectable()
export class ChartService {
    calenderData;
    reportData;
    testcaseData;
    constructor(public http: any) {
        this.calenderData = RELEASE_CALENDER_DATA;
        this.reportData = RELEASE_REPORT_DATA;
        this.testcaseData = TESTCASE_TIME_SERIES_DATA;
    }
    getCalenderData() {
        return Promise.resolve(this.calenderData);
    }
    getReportData() {
        return Promise.resolve(this.reportData);
    }
    getTestcaseTimeSeries() {
        return Promise.resolve(this.testcaseData);
    }
}
