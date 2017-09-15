import {
  GET_FIELDS_DEFECTS, SET_FIELDS_DEFECTS, FETCH_DEFECT_SUMMARIES, FETCH_DEFECT_DETAILS,
  SORT_DEFECT_DETAILS_GRID, NEXT_PAGE_DEFECT_DETAILS, PREV_PAGE_DEFECT_DETAILS,
  EXPORT_DEFECTS, SORT_DEFECTS_SEARCH_GRID, UPDATE_DEFECT_SEARCH_GRID_SIZE,
  NEXT_PAGE_DEFECTS_SEARCH_GRID, PREV_PAGE_DEFECTS_SEARCH_GRID, RESET_DEFECT_DETAILS,
  FETCH_DEFECTS_SEARCH_FILTERS, FETCH_DEFECT_BY_ID, FETCH_DEFECTS_BY_JQL,
  FETCH_DEFECTS_BY_FILTERS, FETCH_CURRENTLY_LINKED_DEFECTS, DELETE_DEFECT_USER,
  SEARCH_DEFECTS_TO_LINK, DELETE_MAPPED_SCHEDULE, FETCH_DEFECTS_DETAILS_FILTERS,
  FETCH_DEFECT_SUMMARIES_SUCCESS, CLEAR_DEFECT_SUMMARY_EVENT, FETCH_ISSUE_METADATA_FOR_CREATE,
  FETCH_ISSUE_METADATA, CLEAR_LINK_NEW_DEFECT_EVENT, CREATE_DEFECT, UPDATE_DEFECT_GRID_UPDATE,
  CLEAR_DEFECT_DETAILS_EVENT, UPDATE_DEFECT_SEARCH_GRID_TYPE, CLEAR_DEFECT_USER_EVENT,
  GET_JIRA_PROJECTS, GET_ISSUE_TYPES, MAP_DEFECT_SCHEDULE, UPDATE_DEFECT_USER, RESET_DEFECT_SEARCH_JQL,
  SORT_DEFECTS_LINK_SEARCH_GRID, SAVE_DEFECT_ATTACHMENT_DATA, CREATE_DEFECT_FOR_TRACKING_PAGE,
  SORT_CURRENTLY_LINKED_DEFECTS_GRID, RESET_DEFECT_SEARCH, RESET_CURRENTLY_LINKED_DEFECTS,
  CLEAR_CURRENTLY_LINKED_DEFECT_EVENT, UPDATE_ARRAY_FIELDS_KEY, UPDATE_DEFECT_DETAILS_GRID_SIZE,
  CELAR_DEFECT_EVENT, DEFECTS_BASIC_SEARCH, DEFECT_UPDATE_LIGHT_METADATA_BY_PROJECT,
  NEXT_PAGE_DEFECTS_LINK_SEARCH, PREV_PAGE_DEFECTS_LINK_SEARCH, CLEAR_DEFECT_SEARCH_EVENT,
  GET_DEFECT_USER, GET_ADMIN_SETUP_DEFECT_USER, FETCH_DEFECTS_BY_FILTERS_DEFECT_DETAIL,
  FETCH_DEFECT_BY_ID_DEFECT_DETAIL, FETCH_DEFECTS_BY_JQL_DEFECT_DETAIL, FETCH_OPEN_DEFECT_SUMMARY,
  FETCH_OPEN_DEFECT_SUMMARY_SUCCESS, CLEAR_DEFECT_IMPORT_ALL_ROWS, DEFECT_LIGHT_METADATA_BY_PROJECT,
  GET_DEFECT_BULK_METADATA, UPDATE_BULK_DEFECT, CLEAR_DEFECTS_LICENSE, GET_JIRA_PROJECTS_FOR_FILE_DEFECT,
  UPDATE_CURRENTLY_LINKED_GRID, CLEAR_DEFECT_DETAILS_ALL_ROWS, SORT_IMPORT_JIRA_GRID
} from '../utils/constants/action.types';
import {SET_FIELDS_DEFECTS_SUCCESS} from '../utils/constants/action.events';
import { DEFECT_TRACKING_SEARCH_GRID_COLUMNS, DEFECT_TRACKING_SEARCH_GRID_PAGINATION }
 from '../view/components/defects/defect_tracking/search/defect_tracking_search.constants';
