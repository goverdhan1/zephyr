import * as types from '../utils/constants/action.types';
import {GridUtil} from '../view/components/grid/grid_util';

import { TCE_GRID_COLUMNS, TCE_GRID_PAGINATION,
  TCE_ZBOT_GRID_COLUMNS, TCE_ZBOT_GRID_PAGINATION, GRID_ROW_COUNT_DEFAULT } from '../view/components/tce/tce_grid.constant';

import {
  ASSIGN_TESTCASES_BY_SEARCH_SUCCESS, FETCH_EXECUTIONS_SUCCESS,
  FETCH_SCHEDULE_PATH_SUCCESS, FETCH_EXECUTIONS_AFTER_DEFECT_LINK_SUCCESS,
  GET_CYCLE_PHASE_NAME_SUCCESS
} from '../utils/constants/action.events';

declare var _: any;
declare var jQuery: any;
declare var window: any;
declare var moment: any;


const initialState = {
    'cycles' : [],
    'treeData': {},
    'phasetreeData': {},
    'tceLastSorted': {},
    'tceGrid': {
        sortedRows: [],
        rows: [],
        columns: TCE_GRID_COLUMNS,
        currentPage: 1,
        paginationOptions: TCE_GRID_PAGINATION,
        size: GRID_ROW_COUNT_DEFAULT,
        totalCount: 0,
        offset: 0,
        noData: false,
        event: ''
    },
    'tceZbotGrid': {
        sortedRows: [],
        rows: [],
        columns: TCE_GRID_COLUMNS,
        currentPage: 1,
        paginationOptions: TCE_ZBOT_GRID_PAGINATION,
        size: GRID_ROW_COUNT_DEFAULT,
        totalCount: 0,
        offset: 0,
        noData: false,
        event: ''
    },
    'executions' : [],
    'phaseMap' : {},
    'hereTotalTestcasesCount':'',
    'hereAssignedTestcasesCount':'',
    'executedTestcases' : null,
    'event': '',
    'schPaths' : {},
    'assignedFreeFormTestcases': '',
    'agents': [],
    'batch': {},
    'cyclePhaseNames': [],
    'relatedTc': {}
};


