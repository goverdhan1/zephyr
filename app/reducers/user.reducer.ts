import {
  SET_USER_DETAILS, ON_USER_LOGOUT, FETCH_RESOURCE_DETAILS,
  NEXT_PAGE_RESOURCE_MANAGEMENT_GRID, PREV_PAGE_RESOURCE_MANAGEMENT_GRID,
  CONFIGURE_RESOURCE_MANAGEMENT_GRID_COLUMN, SORT_RESOURCE_GRID, LOG_OUT_USER,
  PROJECTS_ASSIGNED_TO_USERE_BY_ID, EDIT_USER, CLEAR_RESOURCE_MANAGEMENT_EVENTS,
  ALLOCATE_PROJECTS_TO_USER, ADD_USER, CLEAR_USER_EVENTS, LOGGEDIN_USER_PERMISSIONS, FETCH_LOGGED_IN_USERS,
  CREDENTIALS_EXPIRED, CLEAR_EVENT, REFRESH_USERS_GRID, NO_LOGIN_POPUP, LICENSE_ERROR, INITIALIZE_RESOURCE_GRID,
  NEXT_PAGE_RESOURCE_GRID, PREV_PAGE_RESOURCE_GRID, PAGINATE_BY_INDEX_RESOURCE_GRID,LICENCE_EXPIRATION_DAYS
} from '../utils/constants/action.types';

import {LOGGEDIN_USER_PERMISSIONS_SUCCESS, LOGGED_USERS_CHANGED, URL_CHANGE_PERMISSION, NEXT_PAGE_RESOURCE_GRID_EVENT,
    PREV_PAGE_RESOURCE_GRID_EVENT, PAGINATE_BY_INDEX_RESOURCE_GRID_EVENT} from '../utils/constants/action.events';
import {RESOURCE_GRID_COLUMNS, RESOURCE_GRID_PAGINATION} from '../view/components/resource_management/resource_management.constants';
import {GridUtil} from '../view/components/grid/grid_util';
import {DEPARTMENT_APP_IDS} from '../view/components/admin/customizations/customizations.constant';

import {LOGIN_SUCCESS, ADD_PROJECT_SUCCESS} from '../utils/constants/action.events';

const userInfo = localStorage.getItem('userInfo');
const initialState = userInfo ? JSON.parse(userInfo) : {};
const initialResourceManagement = {
    'users' : [],
    'event' : '',
    'resourceGrid' : {
        sortedRows: [],
        allRows: [],
        rows: [],
        columns: RESOURCE_GRID_COLUMNS,
        currentPage: 1,
        paginationOptions: RESOURCE_GRID_PAGINATION,
        size: 1000000,
        totalCount: 0,
        offset: 0,
        noData: false,
        event: ''
    },
    'message': ''
};

const loggedInUserState = {
    'loggedInUser' : {},
    'event': '',
    'userDTO': {},
    'message': '',
    'admin.authentication.security.policy.LOV': '',
    'admin.authentication.security.policy': ''
};


export function loggedInUserReducer(state = loggedInUserState, action) {

  switch (action.type) {
    case FETCH_LOGGED_IN_USERS:
      let loggedInUserDTO = action.data;
      state['loggedInUser'] = {};
      loggedInUserDTO.forEach((resource) => {
        if(resource && resource.userId) {
            state['loggedInUser'][resource.userId] = resource;
        }
      });
      state['event'] = LOGGED_USERS_CHANGED;
      return state;
      case CREDENTIALS_EXPIRED:
        //console.log(action.data, action.error);
        state['userDTO'] = action.error;
        state['anonymous'] = action.data;

        action.data.forEach((object) => {
          var key = object.name;
          var value = object.value;
          if(key === 'admin.authentication.security.policy' || key === 'admin.authentication.security.policy.LOV'){
            state[key] = value;
          }
        });
        state['event'] = 'CREDENTIALS_EXPIRED';
        return state;

      case NO_LOGIN_POPUP:
        state['error'] = action.data;
        state['event'] = 'NO_LOGIN_POPUP';
        return state;

      case CLEAR_EVENT:
        state['event'] = '';
        return state;
    case LICENCE_EXPIRATION_DAYS:
         if(action.data<=0){
              state.event='LICENSE_EXPIRY';
              state.message='License has expired..Please contact your Zephyr Sales Manager or email sales@getzephyr.com.';
          }else if(action.data<=15){
              state.event='LICENSE_EXPIRY';
              state.message='Your license will expire in ' + Math.floor(action.data) + ' day(s).Please contact your Zephyr Sales Manager or email sales@getzephyr.com.';
          }
        return state;
    default:
      return state;
  }
}


