import {
  FETCH_INITIAL_GRID_STATE, CLEAR_GRID_EVENTS, UPDATE_GRID_STATE, FETCH_CUSTOM_FIELD_AND_TYPES, ADD_CUSTOM_FIELD,
  DELETE_CUSTOM_FIELD, EDIT_CUSTOM_FIELD, UPDATE_CUSTOM_FIELD_PROJECT,
  SORT_ADD_OTHER_CYCLE_GRID_TYPE_GRID, CLEAR_GRID_DATA_BY_TYPE, SET_INITIAL_GRID_STATE, RESET_INITIAL_GRID_STATE,
  SET_GRID_PREF, RESET_INITIAL_GRID_STATE_FOR_ALL, UPDATE_EVENT_FOR_GRID
} from '../utils/constants/action.types';

import {
  FETCH_INITIAL_GRID_STATE_SUCCESS, FETCH_INITIAL_GRID_STATE_SUCCESS_FROM_DB, REFETCH_INITIAL_GRID_STATE_SUCCESS,
  RESET_INITIAL_GRID_STATE_SUCCESS, RESET_INITIAL_GRID_STATE_SUCCESS_FOR_GRID, SET_PROJECT_CUSTOM_FIELDS_SUCCESS,
  UPDATE_GRID_STATE_SUCCESS
} from '../utils/constants/action.events';

// import {PouchDB} from 'pouchdb-browser';

// Constants
import {
  TCR_GRID_OPTIONS, GLOBAL_TCC_GRID_OPTIONS, TCR_GRID_TYPE, LOCAL_TCC_GRID_OPTIONS, GLOBAL_TCR_GRID_TYPE,
  LOCAL_TCR_GRID_TYPE,
  FIND_ADD_GRID_TYPE, FIND_AND_ADD_GRID_OPTIONS, TCR_COVERAGE_GRID_TYPE
} from '../view/components/tcr/tcr_grid.constant';

import {ZAUTO_GRID_TYPE, ZAUTO_GRID_OPTIONS, GRID_ROW_COUNT_DEFAULT} from '../view/components/zautomation/zautomation_grid.constant';
import {FILEWATCH_GRID_TYPE, FILE_WATCH_GRID_OPTIONS} from '../view/components/zautomation/file_watcher_grid.constant';
import {TCEP_GRID_TYPE, TCEP_GRID_OPTIONS, TCEP_GRID_ROW_COUNT_DEFAULT} from '../view/components/reports/tcep_grid.constant';

import { TCE_GRID_OPTIONS, TCE_GRID_TYPE, TCE_ZBOT_GRID_OPTIONS, TCE_ZBOT_GRID_TYPE,
    TCE_SEARCH_GRID_OPTIONS, TCE_SEARCH_GRID_TYPE} from '../view/components/tce/tce_grid.constant';
import { RESOURCE_GRID_OPTIONS,  RESOURCE_GRID_TYPE} from '../view/components/resource_management/resource_management.constants';

import { TESTSTEP_GRID_OPTIONS,  TESTSTEP_GRID_TYPE,
    TESTSTEP_SEARCH_GRID_OPTIONS,  TESTSTEP_SEARCH_GRID_TYPE} from '../view/components/testcase/testcase.constant';

import * as GRID_CONSTANTS from '../view/components/grid/grid.constant';

import {
  REQ_COVERAGE_GRID_OPTIONS,
  REQ_COVERAGE_GRID_TYPE, REQ_GRID_OPTIONS,
  REQ_GRID_TYPE, REQ_TRACEABILITY_GRID_TYPE, TCE_REQ_COVERAGE_GRID_TYPE
} from '../view/components/requirements/req_grid.constant';

import { MAP_TC_GRID_OPTIONS, MAP_TC_GRID_TYPE, MAP_REQ_GRID_TYPE, MAP_REQ_GRID_OPTIONS } from
    '../view/components/mapTestReq/map_test.constant';

import { CYCLE_GRID_OPTIONS, CYCLE_GRID_TYPE } from '../view/components/testcase-eas/cycle/cycle_grid.constant';

import { PROJECT_RELEASE_GRID_OPTIONS, PROJECT_RELEASE_GRID_TYPE } from '../view/components/projects/project_release_grid.constant';
import { RELEASE_GRID_OPTIONS, RELEASE_GRID_TYPE , RELEASE_SETUP_GRID_TYPE } from
  '../view/components/release_setup/release_setup_grid.constant';

