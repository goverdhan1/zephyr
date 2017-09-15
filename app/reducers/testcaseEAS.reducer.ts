import * as types from '../utils/constants/action.types';
import { PHASE_GRID_COLUMNS,PHASE_GRID_PAGINATION , ADD_OTHER_CYCLE_GRID_TYPE, FREEFORM_GRID_COLUMNS} from '../view/components/testcase-eas/phase/phase_grid.constant';
import {GridUtil} from '../view/components/grid/grid_util';
import {
  ASSIGN_TESTCASES_BY_SEARCH_SUCCESS, UPDATE_TREE_TESTCASE_EAS_EVENT,
  TESTCASE_EXECUTIONS_UPDATED, FETCH_PHASE_TREE_BY_ID, SYNC_SUCCEESS, FETCH_COUNT_TESTCASES,
  UPDATE_ROOT_NODE_ASSIGNED_COUNT, ADD_NEW_CYCLE, FETCH_ALL_EAS_TREE_COUNTS_COMPLETE, GET_TOTAL_ASSIGNED_COUNT,
  DELETE_TREE_TESTCASE_EAS_EVENT
} from '../utils/constants/action.events';

import { FETCH_INITIAL_GRID_STATE, CLEAR_GRID_EVENTS, UPDATE_GRID_STATE,
  SORT_ADD_OTHER_CYCLE_GRID_TYPE_GRID, CLEAR_GRID_DATA_BY_TYPE } from '../utils/constants/action.types';

declare var _: any;
declare var moment: any;
export const GRID_ROW_COUNT_DEFAULT = 50;

const initialState = {
    'cycles' : [],
    'treeData': {},
    'phaseGrid': {
        sortedRows: [],
        rows: [],
        columns: PHASE_GRID_COLUMNS,
        currentPage: 1,
        paginationOptions: _.cloneDeep(PHASE_GRID_PAGINATION),
        size: GRID_ROW_COUNT_DEFAULT,
        totalCount: 0,
        offset: 0,
        noData: false,
        event: ''
    },
    'freeFormBrowse': {
        sortedRows: [],
        rows: [],
        columns: FREEFORM_GRID_COLUMNS,
        pageList: [],
        currentPage: 1,
        currentIndex: 1,
        paginationOptions: _.cloneDeep(PHASE_GRID_PAGINATION),
        size: GRID_ROW_COUNT_DEFAULT,
        totalCount: 0,
        offset: 0,
        noData: false,
        event: ''
    },
    'cumulativeCount': {},
    'discreteCount': {},
    'createNewNode' : {},
    'phaseMap' : {},
    'hereTotalTestcasesCount':'',
    'hereAssignedTestcasesCount':'',
    'executedTestcases' : null,
    'executedTestcasesMap' : {},
    'testcaseMap' : {},
    'event': '',
    'assignedFreeFormTestcases': ''
};


