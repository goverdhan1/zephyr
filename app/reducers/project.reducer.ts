import {
  FETCH_PROJECT_SUMMARIES, FETCH_PROJECT_DETAILS_BY_ID, FETCH_ALL_PROJECTS, NEXT_PAGE_PROJECT_SETUP_GRID
  , PREV_PAGE_PROJECT_SETUP_GRID, EDIT_PROJECT, DELETE_PROJECT, ADD_PROJECT,
  FETCH_PROJECT_DETAILS, CLEAR_PROJECTS_EVENTS, FETCH_USER_ALLOCATED_PROJECT_DETAILS,
  FETCH_USER_ALLOCATED_PROJECT_DETAILS_WITH_EVENT, FETCH_USERS_ALLOCATED_TO_PROJECTS, REDIRECT_LOGIN,
  SORT_PROJECTSETUP_GRID, CLEAR_PROJECT_SETUP_EVENTS, FETCH_USER_ALLOCATED_PROJECT_DETAILS_WITHOUT_EVENT,
  INITIALIZE_PROJECTSETUP_GRID, NEXT_PAGE_PROJECTSETUP_GRID, PREV_PAGE_PROJECTSETUP_GRID,
  PAGINATE_BY_INDEX_PROJECTSETUP_GRID, FETCH_ALL_PROJECTS_LITE, CLEAR_PROJECT_EVENT, FETCH_PROJECT_DETAILS_BY_ID_SUCCESS
} from '../utils/constants/action.types';
import {PROJECT_SETUP_GRID_PAGINATION , PROJECT_SETUP_GRID_OPTIONS} from '../view/components/project_setup/project_setup.constants';
import {GridUtil} from '../view/components/grid/grid_util';
import {FETCH_ALLOCATED_PROJECTS_SUCCESS, ADD_PROJECT_SUCCESS, PREV_PAGE_PROJECTSETUP_GRID_EVENT, NEXT_PAGE_PROJECTSETUP_GRID_EVENT,
        REDIRECT_TO_LOGIN, FETCH_USER_ALLOCATED_PROJECT_DETAILS_SUCCESS , PAGINATE_BY_INDEX_PROJECTSETUP_GRID_EVENT} from '../utils/constants/action.events';
import {LEAD_ROLE_ID} from '../view/components/admin/customizations/customizations.constant';
declare var moment: any;
const initialState = {};
const initialSummaryState = {};
const initialProjectsUsersState = {};
const initialProjectSetup = {
    'projectSetupGrid' : {
        sortedRows: [],
        allRows: [],
        rows: [],
        currentPage: 1,
        paginationOptions: PROJECT_SETUP_GRID_PAGINATION,
        size: PROJECT_SETUP_GRID_OPTIONS.rowCount,
        noData: false,
        totalCount: 0
    },
    'event': ''
};
const initialProjectsState = {
    event: '',
    projects: [],
    userAllocatedProjects: [],
    projectsLite: [],
    releaseDetails: {}
};

export function projectReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_PROJECT_DETAILS_BY_ID:
            state = action.data;
            if(state['projectStartDate']) {
              state['startDate'] = moment(state['projectStartDate'],'MM/DD/YYYY').startOf('day').unix()*1000;
            }
            if(state['projectEndDate']) {
              state['endDate'] = moment(state['projectEndDate'],'MM/DD/YYYY').startOf('day').unix()*1000;
            }

            state['event'] = FETCH_PROJECT_DETAILS_BY_ID_SUCCESS;
            return state;


        case CLEAR_PROJECT_EVENT:
          state['event'] = '';
          return state;

        default:
            return state;
    }
}