import { ROLES_GRID_OPTIONS, ROLES_GRID_TYPE , REQ_FIELDS_GRID_TYPE, REQ_FIELDS_GRID_OPTIONS, TST_FIELDS_GRID_TYPE, TST_FIELDS_GRID_OPTIONS,
HISTORY_GRID_TYPE, HISTORY_GRID_OPTIONS, TST_EXECUTION_STATUS_GRID_TYPE, TST_EXECUTION_STATUS_GRID_OPTIONS, TST_STEP_EXECUTION_STATUS_GRID_TYPE, TST_STEP_EXECUTION_STATUS_GRID_OPTIONS } from
    '../view/components/admin/customizations/customizations.constant';

import {
  PHASE_GRID_OPTIONS, PHASE_GRID_TYPE, FREEFORM_GRID_TYPE,
  FREEFORM_GRID_OPTIONS, ADD_OTHER_CYCLE_GRID_TYPE,
  ADD_OTHER_CYCLE_GRID_OPTIONS, FREEFORM_BROWSE_GRID_TYPE
} from '../view/components/testcase-eas/phase/phase_grid.constant';
import {SAVED_MAPS_GRID_TYPE, IMPORT_JOBS_GRID_TYPE,
    IMPORT_JOBS_GRID_OPTIONS, SAVED_MAPS_GRID_OPTIONS} from '../view/components/common/import/import_grid.constant';
import {DEFECT_TRACKING_SEARCH_GRID_OPTIONS, DEFECT_TRACKING_SEARCH_GRID_TYPE} from
     '../view/components/defects/defect_tracking/search/defect_tracking_search.constants';
import {DEFECTS_LINK_SEARCH_GRID_OPTIONS, DEFECTS_LINK_SEARCH_GRID_TYPE} from
  '../view/components/defects/defect_tracking/search/defects_link_search.constants';
import {CURRENTLY_LINKED_DEFECTS_GRID_OPTIONS, CURRENTLY_LINKED_DEFECTS_GRID_TYPE} from
     '../view/components/defects/defect_link/currently_linked/currently_linked_defects.constants';
import {TESTCASE_HISTORY_GRID_TYPE, TESTCASE_HISTORY_GRID_OPTIONS} from '../view/components/testcase/testcase_history_grid.constant';
import {DASHBOARD_GRID_TYPE, DASHBOARD_GRID_OPTIONS} from '../view/components/dashboard/dashboard_grid.constant';
import { PROJECT_SETUP_GRID_OPTIONS, PROJECT_SETUP_GRID_TYPE } from '../view/components/project_setup/project_setup.constants';
import {IMPORT_JIRA_GRID_OPTIONS, IMPORT_JIRA_GRID_TYPE} from
  '../view/components/requirements/operations/import_jira_grid.constants';
import {DEFECTS_ADMIN_GRID_OPTIONS, DEFECTS_ADMIN_GRID_TYPE} from '../view/components/defects_admin/defects_admin.constants';



import GridUtil from '../view/components/grid/grid_util';

declare var _, PouchDB, window;

const initialState = {
    event: '',
    customFieldsLoaded : false,
    projectId: 0,
    customFields: {},
    customTypes: []
};


const tcrArr = [
  TCR_GRID_TYPE,
  TCR_COVERAGE_GRID_TYPE,
  LOCAL_TCR_GRID_TYPE,

  TCE_GRID_TYPE,
  TCE_SEARCH_GRID_TYPE,
  MAP_TC_GRID_TYPE,

  FIND_ADD_GRID_TYPE,
  PHASE_GRID_TYPE,
  ADD_OTHER_CYCLE_GRID_TYPE,
  FREEFORM_BROWSE_GRID_TYPE,
  FREEFORM_GRID_TYPE,
];

const reqArr = [
  REQ_GRID_TYPE,
  MAP_REQ_GRID_TYPE,
  REQ_COVERAGE_GRID_TYPE,
  TCE_REQ_COVERAGE_GRID_TYPE
];

