import { GENERATE_REPORT_TEMPLATE, GET_REPORT_TEMPLATE, CLEAR_REPORT_EVENTS } from '../utils/constants/action.types';
import {GENERATE_REPORT_TEMPLATE_SUCCESS, FETCH_REPORT_TEMPLATE_SUCCESS} from '../utils/constants/action.events';

const initialState = {
    report: [],
    metadata: {},
    event: ''
};

declare var window;

export function reportReducer(state = initialState, action) {
    switch (action.type) {
        case GENERATE_REPORT_TEMPLATE:
            state['event'] = GENERATE_REPORT_TEMPLATE_SUCCESS + action.fieldOptionId;
            state['report'] = action.data;
            return state;
        case GET_REPORT_TEMPLATE:
            state['event'] = FETCH_REPORT_TEMPLATE_SUCCESS;
            let currProj = JSON.parse(localStorage.getItem(`${window.tab}-currentProject`)) || {};
            let metadata = action.data;
            if (currProj.id && Array.isArray(metadata.fields)) {
                // filter out custom fields not associated to this project
                metadata.fields = metadata.fields.filter(item => {
                    return !item.hasOwnProperty('fieldConfig') || !(~(item.fieldConfig.columnName || '').indexOf('zcf')) || item.fieldConfig.allProject || item.fieldConfig.projects.some(item => item.id === currProj.id);
                });
            }
            state['metadata'] = metadata;
            return state;
        case CLEAR_REPORT_EVENTS:
            state['event'] = '';
            return state;
        default:
            return state;
    }
}