export function testcaseEASReducer(state = initialState, action) {
    let tempCycles, tempPhases, i, j;
    switch (action.type) {
        case types.GET_RELEASE_CYCLES:
            tempCycles = action.data;
            if(tempCycles.length) {
                tempCycles.forEach(cycle => {
                    if(cycle.cycleStartDate) {
                        cycle.startDate = moment(cycle.cycleStartDate,'MM/DD/YYYY').startOf('day').unix() * 1000;
                    }
                    if(cycle.cycleEndDate) {
                        cycle.endDate = moment(cycle.cycleEndDate,'MM/DD/YYYY').startOf('day').unix() * 1000;
                    }
                    tempPhases = cycle.cyclePhases;
                    if(tempPhases && tempPhases.length) {
                        tempPhases.forEach(phase => {
                            if(phase.phaseStartDate) {
                              phase.startDate = moment(phase.phaseStartDate,'MM/DD/YYYY').startOf('day').unix() * 1000;
                            }
                            if(phase.phaseEndDate) {
                              phase.endDate = moment(phase.phaseEndDate,'MM/DD/YYYY').startOf('day').unix() * 1000;
                            }
                        });

                        // sort by startDate. if same, sort by name
                        cycle.cyclePhases.sort((a, b) => (a.startDate - b.startDate) || (a.name || '').localeCompare(b.name || '') || 1);
                    }
                });
            }

            // sort by startDate. if same, sort by name
            state.cycles = tempCycles.sort((a, b) => (a.startDate - b.startDate) || (a.name || '').localeCompare(b.name || '') || 1);
            state.treeData = {
                redrawTree: true,
                tree: getTreeNodes(state.cycles, null , true)
            };
            if(action.releaseId) {
                state.event = types.GET_RELEASE_CYCLES_SUCCESS + action.releaseId;
            }
            return state;
        case types.ROUTE_TO_PHASE:
            state['isRoute'] = action.data;
            return state;

        case 'CLEAR_PHASE_ROUTE':
            state['isRoute'] = null;
            return state;

        case types.GET_CUMULATIVE_COUNT_TESTCASE:
            state.cumulativeCount = action.data;
            state.event = types.GET_CUMULATIVE_COUNT_TESTCASE_SUCCESS;
            return state;

        case types.GET_DISCRETE_COUNT_TESTCASE:
          state.discreteCount = action.data;
          state.event = types.GET_DISCRETE_COUNT_TESTCASE_SUCCESS;
          return state;

        case SORT_ADD_OTHER_CYCLE_GRID_TYPE_GRID:
            state['freeFormBrowse'] = GridUtil.manageSort(action.data, state['freeFormBrowse']);
            return state;

        case types.GET_CYCLE_PHASES:
            tempPhases = action.data;
            if(tempPhases.length) {
                tempPhases.forEach(phase => {
                    if(phase.phaseStartDate) {
                        phase.startDate = moment(phase.phaseStartDate,'MM/DD/YYYY').startOf('day').unix() * 1000;
                    }
                    if(phase.phaseEndDate) {
                        phase.endDate = moment(phase.phaseEndDate,'MM/DD/YYYY').startOf('day').unix() * 1000;
                    }
                });

                // sort by startDate. if same, sort by name
                tempPhases.sort((a, b) => (a.startDate - b.startDate) || (a.name || '').localeCompare(b.name || '') || 1);
            }
            state['cyclePhases'] = tempPhases;
            return state;

        case types.GET_CYCLE_AND_PHASES:
            tempCycles = action.cycles;
            if(tempCycles.length) {
                tempCycles.forEach(cycle => {
                    if(cycle.cycleStartDate) {
                        cycle.startDate = moment(cycle.cycleStartDate,'MM/DD/YYYY').startOf('day').unix() * 1000;
                    }
                    if(cycle.cycleEndDate) {
                        cycle.endDate = moment(cycle.cycleEndDate,'MM/DD/YYYY').startOf('day').unix() * 1000;
                    }
                    tempPhases = cycle.cyclePhases;
                    if(tempPhases && tempPhases.length) {
                        tempPhases.forEach(phase => {
                            if(phase.phaseStartDate) {
                              phase.startDate = moment(phase.phaseStartDate,'MM/DD/YYYY').startOf('day').unix() * 1000;
                            }
                            if(phase.phaseEndDate) {
                              phase.endDate = moment(phase.phaseEndDate,'MM/DD/YYYY').startOf('day').unix() * 1000;
                            }
                        });

                        // sort by startDate. if same, sort by name
                        cycle.cyclePhases.sort((a, b) => (a.startDate - b.startDate) || (a.name || '').localeCompare(b.name || '') || 1);
                    }
                });
            }

            // sort by startDate. if same, sort by name
            state.cycles = tempCycles.sort((a, b) => (a.startDate - b.startDate) || (a.name || '').localeCompare(b.name || '') || 1);
            state.treeData = {
                redrawTree: true,
                tree: getTreeNodes(state.cycles, null , true)
            };
            if(action.releaseId) {
                state.event = types.GET_RELEASE_CYCLES_SUCCESS + action.releaseId;
            }

            tempPhases = action.phases;
            if(tempPhases.length) {
                tempPhases.forEach(phase => {
                    if(phase.phaseStartDate) {
                        phase.startDate = moment(phase.phaseStartDate,'MM/DD/YYYY').startOf('day').unix() * 1000;
                    }
                    if(phase.phaseEndDate) {
                        phase.endDate = moment(phase.phaseEndDate,'MM/DD/YYYY').startOf('day').unix() * 1000;
                    }
                });
                // sort by startDate. if same, sort by name
                tempPhases.sort((a, b) => (a.startDate - b.startDate) || (a.name || '').localeCompare(b.name || '') || 1);
            }
            state['cyclePhases'] = tempPhases;

            return state;
        case types.FETCH_TESTCASES_BY_TREE_ID_FREEFORM:
        case types.FETCH_TESTCASES_BY_TREE_ID_PHASE:
            let type = '';
            state.testcaseMap = {};
            let currentPage = action.data.currentPage || 1;
            let offset = action.data.offset || 0;
            let size;
            if (action.type === types.FETCH_TESTCASES_BY_TREE_ID_FREEFORM) {
                type='freeFormBrowse';
                size = action.data.size || state[type].size;
                action.data = action.data.data;
            } else {
                type='phaseGrid';
                size = action.data.size || state[type].size;
            }
            if(action.data.results) {
              action.data.results.forEach((item)=> {
                  Object.keys(item['testcase']['customProcessedProperties']).forEach(key=>{
                    item['testcase']['customProperties'][key] =
                      moment(item['testcase']['customProcessedProperties'][key],'MM/DD/YYYY').startOf('day').unix() * 1000;
                  });
              });
            }
            state[type].sortedRows = action.data.results;
            state[type].offset = offset;
            state[type].currentPage = currentPage;
            state[type].totalCount = action.data.resultSize;
            state[type].size = size;
            //This code maps the testcases returned from /execution API and the testcases from testcase/tree API
            //Updating only state.phaseGrid.rows not state.phaseGrid.sortedrows, since no use of pagination in this table

            //create a tcId -> index map so that fetch need not be run in loop always
            if (action.data.results) {
                for (j = 0 ; j < action.data.results.length; j++) {
                    action.data.results[j]['editable'] = true;
                    state.testcaseMap[action.data.results[j].id] = j;
                }
            }

            if (state.executedTestcases) {
                for (i = 0; i < state.executedTestcases.results.length; i++) {
                    var testcaseId = state.executedTestcases.results[i].tcrTreeTestcase.id;
                    let tcIndex = state.testcaseMap[testcaseId];
                    if(!isNaN(tcIndex) && tcIndex < action.data.results.length && action.data.results[tcIndex].id == testcaseId) {
                        action.data.results[tcIndex].testcase = JSON.parse(JSON.stringify(action.data.results[tcIndex].testcase));
                        action.data.results[tcIndex].testcase['status'] = state.executedTestcases.results[i].lastTestResult &&
                            state.executedTestcases.results[i].lastTestResult.executionStatus;
                        action.data.results[tcIndex].testcase['testerId'] = state.executedTestcases.results[i].testerId;
                        action.data.results[tcIndex].testcase['actualTime'] = state.executedTestcases.results[i].actualTime;
                        action.data.results[tcIndex].testcase['comment'] = state.executedTestcases.results[i].comment;
                        action.data.results[tcIndex].testcase['executionId'] = state.executedTestcases.results[i].id;
                        action.data.results[tcIndex].stateFlag = state.executedTestcases.results[i].tcrTreeTestcase.stateFlag;
                    } else {
                        for (j = 0 ; j < action.data.results.length; j++) {
                            var tcId = action.data.results[j].id;
                            if (testcaseId === tcId) {
                                action.data.results[j].testcase = JSON.parse(JSON.stringify(action.data.results[j].testcase));
                                action.data.results[j].testcase['status'] = state.executedTestcases.results[i].lastTestResult &&
                                  state.executedTestcases.results[i].lastTestResult.executionStatus;
                                action.data.results[j].testcase['testerId'] = state.executedTestcases.results[i].testerId;
                                action.data.results[j].testcase['actualTime'] = state.executedTestcases.results[i].actualTime;
                                action.data.results[j].testcase['comment'] = state.executedTestcases.results[i].comment;
                                action.data.results[j].testcase['executionId'] = state.executedTestcases.results[i].id;
                                action.data.results[j].stateFlag = state.executedTestcases.results[i].tcrTreeTestcase.stateFlag;
                                state.testcaseMap[testcaseId] = j;
                                break;
                            }
                        }
                    }
                }
            }

            //setting editable flag true for inline-edit-component for grid-component.
            if (action.data.results) {
                state[type].rows = GridUtil.fetchGridRecords(action.data.results, state[type], true);
            }
            return state;
        case types.CONFIGURE_PHASE_GRID_COLUMN:
            GridUtil.configureGridColumn(action.data, state.phaseGrid);
            return state;
        case types.SORT_PHASE_GRID:
            state.phaseGrid = GridUtil.manageSort(action.data, state.phaseGrid);
            return state;
        case types.NEXT_PAGE_PHASE_GRID:
            state.phaseGrid.offset = action.data.offset;
            state.phaseGrid.totalCount = action.data.testcases.resultSize;
            //This code maps the testcases returned from /execution API and the testcases from testcase/tree API
            for (i = 0; i < state.executedTestcases.results.length; i++) {
                var testcaseId = state.executedTestcases.results[i].tcrTreeTestcase.id;
                for (j=0 ; j < action.data.testcases.results.length; j++) {
                   var tcId = action.data.testcases.results[j].id;
                   if (testcaseId === tcId) {
                       action.data.testcases.results[j].testcase['status'] = state.executedTestcases.results[i].lastTestResult &&
                                                                  state.executedTestcases.results[i].lastTestResult.executionStatus;
                       action.data.testcases.results[j].testcase['testerId'] = state.executedTestcases.results[i].testerId;
                       action.data.testcases.results[j].testcase['actualTime'] = state.executedTestcases.results[i].actualTime;
                       action.data.testcases.results[j].testcase['comment'] = state.executedTestcases.results[i].comment;
                       action.data.testcases.results[j].testcase['executionId'] = state.executedTestcases.results[i].id;
                       action.data.results[j].stateFlag = state.executedTestcases.results[i].tcrTreeTestcase.stateFlag;
                   }
                }
            }
            GridUtil.manageGridPagination('next', action.data.testcases.results, state.phaseGrid, true);
            return state;
        case types.PREV_PAGE_PHASE_GRID:
            state.phaseGrid.offset = action.data.offset;
            state.phaseGrid.totalCount = action.data.testcases.resultSize;
            //This code maps the testcases returned from /execution API and the testcases from testcase/tree API
            for (i = 0; i < state.executedTestcases.results.length; i++) {
                var testcaseId = state.executedTestcases.results[i].tcrTreeTestcase.id;
                for (j = 0 ; j < action.data.testcases.results.length; j++) {
                   var tcId = action.data.testcases.results[j].id;
                   if (testcaseId === tcId) {
                       action.data.testcases.results[j].testcase['status'] = state.executedTestcases.results[i].lastTestResult &&
                                                                  state.executedTestcases.results[i].lastTestResult.executionStatus;
                       action.data.testcases.results[j].testcase['testerId'] = state.executedTestcases.results[i].testerId;
                       action.data.testcases.results[j].testcase['actualTime'] = state.executedTestcases.results[i].actualTime;
                       action.data.testcases.results[j].testcase['comment'] = state.executedTestcases.results[i].comment;
                       action.data.testcases.results[j].testcase['executionId'] = state.executedTestcases.results[i].id;
                       action.data.results[j].stateFlag = state.executedTestcases.results[i].tcrTreeTestcase.stateFlag;
                   }
                }
            }
            GridUtil.manageGridPagination('prev', action.data.testcases.results, state.phaseGrid, true);
            return state;
        case types.FETCH_PHASE_TREE_BY_ID:
            let id = action.data[0].id;
            let newData = addCountTestcasesData (JSON.parse(JSON.stringify([action.data[0].result])) , action.data[1]);
            state.phaseMap[id] = newData[0];
            state.event = FETCH_PHASE_TREE_BY_ID;
            return state;
        case types.FETCH_TOTAL_TESTCASES_BY_RELEASEID_TCRCATELOGTREEID:
            id = action.data.id;
            if (id) {
                state.phaseMap[id] = state.phaseMap[id] ? state.phaseMap[id] : {};
                state.phaseMap[id]['totalTestcaseCount'] = typeof (action.data.result) === 'object' ? 0  : action.data.result;
            } else {
                state.hereTotalTestcasesCount = typeof (action.data.result) === 'object' ? 0  : action.data.result;
            }
            return state;
        case types.FETCH_ALL_EAS_TREE_COUNTS:
            let results = action.data;
            id = results['result1'].id;
            let data_part = (results['treedata'] && results['treedata'].result) ? results['treedata'].result : state.phaseMap[id];
            newData = addCountTestcasesData(JSON.parse(JSON.stringify([data_part])), results['result1'].result);
            state.phaseMap[id] = newData[0];
            let result2 = results['result2'];
            id = result2.nodeTypeId;
            state.phaseMap[id] = state.phaseMap[id] ? state.phaseMap[id] : {};
            state.phaseMap[id]['assignedTestcaseCount'] = typeof (result2.result) === 'object' ? 0  : result2.result;
            let result3 = results['result3'];
            id = result3.id;
            state.phaseMap[id] = state.phaseMap[id] ? state.phaseMap[id] : {};
            state.phaseMap[id]['totalTestcaseCount'] = typeof (result3.result) === 'object' ? 0  : result3.result;
            let result4 = results['result4'];
            state.hereAssignedTestcasesCount = typeof (result4.result) === 'object' ? 0  : result4.result;
            let result5 = results['result5'];
            state.hereTotalTestcasesCount = typeof (result5.result) === 'object' ? 0  : result5.result;
            state.event = FETCH_ALL_EAS_TREE_COUNTS_COMPLETE;
            return state;
        case types.FETCH_ASSIGNED_TESTCASES_BY_TREENODEID:
            if (action.data.nodeTypeId) {
                id = action.data.nodeTypeId;
                state.phaseMap[id] = state.phaseMap[id] ? state.phaseMap[id] : {};
                state.phaseMap[id]['assignedTestcaseCount'] = typeof (action.data.result) === 'object' ? 0  : action.data.result;
            } else {
                state.hereAssignedTestcasesCount = typeof (action.data.result) === 'object' ? 0  : action.data.result;
            }
            return state;
        case types.FETCH_EXECUTIONS_BY_TREEID:
            state.executedTestcases = action.data;
            state.executedTestcasesMap = {};
            //create a map - rtsid -> rts
            //This code maps the testcases returned from /execution API and the testcases from testcase/tree API
            //Updating only state.phaseGrid.rows not state.phaseGrid.sortedrows, since no use of pagination in this table
            for (i = 0; i < state.executedTestcases.results.length; i++) {
                var testcaseId = state.executedTestcases.results[i].tcrTreeTestcase.id;
                state.executedTestcasesMap[state.executedTestcases.results[i]['id']] = i;
                let tcIndex = state.testcaseMap[testcaseId];
                if(!isNaN(tcIndex) && tcIndex < state.phaseGrid.rows.length && state.phaseGrid.rows[tcIndex].id == testcaseId) {
                    state.phaseGrid.rows[tcIndex].testcase = JSON.parse(JSON.stringify(state.phaseGrid.rows[tcIndex].testcase));
                    state.phaseGrid.rows[tcIndex].testcase['status'] = state.executedTestcases.results[i].lastTestResult &&
                        state.executedTestcases.results[i].lastTestResult.executionStatus;

                    state.phaseGrid.rows[tcIndex].testcase['testerId'] = state.executedTestcases.results[i].testerId;
                    state.phaseGrid.rows[tcIndex].testcase['actualTime'] = state.executedTestcases.results[i].actualTime;
                    state.phaseGrid.rows[tcIndex].testcase['comment'] = state.executedTestcases.results[i].comment;
                    state.phaseGrid.rows[tcIndex].testcase['executionId'] = state.executedTestcases.results[i].id;
                    state.phaseGrid.rows[tcIndex].stateFlag = state.executedTestcases.results[i].tcrTreeTestcase.stateFlag;
                } else {
                    for (j = 0 ; j < state.phaseGrid.rows.length; j++) {
                        var tcId = state.phaseGrid.rows[j].id;
                        if (testcaseId === tcId) {
                            state.phaseGrid.rows[j].testcase = JSON.parse(JSON.stringify(state.phaseGrid.rows[j].testcase));
                            state.phaseGrid.rows[j].testcase['status'] = state.executedTestcases.results[i].lastTestResult &&
                                state.executedTestcases.results[i].lastTestResult.executionStatus;

                            state.phaseGrid.rows[j].testcase['testerId'] = state.executedTestcases.results[i].testerId;
                            state.phaseGrid.rows[j].testcase['actualTime'] = state.executedTestcases.results[i].actualTime;
                            state.phaseGrid.rows[j].testcase['comment'] = state.executedTestcases.results[i].comment;
                            state.phaseGrid.rows[j].testcase['executionId'] = state.executedTestcases.results[i].id;
                            state.phaseGrid.rows[j].stateFlag = state.executedTestcases.results[i].tcrTreeTestcase.stateFlag;
                            state.testcaseMap[testcaseId] = j;
                            break;
                        }
                    }
                }
            }
            return state;
        case types.ASSIGN_TESTCASES_BY_SEARCH:
            state['assignedFreeFormTestcases'] = action.data;
            state['event'] = ASSIGN_TESTCASES_BY_SEARCH_SUCCESS;
            return state;
        case types.CLEAR_EAS_EVENTS:
            state['event'] =  '';
            return state;
        case types.CREATE_UPDATE_EXECUTION:
                 for (i = 0 ; i < action.data.result.length;i++) {
                     //updating of state.executedTestcases.results array.
                     let executionId = action.data.result[i].id;
                     let executionIndex = state.executedTestcasesMap[executionId];
                     if(!isNaN(executionIndex) && executionIndex < state.executedTestcases.results.length &&
                        state.executedTestcases.results[executionIndex]['id'] == executionId) {
                        state.executedTestcases.results[executionIndex] = action.data.result[i];
                     } else {
                         let executionFound = false;
                         state.executedTestcases.results.forEach(function(result, index) {
                             if(result['id'] === executionId) {
                               executionFound = true;
                               state.executedTestcases.results[index] = action.data.result[i];
                               state.executedTestcasesMap[executionId] = index;
                             }
                         });
                         if (!executionFound) {
                           state.executedTestcases.results.push(action.data.result[i]);
                           state.executedTestcasesMap[executionId] = (state.executedTestcases.results.length - 1);
                         }
                         executionFound = false;
                     }
                     //Updating only state.phaseGrid.rows not state.phaseGrid.sortedrows, since no use of pagination in this table
                    var testcaseId = action.data.result[i].tcrTreeTestcase.id;
                     let tcIndex = state.testcaseMap[testcaseId];
                     if(!isNaN(tcIndex) && tcIndex < state.phaseGrid.rows.length && state.phaseGrid.rows[tcIndex].id == testcaseId) {
                         state.phaseGrid.rows[tcIndex].testcase = JSON.parse(JSON.stringify(state.phaseGrid.rows[tcIndex].testcase));
                         state.phaseGrid.rows[tcIndex].testcase['status'] =action.data.result[i].lastTestResult &&
                           action.data.result[i].lastTestResult.executionStatus;
                         state.phaseGrid.rows[tcIndex].testcase['testerId'] = action.data.result[i].testerId;
                         state.phaseGrid.rows[tcIndex].testcase['actualTime'] = action.data.result[i].actualTime;
                         state.phaseGrid.rows[tcIndex].testcase['comment'] = action.data.result[i].comment;
                         state.phaseGrid.rows[tcIndex].testcase['executionId'] = action.data.result[i].id;
                         state.phaseGrid.rows[tcIndex].stateFlag = action.data.result[i].tcrTreeTestcase.stateFlag;
                     } else {
                       for (j = 0 ; j < state.phaseGrid.rows.length; j++) {
                         var tcId = state.phaseGrid.rows[j].id;
                         if (testcaseId === tcId) {
                           state.phaseGrid.rows[j].testcase = JSON.parse(JSON.stringify(state.phaseGrid.rows[j].testcase));
                           state.phaseGrid.rows[j].testcase['status'] =action.data.result[i].lastTestResult &&
                             action.data.result[i].lastTestResult.executionStatus;
                           state.phaseGrid.rows[j].testcase['testerId'] = action.data.result[i].testerId;
                           state.phaseGrid.rows[j].testcase['actualTime'] = action.data.result[i].actualTime;
                           state.phaseGrid.rows[j].testcase['comment'] = action.data.result[i].comment;
                           state.phaseGrid.rows[j].testcase['executionId'] = action.data.result[i].id;
                           state.phaseGrid.rows[j].stateFlag = action.data.result[i].tcrTreeTestcase.stateFlag;
                           state.testcaseMap[testcaseId] = j;
                           break;
                         }
                       }
                     }
                  state['event'] =  TESTCASE_EXECUTIONS_UPDATED;
                }
             return state;
        case types.DELETE_EXECUTION:
             for (i = 0; i < action.data.requestobject.unassignedRtsIds.length; i++) {
               let executionIdDeleted = action.data.requestobject.unassignedRtsIds[i];
               let testcaseId;
               let executionIndex = state.executedTestcasesMap[executionIdDeleted];
               if(!isNaN(executionIndex) && executionIndex < state.executedTestcases.results.length &&
                 state.executedTestcases.results[executionIndex]['id'] == executionIdDeleted) {
                   testcaseId = state.executedTestcases.results[executionIndex].tcrTreeTestcase.id;
                   state.executedTestcases.results.splice(executionIndex, 1);
                   delete state.executedTestcasesMap[executionIdDeleted];
               } else {
                   state.executedTestcases.results.forEach(function(result, index) {
                     if(result['id'] === executionIdDeleted) {
                       state.executedTestcases.results.splice(index, 1);
                       testcaseId = result.tcrTreeTestcase.id;
                     }
                   });
               }
               //Updating only state.phaseGrid.rows not state.phaseGrid.sortedrows, since no use of pagination in this table
               let tcIndex = state.testcaseMap[testcaseId];
               if(!isNaN(tcIndex) && tcIndex < state.phaseGrid.rows.length && state.phaseGrid.rows[tcIndex].id == testcaseId) {
                 state.phaseGrid.rows[tcIndex].testcase = JSON.parse(JSON.stringify(state.phaseGrid.rows[tcIndex].testcase));
                 state.phaseGrid.rows[tcIndex].testcase['status'] = undefined;
                 state.phaseGrid.rows[tcIndex].testcase['testerId'] = undefined;
                 state.phaseGrid.rows[tcIndex].testcase['actualTime'] = undefined;
                 state.phaseGrid.rows[tcIndex].testcase['comment'] = undefined;
                 state.phaseGrid.rows[tcIndex].testcase['executionId'] = undefined;
               } else {
                 for (j = 0 ; j < state.phaseGrid.rows.length; j++) {
                   var tcId = state.phaseGrid.rows[j].id;
                   if (testcaseId === tcId) {
                     state.phaseGrid.rows[j].testcase = JSON.parse(JSON.stringify(state.phaseGrid.rows[j].testcase));
                     state.phaseGrid.rows[j].testcase['status'] = undefined;
                     state.phaseGrid.rows[j].testcase['testerId'] = undefined;
                     state.phaseGrid.rows[j].testcase['actualTime'] = undefined;
                     state.phaseGrid.rows[j].testcase['comment'] = undefined;
                     state.phaseGrid.rows[j].testcase['executionId'] = undefined;
                     break;
                   }
                 }
               }
               state['event'] =  TESTCASE_EXECUTIONS_UPDATED;
             }
             return state;
          case types.UPDATE_TESTCASES_FLAG:
               //Updating only state.phaseGrid.rows not state.phaseGrid.sortedrows, since no use of pagination in this table
               for (i =0;i <action.data.length ; i++) {
                 var testcaseId = action.data[i].id;
                 let tcIndex = state.testcaseMap[testcaseId];
                 if(!isNaN(tcIndex) && tcIndex < state.phaseGrid.rows.length && state.phaseGrid.rows[tcIndex].id == testcaseId) {
                    state.phaseGrid.rows[tcIndex]['stateFlag'] =action.data[i]['stateFlag'];
                 } else {
                   for (j = 0; j < state.phaseGrid.rows.length; j++) {
                     var tcId = state.phaseGrid.rows[j].id;
                     if (testcaseId === tcId) {
                       state.phaseGrid.rows[j]['stateFlag'] =action.data[i]['stateFlag'];
                       state.testcaseMap[testcaseId] = j;
                       break;
                     }
                   }
                 }
               }
               return state;
          case types.DELETE_TESTCASE:
              state['event'] = types.DELETE_TESTCASE_SUCCESS;
              return state;
          case types.BULK_TESTCASES_ASSIGNMENT:
                //Not updating in case of initial assignment (when phase is created and assignemnt to anyone is made)
                if (action.data.isEventToBeUpdated) {
                  //Updating only state.phaseGrid.rows not state.phaseGrid.sortedrows, since no use of pagination in this table

                  //add case
                  for (i = 0 ; i < action.data.Add.length; i++) {
                     state.executedTestcases.results.push(action.data.Add[i]);
                     state.executedTestcasesMap[action.data.Add[i]['id']] = (state.executedTestcases.results.length - 1);
                     var testcaseId = action.data.Add[i].tcrTreeTestcase.id;
                    let tcIndex = state.testcaseMap[testcaseId];
                    if(!isNaN(tcIndex) && tcIndex < state.phaseGrid.rows.length && state.phaseGrid.rows[tcIndex].id == testcaseId) {
                      state.phaseGrid.rows[tcIndex].testcase = JSON.parse(JSON.stringify(state.phaseGrid.rows[tcIndex].testcase));
                      state.phaseGrid.rows[tcIndex].testcase['status'] = action.data.Add[i].lastTestResult &&
                        action.data.Add[i].lastTestResult.executionStatus;
                      state.phaseGrid.rows[tcIndex].testcase['testerId'] = action.data.Add[i].testerId;
                      state.phaseGrid.rows[tcIndex].testcase['actualTime'] = action.data.Add[i].actualTime;
                      state.phaseGrid.rows[tcIndex].testcase['comment'] = action.data.Add[i].comment;
                      state.phaseGrid.rows[tcIndex].testcase['executionId'] = action.data.Add[i].id;
                      state.phaseGrid.rows[tcIndex].stateFlag = action.data.Add[i].tcrTreeTestcase.stateFlag;
                    } else {
                      for (j = 0 ; j < state.phaseGrid.rows.length; j++) {
                        var tcId = state.phaseGrid.rows[j].id;
                        if (testcaseId === tcId) {
                          state.phaseGrid.rows[j].testcase = JSON.parse(JSON.stringify(state.phaseGrid.rows[j].testcase));
                          state.phaseGrid.rows[j].testcase['status'] = action.data.Add[i].lastTestResult &&
                            action.data.Add[i].lastTestResult.executionStatus;
                          state.phaseGrid.rows[j].testcase['testerId'] = action.data.Add[i].testerId;
                          state.phaseGrid.rows[j].testcase['actualTime'] = action.data.Add[i].actualTime;
                          state.phaseGrid.rows[j].testcase['comment'] = action.data.Add[i].comment;
                          state.phaseGrid.rows[j].testcase['executionId'] = action.data.Add[i].id;
                          state.phaseGrid.rows[j].stateFlag = action.data.Add[i].tcrTreeTestcase.stateFlag;
                          state.testcaseMap[testcaseId] = j;
                          break;
                        }
                      }
                    }
                  }

                  //update case
                  for (i=0 ; i < action.data.Update.length; i++) {
                    //updating of state.executedTestcases.results array.
                    let executionId = action.data.Update[i].id;
                    let executionIndex = state.executedTestcasesMap[executionId];
                    if(!isNaN(executionIndex) && executionIndex < state.executedTestcases.results.length &&
                      state.executedTestcases.results[executionIndex]['id'] == executionId) {
                        state.executedTestcases.results[executionIndex] = action.data.Update[i];
                    } else {
                        state.executedTestcases.results.forEach(function(result, index) {
                            if(result['id'] === executionId) {
                                state.executedTestcases.results[index] = action.data.Update[i];
                                state.executedTestcasesMap[executionId] = index;
                            }
                        });
                    }

                    //updating state.phaseGrid.rows
                    var testcaseId = action.data.Update[i].tcrTreeTestcase.id;
                    let tcIndex = state.testcaseMap[testcaseId];
                    if(!isNaN(tcIndex) && tcIndex < state.phaseGrid.rows.length && state.phaseGrid.rows[tcIndex].id == testcaseId) {
                      state.phaseGrid.rows[tcIndex].testcase = JSON.parse(JSON.stringify(state.phaseGrid.rows[tcIndex].testcase));
                      state.phaseGrid.rows[tcIndex].testcase['status'] = action.data.Update[i].lastTestResult &&
                        action.data.Update[i].lastTestResult.executionStatus;
                      state.phaseGrid.rows[tcIndex].testcase['testerId'] = action.data.Update[i].testerId;
                      state.phaseGrid.rows[tcIndex].testcase['actualTime'] = action.data.Update[i].actualTime;
                      state.phaseGrid.rows[tcIndex].testcase['comment'] = action.data.Update[i].comment;
                      state.phaseGrid.rows[tcIndex].testcase['executionId'] = action.data.Update[i].id;
                      state.phaseGrid.rows[tcIndex].stateFlag = action.data.Update[i].tcrTreeTestcase.stateFlag;
                    } else {
                      for (j = 0; j < state.phaseGrid.rows.length; j++) {
                        var tcId = state.phaseGrid.rows[j].id;
                        if (testcaseId === tcId) {
                          state.phaseGrid.rows[j].testcase = JSON.parse(JSON.stringify(state.phaseGrid.rows[j].testcase));
                          state.phaseGrid.rows[j].testcase['status'] = action.data.Update[i].lastTestResult &&
                            action.data.Update[i].lastTestResult.executionStatus;
                          state.phaseGrid.rows[j].testcase['testerId'] = action.data.Update[i].testerId;
                          state.phaseGrid.rows[j].testcase['actualTime'] = action.data.Update[i].actualTime;
                          state.phaseGrid.rows[j].testcase['comment'] = action.data.Update[i].comment;
                          state.phaseGrid.rows[j].testcase['executionId'] = action.data.Update[i].id;
                          state.phaseGrid.rows[j].stateFlag = action.data.Update[i].tcrTreeTestcase.stateFlag;
                          state.testcaseMap[testcaseId] = j;
                          break;
                        }
                      }
                    }
                  }

                  //Delete case
                  for (i = 0; i < action.data.Delete.length; i++) {
                     let executionIdDeleted = action.data.Delete[i].id;
                     let testcaseId;
                      let executionIndex = state.executedTestcasesMap[executionIdDeleted];
                      if(!isNaN(executionIndex) && executionIndex < state.executedTestcases.results.length &&
                        state.executedTestcases.results[executionIndex]['id'] == executionIdDeleted) {
                        testcaseId = state.executedTestcases.results[executionIndex].tcrTreeTestcase.id;
                        state.executedTestcases.results.splice(executionIndex, 1);
                        delete state.executedTestcasesMap[executionIdDeleted];
                      } else {
                        state.executedTestcases.results.forEach(function(result, index) {
                          if(result['id'] === executionIdDeleted) {
                            state.executedTestcases.results.splice(index, 1);
                            testcaseId = result.tcrTreeTestcase.id;
                          }
                        });
                      }
                     //Updating only state.phaseGrid.rows not state.phaseGrid.sortedrows, since no use of pagination in this table
                    let tcIndex = state.testcaseMap[testcaseId];
                    if(!isNaN(tcIndex) && tcIndex < state.phaseGrid.rows.length && state.phaseGrid.rows[tcIndex].id == testcaseId) {
                      state.phaseGrid.rows[tcIndex].testcase = JSON.parse(JSON.stringify(state.phaseGrid.rows[tcIndex].testcase));
                      state.phaseGrid.rows[tcIndex].testcase['status'] = undefined;
                      state.phaseGrid.rows[tcIndex].testcase['testerId'] = undefined;
                      state.phaseGrid.rows[tcIndex].testcase['actualTime'] = undefined;
                      state.phaseGrid.rows[tcIndex].testcase['comment'] = undefined;
                      state.phaseGrid.rows[tcIndex].testcase['executionId'] = undefined;
                    } else {
                      for (j = 0; j < state.phaseGrid.rows.length; j++) {
                        var tcId = state.phaseGrid.rows[j].id;
                        if (testcaseId === tcId) {
                          state.phaseGrid.rows[j].testcase = JSON.parse(JSON.stringify(state.phaseGrid.rows[j].testcase));
                          state.phaseGrid.rows[j].testcase['status'] = undefined;
                          state.phaseGrid.rows[j].testcase['testerId'] = undefined;
                          state.phaseGrid.rows[j].testcase['actualTime'] = undefined;
                          state.phaseGrid.rows[j].testcase['comment'] = undefined;
                          state.phaseGrid.rows[j].testcase['executionId'] = undefined;
                          state.testcaseMap[testcaseId] = j;
                          break;
                        }
                      }
                    }
                   }
                   state['event'] = TESTCASE_EXECUTIONS_UPDATED;
                 } else {
                   state['event'] = UPDATE_ROOT_NODE_ASSIGNED_COUNT;
                 }
               return state;
        case types.UPDATE_ALL_TESTCASES_FLAG_BY_TREEID:
             //Updating only state.phaseGrid.rows not state.phaseGrid.sortedrows, since no use of pagination in this table
             for (i =0;i <action.data.length ; i++) {
               var testcaseId = action.data[i].id;
               let tcIndex = state.testcaseMap[testcaseId];
               if(!isNaN(tcIndex) && tcIndex < state.phaseGrid.rows.length && state.phaseGrid.rows[tcIndex].id == testcaseId) {
                 state.phaseGrid.rows[tcIndex]['stateFlag'] =action.data[i]['stateFlag'];
               } else {
                 for (j = 0; j < state.phaseGrid.rows.length; j++) {
                   var tcId = state.phaseGrid.rows[j].id;
                   if (testcaseId === tcId) {
                     state.phaseGrid.rows[j]['stateFlag'] =action.data[i]['stateFlag'];
                     state.testcaseMap[testcaseId] = j;
                     break;
                   }
                 }
               }
             }
             return state;
        case types.UPDATE_TREE_TESTCASE_EAS_EVENT:
            state.event = UPDATE_TREE_TESTCASE_EAS_EVENT;
            return state;
        case types.DELETE_TREE_TESTCASE_EAS_EVENT:
            state.event = DELETE_TREE_TESTCASE_EAS_EVENT;
            return state;
        case types.DEFAULT_ASSIGNMENT_TO_CREATOR_TESTCASES:
              state['event'] = UPDATE_ROOT_NODE_ASSIGNED_COUNT;
              return state;
        case types.CLEAR_EAS_GRID_DATA:
              state[action.data].sortedRows = [];
              state[action.data].rows = [];
              state[action.data].noData = false;
              state[action.data].paginationOptions = _.cloneDeep(PHASE_GRID_PAGINATION);
              state[action.data].event = '';
              state[action.data].size =  GRID_ROW_COUNT_DEFAULT;
              state[action.data].totalCount = 0;
              state[action.data].offset = 0;
              state[action.data].currentPage = 1;
              return state;
        case types.UPDATE_TREEDATA_WITH_COUNT_TESTACSES:
              id = action.data.id;
              newData = addCountTestcasesData(JSON.parse(JSON.stringify([state.phaseMap[id]])), action.data.result);
              state.phaseMap[id] = newData[0];
              state.event = FETCH_COUNT_TESTCASES;
             return state;
        case types.GET_TOTAL_ASSIGNED_COUNT:
            //upading assigned count
             if (action.data[0].nodeTypeId) {
               id = action.data[0].nodeTypeId;
               state.phaseMap[id] = state.phaseMap[id] ? state.phaseMap[id] : {};
               state.phaseMap[id]['assignedTestcaseCount'] = typeof (action.data[0].result) === 'object' ? 0  : action.data[0].result;
             } else {
               state.hereAssignedTestcasesCount = typeof (action.data[0].result) === 'object' ? 0  : action.data[0].result;
             }

             //upading total count
             id = action.data[1].id;
             if (id) {
                 state.phaseMap[id] = state.phaseMap[id] ? state.phaseMap[id] : {};
                 state.phaseMap[id]['totalTestcaseCount'] = typeof (action.data[1].result) === 'object' ? 0  : action.data[1].result;
             } else {
                 state.hereTotalTestcasesCount = typeof (action.data[1].result) === 'object' ? 0  : action.data[1].result;
             }

            state.event = GET_TOTAL_ASSIGNED_COUNT;
            return state;
        case types.ADD_NEW_CYCLE:
              // adding newly added cycle to the top of array, same 0index is used to auto-click the newly added cycle
              let tempCycle = action.data;
              if(tempCycle.cycleStartDate) {
                tempCycle.startDate = moment(tempCycle.cycleStartDate,'MM/DD/YYYY').startOf('day').unix()*1000;
              }
              if(tempCycle.cycleEndDate) {
                tempCycle.endDate = moment(tempCycle.cycleEndDate,'MM/DD/YYYY').startOf('day').unix()*1000;
              }
              state.cycles.push(tempCycle);

              // sort by startDate. if same, sort by name
              state.cycles.sort((a, b) => (a.startDate - b.startDate) || (a.name || '').localeCompare(b.name || '') || 1);
              state.treeData = {
                  redrawTree: true,
                  tree: getTreeNodes(state.cycles, null , true)
              };
              state.createNewNode = tempCycle;
              state.event = ADD_NEW_CYCLE;
              return state;
        default:
            return state;
    }

}