initialState[REQ_TRACEABILITY_GRID_TYPE] = REQ_GRID_OPTIONS;
initialState[REQ_GRID_TYPE] = REQ_GRID_OPTIONS;
initialState[TCE_REQ_COVERAGE_GRID_TYPE] = _.cloneDeep(REQ_COVERAGE_GRID_OPTIONS);
initialState[REQ_COVERAGE_GRID_TYPE] = _.cloneDeep(REQ_COVERAGE_GRID_OPTIONS);
initialState[TCR_COVERAGE_GRID_TYPE] = _.cloneDeep(TCR_GRID_OPTIONS);
initialState[TCR_GRID_TYPE] = TCR_GRID_OPTIONS;
initialState[TCE_GRID_TYPE] = TCE_GRID_OPTIONS;
initialState[RESOURCE_GRID_TYPE] = RESOURCE_GRID_OPTIONS;
initialState[TESTSTEP_GRID_TYPE] = TESTSTEP_GRID_OPTIONS;
initialState[TESTSTEP_SEARCH_GRID_TYPE] = TESTSTEP_SEARCH_GRID_OPTIONS;
initialState[GLOBAL_TCR_GRID_TYPE] = GLOBAL_TCC_GRID_OPTIONS;
initialState[LOCAL_TCR_GRID_TYPE] = LOCAL_TCC_GRID_OPTIONS;
initialState[CYCLE_GRID_TYPE] = CYCLE_GRID_OPTIONS;
initialState[MAP_TC_GRID_TYPE] = MAP_TC_GRID_OPTIONS;
initialState[MAP_REQ_GRID_TYPE] = MAP_REQ_GRID_OPTIONS;
initialState[PROJECT_RELEASE_GRID_TYPE] = PROJECT_RELEASE_GRID_OPTIONS;
initialState[RELEASE_GRID_TYPE] = RELEASE_GRID_OPTIONS;
initialState[SAVED_MAPS_GRID_TYPE] = SAVED_MAPS_GRID_OPTIONS;
initialState[IMPORT_JOBS_GRID_TYPE] = IMPORT_JOBS_GRID_OPTIONS;
initialState[TESTCASE_HISTORY_GRID_TYPE] = TESTCASE_HISTORY_GRID_OPTIONS;
initialState[TESTCASE_HISTORY_GRID_TYPE] = TESTCASE_HISTORY_GRID_OPTIONS;
initialState[PHASE_GRID_TYPE] = PHASE_GRID_OPTIONS;
initialState[FREEFORM_BROWSE_GRID_TYPE] = _.cloneDeep(FREEFORM_GRID_OPTIONS);
initialState[FREEFORM_GRID_TYPE] = FREEFORM_GRID_OPTIONS;
initialState[ADD_OTHER_CYCLE_GRID_TYPE ] = ADD_OTHER_CYCLE_GRID_OPTIONS;
initialState[DEFECT_TRACKING_SEARCH_GRID_TYPE] = DEFECT_TRACKING_SEARCH_GRID_OPTIONS;
initialState[DEFECTS_LINK_SEARCH_GRID_TYPE] = DEFECTS_LINK_SEARCH_GRID_OPTIONS;
initialState[CURRENTLY_LINKED_DEFECTS_GRID_TYPE] = CURRENTLY_LINKED_DEFECTS_GRID_OPTIONS;
initialState[FIND_ADD_GRID_TYPE] = FIND_AND_ADD_GRID_OPTIONS;
initialState[DASHBOARD_GRID_TYPE] = DASHBOARD_GRID_OPTIONS;
initialState[PROJECT_SETUP_GRID_TYPE] = PROJECT_SETUP_GRID_OPTIONS;
initialState[IMPORT_JIRA_GRID_TYPE] = IMPORT_JIRA_GRID_OPTIONS;
initialState[TCE_ZBOT_GRID_TYPE] = TCE_ZBOT_GRID_OPTIONS;
initialState[RELEASE_SETUP_GRID_TYPE] = RELEASE_GRID_OPTIONS;
initialState[ROLES_GRID_TYPE] = ROLES_GRID_OPTIONS;
initialState[DEFECTS_ADMIN_GRID_TYPE] = DEFECTS_ADMIN_GRID_OPTIONS;
initialState[REQ_FIELDS_GRID_TYPE] = REQ_FIELDS_GRID_OPTIONS;
initialState[TST_FIELDS_GRID_TYPE] = TST_FIELDS_GRID_OPTIONS;
initialState[HISTORY_GRID_TYPE] = HISTORY_GRID_OPTIONS;
initialState[TST_EXECUTION_STATUS_GRID_TYPE] = TST_EXECUTION_STATUS_GRID_OPTIONS;
initialState[TST_STEP_EXECUTION_STATUS_GRID_TYPE] = TST_STEP_EXECUTION_STATUS_GRID_OPTIONS;
initialState[TCE_SEARCH_GRID_TYPE] = TCE_SEARCH_GRID_OPTIONS;
initialState[ZAUTO_GRID_TYPE] = ZAUTO_GRID_OPTIONS;
initialState[FILEWATCH_GRID_TYPE] = FILE_WATCH_GRID_OPTIONS;
initialState[TCEP_GRID_TYPE] = TCEP_GRID_OPTIONS;

export const DEFAULT_GRID_STATE = _.cloneDeep(initialState);