import { DEFECTS_LINK_SEARCH_GRID_COLUMNS, DEFECTS_LINK_SEARCH_GRID_PAGINATION }
  from '../view/components/defects/defect_tracking/search/defects_link_search.constants';
import { CURRENTLY_LINKED_DEFECTS_GRID_COLUMNS, CURRENTLY_LINKED_DEFECTS_GRID_PAGINATION }
 from '../view/components/defects/defect_link/currently_linked/currently_linked_defects.constants';
import { IMPORT_JIRA_GRID_COLUMNS, IMPORT_JIRA_GRID_PAGINATION }
 from '../view/components/requirements/operations/import_jira_grid.constants';

 import {FETCH_ISSUE_METADATA_SUCCESS, CREATE_DEFECT_SUCCESS, UPDATE_DEFECT_GRID_UPDATE_SUCCESS, EXPORT_DEFECTS_SUCCESS,
    FETCH_JIRA_PROJECTS_SUCCESS, RESET_DEFECT_SEARCH_SUCCESS,
    MAP_DEFECT_SCHEDULE_SUCCESS, MAPPED_SCHEDULE_DELETION_SUCCESS, FETCH_ISSUE_METADATA_FOR_CREATE_SUCCESS,
    UPDATE_DEFECT_SEARCH_SUCCESS, UPDATE_DEFECT_DETAILS_SUCCESS,
    CREATE_DEFECT_FOR_TRACKING_PAGE_SUCCESS, GET_FIELDS_DEFECTS_SUCCESS} from '../utils/constants/action.events';

import {GridUtil} from '../view/components/grid/grid_util';

declare var _:any;
export const GRID_ROW_COUNT_DEFAULT = 50;

const initialLicenseState = {};
const initialDefectSummaryState = {
    defects: [],
    gadgetId: '',
    event:''
};

const initialDefectDetailsState = {
    grid: {
        sortedRows: [],
        rows: [],
        allRows: [],
        columns: DEFECT_TRACKING_SEARCH_GRID_COLUMNS,
        currentPage: 1,
        paginationOptions:  _.cloneDeep(DEFECT_TRACKING_SEARCH_GRID_PAGINATION),
        size: GRID_ROW_COUNT_DEFAULT,
        totalCount: 0,
        offset: 0,
        noData: false,
        event: ''
    },
    exportDownloadLink: null,
    event: '',
    filters: [],
    isBulkUpdated:false,
    updatedDefect: null
};

const initialDefectsSearchState = {
    grid: {
        sortedRows: [],
        rows: [],
        allRows: [],
        columns: null,
        currentPage: 1,
        paginationOptions: null,
        size: 50,
        totalCount: 0,
        offset: 0,
        noData: false
    },
    metaDataByproject: {},
    filters: [],
    jqlQuery: null,
    gridType: null,
    event: ''
};

const initialCurrentlyLinkedDefectsState = {
    grid: {
        sortedRows: [],
        rows: [],
        columns: CURRENTLY_LINKED_DEFECTS_GRID_COLUMNS,
        currentPage: 1,
        paginationOptions: CURRENTLY_LINKED_DEFECTS_GRID_PAGINATION,
        size: 10000,
        totalCount: 0,
        offset: 0,
        noData: false
    },
    event: ''
};

const resetInitialCurrentlyLinkedDefObj = _.cloneDeep(initialCurrentlyLinkedDefectsState);

const initialLinkNewDefectState = {
    issueMetaData: {},
    jiraProjects: [],
    issueTypes: [],
    arrayFieldsKey: [],
    attachmentData: [],
    event: '',
    defect:{}
};

const initialDefectUserState = {
    user: {},
    adminSetupState: 'ERROR',
    event: ''
};

const initialDefectsSearchFilter = {
    jiraProjects: [],
    issueTypes: [],
    issueStatus: [],
    projectVersions: [],
    issuePriority: [],
    event: ''
};