export function projectSummariesReducer(state = initialSummaryState, action) {
    switch (action.type) {
        case FETCH_PROJECT_SUMMARIES:
            state = action.data;
            return state;
        default:
            return state;
    }
}
export function projectSetupReducer(state = initialProjectSetup, action) {

    switch (action.type) {
        case FETCH_ALL_PROJECTS:
            let manipulatedData = [];
            action.data.forEach(project => {
                let projectObject = {};
                projectObject = project.projectDto;
                if(projectObject['projectStartDate']) {
                  projectObject['startDate'] = moment(projectObject['projectStartDate'],'MM/DD/YYYY').startOf('day').unix()*1000;
                }
                if(projectObject['projectEndDate']) {
                  projectObject['endDate'] = moment(projectObject['projectEndDate'],'MM/DD/YYYY').startOf('day').unix()*1000;
                }
                projectObject['totalResources'] = project.totalResources;
                projectObject['lead'] = {};
                projectObject['lead']['username'] = project.username;
                projectObject['lead']['firstname'] = project.firstname;
                projectObject['lead']['lastname'] = project.lastname;
                let leadMember = project.projectDto.members.filter(member=> {
                            return member.role && member.role.id == LEAD_ROLE_ID;
                });
                if (leadMember.length > 0) {
                   projectObject['lead']['id'] = leadMember[0].userId;
                }
                manipulatedData.push(projectObject);
            });
            state.projectSetupGrid.sortedRows = manipulatedData;
            state.projectSetupGrid.allRows = manipulatedData;
            state.projectSetupGrid.totalCount = manipulatedData.length;
            state.projectSetupGrid.rows = GridUtil.fetchGridRecords(manipulatedData, state.projectSetupGrid, false);
            return state;
        case SORT_PROJECTSETUP_GRID:
             state.projectSetupGrid = GridUtil.manageSort(action.data, state.projectSetupGrid);
             return state;
         case EDIT_PROJECT:
             if(action.data['projectStartDate']) {
               action.data['startDate'] = moment(action.data['projectStartDate'],'MM/DD/YYYY').startOf('day').unix()*1000;
             }
             if(action.data['projectEndDate']) {
               action.data['endDate'] = moment(action.data['projectEndDate'],'MM/DD/YYYY').startOf('day').unix()*1000;
             }
             let projectId = action.data.id;
             //manipulating project object
             action.data.totalResources = action.data.members.length;
             let leadMember = action.data.members.filter(member=> {
                        return member.role && member.role.id == LEAD_ROLE_ID;
             });
             if (leadMember.length > 0) {
                action.data['lead'] = {};
               action.data['lead']['id'] = leadMember[0].userId;
              }

             //updating state.projectSetupGrid.sortedRows
             state.projectSetupGrid.sortedRows.forEach((object , index) => {
                 var id = object.id;
                 if (projectId === id) {
                     state.projectSetupGrid.sortedRows[index] = action.data;
                 }
             });

             //updatign state.projectSetupGrid.rows
             state.projectSetupGrid.rows.forEach((object , index) => {
                 var id = object.id;
                 if (projectId === id) {
                     state.projectSetupGrid.rows[index] = action.data;
                 }
             });
             return state;
         case DELETE_PROJECT:
               let idToBeDeleted = action.data.id;
               state.projectSetupGrid.sortedRows.forEach((object , index) => {
                   if (object['id'] == idToBeDeleted) {
                      state.projectSetupGrid.sortedRows.splice(index, 1);
                  }
               });
               state.projectSetupGrid.totalCount = state.projectSetupGrid.sortedRows.length;
               state.projectSetupGrid.rows = GridUtil.fetchGridRecords(action.data, state.projectSetupGrid, false);
              return state;
        case ADD_PROJECT:
            //manipulating project object
            if(action.data['projectStartDate']) {
              action.data['startDate'] = moment(action.data['projectStartDate'],'MM/DD/YYYY').startOf('day').unix()*1000;
            }
            if(action.data['projectEndDate']) {
              action.data['endDate'] = moment(action.data['projectEndDate'],'MM/DD/YYYY').startOf('day').unix()*1000;
            }
            action.data.totalResources = action.data.members.length;
            leadMember = action.data.members.filter(member => member.role && member.role.id == LEAD_ROLE_ID);
            if (leadMember.length > 0) {
               action.data['lead'] = {};
              action.data['lead']['id'] = leadMember[0].userId;
             }
             //updating state.projectSetupGrid.sortedrows
            state.projectSetupGrid.sortedRows.push(action.data);

            //updatign state.projectSetupGrid.rows
            state.projectSetupGrid.totalCount = state.projectSetupGrid.sortedRows.length;
            state.projectSetupGrid.rows = GridUtil.fetchGridRecords(action.data, state.projectSetupGrid, false);
            state['event'] = ADD_PROJECT_SUCCESS;
            return state;
        case CLEAR_PROJECT_SETUP_EVENTS:
            state['event'] = '';
            return state;

        case INITIALIZE_PROJECTSETUP_GRID:
            state.projectSetupGrid.sortedRows = action.data.rows || state.projectSetupGrid.sortedRows;
            state.projectSetupGrid.size = action.data.size;
            state.projectSetupGrid.currentPage = action.data.currentPage || 1;
            state.projectSetupGrid.totalCount = action.data.totalCount || state.projectSetupGrid.totalCount;
            state.projectSetupGrid.rows = GridUtil.fetchGridRecords(action.data, state.projectSetupGrid, false);
            return state;
        case NEXT_PAGE_PROJECTSETUP_GRID:
             state.projectSetupGrid.currentPage = action.data.currentPage;
             state.projectSetupGrid.rows = GridUtil.fetchGridRecords(action.data, state.projectSetupGrid, false);
             state['event'] = NEXT_PAGE_PROJECTSETUP_GRID_EVENT;
             return state;
        case PREV_PAGE_PROJECTSETUP_GRID:
             state.projectSetupGrid.currentPage = action.data.currentPage;
             state.projectSetupGrid.rows = GridUtil.fetchGridRecords(action.data, state.projectSetupGrid, false);
              state['event'] = PREV_PAGE_PROJECTSETUP_GRID_EVENT;
             return state;
        case PAGINATE_BY_INDEX_PROJECTSETUP_GRID:
             state.projectSetupGrid.currentPage = action.data.currentPage;
             state.projectSetupGrid.rows = GridUtil.fetchGridRecords(action.data, state.projectSetupGrid, false);
             state['event'] = PAGINATE_BY_INDEX_PROJECTSETUP_GRID_EVENT;
             return state;
        default:
            return state;
    }
}

