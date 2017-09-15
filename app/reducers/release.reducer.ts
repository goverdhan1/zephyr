import { FETCH_RELEASES, FETCH_RELEASES_BY_PROJECT_ID, FETCH_RELEASE_BY_ID,
    FETCH_RELEASE_AUTOMATION_SUMMARY, FETCH_RELEASE_DETAILS_ONLY, FETCH_PHASE_TREE_BY_ID,
    FETCH_RELEASE_SUMMARIES, INITIALIZE_PROJECT_RELEASE_GRID,
    FETCH_RELEASES_BY_PROJECT_ID_UPDATING_GRID, NEXT_PAGE_PROJECT_RELEASE_GRID,
    PREV_PAGE_PROJECT_RELEASE_GRID, SORT_PROJECT_RELEASE_GRID, NEXT_PAGE_RELEASE_SETUP_GRID ,
    PREV_PAGE_RELEASE_SETUP_GRID , CLEAR_GADGET_RELEASE_EVENTS, EDIT_RELEASE , ADD_RELEASE , DELETE_RELEASE,
    CLEAR_RELEASE_EVENTS, SORT_RELEASE_GRID, GET_RELEASE_SETUP_GRID,SORT_RELEASE_SETUP_GRID} from '../utils/constants/action.types';
import {FETCH_RELEASE_SUMMARIES_SUCCESS, TRIGGER_LAST_RELEASE, FETCH_RELEASES_AUTOMATION_SUMMARY_SUCCESS}
from '../utils/constants/action.events';
import {PROJECT_RELEASE_GRID_PAGINATION } from '../view/components/projects/project_release_grid.constant';
import {RELEASE_GRID_PAGINATION} from '../view/components/release_setup/release_setup_grid.constant';
import {GridUtil} from '../view/components/grid/grid_util';
import {FETCH_RELEASES_SUCCESS} from '../utils/constants/action.events';

declare var _: any;
declare var window: any;
declare var moment: any;
export const GRID_ROW_COUNT_DEFAULT = 50;

const initialReleaseState = {
        'releases': [], //contains releases of current project selected
        'allReleases' : [], //contains all the releases of all the projects
        'releaseGrid': {
            sortedRows: [],
            rows: [],
            currentPage: 1,
            paginationOptions: PROJECT_RELEASE_GRID_PAGINATION,
            size: GRID_ROW_COUNT_DEFAULT,
            noData: false,
            totalCount: 0
        },
        automation: {
          project: '',
          release: '',
          total: '',
          automated: '',
          percent: 0
        },
        addedRelease: -1,
        'releaseSetupGrid' : {
            sortedRows: [],
            rows: [],
            currentPage: 1,
            paginationOptions: RELEASE_GRID_PAGINATION,
            size: GRID_ROW_COUNT_DEFAULT,
            noData: false,
            totalCount: 0
        },
        summaries: [],
        projectID: {},
        releaseId: 1,
        event: ''
    },
    initialSummaryState = [];