export function defectsLicense(state = initialLicenseState, action) {

    switch (action.type) {

      case GET_FIELDS_DEFECTS:

        if (action.data.isDefectForm) {
          Object.keys(action.data).forEach((k) => {
            var key = k;
            var value = action.data[k];
            state[key] = value;
          });
          state['event'] = GET_FIELDS_DEFECTS_SUCCESS;
        }

        return state;

      case SET_FIELDS_DEFECTS:
        Object.keys(action.data).forEach((k) => {
          var key = k;
          var value = action.data[k];
          state[key] = value;
        });
        state['event'] = SET_FIELDS_DEFECTS_SUCCESS;
        return state;
        case CLEAR_DEFECTS_LICENSE:
            state['event'] = '';
            return state;
        default:
            return state;
    }
}

export function defectSummaries(state = initialDefectSummaryState, action) {
    let noStatusData = [
        {'name': 'Defects Filed', 'count': 0},
        {'name': 'To Do', 'count': 0},
        {'name': 'In Progress', 'count': 0},
        {'name': 'Done', 'count': 0}
    ];
    switch (action.type) {
        case FETCH_OPEN_DEFECT_SUMMARY:
            state.gadgetId = action.data.gadgetId;
            state.defects = action.data;
            state.event = FETCH_OPEN_DEFECT_SUMMARY_SUCCESS + action.data.gadgetId;
            return state;
        case FETCH_DEFECT_SUMMARIES:
            state.gadgetId = action.data.gadgetId;
            state.defects = [];
            let statuses = action.data.defect && action.data.defect.statuses || [];
            let totalDefectCount = action.data.defect && action.data.defect.totalDefectCount;
            let tempObj = {};
            _.find(noStatusData, {name: 'Defects Filed'})['count'] = totalDefectCount || 0;
            statuses.forEach((status) => {
                let obj = _.find(noStatusData, {name: status.status});
                if(obj) {
                    obj['class'] = 'zee-align-center';
                    obj['name'] = status.status;
                    obj['count'] = status.defectCount || 0;
                    let projectsPerStatus = status.projectWithDefectCount;
                    if(projectsPerStatus && projectsPerStatus.length && status.status === 'To Do') {
                        obj['hoverItems'] = [];
                        projectsPerStatus.forEach((project) => {
                            obj['hoverItems'].push({
                                name: project.name,
                                count: project.defectCount || 0,
                                highlightCount: false
                            });
                        });
                    }
                }
            });

            state.defects = noStatusData;

            state.event = FETCH_DEFECT_SUMMARIES_SUCCESS;

            return state;

        case CLEAR_DEFECT_SUMMARY_EVENT:
            state.gadgetId = '';
            state.event = '';
            return state;

        default:
            return state;
    }
}