export function projectsReducer(state = initialProjectsState, action) {
    switch (action.type) {
        case FETCH_PROJECT_DETAILS:
            state['projects'] = action.data;
            return state;
        case FETCH_USER_ALLOCATED_PROJECT_DETAILS:
            state.userAllocatedProjects = action.data;
            localStorage.setItem('userAllocatedProjects', action.data);
            state['event'] = FETCH_USER_ALLOCATED_PROJECT_DETAILS_SUCCESS;
            return state;
        case FETCH_USER_ALLOCATED_PROJECT_DETAILS_WITH_EVENT:
            state.userAllocatedProjects = action.data;
            state['event'] = FETCH_ALLOCATED_PROJECTS_SUCCESS;
            return state;
        case FETCH_USER_ALLOCATED_PROJECT_DETAILS_WITHOUT_EVENT:
            state.userAllocatedProjects = action.data[0];
            state.releaseDetails = action.data[2];
            return state;
        case FETCH_ALL_PROJECTS_LITE:
            state.projectsLite = action.data;
            if(state['projectStartDate']) {
              state['startDate'] = moment(state['projectStartDate'],'MM/DD/YYYY').startOf('day').unix()*1000;
            }
            if(state['projectEndDate']) {
              state['endDate'] = moment(state['projectEndDate'],'MM/DD/YYYY').startOf('day').unix()*1000;
            }
            return state;
        case CLEAR_PROJECTS_EVENTS:
            state['event'] = '';
            return state;
        case REDIRECT_LOGIN:
            state['event'] = REDIRECT_TO_LOGIN;
            return state;
        default:
            return state;
    }
}

export function projectsUsersMappingReducer(state = initialProjectsUsersState, action) {
    switch (action.type) {
        case FETCH_USERS_ALLOCATED_TO_PROJECTS:
            state = action.data;
            return state;
        default:
            return state;
    }
}