export function releaseReducer(state = initialReleaseState, action) {
    switch (action.type) {
        case FETCH_RELEASES:
          state.addedRelease = -1;
          if(action.data && action.data.length) {
              action.data.forEach((release) => {
                if(release['releaseStartDate']) {
                  release['startDate'] = moment(release['releaseStartDate'],'MM/DD/YYYY').startOf('day').unix()*1000;
                }
                if(release['releaseEndDate']) {
                  release['endDate'] = moment(release['releaseEndDate'],'MM/DD/YYYY').startOf('day').unix()*1000;
                }
              });
          }
          state.allReleases = action.data || state.allReleases;
          state['event'] = FETCH_RELEASES_SUCCESS;

          return state;
        case FETCH_RELEASES_BY_PROJECT_ID_UPDATING_GRID:
            state.addedRelease = -1;
            if (action.data[1]) {
              state['event'] = TRIGGER_LAST_RELEASE;
            } else {
              state['event'] = FETCH_RELEASES_SUCCESS;
            }
            if(action.data[0] && action.data[0].length) {
              action.data[0].forEach((release) => {
                if(release['releaseStartDate']) {
                  release['startDate'] = moment(release['releaseStartDate'],'MM/DD/YYYY').startOf('day').unix()*1000;
                }
                if(release['releaseEndDate']) {
                  release['endDate'] = moment(release['releaseEndDate'],'MM/DD/YYYY').startOf('day').unix()*1000;
                }
              });
            }
            state.releases = action.data[0];


            // state.releaseGrid.totalCount = action.data[0].length;

            // Updating the release-setup grid also, since same action is being used
            state.releaseSetupGrid.sortedRows = action.data[0];
            let visibleReleases = action.data[0].filter(release => !release.status);
            state.releaseGrid.sortedRows = visibleReleases;
            state.releaseGrid.totalCount = visibleReleases.length;
            state.releaseSetupGrid.totalCount = state.releases.length;
            state.releaseSetupGrid.currentPage = 1;
            state.releaseSetupGrid.rows = GridUtil.fetchGridRecords(action.data[0], state.releaseSetupGrid, false);
            state.releaseGrid.rows = GridUtil.fetchGridRecords(action.data[0], state.releaseGrid, false);
            state.event = FETCH_RELEASES_BY_PROJECT_ID_UPDATING_GRID;
            return state;

        case FETCH_RELEASE_AUTOMATION_SUMMARY:
            if (action.data) {
              state.automation.total = action.data.totalTestcaseCount;
              state.automation.project = action.data.projectName;
              state.automation.release = action.data.releaseName;
              state.automation.automated = action.data.automatedTestcaseCount;
              state.automation.percent =
                action.data.totalTestcaseCount > 0 ? (action.data.automatedTestcaseCount * 100 / action.data.totalTestcaseCount) : 0;
              state.event = FETCH_RELEASES_AUTOMATION_SUMMARY_SUCCESS + action.gadgetId;
              state['gadgetId'] = action.gadgetId;
            }

            return state;
        case FETCH_RELEASES_BY_PROJECT_ID:
            state.addedRelease = -1;
            state.releases = action.data || state;
            return state;
        case FETCH_RELEASE_BY_ID:
            state.addedRelease = -1;
            state.releases.push(Object.assign({}, action.data));
            return state;
        case INITIALIZE_PROJECT_RELEASE_GRID:
            state.releaseGrid.size = action.data.size;
            state.releaseGrid.currentPage = action.data.currentPage || 1;
            state.releaseGrid.rows = GridUtil.fetchGridRecords(action.data, state.releaseGrid, false);
            return state;
        case NEXT_PAGE_PROJECT_RELEASE_GRID:
            state.releaseGrid.currentPage = action.data.currentPage;
            GridUtil.manageGridPagination('next', action.data, state.releaseGrid, false);
            return state;
        case PREV_PAGE_PROJECT_RELEASE_GRID:
            state.releaseGrid.currentPage = action.data.currentPage;
            GridUtil.manageGridPagination('prev', action.data, state.releaseGrid, false);
            return state;
        case SORT_PROJECT_RELEASE_GRID:
            state.releaseGrid = GridUtil.manageSort(action.data, state.releaseGrid);
            return state;
        case SORT_RELEASE_GRID:
            state.releaseSetupGrid = GridUtil.manageSort(action.data, state.releaseGrid);
            return state;
        case SORT_RELEASE_SETUP_GRID:
            state.releaseSetupGrid = GridUtil.manageSort(action.data, state.releaseSetupGrid);
            return state;
        case NEXT_PAGE_RELEASE_SETUP_GRID:
            state.releaseSetupGrid.currentPage = action.data.currentPage;
            GridUtil.manageGridPagination('next', action.data, state.releaseSetupGrid, false);
            return state;
        case PREV_PAGE_RELEASE_SETUP_GRID:
            state.releaseSetupGrid.currentPage = action.data.currentPage;
            GridUtil.manageGridPagination('prev', action.data, state.releaseSetupGrid, false);
            return state;
        case GET_RELEASE_SETUP_GRID:
            state.releaseSetupGrid.size = action.data.size;
            state.releaseSetupGrid.currentPage = action.data.currentPage || 1;
            state.releaseSetupGrid.rows = GridUtil.fetchGridRecords(action.data, state.releaseSetupGrid, false);
            return state;
        case EDIT_RELEASE:
              let releaseId = action.data.id;
              if(action.data) {
                if(action.data['releaseStartDate']) {
                  action.data['startDate'] = moment(action.data['releaseStartDate'],'MM/DD/YYYY').startOf('day').unix()*1000;
                }
                if(action.data['releaseEndDate']) {
                  action.data['endDate'] = moment(action.data['releaseEndDate'],'MM/DD/YYYY').startOf('day').unix()*1000;
                }
              }
              //updating state.releases
              state.releases.forEach((object , index) => {
                  var id = object.id;
                  if (releaseId === id) {
                      state.releases[index] = action.data;
                  }
              });

              //updating state.allReleases
              state.allReleases.forEach((object , index) => {
                  var id = object.id;
                  if (releaseId === id) {
                      state.allReleases[index] = action.data;
                  }
              });

              //updating state.releaseSetupGrid.sortedRows
              state.releaseSetupGrid.sortedRows.forEach((object , index) => {
                  var id = object.id;
                  if (releaseId === id) {
                      state.releaseSetupGrid.sortedRows[index] = action.data;
                  }
              });

              //updatign state.releaseSetupGrid.rows
              state.releaseSetupGrid.rows.forEach((object , index) => {
                  var id = object.id;
                  if (releaseId === id) {
                      state.releaseSetupGrid.rows[index] = action.data;
                  }
              });

              //updating currentRelease local storage
              let currentRelease = localStorage.getItem(`${window.tab}-currentRelease`) && JSON.parse(localStorage.getItem(`${window.tab}-currentRelease`));
              if (currentRelease && currentRelease.id == releaseId ) {
                  currentRelease.text = action.data.name;
                  localStorage.setItem(`${window.tab}-currentRelease` , JSON.stringify(currentRelease));
              }

             return state;
          case ADD_RELEASE:
                //updating state.releases
                if(action.data) {
                  if(action.data['releaseStartDate']) {
                    action.data['startDate'] = moment(action.data['releaseStartDate'],'MM/DD/YYYY').startOf('day').unix()*1000;
                  }
                  if(action.data['releaseEndDate']) {
                    action.data['endDate'] = moment(action.data['releaseEndDate'],'MM/DD/YYYY').startOf('day').unix()*1000;
                  }
                }
                state.releases.push(action.data);

                //updating state.releaseSetupGrid.sortedrows
                let toBeAdded = true;
                state.releaseSetupGrid.sortedRows.forEach((object , index) => {
                  var id = object.id;
                  if (action.data.id == id) {
                      toBeAdded = false;
                  }
                });
                if (toBeAdded) {
                  state.releaseSetupGrid.sortedRows.push(action.data);
                }


                //updating state.releaseSetupGrid.rows
                toBeAdded = true;
                state.releaseSetupGrid.rows.forEach((object , index) => {
                  var id = object.id;
                  if (action.data.id == id) {
                      toBeAdded = false;
                  }
                });
                if (toBeAdded) {
                  state.releaseSetupGrid.rows.push(action.data);
                }

                state.addedRelease = action.data.id;
                //updating state.allReleases
                state.allReleases.push(action.data);

                //updatign state.releaseSetupGrid.rows
                state.releaseSetupGrid.totalCount = state.releaseSetupGrid.sortedRows.length;
                state.releaseSetupGrid.rows = GridUtil.fetchGridRecords(action.data, state.releaseSetupGrid, false);
                state['event'] = TRIGGER_LAST_RELEASE;
               return state;
          case DELETE_RELEASE:
                let idToBeDeleted = action.data.id;
                //updating state.releases
                state.releases.forEach(function(result, index) {
                    if (result['id'] == idToBeDeleted) {
                        state.releases.splice(index, 1);
                    }
                });

                //updating state.allReleases
                state.allReleases.forEach(function(result, index) {
                    if (result['id'] == idToBeDeleted) {
                        state.allReleases.splice(index, 1);
                    }
                });

                //updating state.releaseSetupGrid.sortedRows
                state.releaseSetupGrid.sortedRows.forEach(function(result, index) {
                    if (result['id'] == idToBeDeleted) {
                        state.releaseSetupGrid.sortedRows.splice(index, 1);
                    }
                });

                //updating state.releaseSetupGrid.rows
                state.releaseSetupGrid.rows.forEach(function(result, index) {
                    if (result['id'] == idToBeDeleted) {
                        state.releaseSetupGrid.rows.splice(index, 1);
                    }
                });
                state.releaseSetupGrid.totalCount = state.releaseSetupGrid.sortedRows.length;
                state.releaseSetupGrid.rows = GridUtil.fetchGridRecords(action.data, state.releaseSetupGrid, false);

               return state;
        case FETCH_RELEASE_SUMMARIES:
            state['summaries'] = action.data;
            state['event'] = FETCH_RELEASE_SUMMARIES_SUCCESS;
            return state;
        case CLEAR_RELEASE_EVENTS:
            state['event'] = '';
            return state;

        case FETCH_RELEASE_DETAILS_ONLY:
            state.event = 'FETCH_RELEASE_DETAILS_ONLY';
            state.projectID = action.projectID;
            return state;
        case FETCH_PHASE_TREE_BY_ID:
            try {
                state.releaseId = action.data[0].result.releaseId;
            } catch (err) {
                state.releaseId = 1;
            }
            state.event = 'FETCH_PHASE_TREE';
            return state;
        default:
            return state;
    }
}
