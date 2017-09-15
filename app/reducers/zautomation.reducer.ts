import {
  GET_ALL_AUTOMATION_JOBS,GET_AUTOMATION_JOB_FOR_RELEASE_PROJECT ,
  CREATE_AUTOMATION_JOB,DELETE_AUTOMATION_JOB,SCHEDULE_AUTOMATION_JOB, GET_FILE_WATCH_JOB_FOR_RELEASE_PROJECT, EDIT_AUTOMATION_JOB, DELETE_FILE_WATCH_JOB,PLAY_FILE_WATCH_JOB,PAUSE_FILE_WATCH_JOB
} from '../utils/constants/action.types';
import {GridUtil} from '../view/components/grid/grid_util';
import {DEPARTMENT_APP_IDS} from '../view/components/admin/customizations/customizations.constant';
import * as types from '../utils/constants/action.types';
import {PROJECT_SETUP_GRID_PAGINATION , PROJECT_SETUP_GRID_OPTIONS} from '../view/components/project_setup/project_setup.constants';

import * as GRID_TYPES from '../utils/constants/action.types';
import {ZAUTO_GRID_TYPE, ZAUTO_GRID_OPTIONS, GRID_ROW_COUNT_DEFAULT, ZAUTO_GRID_PAGINATION} from '../view/components/zautomation/zautomation_grid.constant';
import {FILEWATCH_GRID_TYPE, FILE_WATCH_GRID_OPTIONS, FILE_WATCH_GRID_PAGINATION} from '../view/components/zautomation/file_watcher_grid.constant';


declare var _: any;
declare var jQuery: any;

const automationJobDetail = {
    'automationGrid' : {
        sortedRows: [],
        allRows: [],
        rows: [],
        selectedRow:[],
        //columns: ,
        currentPage: 1,
        paginationOptions: ZAUTO_GRID_PAGINATION,
        size: 50,
        totalCount: 0,
        offset: 0,
        noData: false,
        event: ''
    },
    'filewatchergrid':{
        sortedRows: [],
        allRows: [],
        rows: [],
        selectedRow:[],
        //columns: ,
        currentPage: 1,
        paginationOptions: FILE_WATCH_GRID_PAGINATION,
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


export function zautomationReducer(state = automationJobDetail , action){
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
        case types.GET_AUTOMATION_JOB_FOR_RELEASE_PROJECT :
        	state.automationGrid.sortedRows = action.data;
        	state.automationGrid.totalCount = action.data.length;
        	state.event = GET_AUTOMATION_JOB_FOR_RELEASE_PROJECT;
        	state.automationGrid.rows = GridUtil.fetchGridRecords(action.data, state.automationGrid, false);
        	return state;
        case types.GET_FILE_WATCH_JOB_FOR_RELEASE_PROJECT :
            state.filewatchergrid.sortedRows = action.data;
            state.filewatchergrid.totalCount = action.data.length;
        	state.event = GET_FILE_WATCH_JOB_FOR_RELEASE_PROJECT;
        	state.filewatchergrid.rows = GridUtil.fetchGridRecords(action.data, state.filewatchergrid, false);
        	return state;
        case types.CREATE_AUTOMATION_JOB :
        	let automationObject = action.data;
        	state.automationGrid.rows.push(action.data);
        	state.automationGrid.totalCount = state.automationGrid.sortedRows.length + 1;
        	state.event = CREATE_AUTOMATION_JOB;
        	state.automationGrid.rows = GridUtil.fetchGridRecords(action.data, state.automationGrid, false);
        	return state;
        case types.CREATE_FILE_WATCHER_JOB :
        	let fileWAtcherObject = action.data;
        	state.filewatchergrid.rows.push(action.data);
        	state.filewatchergrid.totalCount = state.filewatchergrid.sortedRows.length + 1;
        	state.event = CREATE_AUTOMATION_JOB;
        	state.filewatchergrid.rows = GridUtil.fetchGridRecords(action.data, state.filewatchergrid, false);
        	return state;
        case types.SCHEDULE_AUTOMATION_JOB :
        	let scheduleObject = action.data;
        	state.scheduleJobs.push(scheduleObject);
        	state.event = SCHEDULE_AUTOMATION_JOB;
        	state.automationGrid.rows = GridUtil.fetchGridRecords(action.data, state.automationGrid, false);
        	return state;
        case types.EDIT_AUTOMATION_JOB:        
            let automationObject1 = action.data;
            state.automationGrid.rows.push(action.data);      	
            state.automationGrid.totalCount = state.automationGrid.sortedRows.length;
            state.event = EDIT_AUTOMATION_JOB;     	
            state.automationGrid.rows = GridUtil.fetchGridRecords(action.data, state.automationGrid, false);       	
            return state;
        case types.DELETE_AUTOMATION_JOB:
               let idToBeDeleted = action.data;
               state.automationGrid.sortedRows.forEach((object , index) => {
                   if (object['ids'] == idToBeDeleted) {
                      state.automationGrid.sortedRows.splice(index, 1);
                  }
               });
               state.event = DELETE_AUTOMATION_JOB;
               state.automationGrid.totalCount = state.automationGrid.sortedRows.length;
               state.automationGrid.rows = GridUtil.fetchGridRecords(action.data, state.automationGrid, false);
              return state;
        case types.DELETE_FILE_WATCH_JOB:
               let idsToBeDeleted = action.data;
               state.filewatchergrid.sortedRows.forEach((object , index) => {
                   if (object['ids'] == idToBeDeleted) {
                      state.filewatchergrid.sortedRows.splice(index, 1);
                  }
               });
               state.event = DELETE_FILE_WATCH_JOB;
               state.filewatchergrid.totalCount = state.filewatchergrid.sortedRows.length;
               state.filewatchergrid.rows = GridUtil.fetchGridRecords(action.data, state.filewatchergrid, false);
              return state;
        case types.PLAY_FILE_WATCH_JOB:
               let idsToBePlayed = action.data;
               state.filewatchergrid.sortedRows.forEach((object , index) => {
                   if (object['ids'] == idsToBePlayed) {
                      state.filewatchergrid.sortedRows.splice(index, 1);
                  }
               });
               state.event = PLAY_FILE_WATCH_JOB;
               state.filewatchergrid.totalCount = state.filewatchergrid.sortedRows.length;
               state.filewatchergrid.rows = GridUtil.fetchGridRecords(action.data, state.filewatchergrid, false);
               return state;
         case types.PAUSE_FILE_WATCH_JOB:
               let idsToBePaused = action.data;
               state.filewatchergrid.sortedRows.forEach((object , index) => {
                   if (object['ids'] == idsToBePaused) {
                      state.filewatchergrid.sortedRows.splice(index, 1);
                  }
               });
               state.event = PAUSE_FILE_WATCH_JOB;
               state.filewatchergrid.totalCount = state.filewatchergrid.sortedRows.length;
               state.filewatchergrid.rows = GridUtil.fetchGridRecords(action.data, state.filewatchergrid, false);
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
