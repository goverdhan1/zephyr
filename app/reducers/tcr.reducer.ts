import * as GRID_TYPES from '../utils/constants/action.types';

import {
  FETCH_TESTCASES_BY_TREE_ID_SUCCESS, UPDATE_FIND_ADD_GRID_SIZE_SUCCESS, FETCH_TREE_DATA_FOR_LOCAL_TREE,
  UPDATE_TESTCASES_BY_TREE_ID_SUCCESS, FETCH_TREE_DATA
} from '../utils/constants/action.events';

import { TCR_GRID_COLUMNS, TCR_GRID_PAGINATION,FIND_AND_ADD_GRID_COLUMNS,
         FIND_ADD_ADD_GRID_PAGINATION } from '../view/components/tcr/tcr_grid.constant';

import {GridUtil} from '../view/components/grid/grid_util';

export const GRID_ROW_COUNT_DEFAULT = 50;

declare var _: any, jQuery: any;
declare var moment: any;

const initialState = {
    treeData: {
        redrawTree: false,
        refreshTree: false,
        tree: [{
            'text': 'Imported',
        }],
        selectedTreeId: null,
        event: ''
    },
    tcrGrid: {
        sortedRows: [],
        rows: [],
        columns: TCR_GRID_COLUMNS,
        currentPage: 1,
        paginationOptions: TCR_GRID_PAGINATION,
        size: TCR_GRID_PAGINATION.size,
        totalCount: 0,
        offset: 0,
        noData: false,
        event: '',
        gridEvent: ''
    },
    globalTcrGrid: {
        sortedRows: [],
        rows: [],
        columns: TCR_GRID_COLUMNS,
        currentPage: 1,
        paginationOptions: TCR_GRID_PAGINATION,
        size: TCR_GRID_PAGINATION.size,
        totalCount: 0,
        offset: 0,
        noData: false,
        event: ''
    },
    localTcrGrid: {
        sortedRows: [],
        rows: [],
        columns: TCR_GRID_COLUMNS,
        currentPage: 1,
        paginationOptions: TCR_GRID_PAGINATION,
        size: TCR_GRID_PAGINATION.size,
        totalCount: 0,
        offset: 0,
        noData: false
    },
    tcrTree: {
        createNode: null,
        deleteNode: null
    },
    globalTcrProjects: {
        redrawTree: false,
        tree: [{
            'text': 'Projects',
        }, {
            'text': 'Imported'
        }]
    },
    globalTcrProjectsCopy:  [{
        'name': 'Projects',
        'categories': [],
        'parentType': 'global'
    }],
    findNaddGrid: {
       sortedRows: [],
       rows: [],
       columns: FIND_AND_ADD_GRID_COLUMNS,
       currentPage: 1,
       paginationOptions: FIND_ADD_ADD_GRID_PAGINATION,
       size: GRID_ROW_COUNT_DEFAULT,
       totalCount: 0,
       offset: 0,
       noData: false,
       event: ''
    },
    newTestcase: {
        id: null,
        status: ''
    },
    phasesPerRelease: {},
    executionPhasesPerRelease: {},
    isReleasesLoaded: false
};

