import {DASHBOARD_GRID_PAGINATION} from '../view/components/dashboard/dashboard_grid.constant';
import {GridUtil} from '../view/components/grid/grid_util';

import {
  FETCH_ALL_DASHBOARDS, CREATE_DASHBOARD,
  CREATE_GADGET,
  DELETE_GADGET,
  UPDATE_GADGET,
  CLEAR_DASHBOARD_EVENTS, UPDATE_DASHBOARD, DELETE_DASHBOARD, FETCH_ALL_GADGETS, SORT_RELEASE_GRID, SORT_DASHBOARD_GRID,
  FETCH_DASHBOARD, PAGINATE_DASHBOARDS_OFFLINE
} from '../utils/constants/action.types';
import {
  FETCH_ALL_DASHBOARDS_SUCCESS, FETCH_ALL_GADGETS_SUCCESS, CREATE_DASHBOARD_SUCCESS, CREATE_GADGET_SUCCESS,
  UPDATE_DASHBOARD_SUCCESS, DELETE_DASHBOARD_SUCCESS, UPDATE_GADGET_SUCCESS, DELETE_GADGET_SUCCESS,
  SORT_DASHBOARD_DATA_SUCCESS, FETCH_DASHBOARD_SUCCESS
} from '../utils/constants/action.events';
declare var _;
import {LOCAL_STORAGE} from '../utils/constants/local-storage.constants';

const initialState = {
    sortedRows: [],
    rows: [],
    currentPage: 1,
    originalRows: [],
    gadgets: [],
    paginationOptions: DASHBOARD_GRID_PAGINATION,
    isPaginationRequired: true,
    size: 50,
    totalCount: 0,
    isLastPage: true,
    isFirstPage: true,
    offset: 0,
    selectedDashboard: null,
    event: '',
    layout: '',
    gadget : {}
};

