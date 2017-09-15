import {FETCH_ZQL_METADATA, FETCH_ZQL_VALUES, CLEAR_ZQL_EVENTS,
        FETCH_PREVIOUS_TESTCASE_FILTERS, FETCH_PREVIOUS_REQUIREMENT_FILTERS, FETCH_PREVIOUS_EXECUTION_FILTERS} from '../utils/constants/action.types';
import {FETCH_ZQL_VALUES_SUCCESS, FETCH_ZQL_METADATA_SUCCESS,
        FETCH_PREVIOUS_FILTERS_SUCCESS} from '../utils/constants/action.events';

const initialState = {
    metadata: {
        'testcase': {},
        'requirement': {},
        'testSchedule': {}
    },
    values: [],
    previousFilters: [],
    previousFiltersRequirement: [],
    event: ''
};

export function zqlReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ZQL_METADATA:
            state['event'] = FETCH_ZQL_METADATA_SUCCESS;
            state['metadata'] = action.data;
            return state;
        case FETCH_ZQL_VALUES:
            state['event'] = FETCH_ZQL_VALUES_SUCCESS;
            state['values'] = action.data;
            return state;
        case FETCH_PREVIOUS_TESTCASE_FILTERS:
            state['event'] = FETCH_PREVIOUS_FILTERS_SUCCESS;
            state['previousFilters'] = action.data;
            return state;
        case FETCH_PREVIOUS_REQUIREMENT_FILTERS:
            state['event'] = FETCH_PREVIOUS_FILTERS_SUCCESS;
            state['previousFiltersRequirement'] = action.data;
            return state;
        case FETCH_PREVIOUS_EXECUTION_FILTERS:
            state['event'] = FETCH_PREVIOUS_FILTERS_SUCCESS;
            state['previousFilters'] = action.data;
            return state;
        case CLEAR_ZQL_EVENTS:
            state['event'] = '';
            return state;
        default:
            return state;
    }
}