export function tcrReducer(state = _.cloneDeep(initialState), action) {
    let fullTreeData, selectedTreeId, count, excludeContextItems;

    switch (action.type) {
        case GRID_TYPES.FETCH_TREE_DATA_BY_RELEASE_ID:
            let excludeItemsImported = {
                items: 'rename,delete,copy,move',
                cascade: 'add,copyFromGlobalTree,search,exportTests,paste',
                cascadeOnly: 'importTests',
                doCascade: true
            };

            let items = 'rename,delete,move,copy,search';
            let user = localStorage.getItem('userInfo');
            user = JSON.parse(user || '{}');
            let isTester = (user['roles'] || []).filter((role) => 'tester' === role.name);
            if (isTester.length) {
                items += ',add';
            }
            let excludeItemsRelease = {
                items: items,
                cascade: 'importTests',
                doCascade: true,
                cascadeOnce: 'move'
            };

            fullTreeData = [{
              'name': action.data.releaseName,
              'excludeItems': excludeItemsRelease,
              'categories': action.data.treeData,
              'id': 0,
              'releaseId': action.data.releaseId,
              'parentType': 'release'
            }];

            if (action.data.showImported) {
              fullTreeData.push({
                'name': 'Imported',
                'excludeItems': excludeItemsImported,
                'categories': action.data.importedTreeData,
                'parentType': 'import'
              });
            }

            selectedTreeId = action.data.selectedTreeId;
            count = getCountObj(action.data.count);

            state.treeData = {
                redrawTree: true,
                refreshTree: false,
                tree: getTreeNodes({fullTreeData, selectedTreeId, count})
            };

            state.treeData.selectedTreeId = action.data.selectedTreeId;
            state.treeData.event = FETCH_TREE_DATA;

            return state;

        case GRID_TYPES.UPDATE_TESTCASE_DETAILS_BY_ID:
          state.tcrGrid.sortedRows = state.tcrGrid.sortedRows.map(row => {
            if (row.id === action.data.id) {
              Object.assign(row, action.data);

              if(row['testcase']['customProcessedProperties']) {
                Object.keys(row['testcase']['customProcessedProperties']).forEach(key => {
                    row['testcase']['customProperties'][key] = moment(row['testcase']['customProcessedProperties'][key], 'MM/DD/YYYY').startOf('day').unix() * 1000;
                });
              }
            }

            return row;
          });

          state.tcrGrid.rows = state.tcrGrid.rows.map(row => {
            if (row.id === action.data.id) {
              Object.assign(row, action.data);

              if(row['testcase']['customProcessedProperties']) {
                Object.keys(row['testcase']['customProcessedProperties']).forEach(key => {
                    row['testcase']['customProperties'][key] = moment(row['testcase']['customProcessedProperties'][key], 'MM/DD/YYYY').startOf('day').unix() * 1000;
                });
              }
            }

            return row;
          });

          state.tcrGrid.event = UPDATE_TESTCASES_BY_TREE_ID_SUCCESS;

          return state;

        case GRID_TYPES.FETCH_TREE_DATA_FOR_COPY_MOVE:
            state.treeData.redrawTree = false;
            state.treeData.refreshTree = true;
            let excludeItemsImportedCopy = {
                items: 'add,copyFromGlobalTree,search,exportTests,paste,importTests'
            };

            let excludeItemsReleaseCopy = {
                items: 'move',
                cascade: 'importTests',
                doCascade: true
            };
            selectedTreeId = state.treeData.selectedTreeId;
            count = getCountObj(action.data.count);

            state.treeData.tree.forEach(treeObj => {
                if(treeObj.text === action.data.releaseName) {
                    treeObj.a_attr['data-count'] = count['0'];
                    excludeContextItems = excludeItemsReleaseCopy;
                    fullTreeData = action.data.treeData.map(item => {
                        item.parentType = 'release';
                        return item;
                    });
                } else if(treeObj.text === 'Imported') {
                    excludeContextItems = excludeItemsImportedCopy;
                    fullTreeData = action.data.importedTreeData.map(item => {
                        item.parentType = 'import';
                        return item;
                    });
                }
                treeObj['children'] = getTreeNodes({fullTreeData, selectedTreeId, excludeContextItems, count});
            });

            // force OnChange on state.treeData
            state.treeData = JSON.parse(JSON.stringify(state.treeData));
            return state;
        case GRID_TYPES.FETCH_TREE_DATA_FOR_IMPORTED_TCR:
            state.treeData.redrawTree = false;
            state.treeData.refreshTree = true;
            let excludeItemsImportedJob = {
                items: 'add,copyFromGlobalTree,search,exportTests,paste,importTests'
            };

            state.treeData.tree.forEach(treeObj => {
                if(treeObj.text === 'Imported') {
                    fullTreeData = action.data.map(item => {
                        item.parentType = 'import';
                        return item;
                    });
                    selectedTreeId = state.treeData.selectedTreeId;
                    excludeContextItems = excludeItemsImportedJob;
                    treeObj['children'] = getTreeNodes({fullTreeData, selectedTreeId, excludeContextItems});
                }
            });
            // force OnChange on state.treeData
            state.treeData = JSON.parse(JSON.stringify(state.treeData));
            return state;
        case GRID_TYPES.FETCH_TESTCASES_BY_TREE_ID:
            // action.data.data.results = _.sortBy(action.data.data.results, 'testcase.id');
            let tempData = action.data.data.results;
            if(tempData && tempData.length) {
              tempData.forEach(tct => {
                if(tct && tct['testcase']['customProcessedProperties']) {
                  let keyList = Object.keys(tct['testcase']['customProcessedProperties']);
                  if(keyList && keyList.length) {
                    keyList.forEach(key => {
                      tct['testcase']['customProperties'][key] =
                        moment(tct['testcase']['customProcessedProperties'][key],'MM/DD/YYYY').startOf('day').unix() * 1000;
                    });
                  }
                }
              });
            }
            state.tcrGrid.sortedRows = action.data.data.results;
            state.tcrGrid.offset = action.data.offset ? action.data.offset : 0;
            state.tcrGrid.currentPage = action.data.currentPage || 1;
            state.tcrGrid.totalCount = action.data.data.resultSize;
            state.tcrGrid.size = action.data.size || state.tcrGrid.size;
            state.tcrGrid.event = FETCH_TESTCASES_BY_TREE_ID_SUCCESS;
            state.tcrGrid.rows = GridUtil.fetchGridRecords(action.data.data.results, state.tcrGrid, true);
            return state;

        case GRID_TYPES.SET_EVENT_FOR_TCR:
          state.tcrGrid.gridEvent = FETCH_TESTCASES_BY_TREE_ID_SUCCESS;
          return state;

        case GRID_TYPES.CONFIGURE_TCR_GRID_COLUMN:
            GridUtil.configureGridColumn(action.data, state.tcrGrid);
            return state;

        case GRID_TYPES.SORT_TCR_GRID:
            state.tcrGrid = GridUtil.manageSort(action.data, state.tcrGrid, true);
            return state;

        case GRID_TYPES.SORT_TCR_COVERAGE_GRID:
          state.tcrGrid = GridUtil.manageSort(action.data, state.tcrGrid, true);
          state.event = 'SORT_TCR_COVERAGE_GRID_SUCCESS';
          return state;

        case GRID_TYPES.CLEAR_TCR_GRID_DATA:
            state.tcrGrid = _.cloneDeep(initialState.tcrGrid);

            if (action.data.size) {
                state.tcrGrid.size = action.data.size;
            }
            if (action.data.currentPage) {
                state.tcrGrid.currentPage = action.data.currentPage;
            }

            return state;

        case GRID_TYPES.CLEAR_TREE_EVENT:
          state.treeData.event = "";
          return state;

        case GRID_TYPES.CLEAR_TCR_GRID:
            state['tcrGrid'].sortedRows = [];
            state['tcrGrid'].rows = [];
            state['tcrGrid'].noData = false;
            state['tcrGrid'].event = '';
            state['tcrGrid']['paginationOptions']['show'] = false;
            return state;
        case GRID_TYPES.UPDATE_GRID_SIZE:
            state[action.gridType]['paginationOptions']['size'] = action.size;
            return state;
        case GRID_TYPES.CREATE_TREE_NODE:
            state.tcrTree.createNode = action.data;
            return state;
        case GRID_TYPES.DELETE_TREE_NODE:
            state.tcrTree.deleteNode = action.data;
            return state;
        case GRID_TYPES.CLEAR_TCR_TREE_EVENTS:
            state.tcrTree = {
                createNode: null,
                deleteNode: null
            };
            return state;
        case GRID_TYPES.CREATE_TESTCASE_SUCCESS:
            state.tcrGrid = addTestcasesToTCRGrid(state.tcrGrid, action.data);

            if(state.tcrGrid.sortedRows) {
              state.tcrGrid.sortedRows.forEach(item => {
                Object.keys(item['testcase']['customProcessedProperties']).forEach(key=>{
                   item['testcase']['customProperties'][key] =
                    moment(item['testcase']['customProcessedProperties'][key],'MM/DD/YYYY').startOf('day').unix() * 1000;
                });
                 });
            }
            state.tcrGrid.rows = GridUtil.fetchGridRecords(state.tcrGrid.sortedRows, state.tcrGrid, true);
            state.tcrGrid.event = GRID_TYPES.CREATE_TESTCASE_SUCCESS;
            return state;
        case GRID_TYPES.DELETE_TESTCASE_SUCCESS:
            state.tcrGrid.event = GRID_TYPES.DELETE_TESTCASE_SUCCESS;
            return state;
        case GRID_TYPES.CLEAR_TCR_GRID_EVENT_FOR_BROWSE:
            state.tcrGrid.gridEvent = '';
            return state;

        case GRID_TYPES.CLEAR_TCR_GRID_EVENT:
          state.tcrGrid.event = '';
          state.event = '';
          return state;

        case GRID_TYPES.CLEAR_GLOBAL_GRID_EVENT:
            state.globalTcrGrid.event = '';
            return state;
        case GRID_TYPES.UPDATE_BULK_TESTCASE_DETAILS_BY_ID:
            state.tcrGrid.rows.forEach(function(row) {
                action.data.forEach(function(data) {
                    if(row.id === data.id) {
                        //let reqNames = row.testcase.requirementNames;
                        row.testcase = data.testcase;
                      //  row.testcase.requirementNames = reqNames;
                      Object.keys(row['testcase']['customProcessedProperties']).forEach(key=>{
                        row['testcase']['customProperties'][key] =
                          moment(row['testcase']['customProcessedProperties'][key],'MM/DD/YYYY').startOf('day').unix() * 1000;
                      });

                    }
                });
            });
            state.tcrGrid.rows = GridUtil.fetchGridRecords(state.tcrGrid.rows, state.tcrGrid, true);
            state.tcrGrid.event = 'UPDATE_BULK_TCR';
            return state;
        case GRID_TYPES.FETCH_PROJECT_DETAILS:
            state.globalTcrProjectsCopy = [{
                'name': 'Projects',
                'categories': action.data,
                'parentType': 'global'
            }];
            return state;
        case GRID_TYPES.FETCH_RELEASE_BY_PROJECT_ID:
            let project = state.globalTcrProjects.tree[0].children.filter(level => action.data.projectId === level.a_attr['data-id'])[0];

            state.globalTcrProjects.tree[0].children.forEach(item => {
                if (item.hasOwnProperty('state') && item.state.hasOwnProperty('opened')) {
                    item['state']['opened'] = false;
                }
            });

            if (project) {
                if (action.data.releases.length) {
                    fullTreeData = action.data.releases;
                    selectedTreeId = action.data.projectId;

                    project.children = getTreeNodes({fullTreeData, selectedTreeId, parentType: 'global'});
                    project['state'] = project['state'] || {};
                    project['state']['opened'] = true;
                } else {
                    project['li_attr'] = {
                      'class': 'no-children'
                    };
                }
            }

            // force OnChange on state.globalTcrProjects
            state.globalTcrProjects = JSON.parse(JSON.stringify(state.globalTcrProjects));
            return state;
        case GRID_TYPES.FETCH_TREE_BY_RELEASE_ID:
            let globalTcrTree = state.globalTcrProjects.tree[0].children;
            let treeProject = globalTcrTree.filter(level => action.data.projectId === level.a_attr['data-id'])[0];
            let release = treeProject.children.filter(level => String(action.data.releaseId) === String(level.a_attr['data-id']))[0];
            treeProject.children.forEach(item => {
                if (item.hasOwnProperty('state') && item.state.hasOwnProperty('opened')) {
                    item['state']['opened'] = false;
                }
            });
            if (release) {
                if (action.data.treeData.length) {
                    fullTreeData = action.data.treeData;
                    selectedTreeId = action.data.releaseId;
                    release.children = getTreeNodes({fullTreeData, selectedTreeId, openSelect: true, parentType: 'global'});
                    release['state'] = release['state'] || {};
                    release['state']['opened'] = action.data.doOpen;
                } else {
                    release['li_attr'] = {
                      'class': 'no-children'
                    };
                }
            }

            // force OnChange on state.globalTcrProjects
            state.globalTcrProjects = JSON.parse(JSON.stringify(state.globalTcrProjects));
            return state;
      case GRID_TYPES.FETCH_TESTCASE_PHASES_BY_RELEASE_ID:
            let data = action.data;

            state.phasesPerRelease[data.releaseId] = data.treeData;
            return state;
      case GRID_TYPES.FETCH_EXECUTION_PHASES_BY_RELEASE_ID:
            //let data = action.data;

            state.executionPhasesPerRelease[action.data.releaseId] = action.data.treeData;
            return state;
        case GRID_TYPES.FETCH_TESTCASES_BY_GLOBAL_TCR_TREE_ID:
            state.globalTcrGrid.sortedRows = action.data.results;
            state.globalTcrGrid.totalCount = action.data.resultSize;

            state.globalTcrGrid.size = action.data.size;
            state.globalTcrGrid.offset = action.data.offset;
            state.globalTcrGrid.currentPage = action.data.currentPage;

            state.globalTcrGrid.rows = GridUtil.fetchGridRecords(action.data.results, state.globalTcrGrid, true);
            return state;
        case GRID_TYPES.SORT_GLOBAL_GRID:
            state.globalTcrGrid = GridUtil.manageSort(action.data, state.globalTcrGrid);
            return state;
        case GRID_TYPES.SORT_LOCAL_GRID:
            state.localTcrGrid = GridUtil.manageSort(action.data, state.localTcrGrid);
            return state;
        case GRID_TYPES.FETCH_TESTCASES_BY_LOCAL_TCR_TREE_ID:


            (action.data.results || []).forEach(data => {

                Object.keys(data['testcase']['customProcessedProperties']).forEach(key => {
                    data['testcase']['customProperties'][key] = moment(data['testcase']['customProcessedProperties'][key],'MM/DD/YYYY').startOf('day').unix() * 1000;
                });

            });
            state.localTcrGrid.sortedRows = action.data.results;
            state.localTcrGrid.totalCount = action.data.resultSize;

            state.localTcrGrid.size = action.data.size;
            state.localTcrGrid.offset = action.data.offset;
            state.localTcrGrid.currentPage = action.data.currentPage;

            state.localTcrGrid.rows = GridUtil.fetchGridRecords(action.data.results, state.localTcrGrid, true);
            return state;
        case GRID_TYPES.SORT_LOCAL_TCR_GRID:
            state.localTcrGrid = GridUtil.manageSort(action.data, state.localTcrGrid);
            return state;
        case GRID_TYPES.INTITATE_COPY_FROM_GLOBAL:
            fullTreeData = JSON.parse(JSON.stringify(state.globalTcrProjectsCopy));
            fullTreeData.push({
                'name': 'Imported',
                'categories': action.data,
                'parentType': 'import'
            });

            state.globalTcrProjects = {
                redrawTree: false,
                tree: getTreeNodes({fullTreeData})
            };

            state.localTcrGrid = JSON.parse(JSON.stringify(state.tcrGrid));

            let localTreeData = JSON.parse(JSON.stringify(state.treeData));
            let indexOfImported = localTreeData.tree.findIndex(node => 'Imported' === node.text);
            if (indexOfImported) {
                localTreeData.tree.splice(indexOfImported);
            }

            state.localTreeData = localTreeData;

            state.globalTcrGrid.paginationOptions = JSON.parse(JSON.stringify(TCR_GRID_PAGINATION));
            state.globalTcrGrid.size = TCR_GRID_PAGINATION.size;
            state.globalTcrGrid.rows = [];

            return state;
        case GRID_TYPES.FETCH_TREE_DATA_FOR_LOCAL_TREE:

            fullTreeData = [{
                'name': action.data.releaseName,
                'categories': action.data.data,
                'id': 0,
                'releaseId': action.data.releaseId
            }];

            state.localTreeData = {
                redrawTree: false,
                tree: getTreeNodes({fullTreeData})
            };

            state.globalTcrGrid.event = FETCH_TREE_DATA_FOR_LOCAL_TREE;
            return state;
        case GRID_TYPES.CLEAR_GLOBAL_TREE_DATA:
            state.localTreeData = [];
            state.localTcrGrid.rows = [];
            state.globalTcrProjects = {
                redrawTree: false,
                tree: [{
                    'text': 'Projects',
                }, {
                    'text': 'Imported'
                }]
            };
            state.localTcrGrid.paginationOptions = JSON.parse(JSON.stringify(TCR_GRID_PAGINATION));
            state.localTcrGrid.size = TCR_GRID_PAGINATION.size;

            return state;
        case GRID_TYPES.FETCH_SEARCHED_TESTCASES:
            state.findNaddGrid.sortedRows = action.data.data.results;
            state.findNaddGrid.offset = action.data.offset;
            state.findNaddGrid.currentPage = action.data.currentPage;
            state.findNaddGrid.totalCount = action.data.data.resultSize;
            state.findNaddGrid.size = action.data.size || state.findNaddGrid.size;
            state.findNaddGrid.rows = GridUtil.fetchGridRecords(action.data.data.results, state.findNaddGrid, true);
            return state;
        case GRID_TYPES.UPDATE_FIND_ADD_GRID_SIZE:
            state.findNaddGrid.size = action.data.size;
            state.findNaddGrid.currentPage = action.data.currentPage;
            state.findNaddGrid.event = UPDATE_FIND_ADD_GRID_SIZE_SUCCESS;
            return state;
        case GRID_TYPES.SORT_FIND_ADD_GRID:
            state.findNaddGrid = GridUtil.manageSort(action.data, state.findNaddGrid);
            return state;
        case GRID_TYPES.NEXT_PAGE_FIND_ADD_GRID:
            state.findNaddGrid.offset = action.data.offset;
            state.findNaddGrid.currentPage = action.data.currentPage;
            state.findNaddGrid.totalCount = action.data.testcases.resultSize;
            GridUtil.manageGridPagination('next', action.data.testcases.results, state.findNaddGrid, true);
            return state;
        case GRID_TYPES.PREV_PAGE_FIND_ADD_GRID:
            state.findNaddGrid.offset = action.data.offset;
            state.findNaddGrid.currentPage = action.data.currentPage;
            state.findNaddGrid.totalCount = action.data.testcases.resultSize;
            GridUtil.manageGridPagination('prev', action.data.testcases.results, state.findNaddGrid, true);
            return state;
        case GRID_TYPES.CLEAR_FIND_ADD_GRID_DATA:
            state.findNaddGrid = _.cloneDeep(initialState.findNaddGrid);
            if(action.data.size) {
                state.findNaddGrid.size = action.data.size;
            }
            return state;
        case GRID_TYPES.UPDATE_TREE_COUNT:

            state.treeData.redrawTree = false;
            state.treeData.refreshTree = false;
            state.treeData.tree.forEach(treeObj => {
                if (treeObj.text !== 'Imported') {
                    treeObj = updateTreeCount(treeObj, getCountObj(action.data), true);
                }
            });

            // force OnChange on state.treeData
            state.treeData = JSON.parse(JSON.stringify(state.treeData));
            return state;
        case GRID_TYPES.CLEAR_GRID_SELECTION:
            state.tcrGrid.event = 'CLEAR_GRID_SELECTION';
            return state;

        case GRID_TYPES.COMPLETE_TESTCASE_CREATED:
            state.newTestcase.status = 'COMPLETE_TESTCASE_CREATED';
            state.newTestcase.id = action.data.testcase.id;
            return state;

        case GRID_TYPES.CLEAR_TESTCASE_STATUS:
            state.newTestcase.status = '';
            return state;

        case GRID_TYPES.RELEASESACTION:
            state.isReleasesLoaded = true;
            return state;
        default:
            return state;
    }
}