export function tceReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_EXECUTION_CYCLES:
        state['cycles'] = action.data;
        let treeObj = [{
            'name': getSelectedReleaseFromLocalStorage()['text'],
            'categories': action.data,
            'rootNode': true
        }];

        state.treeData = {
            redrawTree: true,
            tree: getTreeNodes(treeObj, null, null)
        };
        var obj = {};
        action.data.forEach(cycle => {
            var arr = [];
            cycle.cyclePhases.forEach(phase => {
                arr.push(phase.id + '-' + phase.name);
            });
            obj[cycle.id] = arr;
        });
        return state;

    case types.GET_RELATED_TC_DATA:
      state['relatedTc'] = action.data;
      return state;

    case types.GET_EXECUTION_PHASE:
        let phaseData = action.data;
        state.cycles.forEach((cycle) => {
            cycle.cyclePhases.forEach((phase) => {
                if(phase.tcrCatalogTreeId === phaseData.id) {
                    phase.treeNodes = phaseData.treeNodes;
                }
            });
        });
        let treeObj1 = [{
            'name': getSelectedReleaseFromLocalStorage()['text'],
            'categories': state.cycles,
            'rootNode': true
        }];
        state.treeData = {
            redrawTree: false,
            tree: getTreeNodes(treeObj1, null, null)
        };

        return state;

    case types.FETCH_TESTCASES_EXECUTIONS_BY_TCRID:
         let testCasesByTreeId = action.data;
         testCasesByTreeId = mappingTestcasesExecutions(testCasesByTreeId);
         state.executions = testCasesByTreeId.results;
         state = updatingTCEgrid(testCasesByTreeId, state);
         state.tceGrid.rows = GridUtil.fetchGridRecords(testCasesByTreeId.results, state.tceGrid, true);
         state.event = FETCH_EXECUTIONS_SUCCESS;
         return state;

    case types.FETCH_TESTCASES_EXECUTIONS_AFTER_DEFECT_LINK:
         let testsByTreeId = action.data;
         testsByTreeId = mappingTestcasesExecutions (testsByTreeId);
         state.executions = testsByTreeId.results;
         state = updatingTCEgrid(testsByTreeId, state);
         state.tceGrid.rows = GridUtil.fetchGridRecords(testsByTreeId.results, state.tceGrid, true);
         state.event = FETCH_EXECUTIONS_AFTER_DEFECT_LINK_SUCCESS;
         return state;

    case types.UPDATE_EXECUTION_DETAILS_BY_ID:
         state['event'] = types.UPDATE_EXECUTION;
         modifyTestcaseExecutionObject(action.data);
         for(let i = 0; i < state.executions.length; i++) {
            if(state.executions[i].executionId === action.data.executionId) {
                Object.assign(state['executions'][i], action.data);
            }
         }
         return state;

    case types.UPDATE_TESTCASE_STATUS:
        state['event'] = types.UPDATE_EXECUTION;
        modifyTestcaseExecutionBulkObject(action.data);
        action.data.forEach(function(data) {
            for(let i = 0; i < state.executions.length; i++) {
                if(state.executions[i].executionId === data.executionId) {
                  let requirementNames = state['executions'][i].tcrTreeTestcase.testcase.requirementNames;
                  Object.assign(state['executions'][i], data);
                  state['executions'][i].tcrTreeTestcase.testcase.requirementNames = requirementNames;
                }
            }
        });
        return state;

    case types.SET_TCE_ZBOT_GRID:
      state.tceZbotGrid.sortedRows = action.data;
      state.tceZbotGrid.rows = GridUtil.fetchGridRecords(action.data, state.tceZbotGrid, false);

      return state;

    case types.SORT_TCE_ZBOT_GRID:
      state.tceZbotGrid = GridUtil.manageSort(action.data, state.tceZbotGrid, true);
      state.event = 'SORT_TCE_ZBOT_GRID';
      return state;

    case types.SORT_TCE_GRID:
    case types.SORT_TCE_SEARCH_GRID:
         state.tceLastSorted = action.data;
         state.tceGrid = GridUtil.manageSort(action.data, state.tceGrid, true);
         state.event = 'SORT_TCE_GRID';

         return state;
    case 'SORT_TCE_GRID_SAVED':
        if(Object.keys(state.tceLastSorted).length > 0) {
          state.tceGrid = GridUtil.manageSort(state.tceLastSorted, state.tceGrid, true);
        }
        return state;
    case types.CONFIGURE_TCE_GRID_COLUMN:
        GridUtil.configureGridColumn(action.data, state.tceGrid);
        return state;
    case types.SET_TCE_GRID_EVENT:
          state.tceGrid.event = action.data;
          return state;
    case types.NEXT_PAGE_TCE_GRID:
         testCasesByTreeId = action.data;
         testCasesByTreeId = mappingTestcasesExecutions(testCasesByTreeId);
         state.executions = testCasesByTreeId.results;
         state = updatingTCEgrid(testCasesByTreeId , state);
         GridUtil.manageGridPagination('next', testCasesByTreeId.results, state.tceGrid, true);
         return state;
    case types.PREV_PAGE_TCE_GRID:
         testCasesByTreeId = action.data;
         testCasesByTreeId = mappingTestcasesExecutions (testCasesByTreeId);
         state.executions = testCasesByTreeId.results;
         state = updatingTCEgrid(testCasesByTreeId , state);
         GridUtil.manageGridPagination('prev', testCasesByTreeId.results, state.tceGrid, true);
         return state;
    case types.FETCH_TESTCASES_BY_TCRID:
         testCasesByTreeId = action.data;
         state.executions = action.data.results;
         testCasesByTreeId = mappingTestcasesExecutions (testCasesByTreeId);
         state = updatingTCEgrid(testCasesByTreeId , state);
         state.tceGrid.rows = GridUtil.fetchGridRecords(testCasesByTreeId.results, state.tceGrid, true);
         return state;

    case types.UPDATE_STEP_RESULTS_BY_ID:
         //TODO update action.data here for the changes
         return state;
    case types.CLEAR_TCE_GRID:
         state['tceGrid'].sortedRows = [];
         state['tceGrid'].rows = [];
         state['tceGrid'].noData = false;
         state['tceGrid'].event = '';
         state['tceGrid']['paginationOptions']['show'] = false;
         return state;

    case types.CLEAR_TCE_EVENT:
         state['event'] = '';
         return state;

    case types.CLEAR_EXECUTION:
      state['event'] = '';
      return state;

    case types.FETCH_SCH_PATH_BY_ID:
      state['schPaths'] = action.data;
      state['event'] = FETCH_SCHEDULE_PATH_SUCCESS;
      return state;

    case types.FETCH_AGENTS:
      state.agents = action.data;
      return state;

    case types.DELETE_AGENTS:
      state.agents = [];
      return state;

    case types.UPDATE_AGENTS:
      state.agents = action.data;
      return state;

    case types.GET_BATCH:
      state.batch = action.data;
      state.event = 'UPDATED_BATCH';
      return state;

    case types.CLEAR_GRID_SELECTION:
      state.event = 'CLEAR_GRID_SELECTION';
      return state;

    case types.FETCH_EXECUTIONS_ON_SEARCH:
      testCasesByTreeId = action.data;
      testCasesByTreeId = mappingTestcasesExecutions (testCasesByTreeId);
      state.cyclePhaseNames = action.results;
      state.executions = testCasesByTreeId.results;
      state = updatingTCEgrid(testCasesByTreeId, state);

      if(action.results.length) {
        testCasesByTreeId.results.forEach((row) => {
          state.cyclePhaseNames.forEach((cycle) => {
            cycle.cyclePhases.forEach((phase) => {
              if(phase.id === row.cyclePhaseId) {
                row.testcase.cycle = cycle.name;
                row.testcase.phase = phase.name;
                row.testcase.release = cycle.releaseName;
                row.testcase.project = cycle.projectName;
              }
            });
          });
        });
      }

      state.tceGrid.rows = GridUtil.fetchGridRecords(testCasesByTreeId.results, state.tceGrid, true);
      state.event = FETCH_EXECUTIONS_SUCCESS;
      return state;

    case types.UPDATE_TCE_GRID_PAGINATION:
        state.tceGrid.size = action.size;
        state.tceGrid.currentPage = action.currentPage;
        state.tceGrid.offset = action.offset;
        return state;
    default:
        return state;
  }

}

