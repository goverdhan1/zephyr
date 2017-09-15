import {
  GET_ALL_AUTOMATION_JOBS, GET_TCEP_CYCLE_FOR_RELEASE_PROJECT, GET_TCEP_PHASE_FOR_RELEASE_PROJECT,
  CREATE_AUTOMATION_JOB, DELETE_AUTOMATION_JOB, SCHEDULE_AUTOMATION_JOB
} from '../utils/constants/action.types';
import {GridUtil} from '../view/components/grid/grid_util';
import {DEPARTMENT_APP_IDS} from '../view/components/admin/customizations/customizations.constant';
import * as types from '../utils/constants/action.types';
import {PROJECT_SETUP_GRID_PAGINATION , PROJECT_SETUP_GRID_OPTIONS}
from '../view/components/project_setup/project_setup.constants';

import * as GRID_TYPES from '../utils/constants/action.types';
import {TCEP_GRID_TYPE, TCEP_GRID_OPTIONS, TCEP_GRID_ROW_COUNT_DEFAULT, TCEP_GRID_PAGINATION}
from '../view/components/reports/tcep_grid.constant';
declare var _: any;
declare var jQuery: any;


const tcepGridDetail = {
    'automationGrid' : {
        sortedRows: [],
        allRows: [],
        rows: [],
        selectedRow:[],
        columns: [],
        currentPage: 1,
        paginationOptions: TCEP_GRID_PAGINATION,
        size: 50,
        totalCount: 0,
        offset: 0,
        noData: false,
        event: ''
    },
    'event': '',
    'categories': [] ,
    'automationJobs' : [],
    'scheduleJobs' : []
};


export function tcepReducer(state = tcepGridDetail , action){
	switch (action.type) {
		case types.GET_ALL_AUTOMATION_JOBS :
			state.automationGrid.sortedRows = action.data;
        	state.automationGrid.totalCount = action.data.length;
        	state.event = GET_ALL_AUTOMATION_JOBS;
        	state.automationGrid.rows = GridUtil.fetchGridRecords(action.data, state.automationGrid, false);
        	return state;
        	case types.GET_ALL_AUTOMATION_JOBS_BY_ID :
			    state.automationGrid.selectedRow = action.data;
        	state.event = '';
            return state;
        case types.GET_TCEP_CYCLE_FOR_RELEASE_PROJECT :
        	state.automationGrid.sortedRows = action.data;
        	state.automationGrid.totalCount = action.data.length;
        	state.event = GET_TCEP_CYCLE_FOR_RELEASE_PROJECT;
        	state.automationGrid.rows = GridUtil.fetchGridRecords(action.data, state.automationGrid, false);
        	return state;
        case types.GET_TCEP_PHASE_FOR_RELEASE_PROJECT :
          	state.automationGrid.sortedRows = action.data;
          	state.automationGrid.totalCount = action.data.length;
          	state.event = GET_TCEP_PHASE_FOR_RELEASE_PROJECT;
          	state.automationGrid.rows = GridUtil.fetchGridRecords(action.data, state.automationGrid, false);
          	return state;
        case types.CREATE_AUTOMATION_JOB :
        	let automationObject = action.data;
        	state.automationGrid.rows.push(action.data);
        	state.automationGrid.totalCount = state.automationGrid.sortedRows.length + 1;
        	state.event = CREATE_AUTOMATION_JOB;
        	state.automationGrid.rows = GridUtil.fetchGridRecords(action.data, state.automationGrid, false);
        	return state;
        case types.SCHEDULE_AUTOMATION_JOB :
        	let scheduleObject = action.data;
        	state.scheduleJobs.push(scheduleObject);
        	state.event = SCHEDULE_AUTOMATION_JOB;
        	state.automationGrid.rows = GridUtil.fetchGridRecords(action.data, state.automationGrid, false);
        	return state;
      case types.DELETE_AUTOMATION_JOB:
               let idToBeDeleted = action.data.jobId;
               state.automationGrid.sortedRows.forEach((object , index) => {
                   if (object['id'] == idToBeDeleted) {
                      state.automationGrid.sortedRows.splice(index, 1);
                  }
               });
               state.event = DELETE_AUTOMATION_JOB;
               state.automationGrid.totalCount = state.automationGrid.sortedRows.length;
               state.automationGrid.rows = GridUtil.fetchGridRecords(action.data, state.automationGrid, false);
              return state;
  case types.SORT_ZAUTO_GRID:
          state.automationGrid = GridUtil.manageSort(action.data, state.automationGrid);
         // state['event'] = SORT_DASHBOARD_DATA_SUCCESS;
          return state;
case types.UPDATE_ZAUTO_GRID:
    state.automationGrid.currentPage = action.currentPage;
    state.automationGrid.size = action.size;
    state.automationGrid.rows = GridUtil.fetchGridRecords(action, state.automationGrid, false);
    return state;
        default:
        	return state;
	}
}