/**
 * If clone, then testcases are returned as array.
 * If add, they are returned as object
 */
function addTestcasesToTCRGrid(tcrGrid, data) {
    tcrGrid.sortedRows = tcrGrid.sortedRows || [];

    if(_.isPlainObject(data)) {
        tcrGrid.sortedRows.push(data);
        tcrGrid.totalCount++;
    } else if(_.isArray(data)) {
        tcrGrid.sortedRows = tcrGrid.sortedRows.concat(data);
        tcrGrid.totalCount += data.length;
    }

    return tcrGrid;
}

function updateTreeCount(treeObj, count, isRelease) {
    let id = treeObj.a_attr['data-id'];
    if (isRelease) {
        id = 0;
    }
    if ((id || 0 === id) && count.hasOwnProperty(id)) {
        treeObj.a_attr['data-count'] = count[id];
    }
    if (treeObj.hasOwnProperty('children') && Array.isArray(treeObj.children) && treeObj.children.length) {
        treeObj.children.forEach(treeChild => {
            treeChild = updateTreeCount(treeChild, count, false);
        });
    }
    return treeObj;
}

function getCountObj(treeCount) {
    let count = {};
    if (Array.isArray(treeCount) && treeCount.length) {
        treeCount.forEach((item) => {
            if (item.hasOwnProperty('treeId')) {
                count[item.treeId] = item.testcaseCount;
            }
        });
    }
    return count;
}

