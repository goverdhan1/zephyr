import { FETCH_ALL_ROLES_TYPES, EDIT_ROLE, ADD_ROLE, GET_APPS,CLEAR_ROLES_EVENTS,
    GET_ROLE_PERMISSIONS_BY_ID, DELETE_ROLE, UPDATE_ROLE_PERMISSION_BY_ID,
SORT_ROLES_GRID,CHECK_ROLE_ASSIGNMENT} from '../utils/constants/action.types';

import { ADD_ROLE_SUCCESS , ROLE_ASSIGNMENTS} from '../utils/constants/action.events';
import {GridUtil} from '../view/components/grid/grid_util';
import { ROLES_GRID_OPTIONS, ROLES_GRID_PAGINATION, DEPARTMENT_APP_IDS, PROJECTS_APP_IDS,
        APPLICATION_LABEL_ID_MAPPING } from '../view/components/admin/customizations/customizations.constant';
declare var _;


const initialState = {
    'isUpdated' : false,
    'rolesTypeArray': [],
    'appsUpdated' : false,
    'apps':[],
    'rolesGrid' : {
        sortedRows: [],
        rows: [],
        currentPage: 1,
        paginationOptions: ROLES_GRID_PAGINATION,
        size: ROLES_GRID_OPTIONS.rowCount,
        noData: false,
        totalCount: 0
    },
    'event': '',
    'roleAssignment' : ''
};



export function rolesReducer(state = initialState, action) {

    switch (action.type) {
        case FETCH_ALL_ROLES_TYPES:
            for (let i =0; i<action.data.length; i++) {
                action.data[i].noneditable = !action.data[i].editable;
            }
            state.rolesTypeArray = action.data;
            state.rolesGrid.sortedRows = action.data;
            state.rolesGrid.totalCount = action.data.length;
            state.rolesGrid.rows = GridUtil.fetchGridRecords(action.data, state.rolesGrid, false);
            state.isUpdated = true;
            return state;
        case EDIT_ROLE :
            action.data.noneditable = !action.data.editable;
            _.each(state.rolesTypeArray, (_role) => {
                if(_role.id === action.data.id) {
                    Object.assign(_role, action.data);
                }
            });
            return state;
        case ADD_ROLE:
             action.data.noneditable = !action.data.editable;
             state.rolesGrid.sortedRows.push(action.data);
             state.rolesGrid.totalCount = state.rolesGrid.sortedRows.length;
             // state.rolesTypeArray.push(action.data);
             state.rolesGrid.rows = GridUtil.fetchGridRecords(action.data, state.rolesGrid, false);
             state.event = ADD_ROLE_SUCCESS;
             return state;
        case GET_APPS:
          state.apps = action.data;
          state.appsUpdated = true;
          _.each(state.apps, (_app) => {
            if(DEPARTMENT_APP_IDS.indexOf(_app.id) !== -1){
              _app.labelName = APPLICATION_LABEL_ID_MAPPING[_app.id];
            }else if( PROJECTS_APP_IDS.indexOf(_app.id) !== -1){
              _app.labelName = APPLICATION_LABEL_ID_MAPPING[_app.id];
              _app.desktopLevel = 2;
            }else {
              _app.labelName = APPLICATION_LABEL_ID_MAPPING[_app.id];
              _app.desktopLevel = 0;
            }
          });
          return state;
        case GET_ROLE_PERMISSIONS_BY_ID:
            if (action.data.length > 0)  {
                let roleId = action.data[0].role.id;
                let applicationIdArray = [];
                _.each(action.data, (_app) => {
                    applicationIdArray.push(_app.applicationName);
                });
                _.each(state.rolesTypeArray, (_role) => {
                    if (_role.id === roleId) {
                        _role.applicationIdArray = applicationIdArray;
                    }
                });
            }
            return state;
        case DELETE_ROLE:
            if (action.data.status === 200) {
                let idToBeDeleted = action.data.id;
                // state.rolesTypeArray.forEach(function(result, index) {
                //     if (result['id'] === idToBeDeleted) {
                //         state.rolesTypeArray.splice(index, 1);
                //        }
                //    });
                state.rolesGrid.sortedRows.forEach(function(result, index) {
                    if (result['id'] === idToBeDeleted) {
                        state.rolesGrid.sortedRows.splice(index, 1);
                    }
                });
                state.rolesGrid.totalCount = state.rolesGrid.sortedRows.length;
                state.rolesGrid.rows = GridUtil.fetchGridRecords(action.data, state.rolesGrid, false);

            }
            return state;
        case UPDATE_ROLE_PERMISSION_BY_ID:
                let roleId = action.data.roleId;
                let applicationIdArray = [];
                _.each(action.data.permissions, (_app) => {
                    applicationIdArray.push(_app.applicationName);
                });
                _.each(state.rolesTypeArray, (_role) => {
                    if (_role.id === roleId) {
                        _role.applicationIdArray = applicationIdArray;
                    }
                });
            return state;
        case SORT_ROLES_GRID:
            state.rolesGrid = GridUtil.manageSort(action.data, state.rolesGrid);
            return state;
        case CLEAR_ROLES_EVENTS:
             state.event = '';
             return state;
        case CHECK_ROLE_ASSIGNMENT:
             state.roleAssignment = action.data;
             state.event = ROLE_ASSIGNMENTS;
             return state;
        default:
            return state;
    }
}