function modifyTestcaseExecutionObject(testcase) {
    testcase.executionId = testcase.id;
    testcase.id = (testcase.tcrTreeTestcase) ? testcase.tcrTreeTestcase.id : testcase.id;
    testcase.testcase = (testcase.tcrTreeTestcase) ? testcase.tcrTreeTestcase.testcase : {};
    testcase.testcase['status'] = (testcase.lastTestResult) ? testcase.lastTestResult.executionStatus : undefined;
    testcase.testcase['executionDate'] = (testcase.lastTestResult) ? testcase.lastTestResult.executionDate : undefined;
    testcase.testcase['execDate'] = (testcase.lastTestResult) ? testcase.lastTestResult.execDate : undefined;
    testcase.testcase['testerId']= testcase.testerId;
    testcase.testcase['actualTime']= testcase.actualTime;
    testcase.testcase['comment']= testcase.comment;
    testcase.testcase['attachmentCount']= testcase.attachmentCount;
    testcase.testcase['defects']= { defects : testcase.defects , status : testcase.testcase['status']};
    //testcase.testcase['defects']= [1,2,3,4,5];
    if(testcase.testcase && testcase.testcase['customProcessedProperties']) {
      let keyList = Object.keys(testcase.testcase['customProcessedProperties']);
      if(keyList && keyList.length) {
        keyList.forEach(key => {
          testcase.testcase['customProperties'][key] =
            moment(testcase.testcase['customProcessedProperties'][key],'MM/DD/YYYY').startOf('day').unix() * 1000;
        });
      }
    }
    testcase['editable']= true;
}

function modifyTestcaseExecutionBulkObject(testcases) {
    testcases.forEach(testcase => {
        modifyTestcaseExecutionObject(testcase);
    });
}

function mappingTestcasesExecutions(testCasesByTreeId) {
  testCasesByTreeId.results.forEach(testcase => {
    modifyTestcaseExecutionObject(testcase);
  });
  return testCasesByTreeId;
}

function updatingTCEgrid(testCasesByTreeId, state) {
  state.tceGrid.sortedRows = testCasesByTreeId.results;
  state.tceGrid.offset = testCasesByTreeId.firstResult;
  state.tceGrid.totalCount = testCasesByTreeId.resultSize;
  state.tceGrid.currentPage = testCasesByTreeId.firstResult/testCasesByTreeId.pageNumber + 1;
  state.tceGrid.size = testCasesByTreeId.pageNumber;
  return state;
}

function getSelectedReleaseFromLocalStorage () {
    let selectedRelease = localStorage.getItem(`${window.tab}-currentRelease`) && JSON.parse(localStorage.getItem(`${window.tab}-currentRelease`));
    return selectedRelease || {};
}

function getTreeNodes(treeData, selectedTreeId, cyclePhaseId) {
  return treeData.map(level => {
    let dataNode, children;

    if(level.rootNode) {
        dataNode  = 'release';
    } else if(level.cyclePhases) {
        dataNode  = 'cycle';
    } else if(level.cycleId) {
        dataNode = 'phase';
        level['innerNodes'] = -1;
    } else if(level.type) {
        dataNode = level.type;
    }

    children = null;
    cyclePhaseId = cyclePhaseId || (selectedTreeId ? level.id : '');

    if(level.cyclePhases && level.cyclePhases.length) {
        children = level.cyclePhases;
    } else if(level.treeNodes) {
        if(level.treeNodes.length) {
          children = level.treeNodes.filter((result) => {
            return result.visible == true;
          });
          if(Object.keys(level).indexOf('innerNodes')) {
            level['innerNodes'] = children.length ? 1 : 0;
          }
        } else {
          if(Object.keys(level).indexOf('innerNodes')) {
            level['innerNodes'] = 0;
          }
        }
    } else if(level.categories && level.categories.length) {
        children = level.categories;
    }

    return {
      'a_attr': {
        'data-id': level.id,
        'data-tcrCatalogTreeId': level.tcrCatalogTreeId || level.linkedTCRCatalogTreeId,
        'data-releaseid': level.releaseId,
        'data-type': level.type || dataNode,
        'data-desc': level.description,
        'data-name': level.name,
        'class': 'zee-tcr-anchor',
        'data-node': dataNode,
        'data-cycleid': selectedTreeId,
        'data-cyclephaseid': cyclePhaseId
      },
      'li_attr': {
        'class': (dataNode === 'phase' && level['innerNodes'] === 0) ? 'no-children' : ''
      },
      'text': level.name,
      'children': children ? getTreeNodes(children, level.id, cyclePhaseId) : []
    };

  });
}