export function dashboardReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ALL_DASHBOARDS:
            if(!_.isEmpty(action.data)) {
                state.sortedRows= action.data.dashboards;
                state.size = action.data.pageInfo.pageSize;
                state.offset = action.data.pageInfo.offset;
                state.originalRows = action.data.dashboards;
                state.currentPage = action.data.pageInfo.currentPage ? action.data.pageInfo.currentPage : state.currentPage;

                _.forEach(state.sortedRows, (val) => {
                    val.properties = JSON.parse(val.properties);
                    // return val;
                });

              state.totalCount = action.data.dashboards.length;
              state.rows = GridUtil.fetchGridRecords(action.data.dashboards, state, false);
              state['event'] = FETCH_ALL_DASHBOARDS_SUCCESS;
            }

            return state;

      case PAGINATE_DASHBOARDS_OFFLINE:
        let rows = state.originalRows;

        if (action.data.pageInfo.searchTerm) {

          rows = state.originalRows.filter((row) => {
            return row.name.toLocaleLowerCase().startsWith(action.data.pageInfo.searchTerm.toLocaleLowerCase());
          });

        }

        state.sortedRows = rows;
        state.size = action.data.pageInfo.pageSize;
        state.offset = action.data.pageInfo.offset;
        state.currentPage = action.data.pageInfo.currentPage ? action.data.pageInfo.currentPage : state.currentPage;

        state.totalCount = rows.length;
        state.rows = GridUtil.fetchGridRecords(rows, state, false);
        state['event'] = FETCH_ALL_DASHBOARDS_SUCCESS;

        return state;

      case FETCH_ALL_GADGETS:
        if(!_.isEmpty(action.data)) {
          state.gadgets = action.data;

          //if (_.isString(action.data)) {
            _.forEach(state.gadgets, (val) => {
              if(_.isString(val.properties)) {
                val.properties = JSON.parse(val.properties);
              }

              if (_.isString(val.refreshValues)) {
                val.refreshValues = JSON.parse(val.refreshValues);
              }

              _.forEach(val.refreshValues, (refreshValue) => {
                refreshValue.text = refreshValue.name;
              });

            });
          //}

          state['event'] = FETCH_ALL_GADGETS_SUCCESS;
        }

        return state;

      case FETCH_DASHBOARD:
        if(!_.isEmpty(action.data)) {
          state.selectedDashboard = action.data;
          state.selectedDashboard.properties = JSON.parse(state.selectedDashboard.properties);

          _.forEach(state.selectedDashboard.gadgets, (gadget) => {
            gadget.properties = JSON.parse(gadget.properties);
          });

          state.sortedRows= [action.data];

          state.totalCount = 1;
          state.rows = GridUtil.fetchGridRecords([action.data], state, false);

          state['event'] = FETCH_DASHBOARD_SUCCESS;
        }

        return state;

        case CREATE_DASHBOARD:
            if(!_.isEmpty(action.data)) {
                action.data.properties = JSON.parse(action.data.properties);
                state.sortedRows.push(action.data);

                let lastPage = Math.ceil(state.sortedRows.length / state.paginationOptions.size);
                state.currentPage = lastPage;

                state.offset = (state.currentPage - 1) * state.size;

                state.totalCount = state.sortedRows.length;

                state.rows = GridUtil.fetchGridRecords(state.sortedRows, state, false);

                state['event'] = CREATE_DASHBOARD_SUCCESS;
            }

            return state;

        case UPDATE_DASHBOARD:
            if(!_.isEmpty(action.data)) {
                action.data.properties = JSON.parse(action.data.properties);

                state.sortedRows = _.map(state.sortedRows, (_dashboard, _index) => {
                    return (action.data.id === _dashboard.id) ? action.data: _dashboard;
                });

                state.rows= _.map(state.rows, (_dashboard, _index) => {
                  return (action.data.id === _dashboard.id) ? action.data: _dashboard;
                });

                state['layout'] = action.data.layout;
                state['event'] = UPDATE_DASHBOARD_SUCCESS;
            }

            return state;

        case DELETE_DASHBOARD:
            if(!_.isEmpty(action.data)) {

              state.sortedRows = _.filter(state.sortedRows, (_dashboard, _index) => {
                return (action.data.id != _dashboard.id);
              });

              state.totalCount = state.sortedRows.length;

              state.rows = GridUtil.fetchGridRecords(action.data, state, false);

              state['event'] = DELETE_DASHBOARD_SUCCESS;
            }

            return state;

        case CREATE_GADGET :
            if(!_.isEmpty(action.data)) {
              action.data.properties = JSON.parse(action.data.properties);

              state.rows = _.map(state.rows, (_dashboard, _index) => {
                if (action.data.dashboardId === _dashboard.id) {
                  _dashboard.gadgets.unshift  (action.data);
                  // state.sortedRows[_index].gadgets.push(action.data);
                }

                return _dashboard;
              });

              state['gadget'] = action.data;

              // setPaginationParameters(state);
              state['event'] = CREATE_GADGET_SUCCESS;
            }

            return state;

        case UPDATE_GADGET :
          if(!_.isEmpty(action.data)) {
            let gadget = action.data;
            gadget.properties = JSON.parse(action.data.properties);

            let dashBoardIndex = _.cloneDeep(_.findIndex(state.rows, {id : gadget.dashboardId}));
            let dashboard = _.cloneDeep(state.rows[dashBoardIndex]);
            let gadgetIndex = _.cloneDeep(_.findIndex(dashboard.gadgets, {id: gadget.id}));
            dashboard.gadgets[gadgetIndex] = gadget;

            state.rows[dashBoardIndex] = dashboard;
            state.sortedRows[dashBoardIndex] = dashboard;
            state['event'] = UPDATE_GADGET_SUCCESS;
            state['gadget'] = gadget;
          }

          return state;

        case DELETE_GADGET:
          if(!_.isEmpty(action.data)) {
            let gadget = action.data;

            let dashBoardIndex = _.findIndex(state.rows, {id : gadget.dashboardId});
            let dashboard = state.rows[dashBoardIndex];
            let gadgetIndex = _.findIndex(dashboard.gadgets, {id: gadget.id});
            dashboard.gadgets.splice(gadgetIndex, 1);

            state.rows[dashBoardIndex] = dashboard;
            state.sortedRows[dashBoardIndex] = dashboard;
            // setPaginationParameters(state);
            state['event'] = DELETE_GADGET_SUCCESS;
            state['gadget'] = gadget;
          }

          return state;

        case CLEAR_DASHBOARD_EVENTS:
            state['event'] = '';
            state['layout'] = '';
            state['gadgetId'] = '';
            // ZephyrLocalStorage.setItem(LOCAL_STORAGE.ZEPHYR_DASHBORAD_LIST,  JSON.stringify(state));
            return state;

        case SORT_DASHBOARD_GRID:
          state = GridUtil.manageSort(action.data, state);
          state['event'] = SORT_DASHBOARD_DATA_SUCCESS;
          return state;

        default:
            return state;
    }
}


function setPaginationParameters(state) {
    state['totalCount'] = state.rows.length;
    state.isFirstPage = (state.offset === 0) ? true : false;
    state.isLastPage = ((state.size + state.offset) >= state.totalCount) ? true : false;
}