export function defectDetails(state = initialDefectDetailsState, action) {

    function parseDefectsPerTestcycles(defects, data, state) {

        state.grid.totalCount = data.defectsData && data.defectsData.maxResult;
        state.grid.offset = data.offset ? data.offset : 0;
        state.grid.currentPage = data.currentPage || 1;

        if(defects && !(defects instanceof Array)) {
            defects = [defects];
            state.grid.totalCount = defects.length;
        }

        defects.forEach((defect) => {

            // init all testcases array
            let testcases = [];

            // get associated phases with testcases
            let phasesWithTestcases = defect.cyclePhaseWithTestcase;

            // for each testcase assign cycleId
            for(let phaseId in phasesWithTestcases) {

                //get testcases per phase
                let testcasesPerPhase = phasesWithTestcases[phaseId];

                //get cycleId of phase
                let cycleIdOfPhase = defect.cyclePhaseWithCycleIds[phaseId];

                //assign cycleId to each testcase
                testcasesPerPhase.forEach(testcaseObj => {
                    let cycleObj = defect.cycleIdsWithCycle[cycleIdOfPhase];
                    testcaseObj['cycleId'] = cycleIdOfPhase;
                    testcaseObj['cycleName'] = cycleObj.name;
                });

                // add each testcase to all testcases array
                testcases = testcases.concat(testcasesPerPhase);
            }
            // above loop gives all testcases across all phases

            // remove duplicate testcases
            let tests = [];
            testcases.forEach((testcase) => {
                if(!(_.find(tests, {id: testcase.id, cycleId: testcase.cycleId}))) {
                    tests.push(testcase);
                }
            });

            // sort by cycleName
            tests = _.sortBy(tests, 'cycleName');

            // assign testcases to defect
            defect['testcases'] = tests;
        });

        state.grid.sortedRows = defects;
        state.grid.rows = GridUtil.fetchGridRecords(defects, state.grid, true);

        state.grid.allRows = state.grid.allRows.concat(state.grid.rows);

        state.grid.paginationOptions.show = (state.grid.rows.length === 1) ? false : true;

        return state;
    }

    switch (action.type) {
        case FETCH_DEFECT_DETAILS:
            let defects = action.data.defectsData && action.data.defectsData.bugsList;
            return parseDefectsPerTestcycles(defects, action.data, state);
        case CLEAR_DEFECT_DETAILS_EVENT:
            state.event = '';
            return state;
        case SORT_DEFECT_DETAILS_GRID:
            state.grid = GridUtil.manageSort(action.data, state.grid);
            return state;
        case NEXT_PAGE_DEFECT_DETAILS:
            state.event = NEXT_PAGE_DEFECT_DETAILS;
            state.grid.offset = action.data.offset;
            state.grid.currentPage = action.data.currentPage;
            state.grid.totalCount = action.data.defectsData.maxResult;
            GridUtil.manageGridPagination('next', action.data.defectsData.bugsList, state.grid, true);
            return state;
        case PREV_PAGE_DEFECT_DETAILS:
            state.event = PREV_PAGE_DEFECT_DETAILS;
            state.grid.offset = action.data.offset;
            state.grid.currentPage = action.data.currentPage;
            state.grid.totalCount = action.data.defectsData.maxResult;
            GridUtil.manageGridPagination('prev', action.data.defectsData.bugsList, state.grid, true);
            return state;
        case EXPORT_DEFECTS:
            state.event = EXPORT_DEFECTS_SUCCESS;
            state.exportDownloadLink = action.data;
            return state;
        case UPDATE_DEFECT_DETAILS_GRID_SIZE:
            state.grid.size = action.data.size;
            state.grid.currentPage = action.data.currentPage;
            state.event = UPDATE_DEFECT_DETAILS_SUCCESS;
            return state;
        case FETCH_DEFECT_BY_ID_DEFECT_DETAIL:
            let defect = action.data;
            return parseDefectsPerTestcycles(defect, action.data, state);
        case FETCH_DEFECTS_BY_JQL_DEFECT_DETAIL:
            let defectsObj = action.data.defectsData && action.data.defectsData.bugsList;
            return parseDefectsPerTestcycles(defectsObj, action.data, state);
        case FETCH_DEFECTS_BY_FILTERS_DEFECT_DETAIL:
            let defectsList = action.data.defectsData && action.data.defectsData.bugsList;
            return parseDefectsPerTestcycles(defectsList, action.data, state);
        case FETCH_DEFECTS_DETAILS_FILTERS:
            let filters = Object.keys(action.data).map(key => ({
                id: key,
                text: action.data[key]
            }));

            state.filters = _.orderBy(filters, [filter => filter.text.toLowerCase()], ['asc']);
            state.event = 'FETCH_DEFECTS_DETAILS_FILTERS';
            return state;
        case DEFECTS_BASIC_SEARCH:
            let defectsBasicResults = action.data.defectsData && action.data.defectsData.bugsList;
            return parseDefectsPerTestcycles(defectsBasicResults, action.data, state);
        case UPDATE_DEFECT_GRID_UPDATE:
            let defectObj = action.data;
            let index = _.findIndex(state.grid.sortedRows, {id : defectObj.id});
            state.grid.sortedRows[index] = defectObj;
            state.grid.rows[index] = defectObj;
            state.updatedDefect = defectObj;
            state.event = UPDATE_DEFECT_GRID_UPDATE_SUCCESS;
            return state;
        case UPDATE_BULK_DEFECT:
            state.isBulkUpdated = action.data;
            let defList = action.defectsList;
            defList.forEach((defect) => {
                let index = _.findIndex(state.grid.sortedRows, {id : defect.id});
                state.grid.sortedRows[index] = defect;
                state.grid.rows[index] = defect;
            });
            state.event = UPDATE_BULK_DEFECT;
            return state;
        case RESET_DEFECT_DETAILS:
            state = {
                grid: {
                    sortedRows: [],
                    rows: [],
                    allRows: [],
                    columns: null,
                    currentPage: 1,
                    paginationOptions: _.cloneDeep(DEFECT_TRACKING_SEARCH_GRID_PAGINATION),
                    size: GRID_ROW_COUNT_DEFAULT,
                    totalCount: 0,
                    offset: 0,
                    noData: false,
                    event: ''
                },
                exportDownloadLink: null,
                event: '',
                filters: [],
                isBulkUpdated:false,
                updatedDefect: null
            };
            return state;
        case CLEAR_DEFECT_DETAILS_ALL_ROWS:
            state.grid.allRows = [];
            state.grid.rows = [];
            state.grid.paginationOptions = _.cloneDeep(DEFECT_TRACKING_SEARCH_GRID_PAGINATION);
            return state;
        default:
            return state;
    }
}

