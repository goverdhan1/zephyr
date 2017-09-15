import { IMPORT_SAVED_MAPS, IMPORT_JOBS, IMPORT_SAVED_MAPS_FIELDS_CONFIG,
    IMPORT_LOAD_JOB_HISTORY, CLEAR_IMPORT_EVENT,CLEAR_IMPORT_STATE_EVENT,
    IMPORT_CREATE_JOBS_SUCCESS, IMPORT_UPDATE_JOBS_SUCCESS,
    IMPORT_CREATE_SAVED_MAPS, IMPORT_CREATE_SAVED_MAPS_SUCCESS, IMPORT_SAVED_MAPS_DISCRIMINATORS,
    IMPORT_UPDATE_SAVED_MAPS, IMPORT_UPDATE_SAVED_MAPS_SUCCESS, IMPORT_DELETE_SAVED_MAPS, IMPORT_DELETE_IMPORT_JOBS,
    IMPORT_CREATE_IMPORT_JOBS, IMPORT_UPDATE_IMPORT_JOBS,

    IMPORT_JOBS_BY_ID, IMPORT_REQ_FROM_JIRA, UPDATE_JOB_PAGINATION, UPDATE_MAP_PAGINATION} from '../utils/constants/action.types';

import { SAVED_MAPS_GRID_COLUMNS, IMPORT_JOBS_GRID_COLUMNS, IMPORT_JOBS_GRID_PAGINATION, IMPORT_MAPS_GRID_PAGINATION} from '../view/components/common/import/import_grid.constant';

import { GridUtil } from '../view/components/grid/grid_util';

declare var _: any;

const initialState = {
    event: '',
    savedMaps: {
        data: [],
        noData: false,
        grid: {
            noData: true,
            currentPage: 1,
            paginationOptions: IMPORT_MAPS_GRID_PAGINATION,
            size: IMPORT_MAPS_GRID_PAGINATION.size,
            totalCount: 0,
            sortedRows: [],
            rows: []
        },
        discriminators: [],
        savedMapsFields: [],
        fieldConfigData: [],
        event: ''
    },
    importJobs: {
        history : [],
        data: [],
        deletedId: -1,
        noData: false,
        grid: {
            noData: true,
            currentPage: 1,
            paginationOptions: IMPORT_JOBS_GRID_PAGINATION,
            size: IMPORT_JOBS_GRID_PAGINATION.size,
            totalCount: 0,
            sortedRows: [],
            rows: []
        },
        folderName: '',
        event: ''
    }
};