export function userReducer(state = initialState, action) {

    switch (action.type) {
        case SET_USER_DETAILS:
            state = action.data;
            state.event = LOGIN_SUCCESS;
            return state;
        case ON_USER_LOGOUT:
              localStorage.setItem('IS_FIRST_LOAD', 'false');
              return {};
        case CLEAR_USER_EVENTS:
            state.event = '';
            return state;
        case LOGGEDIN_USER_PERMISSIONS:
             state['permissions'] = action.data || [];
             let permissionList = [];
             let departmentIds = [];
             let permissions = action.data || [];
             if(permissions) {
                permissions.forEach((p) => {
                  if(DEPARTMENT_APP_IDS.indexOf(p.applicationName) > -1) {
                    departmentIds.push(p.applicationName);
                  }
                  permissionList.push(p.applicationName);
                });
             }
             state['accessibleAppIds'] = permissionList;
             state['departmentIds'] = departmentIds;
             localStorage.setItem('userInfo', JSON.stringify(state));
             state.event = LOGGEDIN_USER_PERMISSIONS_SUCCESS;
             state['urlChange'] = action.urlChange ? {status: true, event: URL_CHANGE_PERMISSION } : {status: false, event: ''};
             return state;

        default:
            return state;
    }
}

export function resourceManagementReducer(state = initialResourceManagement, action) {

    switch (action.type) {
        case FETCH_RESOURCE_DETAILS:
        	//Removing any-one from the array
          //console.log('all resources', action.data);
          let userDTO = action.data;
          userDTO.forEach(resource => {
            resource = Object.assign(resource, resource.userDTO);
            resource['loggedIn'] = {
              userId : resource.id,
              status : resource.loginStatus
            };
            resource.roleName = resource.roles[0] && resource.roles[0].name;
          });

        	userDTO.forEach((object , index) => {
               if (object['id'] == -10) {
                  userDTO.splice(index, 1);
                }
           });
            state.users = userDTO;
            state.resourceGrid.sortedRows = userDTO;
            state.resourceGrid.allRows = userDTO;
            state.resourceGrid.totalCount = userDTO.length;
            state.resourceGrid.rows = GridUtil.fetchGridRecords(userDTO, state.resourceGrid, false);
            return state;
        case INITIALIZE_RESOURCE_GRID:
            state.resourceGrid.sortedRows = action.data.rows || state.resourceGrid.sortedRows;
            state.resourceGrid.size = action.data.size;
            state.resourceGrid.currentPage = action.data.currentPage || 1;
            state.resourceGrid.totalCount = action.data.totalCount || state.resourceGrid.totalCount;
            state.resourceGrid.rows = GridUtil.fetchGridRecords(action.data, state.resourceGrid, false);
            return state;

        case NEXT_PAGE_RESOURCE_GRID:
            state.resourceGrid.currentPage = action.data.currentPage;
            state.resourceGrid.rows = GridUtil.fetchGridRecords(action.data, state.resourceGrid, false);
            state['event'] = NEXT_PAGE_RESOURCE_GRID_EVENT;
            return state;

        case PREV_PAGE_RESOURCE_GRID:
            state.resourceGrid.currentPage = action.data.currentPage;
            state.resourceGrid.rows = GridUtil.fetchGridRecords(action.data, state.resourceGrid, false);
            state['event'] = PREV_PAGE_RESOURCE_GRID_EVENT;
            return state;

        case LICENSE_ERROR:
            state['event'] = 'LICENSE_ERROR';
            state['message'] = action.data.errorMsg;
            return state;
        case NEXT_PAGE_RESOURCE_MANAGEMENT_GRID:
            GridUtil.manageGridPagination('next', action.data, state.resourceGrid, false);
            return state;
        case PREV_PAGE_RESOURCE_MANAGEMENT_GRID:
            GridUtil.manageGridPagination('prev', action.data, state.resourceGrid, false);
            return state;
        case CONFIGURE_RESOURCE_MANAGEMENT_GRID_COLUMN:
            GridUtil.configureGridColumn(action.data, state.resourceGrid);
            return state;
        case SORT_RESOURCE_GRID:
            state.resourceGrid = GridUtil.manageSort(action.data, state.resourceGrid);
            return state;
        case PAGINATE_BY_INDEX_RESOURCE_GRID:
            state.resourceGrid.currentPage = action.data.currentPage || 1;
            state.resourceGrid.rows = GridUtil.fetchGridRecords(action.data, state.resourceGrid, false);
            state['event'] = PAGINATE_BY_INDEX_RESOURCE_GRID_EVENT;
            return state;
        case LOG_OUT_USER:
            let idToBeDeleted = action.data.id;
            state['event'] = 'LOG_OUT_USER';
            state.users.forEach(user => {
                if(user['loggedIn']['userId'] === idToBeDeleted) {
                    user['loggedIn']['status'] = false;
                }
            });

            return state;

        // case REFRESH_USERS_GRID:
        //       console.log('grid data, loggedin users data', state.users, action.data);
        //       state.users.forEach((user) => {
        //         let match = Object.keys(action.data).filter((id)=> {
        //           return parseInt(id) === user['loggedIn']['userId'];
        //         });
        //         if(match && match.length) {
        //           user['loggedIn']['status'] = true;
        //           console.log('match in user reduceer', match);
        //         } else {
        //           user['loggedIn']['status'] = false;
        //         }
        //       });

        //       state.resourceGrid.sortedRows = state.users;
        //       state.resourceGrid.totalCount = state.users.length;
        //       state.resourceGrid.rows = GridUtil.fetchGridRecords(state.users, state.resourceGrid, false);
        //       state.event = '';
        //      return state;
        case PROJECTS_ASSIGNED_TO_USERE_BY_ID:
            let userId = action.data.id;
            state.users.forEach(object => {
                if (object['id'] == userId) {
                    object['projectsAssigned'] = action.data.response;
                }
            });
            state.event = 'UPDATING_PROJECTS_ASSIGNED_TO_USER';
            return state;
         case EDIT_USER:
            action.data[0].numberOfProjectsAssociated = action.data[1].projectArray.length;
            userId = action.data[0].id;

            //updating state.resourceGrid.sortedRows
            state.resourceGrid.sortedRows.forEach((object , index) => {
                let id = object.id;
                if (userId === id) {
                    let oldObject = JSON.parse(JSON.stringify(state.resourceGrid.sortedRows[index]));
                    state.resourceGrid.sortedRows[index] = action.data[0];
                    state.resourceGrid.sortedRows[index]['loggedIn'] = oldObject['loggedIn'];
                }
            });

            //updatign state.resourceGrid.rows
            state.resourceGrid.rows.forEach((object , index) => {
                let id = object.id;
                if (userId === id) {
                    let oldObject = JSON.parse(JSON.stringify(state.resourceGrid.rows[index]));
                    state.resourceGrid.rows[index] = action.data[0];
                    state.resourceGrid.rows[index]['loggedIn'] = oldObject['loggedIn'];
                }
            });
            state['event'] = !action.data[0].accountEnabled ? 'TRIGGER_LOGOUT' : '';
            return state;
        case ALLOCATE_PROJECTS_TO_USER:
            userId = action.data.id;
            state.users.forEach(object => {
                if (object['id'] == userId) {
                    object['projectsAssigned'] = action.data.projecArray;
                }
            });
            return state;
        case ADD_USER:
            //Adding information of
            let userObject = action.data;
            userObject['loggedIn'] = {
                userId : userObject.id,
                status : 0
            };
            //updating state.users and state.resourceGrid.sortedrows
            state.users.push(action.data);
            state.event = 'ADD_USER';
            //updatign state.releaseSetupGrid.rows
            state.resourceGrid.totalCount = state.resourceGrid.sortedRows.length;
            state.resourceGrid.rows = GridUtil.fetchGridRecords(action.data, state.resourceGrid, false);
            return state;

          case CLEAR_RESOURCE_MANAGEMENT_EVENTS:
            state.event = '';
            state.message = '';
            return state ;
        default:
            return state;
    }
}
