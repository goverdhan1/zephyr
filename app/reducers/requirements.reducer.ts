import {
  FETCH_TESTCASE_NAME_ON_UPDATE, FETCH_REQ_TREE_DATA, UPDATE_REQ_OBJ, CREATE_REQ_OBJ, CLEAR_REQUIREMENT_GRID_DATA,
  FETCH_REQUIREMENTS_BY_TREE_ID, CLEAR_REQ_EVENT, SYNC_REQ_NODE, REQ_DT_JIRA_USER_UPDATE,
  FETCH_DEFECT_SYSTEM, GET_JIRA_REQUIREMENT, CLEAR_JIRA_REQUIREMENTS, CLEAR_REQ_GRID,
  CLEAR_REQ_GRID_SELECTION, FETCH_REQ_PATH_BY_ID, FETCH_REQ_BY_RELEASE, SELECT_REQ_NODE, COPY_REQUIREMENT,
  CLEAR_REQ_FLAG, FETCH_RELEASES_AND_PROJECT
} from '../utils/constants/action.types';

import {SYNC_REQ_NODE_SUCCESS, FETCH_REQUIREMENT_PATH_SUCCESS, FETCH_REQUIREMENT_BY_RELEASE_SUCCESS, FETCH_REQ_GRID, FETCH_REQ_GRID_ON_SEARCH} from '../utils/constants/action.events';

import { REQ_GRID_COLUMNS, REQ_GRID_PAGINATION } from '../view/components/requirements/req_grid.constant';
import {JIRA_REQUIREMENT_TYPE} from '../utils/constants/application.constants';
import * as GRID_TYPES from '../utils/constants/action.types';

import {GridUtil} from '../view/components/grid/grid_util';
import {UtililtyFunctions} from '../utils/scripts/utils';

declare var _: any, jQuery: any, moment: any, window;

const initialState = {
    treeData: {
        redrawTree: false,
        refreshTree: false,
        tree: [{
            'text': 'Imported'
        },{
            'text': 'Global'
        }],
        selectedTreeId: null
    },
    reqGrid: {
        sortedRows: [],
        rows: [],
        columns: REQ_GRID_COLUMNS,
        currentPage: 1,
        isPaginationRequired: true,
        size: 50,
        totalCount: 0,
        isLastPage: true,
        isFirstPage: true,
        offset: 0,
        customProperties: {},
        paginationOptions: _.cloneDeep(REQ_GRID_PAGINATION)
    },
    reqObj: {
        'requirementTreeId': '',
        'name': 'Untitled requirement',
        'details': 'requirement details',
        'externalId': '',
        'url': '',
        'priority': '',
        'id': null,
        'releaseIds': ''
    },
    gadgetRequirements: {},
    requirementsForRelease: {},
    reqPaths:{},
    event: '',
    dataLoaded: false,
    jiraDetails: '',
    defectSystem: {},
    selectNode: null,
    releases: [],
    projectId: 1
};