export function defectsSearch(state = initialDefectsSearchState, action) {
    switch (action.type) {
        case SORT_DEFECTS_SEARCH_GRID:
            state.grid = GridUtil.manageSort(action.data, state.grid);
            return state;

        case SORT_IMPORT_JIRA_GRID:
          state.grid = GridUtil.manageSort(action.data, state.grid);
          return state;

        case NEXT_PAGE_DEFECTS_LINK_SEARCH:
            state.grid.offset = action.data.offset;
            state.grid.currentPage = action.data.currentPage;
            state.grid.totalCount = action.data.defectsData.maxResult;
            GridUtil.manageGridPagination('next', action.data.defectsData.bugsList, state.grid, true);
            return state;
        case PREV_PAGE_DEFECTS_LINK_SEARCH:
            state.grid.offset = action.data.offset;
            state.grid.currentPage = action.data.currentPage;
            state.grid.totalCount = action.data.defectsData.maxResult;
            GridUtil.manageGridPagination('prev', action.data.defectsData.bugsList, state.grid, true);
            return state;
        case FETCH_DEFECTS_SEARCH_FILTERS:
            let filters = [];
            let data = action.data;
            for(let i in data) {
              filters.push({id: i, text: data[i]});
            }
            filters = _.orderBy(filters, [filter => filter.text.toLowerCase()], ['asc']);
            state.event = FETCH_DEFECTS_SEARCH_FILTERS;
            state.filters = filters;
            return state;
        case FETCH_DEFECT_BY_ID:
            let defect = action.data;
            if(!defect) {
              return state;
            }
            updateGridState(state.grid, [defect]);
            return state;
        case FETCH_DEFECTS_BY_JQL:
            state.jqlQuery = action.jqlQuery;
            let defectsList = action.data && action.data.defectsData.bugsList;
            state.grid.totalCount = action.data.defectsData.maxResult;
            state.grid.offset = action.data.offset ? action.data.offset : 0;
            state.grid.currentPage = action.data.currentPage || 1;
            state.grid.sortedRows = defectsList;
            state.grid.rows = GridUtil.fetchGridRecords(defectsList, state.grid, true);
            state.grid.allRows = state.grid.allRows.concat(state.grid.rows);
            return state;
        case FETCH_DEFECTS_BY_FILTERS:
            let defects = action.data && action.data.defectsData.bugsList;
            state.grid.totalCount = action.data.defectsData.maxResult;
            state.grid.offset = action.data.offset ? action.data.offset : 0;
            state.grid.currentPage = action.data.currentPage || 1;
            state.grid.sortedRows = defects;
            state.grid.rows = GridUtil.fetchGridRecords(defects, state.grid, true);
            state.grid.allRows = state.grid.allRows.concat(state.grid.rows);
            return state;
        case CLEAR_DEFECT_IMPORT_ALL_ROWS:
            state.grid.allRows = [];
            return state;
        case UPDATE_DEFECT_SEARCH_GRID_TYPE:
            state.gridType = action.data;
            if(state.gridType === 'DEFECTS_LINK_SEARCH') {
                state.grid.paginationOptions = _.cloneDeep(DEFECTS_LINK_SEARCH_GRID_PAGINATION);
                state.grid.columns = DEFECTS_LINK_SEARCH_GRID_COLUMNS;
            } else if(state.gridType === 'IMPORT_JIRA') {
                state.grid.paginationOptions = _.cloneDeep(IMPORT_JIRA_GRID_PAGINATION);
                state.grid.columns = IMPORT_JIRA_GRID_COLUMNS;
            }
            return state;
        case SORT_DEFECTS_LINK_SEARCH_GRID:
            state.grid = GridUtil.manageSort(action.data, state.grid);
            return state;
        case CLEAR_DEFECT_SEARCH_EVENT:
            state.event = '';
            return state;
        case RESET_DEFECT_SEARCH_JQL:
            let jqlPaginationOptions;
            if(state.gridType === 'DEFECTS_LINK_SEARCH') {
                jqlPaginationOptions = _.cloneDeep(DEFECTS_LINK_SEARCH_GRID_PAGINATION);
            } else if(state.gridType === 'IMPORT_JIRA') {
                jqlPaginationOptions = _.cloneDeep(IMPORT_JIRA_GRID_PAGINATION);
            }
            state = {
                grid: {
                    sortedRows: [],
                    rows: [],
                    allRows: [],
                    columns: null,
                    currentPage: 1,
                    paginationOptions: jqlPaginationOptions,
                    size: GRID_ROW_COUNT_DEFAULT,
                    totalCount: 0,
                    offset: 0,
                    noData: false
                },
                filters: [],
                metaDataByproject: {},
                jqlQuery: null,
                gridType: null,
                event: ''
            };
            return state;
        case RESET_DEFECT_SEARCH:
            let paginationOptions;
            let columns;
            if(state.gridType === 'DEFECTS_LINK_SEARCH') {
                paginationOptions = _.cloneDeep(DEFECTS_LINK_SEARCH_GRID_PAGINATION);
            } else if(state.gridType === 'IMPORT_JIRA') {
                paginationOptions = _.cloneDeep(IMPORT_JIRA_GRID_PAGINATION);
            }
            state = {
                grid: {
                    sortedRows: [],
                    rows: [],
                    allRows: [],
                    columns: null,
                    currentPage: 1,
                    paginationOptions: paginationOptions,
                    size: GRID_ROW_COUNT_DEFAULT,
                    totalCount: 0,
                    offset: 0,
                    noData: false
                },
                filters: [],
                metaDataByproject: {},
                jqlQuery: null,
                gridType: null,
                event: ''
            };
            state.event = RESET_DEFECT_SEARCH_SUCCESS;
            return state;
        case UPDATE_DEFECT_SEARCH_GRID_SIZE:
            state.grid.size = action.data.size;
            state.grid.currentPage = action.data.currentPage;
            state.event = UPDATE_DEFECT_SEARCH_SUCCESS;
            return state;
        case DEFECT_LIGHT_METADATA_BY_PROJECT:
            state.metaDataByproject = action.data;
            state.event = DEFECT_LIGHT_METADATA_BY_PROJECT;
            return state;
        case DEFECT_UPDATE_LIGHT_METADATA_BY_PROJECT:
            state.metaDataByproject = action.data;
            state.event = DEFECT_UPDATE_LIGHT_METADATA_BY_PROJECT;
            return state;
        case GET_DEFECT_BULK_METADATA:
            state.metaDataByproject = action.data;
            state.event = GET_DEFECT_BULK_METADATA;
            return state;
        default:
            return state;
    }
}