function getTreeNodes(data) {
    let fullTreeData = data.fullTreeData;
    let selectedTreeId = data.selectedTreeId;
    let excludeContextItems = data.excludeContextItems || {};
    let count = data.count || {};

    return (fullTreeData || []).map(level => {
        let treeData =  {
            'a_attr': {
                'data-id': level.id || undefined,
                'data-releaseid': level.releaseId,
                'data-type': level.type,
                'data-desc': level.description,
                'data-name': level.name,
                'class': 'zee-tcr-anchor',
                'data-count': count.hasOwnProperty(level.id) ? count[level.id] : undefined,
                'data-star': level.star
            },
            'text': level.name
        };

        treeData['li_attr'] = {
          'title': level.description,
          'data-parenttype': level.parentType || data.parentType
        };

        let nodeData = level.data || data.data;
        if (_.isObject(nodeData) && !_.isEmpty(nodeData)) {
            Object.keys(nodeData).forEach(key => {
                treeData['a_attr'][`data-${key}`] = nodeData[key];
            });
        }

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
            fullTreeData: level.categories,
            excludeContextItems: cascade,
            data: level.data || data.data,
            parentType: level.parentType || data.parentType
        });

        if(selectedTreeId && selectedTreeId == level.id) {
            treeData['state'] = {
                'selected': true
            };
        }
        return treeData;
    });
}
