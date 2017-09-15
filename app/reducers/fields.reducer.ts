import {
  FETCH_ALL_FIELDS, LOCK_ZEPHYR_ACCESS, ENABLE_ZEPHYR_ACCESS, TOGGLE_ZEPHYR_ACCESS,
  GET_FIELDS_METADATA, EDIT_FIELD, ADD_FIELD, DELETE_FIELD, SERVER_PAUSED,
  VALIDATE_SEARCH_FIELD, SORT_FIELDS_GRID, CLEAR_FIELDS_EVENT, FETCH_ALL_FIELDS_SUCCESS,
  SORT_REQ_FIELDS_GRID, SORT_TST_FIELDS_GRID
} from '../utils/constants/action.types';
import {GridUtil} from '../view/components/grid/grid_util';
import { ADD_FIELD_SUCCESS, EDIT_FIELD_SUCCESS} from '../utils/constants/action.events';
import { REQ_FIELDS_GRID_OPTIONS, REQ_FIELDS_GRID_PAGINATION } from '../view/components/admin/customizations/customizations.constant';
declare var _;

const initialState = {
	'isUpdated' : false,
    'isSearchFieldValueAccepted' : true,
    'isZephyrAccessLocked' : false,
    'fields': [],
    'metadata' : {
        'isUpdated' : false,
        'options' : []
    },
    'fieldsGrid' : {
        sortedRows: [],
        rows: [],
        currentPage: 1,
        paginationOptions: REQ_FIELDS_GRID_PAGINATION,
        size: REQ_FIELDS_GRID_OPTIONS.rowCount,
        noData: false,
        totalCount: 0
    },
    'event': ''
};

export function fieldsReducer(state = initialState, action) {

    switch (action.type) {
        case FETCH_ALL_FIELDS:
            state.fields = state.fields.concat(action.data);
            state.fieldsGrid.sortedRows = action.data;
            state.fieldsGrid.totalCount = action.data.length;
            state.fieldsGrid.rows = GridUtil.fetchGridRecords(action.data, state.fieldsGrid, false);
            state.isUpdated = true;
            state.event = FETCH_ALL_FIELDS_SUCCESS;
            return state;
        case LOCK_ZEPHYR_ACCESS:
            state.isZephyrAccessLocked = true;
            return state;
        case ENABLE_ZEPHYR_ACCESS:
            state.isZephyrAccessLocked = false;
            return state;
        case TOGGLE_ZEPHYR_ACCESS:
            state.isZephyrAccessLocked = action.data;
            return state;
        case EDIT_FIELD:
            _.each(state.fieldsGrid.rows, (_field) => {
                if(_field.id === action.data.response.id) {
                    Object.assign(_field, action.data.response);
                }
            });
            state.event = EDIT_FIELD_SUCCESS;
            return state;
        case ADD_FIELD:
            state.fieldsGrid.sortedRows.push(action.data.response);
             state.fieldsGrid.totalCount = state.fieldsGrid.sortedRows.length;
             // state.rolesTypeArray.push(action.data);
             state.fieldsGrid.rows = GridUtil.fetchGridRecords(action.data.response, state.fieldsGrid, false);
             state.event = ADD_FIELD_SUCCESS;
            return state;
        case GET_FIELDS_METADATA:
            state.metadata.isUpdated = true;
            state.metadata.options = action.data;
            return state;
        case DELETE_FIELD:
            if (action.data.status === 200) {
                state.fieldsGrid.sortedRows = state.fieldsGrid.sortedRows.filter(item => String(item['id']) !== String(action.data.id));

                state.fieldsGrid.totalCount = state.fieldsGrid.sortedRows.length;
                state.fieldsGrid.rows = GridUtil.fetchGridRecords(action.data, state.fieldsGrid, false);
            }
            return state;
        case VALIDATE_SEARCH_FIELD:
            if (action.data.constructor === Object) {
                state.isSearchFieldValueAccepted = false;
            } else if (action.data) {
                state.isSearchFieldValueAccepted = true;
            } else if (!action.data) {
                state.isSearchFieldValueAccepted = false;
            }
            return state;

        case SORT_REQ_FIELDS_GRID:
        case SORT_TST_FIELDS_GRID:
        case SORT_FIELDS_GRID:
            state.fieldsGrid = GridUtil.manageSort(action.data, state.fieldsGrid);
            return state;
        case CLEAR_FIELDS_EVENT:
             state.event = '';
             return state;
        case SERVER_PAUSED:
             state['isZephyrAccessLocked'] = action.data;
             return state;
        default:
            return state;
    }
}