export function currentlyLinkedDefects(state = initialCurrentlyLinkedDefectsState, action) {
    switch (action.type) {
        case FETCH_CURRENTLY_LINKED_DEFECTS:
            let data = action.data.bugsList;
            data = _.sortBy(data, 'alternateId');
            state.grid.sortedRows = data;
            state.grid.totalCount = data.length;
            state.grid.rows = GridUtil.fetchGridRecords(data, state.grid, false);
            return state;
        case DELETE_MAPPED_SCHEDULE:
            state.event = MAPPED_SCHEDULE_DELETION_SUCCESS;
            return state;
        case CLEAR_CURRENTLY_LINKED_DEFECT_EVENT:
            state.event = '';
            return state;
        case SORT_CURRENTLY_LINKED_DEFECTS_GRID:
            state.grid = GridUtil.manageSort(action.data, state.grid);
            return state;
        case RESET_CURRENTLY_LINKED_DEFECTS:
            state = resetInitialCurrentlyLinkedDefObj;
            return state;
        case UPDATE_CURRENTLY_LINKED_GRID:
            let defectObj = action.data;
            let index = _.findIndex(state.grid.sortedRows, {id : defectObj.id});
            if(index > -1) {
                state.grid.sortedRows[index] = defectObj;
                state.grid.rows[index] = defectObj;
            }
            return state;
        default:
            return state;
    }
}