export const CUSTOM_COLUMNS_COUNTS = {};

function getField(item, type, fieldType) {
    let field = {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'isCustomField': true,
        'fieldType': 'custom_field',
        'labelId': item.columnName,
        'fieldId': item.id,
        'labelName': item.displayName,
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_DESC,
            'isSorted': true,
            'key': `testcase.customProperties.${item.fieldName}`,
            'reverse': false,
            'dataType': 'number'
        },
        'resizable': true,
        'fixedSize': '76',
        'min': 76,
        'flexGrow': 'initial',
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'testcase',
            'pipes': []
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {
            'show': true,
            'default': false
        }
    };
    field.cell.pipes = field.cell.pipes.concat([{
        'name': 'customProperties',
        'args': [{
            'key': fieldType
        }, {
            'key': item.fieldName
        }]
    }, {
        'name': 'escapeHTMLPipe',
        'args': []
    }]);

    if (type && 'Date' === type.dataType) {
        field.cell.pipes.push({
            'name': 'date',
            'args': ['dd/MM/yy']
        });
    }
    return field;
}
function removeAllFields(state, gridType) {
    state[gridType].columns = JSON.parse(JSON.stringify(state[gridType].columns.filter(item => 'custom_field' !== item.fieldType)));
    DEFAULT_GRID_STATE[gridType].columns = JSON.parse(JSON.stringify(DEFAULT_GRID_STATE[gridType].columns.filter(item => 'custom_field' !== item.fieldType)));
    // initialState[gridType].columns = JSON.parse(JSON.stringify(initialState[gridType].columns.filter(item => 'custom_field' !== item.fieldType)));
}
function updateCustomField(state, id) {

    reqArr.concat(tcrArr).forEach(key => {
        removeAllFields(state, key);
        CUSTOM_COLUMNS_COUNTS[key] = 0;
    });

    Object.keys(state.customFields).forEach(key => {
        state.customFields[key].forEach(item => {

            if (!item.allProject && -1 === item.projectIds.indexOf(id)) {
                return;
            }

            let type = state.customTypes.filter(customType => customType.id === item.fieldTypeMetadata)[0];
            let field = getField(item, type, key);

            if ('requirement' === key) {

                reqArr.forEach(key => {
                    CUSTOM_COLUMNS_COUNTS[key]++;
                    state[key].columns.push(field);
                    DEFAULT_GRID_STATE[key].columns.push(field);
                });

            } else if ('testcase' === key) {

                tcrArr.forEach(key => {
                    CUSTOM_COLUMNS_COUNTS[key]++;
                    state[key].columns.push(field);
                    DEFAULT_GRID_STATE[key].columns.push(field);
                });

            }

        });
    });
}

function addCustomField(state, fieldType, customFields) {
    state.customFields[fieldType] = state.customFields[fieldType].concat(customFields);

    customFields.forEach(field => {
        let thisProject = state.projectId && (field.allProject || ~field.projectIds.indexOf(state.projectId));

        // update state grids if added custom field is associated to current project or for all projects
        if (thisProject) {
            let type = state.customTypes.filter(customType => customType.id === field.fieldTypeMetadata)[0];

            let customField = getField(field, type, fieldType);

            if ('requirement' === fieldType) {
                reqArr.forEach(key => {
                    CUSTOM_COLUMNS_COUNTS[key]++;
                    state[key].columns.push(customField);
                    DEFAULT_GRID_STATE[key].columns.push(customField);
                });

            } else if ('testcase' === fieldType) {
                tcrArr.forEach(key => {
                    CUSTOM_COLUMNS_COUNTS[key]++;
                    state[key].columns.push(customField);
                    DEFAULT_GRID_STATE[key].columns.push(customField);
                });
            }
        }
    });
}
function editFild(columns, field) {
    let customField = columns.filter((item) => {
      if (field.fieldName) {
        return item.fieldName === field.fieldName;
      } else {
        return item.labelId === field.labelId;
      }
    })[0];


    if (customField) {
        Object.assign(customField, field);
    }
}

function editCustomField(state, fieldType, field) {

    editFild(state.customFields[fieldType], field);

    let type = state.customTypes.filter(customType => customType.id === field.fieldTypeMetadata)[0];
    let customField = getField(field, type, fieldType);

    if ('requirement' === fieldType) {
        reqArr.forEach(key => {
            editFild(state[key].columns, customField);
            editFild(DEFAULT_GRID_STATE[key].columns, customField);
            // editFild(initialState[key].columns, field);
        });
    } else if ('testcase' === fieldType) {
        tcrArr.forEach(key => {
            editFild(state[key].columns, customField);
            editFild(DEFAULT_GRID_STATE[key].columns, customField);
            // editFild(initialState[key].columns, field);
        });
    }
}