export function importReducer(state = initialState, action) {
    let savedMapData, index, importJobData;
    state.event = '';

    switch (action.type) {
        case IMPORT_SAVED_MAPS:
            state.savedMaps.data = action.data.sort((a, b) => a.id - b.id);
            return state;
        case IMPORT_SAVED_MAPS_FIELDS_CONFIG:
            let configData = action.data;

            state.savedMaps.fieldConfigData = configData;
            state.savedMaps.savedMapsFields = getMappedData(configData, null);

            state.savedMaps.data.forEach(map => {
                Object.assign(map.fieldMapDetails, getMappedData(configData, map.fieldMapDetails));
            });

            state.savedMaps.grid.sortedRows = state.savedMaps.data || [];
            state.savedMaps.grid.totalCount = state.savedMaps.grid.sortedRows.length;
            state.savedMaps.grid.noData = state.savedMaps.grid.totalCount ? false : true;
            state.savedMaps.grid.rows = GridUtil.fetchGridRecords(state.savedMaps.data, state.savedMaps.grid, false);
            return state;
        case IMPORT_CREATE_SAVED_MAPS:
            state.savedMaps.data.push(action.data);

            state.savedMaps.data.forEach(map => {
                Object.assign(map.fieldMapDetails, getMappedData(state.savedMaps.fieldConfigData, map.fieldMapDetails));
            });
            state.savedMaps.grid.sortedRows = state.savedMaps.data || [];
            state.savedMaps.grid.totalCount = state.savedMaps.grid.sortedRows.length;
            state.savedMaps.grid.noData = false;

            state.savedMaps.grid.currentPage = Math.ceil(state.savedMaps.grid.totalCount / state.savedMaps.grid.size);

            state.savedMaps.grid.rows = GridUtil.fetchGridRecords(state.savedMaps.data, state.savedMaps.grid, false);

            state.savedMaps.event = IMPORT_CREATE_SAVED_MAPS_SUCCESS;

            return state;
        case IMPORT_UPDATE_SAVED_MAPS:
            savedMapData = state.savedMaps.data;
            index = _.indexOf(savedMapData, _.find(savedMapData, {id: action.data.id}));
            savedMapData.splice(index, 1, action.data);
            let updateMapData = state.savedMaps.data;

            updateMapData.forEach(map => {
                Object.assign(map.fieldMapDetails, getMappedData(state.savedMaps.fieldConfigData, map.fieldMapDetails));
            });

            state.savedMaps.event = IMPORT_UPDATE_SAVED_MAPS_SUCCESS;

            return state;
        case IMPORT_DELETE_SAVED_MAPS:
            savedMapData = state.savedMaps.data;
            index = _.indexOf(savedMapData, _.find(savedMapData, {id: action.data.id}));
            savedMapData.splice(index, 1);

            state.savedMaps.grid.sortedRows = state.savedMaps.data || [];
            state.savedMaps.grid.totalCount = state.savedMaps.grid.sortedRows.length;
            state.savedMaps.grid.noData = state.savedMaps.grid.totalCount ? false : true;

            state.savedMaps.grid.currentPage = Math.ceil(state.savedMaps.grid.totalCount / state.savedMaps.grid.size);

            state.savedMaps.grid.rows = GridUtil.fetchGridRecords(state.savedMaps.data, state.savedMaps.grid, false);
            return state;

        case IMPORT_LOAD_JOB_HISTORY:
          state.importJobs.history = action.data.history;
          return state;

        case IMPORT_SAVED_MAPS_DISCRIMINATORS:
            state.savedMaps.discriminators = JSON.parse(action.data.value);
            return state;
        case IMPORT_JOBS:
            state.importJobs.data = action.data.sort((a, b) => a.id - b.id);
            state.importJobs.grid.sortedRows = state.importJobs.data;
            state.importJobs.grid.totalCount = action.data.length;
            state.importJobs.grid.noData = state.importJobs.grid.totalCount ? false : true;
            state.importJobs.grid.rows = GridUtil.fetchGridRecords(action.data, state.importJobs.grid, false);
            return state;
        case IMPORT_CREATE_IMPORT_JOBS:
            state.importJobs.data.push(action.data);

            state.importJobs.grid.sortedRows = state.importJobs.data || [];
            state.importJobs.grid.totalCount = state.importJobs.grid.sortedRows.length;
            state.importJobs.grid.noData = false;

            state.importJobs.grid.currentPage = Math.ceil(state.importJobs.grid.totalCount / state.importJobs.grid.size);

            state.importJobs.grid.rows = GridUtil.fetchGridRecords(state.importJobs.data, state.importJobs.grid, false);

            state.importJobs.event = IMPORT_CREATE_JOBS_SUCCESS;
            return state;
        case IMPORT_DELETE_IMPORT_JOBS:
            let importJobsData = state.importJobs.data;
            state.importJobs.deletedId = action.data.id;
            index = _.indexOf(importJobsData, _.find(importJobsData, {id: action.data.id}));
            importJobsData.splice(index, 1);

            state.importJobs.grid.sortedRows = state.importJobs.data || [];
            state.importJobs.grid.totalCount = state.importJobs.grid.sortedRows.length;
            state.importJobs.grid.noData = state.importJobs.grid.totalCount ? false : true;

            state.importJobs.grid.currentPage = Math.ceil(state.importJobs.grid.totalCount / state.importJobs.grid.size);

            state.importJobs.grid.rows = GridUtil.fetchGridRecords(state.importJobs.data, state.importJobs.grid, false);
            return state;
        case IMPORT_UPDATE_IMPORT_JOBS:
            importJobData = state.importJobs.data;
            index = _.indexOf(importJobData, _.find(importJobData, {id: action.data.id}));
            importJobData.splice(index, 1, action.data);
            state.importJobs.event = IMPORT_UPDATE_JOBS_SUCCESS;

            return state;
        case IMPORT_JOBS_BY_ID:
            importJobData = state.importJobs.data;
            index = _.indexOf(importJobData, _.find(importJobData, {id: action.data.id}));
            importJobData.splice(index, 1, action.data);
            state.importJobs.history = action.data.history;
            return state;
        case CLEAR_IMPORT_EVENT:
            state.importJobs.event = '';
            state.savedMaps.event = '';
            state.event = CLEAR_IMPORT_STATE_EVENT;
            return state;
        case UPDATE_JOB_PAGINATION:
            state.importJobs.grid.size = action.size;
            state.importJobs.grid.currentPage = action.currentPage;
            state.importJobs.grid.rows = GridUtil.fetchGridRecords({}, state.importJobs.grid, false);
            return state;
        case UPDATE_MAP_PAGINATION:
            state.savedMaps.grid.size = action.size;
            state.savedMaps.grid.currentPage = action.currentPage;
            state.savedMaps.grid.rows = GridUtil.fetchGridRecords({}, state.savedMaps.grid, false);
            return state;
        case IMPORT_REQ_FROM_JIRA:
            state.event = 'IMPORT_REQ_FROM_JIRA';
            return state;
        default:
            return state;
    }
}

function getMappedData(configData, fieldMapDetails) {
    let details = [];
    configData.forEach((config) => {
        if(config.importable) {
            if(fieldMapDetails) {
                let field = fieldMapDetails.find(function(o) {
                    return parseInt(o.zephyrField, 10) === config.id;
                });
                let mappedField = field ? field.mappedField : '';
                details.push({
                    'displayName': config.displayName,
                    'zephyrField': config.id,
                    'mappedField': mappedField
                });
            } else {
                details.push({
                    'displayName': config.displayName,
                    'zephyrField': config.id,
                    'mappedField': ''
                });
            }
        }
    });
    return details;
}