export function linkNewDefect(state = initialLinkNewDefectState, action) {
    switch (action.type) {
        case FETCH_ISSUE_METADATA:
            let project = action.data && action.data.projects && action.data.projects[0];
            let issueType = project && project.issuetypes && project.issuetypes[0];
            state.issueMetaData = (issueType && issueType.fields) || {};
            state.event = FETCH_ISSUE_METADATA_SUCCESS;
            return state;
        case FETCH_ISSUE_METADATA_FOR_CREATE:
            let metaProject = action.data && action.data.projects && action.data.projects[0];
            let metaIssueType = metaProject && metaProject.issuetypes && metaProject.issuetypes[0];
            state.issueMetaData = (metaIssueType && metaIssueType.fields) || {};
            state.event = FETCH_ISSUE_METADATA_FOR_CREATE_SUCCESS;
            return state;
        case CLEAR_LINK_NEW_DEFECT_EVENT:
            state.event = '';
            return state;
        case CREATE_DEFECT:
            state.event = CREATE_DEFECT_SUCCESS;
            state.defect = action.data;
            return state;
        case CREATE_DEFECT_FOR_TRACKING_PAGE:
            state.event = CREATE_DEFECT_FOR_TRACKING_PAGE_SUCCESS;
            state.defect = action.data;
            return state;
        case GET_JIRA_PROJECTS:
            state.event = FETCH_JIRA_PROJECTS_SUCCESS;
            let projects = action.data;
            projects = _.sortBy(projects, 'value');
            state.jiraProjects = projects;
            return state;
        case GET_JIRA_PROJECTS_FOR_FILE_DEFECT:
            state.event = 'GET_JIRA_PROJECTS_FOR_FILE_DEFECT';
            let projectsList = action.data;
            projectsList = _.sortBy(projectsList, 'value');
            state.jiraProjects = projectsList;
            return state;
        case GET_ISSUE_TYPES:
            state.issueTypes = action.data;
            return state;
        case MAP_DEFECT_SCHEDULE:
            state.event = MAP_DEFECT_SCHEDULE_SUCCESS;
            return state;
        case UPDATE_ARRAY_FIELDS_KEY:
            state.arrayFieldsKey = action.data;
            return state;
        case SAVE_DEFECT_ATTACHMENT_DATA:
            let attachmentData = action.data;
            let attachments = [];
            attachmentData.forEach((obj, index) => {
                let attachment = {};
                attachment['name'] = obj.fileName;
                attachment['url'] = obj.url;
                attachment['refId'] = obj.attachmentId;
                attachment['timeStamp'] = obj.dateCreated;
                attachment['id'] = obj.attachmentId;
                attachments.push(attachment);
            });
            state.attachmentData = attachments;
            return state;
        default:
            return state;
    }
}

export function defectUser(state = initialDefectUserState, action) {
    switch (action.type) {
        case UPDATE_DEFECT_USER:
            state.user = action.data;
            state.event = UPDATE_DEFECT_USER;
            return state;
        case CLEAR_DEFECT_USER_EVENT:
            state.event = '';
            return state;
        case GET_DEFECT_USER:
            state.user = action.data;
            state.event = GET_DEFECT_USER;
            return state;
        case GET_ADMIN_SETUP_DEFECT_USER:
            state.adminSetupState = action.data;
            state.event = GET_ADMIN_SETUP_DEFECT_USER;
            return state;
        case DELETE_DEFECT_USER:
            state.user = {};
            state.adminSetupState = 'ERROR';
            state.event = DELETE_DEFECT_USER;
            return state;
        default:
            return state;
    }
}

function updateGridState(gridState, data) {
    gridState.currentPage = 1;
    gridState.isFirstPage = true;
    gridState.isLastPage = false;
    gridState.sortedRows = data;
    gridState.totalCount = data.length;
    gridState.rows = GridUtil.fetchGridRecords(data, gridState, false);
}