export function requirementsReducer(state = initialState, action) {

    let fullTreeData, currRelease;
    try {
        currRelease = (JSON.parse(localStorage.getItem(`${window.tab}-currentRelease`)) || {}).id;
    } catch (err) {
        currRelease = 0;
    }
    switch (action.type) {
        case SELECT_REQ_NODE:
            state.selectNode = action.data;
            return state;
        case COPY_REQUIREMENT:
            state.selectNode = action.id;
            state.treeData.refreshTree = true;
            state.treeData.redrawTree = false;
            state.treeData = JSON.parse(JSON.stringify(state.treeData));
            state.dataLoaded = true;
            return state;
        case FETCH_DEFECT_SYSTEM:
            state.defectSystem = action.data;
            return state;
        case FETCH_REQ_PATH_BY_ID:
            state['reqPaths'] = action.data;
            state.event = FETCH_REQUIREMENT_PATH_SUCCESS;
            state.dataLoaded = true;
            return state;
        case FETCH_REQ_TREE_DATA:
            let excludeItemsRelease = {
                items: 'rename,delete',
                cascade: 'importTests,move,copy,allocate',
                doCascade: true
            };

            let excludeItemsGlobal = {
                items: 'rename,delete,allocate,copy,move',
                cascade: 'importTests',
                doCascade: true
            };

            let excludeItemsImported = {
                items: 'rename,delete,copy,move',
                cascade: 'add,exportTests,paste,sync,allocate',
                cascadeOnly: 'importTests',
                doCascade: true
            };
            fullTreeData = [{
                'name': action.data.releaseName,
                'excludeItems': excludeItemsRelease,
                'categories': action.data.treeData,
                'id': 0,
                'parentType': 'release'
            },{
                'name': 'Global',
                'excludeItems': excludeItemsGlobal,
                'categories': action.data.globalTreeData,
                'parentType': 'global'
            },{
                'name': 'Imported',
                'excludeItems': excludeItemsImported,
                'categories': action.data.importedTreeData,
                'parentType': 'import'
            }];

            state.treeData = {
                redrawTree: action.redrawTree,
                refreshTree: true,
                tree: getTreeNodes({fullTreeData, selectedTreeId: action.data.selectedTreeId}),
                selectedTreeId: action.data.selectedTreeId
            };

            state.event = 'FETCH_REQ_TREE_DATA_SUCCESS';
            return state;
        case UPDATE_REQ_OBJ:
            state.reqObj = action.data;

            let index = _.findIndex(state.reqGrid.sortedRows, {id : action.data.id});

            state.reqGrid.sortedRows[index] = state.reqObj;
            state.reqGrid.rows[index] = state.reqObj;

            state.reqGrid.sortedRows[index].testcase = {};

            let row = state.reqGrid.sortedRows[index];
            row.coverage = ((row.requirementReleaseTestcaseCountMapping || []).filter(item => String(item.releaseId) === String(currRelease))[0] || {}).testcaseCount || 0;

            if (state.reqGrid.sortedRows[index].customProperties) {
                state.reqGrid.sortedRows[index].testcase = {
                    customProperties: state.reqGrid.sortedRows[index].customProperties,
                    customProcessedProperties: state.reqGrid.sortedRows[index].customProcessedProperties
                };
            }

            state.dataLoaded = true;

            state.event = 'UPDATE_REQ_OBJ';
            return state;
        case CREATE_REQ_OBJ:
            let req = action.data;
            state.event = 'CREATE_REQ_SUCCESS';
            state.reqObj = req[req.length - 1];
            req.forEach(item => {
                state.reqGrid.sortedRows.push(item);
            });
            state.reqGrid.sortedRows.forEach(row => {
                row.testcase = {};
                row.customProperties = row.customProperties || {};
                if(row.customProcessedProperties) {
                  let keyList = Object.keys(row.customProcessedProperties);
                  if(keyList && keyList.length) {
                    keyList.forEach(key => {
                      row.customProperties[key] =
                        moment(row.customProcessedProperties[key],'MM/DD/YYYY').startOf('day').unix() * 1000;
                    });
                  }
                }
                row.testcase['customProperties'] = row.customProperties || {};
            });
            state.reqGrid.totalCount += req.length;
            state.reqGrid.rows = GridUtil.fetchGridRecords(state.reqGrid.rows, state.reqGrid, true);
            changeLink(state.reqGrid.rows, state);
            state.dataLoaded = true;
            return state;
        case CLEAR_REQUIREMENT_GRID_DATA:
            state.reqGrid = {
                sortedRows: [],
                rows: [],
                columns: REQ_GRID_COLUMNS,
                currentPage: 1,
                isPaginationRequired: true,
                size: 50,
                totalCount: 0,
                isLastPage: true,
                isFirstPage: true,
                offset: 0,
                customProperties: {},
                paginationOptions: _.cloneDeep(REQ_GRID_PAGINATION),
            };

            state.dataLoaded = true;

            return state;

        case FETCH_REQUIREMENTS_BY_TREE_ID:
            state.reqGrid.sortedRows = action.data.data.results;

            state.reqGrid.sortedRows.forEach(row => {
                row.testcase = {};
                row.coverage = ((row.requirementReleaseTestcaseCountMapping || []).filter(item => String(item.releaseId) === String(currRelease))[0] || {}).testcaseCount || 0;
                row.customProperties = row.customProperties || {};
                if(row.customProcessedProperties) {
                  let keyList = Object.keys(row.customProcessedProperties);
                  if(keyList && keyList.length) {
                    keyList.forEach(key => {
                      row.customProperties[key] =
                        moment(row.customProcessedProperties[key],'MM/DD/YYYY').startOf('day').unix() * 1000;
                    });
                  }
                }
                row.testcase['customProperties'] = row.customProperties || {};
            });

            state.reqGrid.offset = action.data.offset ? action.data.offset : 0;
            state.reqGrid.currentPage = action.data.currentPage || 1;
            state.reqGrid.totalCount = action.data.data.resultSize;
            state.reqGrid.size = action.data.size || state.reqGrid.size;
            state.reqGrid.rows = GridUtil.fetchGridRecords(action.data.data.results, state.reqGrid, true);
            changeLink(state.reqGrid.rows, state);
            state.event = action.data.selectNew ? FETCH_REQ_GRID : '';

            if (action.data.isOnSearch) {
              state.event = FETCH_REQ_GRID_ON_SEARCH;
            }

            state.dataLoaded = true;

            return state;

        case FETCH_TESTCASE_NAME_ON_UPDATE:
          state.reqGrid.sortedRows.forEach((res) => {

            if (res.id === action.data.id) {
              res.testcaseNames = [];

            }

          });

          state.reqGrid.offset = action.data.offset ? action.data.offset : 0;
          state.reqGrid.currentPage = action.data.currentPage || 1;
          state.reqGrid.totalCount = action.data.data.resultSize;
          state.reqGrid.size = action.data.size || state.reqGrid.size;
          state.reqGrid.rows = GridUtil.fetchGridRecords(action.data.data.results, state.reqGrid, true);
          changeLink(state.reqGrid.rows, state);

          state.event = action.data.selectNew ? FETCH_REQ_GRID : '';

          if (action.data.isOnSearch) {
            state.event = FETCH_REQ_GRID_ON_SEARCH;
          }

          state.dataLoaded = true;
          return state;

      case GRID_TYPES.SORT_REQ_COVERAGE_GRID:
      case GRID_TYPES.SORT_TCE_REQ_COVERAGE_GRID:
      case GRID_TYPES.SORT_REQ_GRID:
          state.reqGrid = GridUtil.manageSort(action.data, state.reqGrid);
          state.event = 'SORT_REQ_COVERAGE_GRID_SUCCESS';
          state.dataLoaded = true;
          return state;

        case CLEAR_REQ_EVENT:
            state.event = '';
            return state;

        case CLEAR_REQ_FLAG:
          state.dataLoaded = false;
          return state;

        case CLEAR_REQ_GRID:
            state.event = 'CLEAR_REQ_GRID_SELECTION';
            state['reqGrid'] = {
              sortedRows: [],
              rows: [],
              columns: REQ_GRID_COLUMNS,
              currentPage: 1,
              isPaginationRequired: true,
              size: 50,
              totalCount: 0,
              isLastPage: true,
              isFirstPage: true,
              offset: 0,
              customProperties: {},
              paginationOptions: _.cloneDeep(REQ_GRID_PAGINATION)
            };

            state.dataLoaded = true;
            return state;
        case CLEAR_REQ_GRID_SELECTION:
            state.dataLoaded = true;
            state.event = 'CLEAR_REQ_GRID_SELECTION';
            return state;
        case GRID_TYPES.FETCH_TREE_DATA_FOR_IMPORTED_REQ:
            state.treeData.redrawTree = false;
            state.treeData.refreshTree = true;

            let excludeContextItems = {
                cascade: 'add,exportTests,paste,importTests,sync,allocate',
                doCascade: true
            };
            state.treeData.tree.forEach(treeObj => {
                if(treeObj.text === 'Imported') {
                    fullTreeData = action.data;
                    let selectedTreeId = state.treeData.selectedTreeId;
                    let parentType = 'import';

                    treeObj['children'] = getTreeNodes({fullTreeData, selectedTreeId, excludeContextItems, parentType});
                }
            });
            // force OnChange on state.treeData
            state.treeData = JSON.parse(JSON.stringify(state.treeData));
            state.dataLoaded = true;
            state.event = 'FETCH_REQ_TREE_DATA_SUCCESS';
            return state;
        case SYNC_REQ_NODE:
            state.event = SYNC_REQ_NODE_SUCCESS;
            return state;
        case REQ_DT_JIRA_USER_UPDATE:
            state.event = 'REQ_DT_JIRA_USER_UPDATE';
            return state;
        case GET_JIRA_REQUIREMENT:
            let html = '';
            if (action.data) {
                let desc = action.data;
                try {
                    if (!_.isObject(desc)) {
                        let _utililtyFunctions = new UtililtyFunctions();
                        jQuery(desc).each((index, node) => {
                            html += _utililtyFunctions.parseExternalRequirementXml(jQuery(node));
                        });
                    }
                } catch (err) {
                    console.log('error in parsing jira description', err);
                }
            }
            state.jiraDetails = html;
            state.event = 'FETCH_JIRA_REQUIREMENT';
            state.dataLoaded = true;
            return state;
        case CLEAR_JIRA_REQUIREMENTS:
            state.jiraDetails = '';
            return state;

        case COPY_REQUIREMENT:
            state.treeData.refreshTree = true;
            return state;

        case FETCH_REQ_BY_RELEASE:
            let requirementsData = action.data;

            if (requirementsData.gadgetId) {
                state.gadgetRequirements[requirementsData.gadgetId] = requirementsData.requirements;
                state.event = FETCH_REQUIREMENT_BY_RELEASE_SUCCESS + requirementsData.gadgetId;
            }

            state.dataLoaded = true;

            return state;

        case FETCH_RELEASES_AND_PROJECT:
            state.projectId = action.projectId;
            state.releases = action.releases;
            state.event = 'FETCH_RELEASES_AND_PROJECT';
            return state;
        default:
            return state;
    }
}