function deleteField(columns, id) {
    let isKey = _.findIndex(columns, item => String(item.id) === String(id));
    if (isKey !== undefined) {
        columns.splice(isKey, 1);
    }
}
function deleteCustomField(state, fieldType, id) {
    deleteField(state.customFields[fieldType], id);

    if ('requirement' === fieldType) {
        reqArr.forEach(key => {
          deleteField(state[key].columns, id);
          deleteField(DEFAULT_GRID_STATE[key].columns, id);
          // deleteField(initialState[key].columns, id);
        });
    } else if ('testcase' === fieldType) {
        tcrArr.forEach(key => {
          deleteField(state[key].columns, id);
          deleteField(DEFAULT_GRID_STATE[key].columns, id);
          // deleteField(initialState[key].columns, id);
        });
    }
}

export function gridReducer(state = initialState, action) {

    let fieldType = ((action.data || {}).fieldType || '').toLowerCase();

    switch (action.type) {
      case UPDATE_EVENT_FOR_GRID:
        state['event'] = REFETCH_INITIAL_GRID_STATE_SUCCESS;
        return state;

        case SET_GRID_PREF:
          let gridPrefs = action.data;

          gridPrefs.forEach(pref => {
            initialState[pref.prefKey] = JSON.parse(pref.value);
            state[pref.prefKey] = _.cloneDeep(initialState[pref.prefKey]);
          });

          state['event'] = FETCH_INITIAL_GRID_STATE_SUCCESS_FROM_DB;
          return state;

        case FETCH_INITIAL_GRID_STATE:
            let key = action.data;
            if (action._data) {
              key = action._data.data;
            }

            state[key] = _.cloneDeep(initialState[key]);
            state['event'] = FETCH_INITIAL_GRID_STATE_SUCCESS;
            return state;

        case SET_INITIAL_GRID_STATE:
          let gridKey = action.data.gridType;
          initialState[gridKey] = action.data.state;
          state[gridKey] = _.cloneDeep(initialState[gridKey]);
          return state;

      case RESET_INITIAL_GRID_STATE_FOR_ALL:
          Object.getOwnPropertyNames(initialState).forEach(key => {
            if (!(~['customFields', 'customTypes', 'projectId'].indexOf(key))) {
                initialState[key] = _.cloneDeep(DEFAULT_GRID_STATE[key]);
                state[key] = initialState[key];
            }
          });

          state['event'] = RESET_INITIAL_GRID_STATE_SUCCESS;
          return state;

        case RESET_INITIAL_GRID_STATE:
          gridKey = action.data.gridType;

          DEFAULT_GRID_STATE[gridKey].columns.forEach(col => {
            if(col.fieldType === "custom_field") {
              col.show = false;
            }
          });

          initialState[gridKey] = DEFAULT_GRID_STATE[gridKey];
          state[gridKey] = _.cloneDeep(initialState[gridKey]);

          state['event'] = RESET_INITIAL_GRID_STATE_SUCCESS_FOR_GRID;
          state['gridKey'] = gridKey;
          return state;

        case UPDATE_GRID_STATE:
            state[action.gridType] = action.data;
            state['event'] = UPDATE_GRID_STATE_SUCCESS;
            return state;
        case CLEAR_GRID_EVENTS:
            state['event'] = '';
            state['gridKey'] = "";
            return state;

        case CLEAR_GRID_DATA_BY_TYPE:
            state[action.gridType] = _.cloneDeep(initialState[action.gridType]);
            return state;

        case FETCH_CUSTOM_FIELD_AND_TYPES:
            Object.assign(state.customFields, action.data.commonCustomFields);
            Object.assign(state.customTypes, action.data.customTypes);

            return state;
        case ADD_CUSTOM_FIELD:
            addCustomField(state, fieldType, action.data.customFields);

            return state;
        case DELETE_CUSTOM_FIELD:
            deleteCustomField(state, fieldType, action.data.id);
            return state;
        case EDIT_CUSTOM_FIELD:
            editCustomField(state, fieldType, action.data.field);
            return state;
        case UPDATE_CUSTOM_FIELD_PROJECT:
            state.projectId = action.id;

            updateCustomField(state, action.id);
            state['customFieldsLoaded'] = true;
            state['event'] = SET_PROJECT_CUSTOM_FIELDS_SUCCESS;
            return state;
        default:
            return state;
    }
}
