import {
  FETCH_EXECUTION_STATUS_GRID, ADD_EXECUTION_STATUS, CLEAR_EXECUTION_STATUS_EVENTS,
  SORT_EXECUTION_STATUS_GRID, FETCH_EXECUTION_STATUS_GRID_STATUS
} from '../utils/constants/action.types';
import {ADD_EXECUTION_STATUS_SUCCESS} from '../utils/constants/action.events';
import {GridUtil} from '../view/components/grid/grid_util';
import { TST_EXECUTION_STATUS_GRID_OPTIONS, TST_EXECUTION_STATUS_GRID_PAGINATION}
        from '../view/components/admin/customizations/customizations.constant';
declare var _;


const initialState = {
    'isUpdated' : false,
    'executionStatusGrid' : {
        sortedRows: [],
        rows: [],
        currentPage: 1,
        paginationOptions: TST_EXECUTION_STATUS_GRID_PAGINATION,
        size: TST_EXECUTION_STATUS_GRID_OPTIONS.rowCount,
        noData: false,
        totalCount: 0
    },
    'event': ''
};



export function executionStausReducer(state = initialState, action) {

    switch (action.type) {
        case FETCH_EXECUTION_STATUS_GRID:
             action.data.value = (action.data && action.data.value) ? JSON.parse(action.data.value) : [];
             for (let i =0 ; i<action.data.value.length ; i++) {
                 action.data.value[i].id = parseInt(action.data.value[i].id);
             }
             state.executionStatusGrid.sortedRows = action.data.value;
             state.executionStatusGrid.totalCount = action.data.value.length;
             state.executionStatusGrid.rows = GridUtil.fetchGridRecords(action.data, state.executionStatusGrid, false);
             state.event = FETCH_EXECUTION_STATUS_GRID_STATUS;
             state.isUpdated = true;
             return state;

        case ADD_EXECUTION_STATUS:
             action.data.value = (action.data && action.data.value) ? JSON.parse(action.data.value) : [];
             for (let i =0 ; i<action.data.value.length ; i++) {
                 action.data.value[i].id = parseInt(action.data.value[i].id);
             }
             state.executionStatusGrid.sortedRows = action.data.value;
             state.executionStatusGrid.totalCount = action.data.value.length;
             state.executionStatusGrid.rows = GridUtil.fetchGridRecords(action.data, state.executionStatusGrid, false);
             state.event = ADD_EXECUTION_STATUS_SUCCESS;
             return state;

        case CLEAR_EXECUTION_STATUS_EVENTS:
             state.event = '';
             return state;

        case SORT_EXECUTION_STATUS_GRID:
            state.executionStatusGrid = GridUtil.manageSort(action.data, state.executionStatusGrid);
            return state;

        default:
            return state;
    }
}