function changeLink(rows, state) {
    let defectUrl = (state.defectSystem || {}).url || '';
    if ('/' !== defectUrl.charAt(defectUrl.length - 1)) {
        defectUrl += '/';
    }
    defectUrl += 'browse/';

    return (rows || []).map(item => {
        item.url = JIRA_REQUIREMENT_TYPE === item.requirementType ? (defectUrl + item.externalId) : item.url;
        return item;
    });
}

function getTreeNodes(data) {

    let fullTreeData = data.fullTreeData || [];
    let excludeContextItems = data.excludeContextItems || {};
    let count = data.count || {};
    let selectedTreeId = data.selectedTreeId;

    return (fullTreeData || []).map(level => {
        let parentType = level.parentType || data.parentType;

        let treeData =  {
            'text': level.name,
            'a_attr': {
                'data-id': level.id || undefined,
                'data-releaseid': level.releaseId,
                'data-type': level.type,
                'data-desc': level.description,
                'data-name': level.name,
                'class': 'zee-tcr-anchor',
                'data-count': count.hasOwnProperty(level.id) ? count[level.id] : undefined,
                'data-star': level.star,
                'data-parenttype': parentType
            }
        };

        let nodeData = level.data || data.data;
        if (_.isObject(nodeData) && !_.isEmpty(nodeData)) {
            Object.keys(nodeData).forEach(key => {
                treeData['a_attr'][`data-${key}`] = nodeData[key];
            });
        }

        treeData['li_attr'] = {
          'title': level.description,
          'class': 'release' === parentType &&  !level.id ? 'js-blur-wrapper' : ''
        };
        let excludeItems = level.excludeItems || excludeContextItems;
        if (!jQuery.isEmptyObject(excludeItems)) {
            let dataExcludeItems = excludeItems.items + (excludeItems.doCascade ? `,${excludeItems.cascade}` : '');
            treeData['li_attr']['data-exclude-context-items'] = dataExcludeItems;
        }

        let cascade = excludeItems.doCascade ? {
            items: excludeItems.cascade + (excludeItems.cascadeOnce ? `,${excludeItems.cascadeOnce}` : ''),
            cascade: excludeItems.cascade + (excludeItems.cascadeOnly ? `,${excludeItems.cascadeOnly}` : ''),
            doCascade: true
        } : {};

        treeData['children'] = getTreeNodes({selectedTreeId, count,
            parentType: parentType,
            excludeContextItems: cascade,
            data: level.data || data.data,
            fullTreeData: level.categories
        });

        if(selectedTreeId && selectedTreeId == level.id) {
            treeData['state'] = {
                'selected': true
            };
        }
        return treeData;
    });
}
