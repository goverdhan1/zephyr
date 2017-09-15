import { FETCH_RELEASE_CALENDER_DATA, FETCH_RELEASE_REPORT_DATA,
    FETCH_TESTCASE_TIME_SERIES_DATA, CLEAR_CHART_EVENTS} from '../utils/constants/action.types';
import {FETCH_TESTCASE_TIME_SERIES_DATA_SUCCESS} from '../utils/constants/action.events';

const initialState = {};

export function chartReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_RELEASE_CALENDER_DATA:
            return Object.assign({}, {
                        releaseCalenderData: action.data
                    });
        case FETCH_RELEASE_REPORT_DATA:
            return Object.assign({}, {
                        releaseReportData: action.data
                    });
        case FETCH_TESTCASE_TIME_SERIES_DATA:
            return Object.assign({}, {
                        testcaseTimeSeriesData: action.data,
                        event: FETCH_TESTCASE_TIME_SERIES_DATA_SUCCESS
                    });
        case CLEAR_CHART_EVENTS:
            state['event'] = '';
            return state;
        default:
            return state;
    }
}
