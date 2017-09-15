import { GET_ETL_HISTORY, GET_ETL_TIMING, UPDATE_ETL_TIMING,SORT_ETL_HISTORY_GRID, UPDATE_HISTORY_PAGINATION} from '../utils/constants/action.types';
import {GridUtil} from '../view/components/grid/grid_util';
import { HISTORY_GRID_OPTIONS, HISTORY_GRID_PAGINATION } from '../view/components/admin/customizations/customizations.constant';

const initialState = {
     'timing' : {},
     'history' : {
         'isUpdated' : false,
         'historyData' : [] ,
         'historyGrid' : {
             sortedRows: [],
             rows: [],
             currentPage: 1,
             paginationOptions: HISTORY_GRID_PAGINATION,
             size: HISTORY_GRID_OPTIONS.rowCount,
             noData: false,
             totalCount: 0
         }
     }
};


export function etlReducer(state = initialState, action) {

    switch (action.type) {
        case GET_ETL_TIMING:
            state.timing = action.data;
            return state;
        case UPDATE_ETL_TIMING:
            state.timing = action.data;
            return state;
        case GET_ETL_HISTORY:
            state.history.historyData = action.data;
            state.history.isUpdated = true;
            state.history.historyGrid.sortedRows = action.data;
            state.history.historyGrid.totalCount = action.data.length;
            state.history.historyGrid.rows = GridUtil.fetchGridRecords(action.data, state.history.historyGrid, false);
            return state;
        case UPDATE_HISTORY_PAGINATION:
            state.history.historyGrid.size = action.size;
            state.history.historyGrid.currentPage = action.currentPage;
            state.history.historyGrid.rows = GridUtil.fetchGridRecords({}, state.history.historyGrid, false);
            return state;
        case SORT_ETL_HISTORY_GRID:
            state.history.historyGrid = GridUtil.manageSort(action.data, state.history.historyGrid);
            return state;
        default:
            return state;
    }
}
