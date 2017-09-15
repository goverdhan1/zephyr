import * as types from '../utils/constants/action.types';
import { DEFECTS_ADMIN_GRID_COLUMNS, DEFECTS_ADMIN_GRID_PAGINATION }
from '../view/components/defects_admin/defects_admin.constants';
import {GridUtil} from '../view/components/grid/grid_util';
// import {
//   ASSIGN_TESTCASES_BY_SEARCH_SUCCESS, FETCH_EXECUTIONS_SUCCESS,
//   FETCH_SCHEDULE_PATH_SUCCESS
// } from '../utils/constants/action.events';

declare var _: any;
declare var jQuery: any;


const initialState = {
    'defectsAdminGrid': {
        sortedRows: [],
        rows: [],
        columns: DEFECTS_ADMIN_GRID_COLUMNS,
        currentPage: 1,
        paginationOptions: DEFECTS_ADMIN_GRID_PAGINATION,
        size: 100000,
        totalCount: 0,
        offset: 0,
        noData: false,
        event: ''
    },
    'event': '',
    'categories': []

};


export function defectsAdminReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_ALL_PREFERENCES:
        //console.debug('action.data', action.data);
        action.data.forEach((preference) => {
            preference['noneditable'] = !preference.customizable;
        });
        let categories = Object.keys(_.countBy(action.data, 'section'));
        state.categories = categories.map((category, index)=> {
            return {
                name: category,
                id: index + 1
            };
        });
        state.defectsAdminGrid.sortedRows = action.data;
        state.defectsAdminGrid.totalCount = action.data.length;
        state.defectsAdminGrid.rows = GridUtil.fetchGridRecords(action.data, state.defectsAdminGrid, false);
        return state;

    case types.SAVE_PREFERENCE:
         return state;

    case types.SORT_DEFECTS_ADMIN_GRID:
        state.defectsAdminGrid = GridUtil.manageSort(action.data, state.defectsAdminGrid);
        return state;

    case types.CLEAR_EXECUTION:
            state['event'] = '';
            return state;


    default:
        return state;
  }

}