function getTreeNodes(treeData, selectedTreeId , openedState) {
    return (treeData || []).map(level => {
        let treeData = {
            'a_attr': {
                'data-id': level.id,
                'data-tcrCatalogTreeId': level.tcrCatalogTreeId,
                'data-releaseid': level.releaseId,
                'data-type': level.type,
                'data-desc': level.description,
                'data-name': level.name,
                'title': level.name + (level.build ? (' ' + level.build): "") + (level.environment ? (' ' + level.environment): ""),
                'data-status': level.status,
                'class': 'zee-tcr-anchor',
                'data-node': !selectedTreeId ? 'cycle' : 'phase',
                'data-cycleId': selectedTreeId
            },
            'state' : {
                'opened' : openedState
             },
             'data' : {
                'startDate': level.startDate
             },
            'text': level.name,
            'children': (level.cyclePhases && level.cyclePhases.length && !level.status)
                  ? getTreeNodes(level.cyclePhases, level.id , openedState) : []
        };
        return treeData;
    });
}

function addCountTestcasesData (data_1, data_2) {
    return (data_1 || []).map((level) => {
        let treeData = level;
        treeData.categories = level.categories && level.categories.length ? addCountTestcasesData(level.categories , data_2) : [];
        for (let i =0 ;i <data_2.length ; i++) {
          if (data_2[i].treeId === level.id) {
            level.totalTestcaseCount = data_2[i].testcaseCount;
            break;
          }
        }
        return treeData;
    });
}
