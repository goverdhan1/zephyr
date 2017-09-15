import * as types from '../utils/constants/action.types';
import {GridUtil} from '../view/components/grid/grid_util';

import {TESTCASE_STEP_UPDATE, FETCH_TESTCASE_PATH_SUCCESS , UPDATE_SINGLE_TEST_STEP_RESULT_FOR_ATTACHMENTS,
ALL_TESTSTEPS_HAVE_SAME_STATUS} from '../utils/constants/action.events';
import  { TESTSTEP_GRID_COLUMNS } from '../view/components/testcase/testcase.constant';

declare var _: any;
declare var moment: any;

const initialState = {
    attachments: [],
    histories: [],
    testcase: {
        testcase: {}
    },
    teststep: {
        steps: []
    },
    testStepGrid: {
        sortedRows: [],
        rows: [],
        columns: TESTSTEP_GRID_COLUMNS,
        currentPage: 1,
        isPaginationRequired: false,
        size: 1000000,
        totalCount: 0,
        isLastPage: true,
        isFirstPage: true,
        offset: 0
    },
    tcPaths: [],
    event: '',
    treeType: '',
    testStepResults : [],
    testStepId : ''
};

export function testcaseReducer(state = _.cloneDeep(initialState), action) {
    let steps;
    switch (action.type) {
        case types.FETCH_TESTCASE_DETAILS_BY_ID:
        case types.FETCH_TESTCASE_FROM_LOCAL:
            state['testcase'] = action.data;

            if(state['testcase']['testcase'] && state['testcase']['testcase']['customProcessedProperties']) {
                Object.keys(state['testcase']['testcase']['customProcessedProperties']).forEach(key => {
                  state['testcase']['testcase']['customProperties'][key] =
                    moment(state['testcase']['testcase']['customProcessedProperties'][key],'MM/DD/YYYY').startOf('day').unix() * 1000;
                });
            }
            return state;
        case types.FETCH_TC_PATH_BY_TCTID:
            state['tcPaths'] = action.data;
            state['event'] = FETCH_TESTCASE_PATH_SUCCESS;
            return state;

        case types.RESET_ATTACHMENT_COUNT:
            state.testStepGrid.rows.forEach(row => {
              row.stepResults.attachmentCount = 0;
              row.stepResults.comment = "";
            });

            return state;
        case types.GET_TEST_STEP_RESULT:
             let results = action.data;
             steps = state.testStepGrid.sortedRows;
             steps.forEach(step => {
                 let match = results.filter(result => result.testStepId === step.localId);
                 if(match && match.length) {
                     step.id = match[0].id;
                     step.stepResults = {
                         'attachmentCount' : match[0].attachmentCount,
                         'status' : match[0].status,
                         'comment' : match[0].comment
                     };

                 } else {
                    step.id = null;
                    step.stepResults = {
                         'attachmentCount' : step.stepResults.attachmentCount,
                         'status' : '10',
                         'comment' : step.stepResults.comment
                     };
                 }
             });
             state.testStepGrid.sortedRows = steps;
             state.testStepGrid.rows = steps ? GridUtil.fetchGridRecords(steps, state.testStepGrid, true) : [];
             state['teststep']['steps'] = steps;
             return state;
        case types.FETCH_TC_TEST_STEPS_BY_TCTID:
            state['teststep'] = action.data[0];
            results = action.data[1];
            state['testStepResults'] = results;

            steps = _.sortBy(action.data[0].steps, 'orderId');
            if(steps && steps.length) {
                action.data[0].steps.forEach(step => {
                    step['editable'] = true;
                    //INFO: initially hard coding value of status
                    step.stepResults = {};
                    step.stepResults['status'] = '10';
                });
                //steps = _.sortBy(steps,'orderId');
                //debugger;
            }
            if(results && results.length) {
                steps.forEach(step => {
                    let match = results.filter(result => result.testStepId === step.localId);
                    if(match && match.length) {
                        step.id = match[0].id;
                        step.stepResults = {
                            'attachmentCount' : match[0].attachmentCount,
                            'status' : match[0].status,
                            'comment' : match[0].comment
                        };
                    } else {
                        step.id = null;
                    }
                });
            } else if (action.isTCE) {
                steps.forEach(step => {
                    step.id = null;
                });
            }
            state.testStepGrid.sortedRows = steps;
            state.testStepGrid.offset = 0;
            state.testStepGrid.totalCount = steps ? steps.length: 0;
            state.testStepGrid.rows = steps ? GridUtil.fetchGridRecords(steps, state.testStepGrid, true) : [];
            state['teststep']['steps'] = steps;
            return state;
        case types.FETCH_TC_ATTACHMENTS_BY_TCID:
            state['attachments'] = action.data;
            return state;
        case types.FETCH_TC_HISTORY_BY_TCID:
            state['histories'] = action.data;
            return state;
        case types.UPDATE_TESTCASE_DETAILS_BY_ID:
            if (state['testcase']['id'] === action.data.id) {
                Object.assign(state['testcase'], action.data);

                if(state['testcase']['testcase'] && state['testcase']['testcase']['customProcessedProperties']) {
                    Object.keys(state['testcase']['testcase']['customProcessedProperties']).forEach(key => {
                      state['testcase']['testcase']['customProperties'][key] =
                        moment(state['testcase']['testcase']['customProcessedProperties'][key],'MM/DD/YYYY').startOf('day').unix() * 1000;
                    });
                }
            }
            return state;
        case types.CREATE_TESTSTEP:
            state['teststep'] = action.data;
            state['event'] = TESTCASE_STEP_UPDATE;
            return state;
        case types.UPDATE_TESTSTEP_DETAILS_BY_ID:
            state['teststep'] = action.data;
            state['event'] = TESTCASE_STEP_UPDATE;
            if(action.data && action.data.steps) {
                state['teststep']['steps'] = _.sortBy(action.data.steps, 'orderId');
            }
            return state;
        case types.CLEAR_UPDATE_TESTCASE_TESTSTEP:
            state['event'] = '';
            return state;
        case types.CLEAR_DELETE_TESTCASE:
            state['event'] = '';
            return state;
        case types.CLEAR_UPDATE_TESTCASE:
            state['event'] = '';
            return state;
        case types.CLEAR_FETCH_TESTCASE_PATH:
            state['event'] = '';
            return state;
        case types.CONFIGURE_STEP_GRID_COLUMN:
            GridUtil.configureGridColumn(action.data, state.grid);
            return state;
        case types.CLEAR_TESTCASE_DATA:
            state = _.cloneDeep(initialState);
            return state;
        case types.UPDATE_TESTCASE_TREE_TYPE:
            state.treeType = action.data;
            return state;
        case types.GET_ALL_TAGS:
            state['tags'] = action.data;
            return state;
        // case types.UPDATE_SINGLE_TESTSTEP_BY_ID:
        case types.UPDATE_SINGLE_TEST_STEP_RESULT:
            let isAllTestcasesSameStatus = true;
            let statusPreviousTestStep = state.testStepGrid.sortedRows[0].stepResults.status;
            state.testStepGrid.sortedRows.forEach((step , index) => {
                if(step.localId && action.data[0].testStepId && step.localId === action.data[0].testStepId) {
                    step.stepResults = {
                        'status' : action.data[0].status,
                        'comment' : action.data[0].comment,
                        'attachmentCount' : action.data[0].attachmentCount || 0,
                        'id':action.data[0].id
                    };
                    if (!index) {
                      statusPreviousTestStep = action.data[0].status;
                    }
                    state.testStepGrid.sortedRows[index].id = action.data[0].id;
                    state.testStepGrid.sortedRows[index].stepResults = step.stepResults;
                }
                isAllTestcasesSameStatus = isAllTestcasesSameStatus && statusPreviousTestStep == state.testStepGrid.sortedRows[index].stepResults.status;
                statusPreviousTestStep = state.testStepGrid.sortedRows[index].stepResults.status;
            });
            if (isAllTestcasesSameStatus && action.isStatusUpdate) {
              state['event'] = ALL_TESTSTEPS_HAVE_SAME_STATUS;
            } else {
              state['event'] = 'UPDATE_SINGLE_TEST_STEP_RESULT';
            }

            return state;
        case types.UPDATE_SINGLE_TEST_STEP_RESULT_FOR_ATTACHMENTS:
            state.testStepGrid.sortedRows.forEach((step , index) => {
                if(step.localId && action.data[0].testStepId && step.localId === action.data[0].testStepId) {
                    step.stepResults = {
                        'status' : action.data[0].status,
                        'comment' : action.data[0].comment,
                        'attachmentCount' : action.data[0].attachmentCount || 0,
                        'id':action.data[0].id
                    };
                    state.testStepGrid.sortedRows[index].id = action.data[0].id;
                    state.testStepGrid.sortedRows[index].stepResults = step.stepResults;
                }
            });
            state['event'] = UPDATE_SINGLE_TEST_STEP_RESULT_FOR_ATTACHMENTS;
            state['testStepId'] = action.data[0].id;
            return state;
        case types.UPDATE_ATTACHMENT_COUNT:
            //Updating rows
             state.testStepGrid.rows.forEach(rowObject => {
                 if (rowObject.id === action.data.id) {
                     rowObject.stepResults = JSON.parse(JSON.stringify(rowObject.stepResults));
                     rowObject.stepResults.attachmentCount = action.data.count;
                     return;
                 }
             });
             //Updating sorted rows
             state.testStepGrid.sortedRows.forEach(rowObject => {
                 if (rowObject.id === action.data.id) {
                     rowObject.stepResults = JSON.parse(JSON.stringify(rowObject.stepResults));
                     rowObject.stepResults.attachmentCount =  action.data.count;
                     return;
                 }
             });
             return state;
        default:
            return state;
    }
}
