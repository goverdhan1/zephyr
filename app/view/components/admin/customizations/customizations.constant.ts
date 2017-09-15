import {I18N_MESSAGES} from '../../../../utils/messages/messages.en';
import * as GRID_CONSTANTS from '../../grid/grid.constant';

//Roles grid constants
export const ROLES_GRID_TYPE = 'roles';

export const ROLES_GRID_COLUMNS = [
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'roles_number',
        'labelName': I18N_MESSAGES['zephyr.admin.customization.roles.grid.id'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_DESC,
            'isSorted': false,
            'key': 'id',
            'reverse': false,
            'dataType': 'number'
        },
        'resizable': false,
        'flexGrow': 'initial',
        'fixedSize': 61,
        'show': true,
        'min': 61,
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'id',
            'pipes': []
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {}
    }, {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'roles_name',
        'labelName': I18N_MESSAGES['zephyr.admin.customization.roles.grid.name'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'name',
            'reverse': false,
            'dataType': 'string'
        },
        'resizable': true,
        'flexGrow': 1,
        'fixedSize': 'auto',
        'show': true,
        'min': 100,
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'name',
            'pipes': [{
              'name': 'escapeHTMLPipe',
              'args': []
            }]
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {}
    }, {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'roles_description',
        'labelName': I18N_MESSAGES['zephyr.admin.customization.roles.grid.description'],
        'labelClass': '',
        'sortable': false,
        'sortOptions': {},
        'resizable': false,
        'flexGrow': 'initial',
        'fixedSize': 160,
        'show': true,
        'min': 160,
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'description',
            'pipes': [{
              'name': 'escapeHTMLPipe',
              'args': []
            }]
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {
            'show': true,
            'default': false
        }
    }, {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'roles_action',
        'labelName': I18N_MESSAGES['zephyr.grid.actions'],
        'labelClass': '',
        'sortable': false,
        'sortOptions': {},
        'resizable': false,
        'flexGrow': 'initial',
        'fixedSize': 122,
        'show': true,
        'min': 122,
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [{
                name: 'delete',
                key: 'editable',
                className: 'delete',
                title : 'Delete',
                show: true
            }],
            'key': '',
            'pipes': []
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {}
    }
];

export const ROLES_GRID_OPTIONS = {
    'headerRow': true,
    'headerBackground': true,
    'rowCount': 100000,
    'rowReorder': false,
    'gridDND': false,
    'columnCount': GRID_CONSTANTS.GRID_COLUMN_COUNT_DEFAULT,
    'columnReorder': false,
    'columnSeparator': true,
    'columnChooser': {
        'show': true
    },
    'pagination': {
        'show': false,
        'currentOfTotal': true,
        'navBar': {
            'type': 'complex',
            'isFirstLast': false
        },
        'pageSize': true,
        'pages': GRID_CONSTANTS.GRID_PAGE_SIZES
    },
    'columns': ROLES_GRID_COLUMNS
};

export const ROLES_GRID_PAGINATION = {
    show: false,
    isFirstPage: true,
    isLastPage: true,
    pageList: [],
    currentOfTotal: '',
    currentIndex: 1,
    lastIndex: 0,
    disabled: false,
    size: GRID_CONSTANTS.GRID_ROW_COUNT_DEFAULT
};

//Fields grid constants
export const REQ_FIELDS_GRID_TYPE = 'req_fields';

export const REQ_FIELDS_GRID_COLUMNS = [
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT_SERIAL_NUMBER,
        'labelId': 'roles_number',
        'labelName': I18N_MESSAGES['zephyr.admin.customization.fields.grid.serial.number'],
        'labelClass': '',
        'sortable': false,
        'sortOptions': {},
        'resizable': false,
        'flexGrow': 'initial',
        'fixedSize': 41,
        'show': true,
        'min': 41,
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'id',
            'pipes': []
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {}
    }, {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'roles_name',
        'labelName': I18N_MESSAGES['zephyr.admin.customization.fields.grid.name'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'displayName',
            'reverse': false,
            'dataType': 'string'
        },
        'resizable': true,
        'flexGrow': 1,
        'fixedSize': 'auto',
        'show': true,
        'min': 100,
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'displayName',
            'pipes': [{
              'name': 'escapeHTMLPipe',
              'args': []
            }]
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {}
    }, {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'roles_description',
        'labelName': I18N_MESSAGES['zephyr.admin.customization.fields.grid.description'],
        'labelClass': '',
        'sortable': false,
        'sortOptions': {},
        'resizable': false,
        'flexGrow': 'initial',
        'fixedSize': 140,
        'show': true,
        'min': 140,
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'description',
            'pipes': [{
              'name': 'escapeHTMLPipe',
              'args': []
            }]
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {
            'show': true,
            'default': false
        }
    }, {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'roles_metadata',
        'labelName': I18N_MESSAGES['zephyr.admin.customization.fields.grid.metadata'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_DESC,
            'isSorted': false,
            'key': 'fieldTypeMetadata',
            'reverse': false,
            'dataType': 'number'
        },
        'resizable': false,
        'flexGrow': 'initial',
        'fixedSize': 140,
        'show': true,
        'min': 140,
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'fieldTypeMetadata',
            'pipes': [{
              'name': 'gridAction',
              'args': [{
                    'key': 'metadata-id-name-mapping'
                }]
            }]
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {
            'show': true,
            'default': false
        }
    }, {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'roles_action',
        'labelName': I18N_MESSAGES['zephyr.grid.actions'],
        'labelClass': '',
        'sortable': false,
        'sortOptions': {},
        'resizable': false,
        'flexGrow': 'initial',
        'fixedSize': 99,
        'show': true,
        'min': 99,
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [{
                name: 'delete',
                key: 'editable',
                className: 'delete',
                title : 'Delete',
                show: true
            }],
            'key': '',
            'pipes': []
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {}
    }
];

export const REQ_FIELDS_GRID_OPTIONS = {
    'headerRow': true,
    'headerBackground': true,
    'rowCount': 100000,
    'rowReorder': false,
    'gridDND': false,
    'columnCount': GRID_CONSTANTS.GRID_COLUMN_COUNT_DEFAULT,
    'columnReorder': false,
    'columnSeparator': true,
    'columnChooser': {
        'show': true
    },
    'pagination': {
        'show': false,
        'currentOfTotal': true,
        'navBar': {
            'type': 'complex',
            'isFirstLast': false
        },
        'pageSize': true,
        'pages': GRID_CONSTANTS.GRID_PAGE_SIZES
    },
    'columns': REQ_FIELDS_GRID_COLUMNS
};

export const REQ_FIELDS_GRID_PAGINATION = {
    show: false,
    isFirstPage: true,
    isLastPage: true,
    pageList: [],
    currentOfTotal: '',
    currentIndex: 1,
    lastIndex: 0,
    disabled: false,
    size: GRID_CONSTANTS.GRID_ROW_COUNT_DEFAULT
};


  export const TST_FIELDS_GRID_TYPE = 'tst_fields';

export const TST_FIELDS_GRID_COLUMNS = [
  {
    'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT_SERIAL_NUMBER,
    'labelId': 'roles_number',
    'labelName': I18N_MESSAGES['zephyr.admin.customization.fields.grid.serial.number'],
    'labelClass': '',
    'sortable': false,
    'sortOptions': {},
    'resizable': false,
    'flexGrow': 'initial',
    'fixedSize': 41,
    'show': true,
    'min': 41,
    'defaultSize': 'px',
    'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
    'cell': {
      'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
      'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
      'actions': [],
      'key': 'id',
      'pipes': []
    },
    'editable': false,
    'editOptions': {},
    'columnChooser': {}
  }, {
    'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
    'labelId': 'roles_name',
    'labelName': I18N_MESSAGES['zephyr.admin.customization.fields.grid.name'],
    'labelClass': '',
    'sortable': true,
    'sortOptions': {
      'default': false,
      'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
      'isSorted': false,
      'key': 'displayName',
      'reverse': false,
      'dataType': 'string'
    },
    'resizable': true,
    'flexGrow': 1,
    'fixedSize': 'auto',
    'show': true,
    'min': 100,
    'defaultSize': 'px',
    'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
    'cell': {
      'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
      'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
      'actions': [],
      'key': 'displayName',
      'pipes': [{
        'name': 'escapeHTMLPipe',
        'args': []
      }]
    },
    'editable': false,
    'editOptions': {},
    'columnChooser': {}
  }, {
    'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
    'labelId': 'roles_description',
    'labelName': I18N_MESSAGES['zephyr.admin.customization.fields.grid.description'],
    'labelClass': '',
    'sortable': false,
    'sortOptions': {},
    'resizable': false,
    'flexGrow': 'initial',
    'fixedSize': 140,
    'show': true,
    'min': 140,
    'defaultSize': 'px',
    'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
    'cell': {
      'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
      'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
      'actions': [],
      'key': 'description',
      'pipes': [{
        'name': 'escapeHTMLPipe',
        'args': []
      }]
    },
    'editable': false,
    'editOptions': {},
    'columnChooser': {
      'show': true,
      'default': false
    }
  }, {
    'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
    'labelId': 'roles_metadata',
    'labelName': I18N_MESSAGES['zephyr.admin.customization.fields.grid.metadata'],
    'labelClass': '',
    'sortable': true,
    'sortOptions': {
      'default': false,
      'order': GRID_CONSTANTS.GRID_CELL_SORT_DESC,
      'isSorted': false,
      'key': 'fieldTypeMetadata',
      'reverse': false,
      'dataType': 'number'
    },
    'resizable': false,
    'flexGrow': 'initial',
    'fixedSize': 140,
    'show': true,
    'min': 140,
    'defaultSize': 'px',
    'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
    'cell': {
      'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
      'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
      'actions': [],
      'key': 'fieldTypeMetadata',
      'pipes': [{
        'name': 'gridAction',
        'args': [{
          'key': 'metadata-id-name-mapping'
        }]
      }]
    },
    'editable': false,
    'editOptions': {},
    'columnChooser': {
      'show': true,
      'default': false
    }
  }, {
    'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
    'labelId': 'roles_action',
    'labelName': I18N_MESSAGES['zephyr.grid.actions'],
    'labelClass': '',
    'sortable': false,
    'sortOptions': {},
    'resizable': false,
    'flexGrow': 'initial',
    'fixedSize': 99,
    'show': true,
    'min': 99,
    'defaultSize': 'px',
    'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
    'cell': {
      'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
      'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
      'actions': [{
        name: 'delete',
        key: 'editable',
        className: 'delete',
        title : 'Delete',
        show: true
      }],
      'key': '',
      'pipes': []
    },
    'editable': false,
    'editOptions': {},
    'columnChooser': {}
  }
];

export const TST_FIELDS_GRID_OPTIONS = {
  'headerRow': true,
  'headerBackground': true,
  'rowCount': 100000,
  'rowReorder': false,
  'gridDND': false,
  'columnCount': GRID_CONSTANTS.GRID_COLUMN_COUNT_DEFAULT,
  'columnReorder': false,
  'columnSeparator': true,
  'columnChooser': {
    'show': true
  },
  'pagination': {
    'show': false,
    'currentOfTotal': true,
    'navBar': {
      'type': 'complex',
      'isFirstLast': false
    },
    'pageSize': true,
    'pages': GRID_CONSTANTS.GRID_PAGE_SIZES
  },
  'columns': TST_FIELDS_GRID_COLUMNS
};

export const TST_FIELDS_GRID_PAGINATION = {
  show: false,
  isFirstPage: true,
  isLastPage: true,
  pageList: [],
  currentOfTotal: '',
  currentIndex: 1,
  lastIndex: 0,
  disabled: false,
  size: GRID_CONSTANTS.GRID_ROW_COUNT_DEFAULT
};


//History grid constants
export const HISTORY_GRID_TYPE = 'etl_history';

export const HISTORY_GRID_COLUMNS = [
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'job_number',
        'labelName': I18N_MESSAGES['zephyr.admin.customization.history.grid.id'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_DESC,
            'isSorted': false,
            'key': 'id',
            'reverse': false,
            'dataType': 'number'
        },
        'resizable': false,
        'flexGrow': 'initial',
        'fixedSize': 61,
        'show': true,
        'min': 61,
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'id',
            'pipes': []
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {}
    }, {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'job_name',
        'labelName': I18N_MESSAGES['zephyr.admin.customization.history.grid.job.name'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'jobName',
            'reverse': false,
            'dataType': 'string'
        },
        'resizable': true,
        'flexGrow': 1,
        'fixedSize': 'auto',
        'show': true,
        'min': 100,
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'jobName',
            'pipes': [{
              'name': 'escapeHTMLPipe',
              'args': []
            }]
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {}
    }, {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'node_name',
        'labelName': I18N_MESSAGES['zephyr.admin.customization.history.grid.node.name'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'nodeName',
            'reverse': false,
            'dataType': 'string'
        },
        'resizable': false,
        'flexGrow': 'initial',
        'fixedSize': 160,
        'show': true,
        'min': 160,
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'nodeName',
            'pipes': [{
              'name': 'escapeHTMLPipe',
              'args': []
            }]
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {
            'show': true,
            'default': false
        }
    }, {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'job_group',
        'labelName': I18N_MESSAGES['zephyr.admin.customization.history.grid.job.group'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_DESC,
            'isSorted': false,
            'key': 'jobGroup',
            'reverse': false,
            'dataType': 'string'
        },
        'resizable': false,
        'flexGrow': 'initial',
        'fixedSize': 160,
        'show': true,
        'min': 160,
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'jobGroup',
            'pipes': [{
              'name': 'escapeHTMLPipe',
              'args': []
            }]
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {
            'show': true,
            'default': false
        }
    }, {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'job_execution_date',
        'labelName': I18N_MESSAGES['zephyr.admin.customization.history.grid.job.execution.data'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_DESC,
            'isSorted': false,
            'key': 'executionDate',
            'reverse': false,
            'dataType': 'number'
        },
        'resizable': false,
        'flexGrow': 'initial',
        'fixedSize': 160,
        'show': true,
        'min': 160,
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'executionDate',
            'pipes': [{
                'name': 'date',
                'args': [{
                    'key': 'medium'
                }]
            }]
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {
            'show': true,
            'default': false
        }
    }, {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'job_target_date',
        'labelName': I18N_MESSAGES['zephyr.admin.customization.history.grid.job.target.date'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_DESC,
            'isSorted': false,
            'key': 'targetDate',
            'reverse': false,
            'dataType': 'number'
        },
        'resizable': false,
        'flexGrow': 'initial',
        'fixedSize': 160,
        'show': true,
        'min': 160,
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'targetDate',
            'pipes': [{
                'name': 'date',
                'args': ['MM/DD/YYYY']
            }]
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {
            'show': true,
            'default': false
        }
    }, {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'job_status',
        'labelName': I18N_MESSAGES['zephyr.admin.customization.history.grid.job.status'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_DESC,
            'isSorted': false,
            'key': 'status',
            'reverse': false,
            'dataType': 'string'
        },
        'resizable': false,
        'flexGrow': 'initial',
        'fixedSize': 160,
        'show': true,
        'min': 160,
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'status',
            'pipes':[{
                'name': 'gridAction',
                'args': [{
                    'key': 'job-status'
                }]
            }],
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {
            'show': true,
            'default': false
        }
    }, {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'job_result',
        'labelName': I18N_MESSAGES['zephyr.admin.customization.history.grid.job.result'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_DESC,
            'isSorted': false,
            'key': 'result',
            'reverse': false,
            'dataType': 'string'
        },
        'resizable': false,
        'flexGrow': 'initial',
        'fixedSize': 160,
        'show': true,
        'min': 160,
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'result',
            'pipes': []
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {
            'show': true,
            'default': false
        }
    }
];

export const HISTORY_GRID_OPTIONS = {
    'headerRow': true,
    'headerBackground': true,
    'rowCount': GRID_CONSTANTS.GRID_ROW_COUNT_DEFAULT,
    'rowReorder': false,
    'gridDND': false,
    'columnCount': GRID_CONSTANTS.GRID_COLUMN_COUNT_DEFAULT,
    'columnReorder': false,
    'columnSeparator': true,
    'columnChooser': {
        'show': true
    },
    'pagination': {
        'show': true,
        'currentOfTotal': true,
        'navBar': {
            'type': 'complex',
            'isFirstLast': false
        },
        'pageSize': true,
        'pages': GRID_CONSTANTS.GRID_PAGE_SIZES
    },
    'columns': HISTORY_GRID_COLUMNS
};

export const HISTORY_GRID_PAGINATION = {
    show: false,
    isFirstPage: true,
    isLastPage: true,
    pageList: [],
    currentOfTotal: '',
    currentIndex: 1,
    lastIndex: 0,
    disabled: false,
    size: GRID_CONSTANTS.GRID_ROW_COUNT_DEFAULT
};

/*export const APPLICATION_LABEL_ID_MAPPING = {
    '1': 'Administration',
    '2': 'Resource Management',
    '3': 'Project Setup',
    '4': 'Dept Dashboard Management',
    '5': 'Defect Tracking',
    '6': 'Defects Admin',
    '7': 'Metrics & Reports',
    '8': 'Release Setup',
    '9': 'Requirements',
    '10': 'Repository Setup',
    '11': 'Testcase EAS',
    '12': 'Project Dashboard',
    '13': 'Metrics and Reports',
    '14': 'Documents',
    '15': 'Testcase Creation',
    '16': 'Testcase Execution',
    '17': 'Defect Tracking'
};*/
export const APPLICATION_LABEL_ID_MAPPING = {
  '1': 'System Setup',
  '2': 'User Setup',
  '3': 'Project Setup',
  '4': '',
  '5': 'DefectTracking',
  '6': 'Defects Admin',
  '7': 'Metric And Reports',
  '8': 'Release Setup',
  '9': 'Requirements',
  '10': 'Testcase Creation',
  '11': 'Test Planning',
  '12': 'Release Dashboard Mgmt',
  '13': 'MetricAndReports',
  '14': 'Document Management',
  '15': 'Test Repository',
  '16': 'Test Execution',
  '17': 'Defect Tracking',
  '18': 'ProjectDashboard'
};

// Department APP ids
export const DEPARTMENT_APP_IDS = [1, 2, 3, 6];
export const PROJECTS_APP_IDS = [8, 9 , 15, 11, 16, 17];

//Fields grid constants
export const TST_EXECUTION_STATUS_GRID_TYPE = 'tst_execution_status';

export const TST_EXECUTION_STATUS_GRID_COLUMNS = [
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'execution_status_number',
        'labelName': I18N_MESSAGES['zephyr.admin.customization.execution.status.id'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_DESC,
            'isSorted': false,
            'key': 'id',
            'reverse': false,
            'dataType': 'number'
        },
        'resizable': false,
        'flexGrow': 'initial',
        'fixedSize': 61,
        'show': true,
        'min': 61,
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'id',
            'pipes': []
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {}
    },{
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'execution_status_name',
        'labelName': I18N_MESSAGES['zephyr.admin.customization.execution.status.value'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'value',
            'reverse': false,
            'dataType': 'string'
        },
        'resizable': true,
        'flexGrow': 1,
        'fixedSize': 'auto',
        'show': true,
        'min': 100,
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'value',
            'pipes': [{
              'name': 'escapeHTMLPipe',
              'args': []
            }]
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {}
    },{
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'execution_status_color',
        'labelName': I18N_MESSAGES['zephyr.admin.customization.execution.status.color'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'color',
            'reverse': false,
            'dataType': 'string'
        },
        'resizable': false,
        'flexGrow': 'initial',
        'fixedSize': 160,
        'show': true,
        'min': 160,
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'color',
            'pipes':[{
                'name': 'gridAction',
                'args': [{
                    'key': 'execution-status-box'
                }]
            },{
                'name': 'sanitization',
                'args': [{
                    'key': 'safeHTML'
                }]
            }],
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {
            'show': true,
            'default': false
        }
    },{
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TOGGLE,
        'labelId': 'execution_status_enable',
        'labelName': I18N_MESSAGES['zephyr.admin.customization.execution.status.enable'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'active',
            'reverse': false,
            'dataType': 'string'
        },
        'resizable': false,
        'flexGrow': 'initial',
        'fixedSize': 160,
        'show': true,
        'min': 160,
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': '',
            'pipes':[{
                'name': 'gridAction',
                'args': [{
                    'key': 'execution-status-enable-toggle-button'
                }]
            },{
                'name': 'sanitization',
                'args': [{
                    'key': 'safeHTML'
                }]
            }],
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {}
    }
];

export const TST_EXECUTION_STATUS_GRID_OPTIONS = {
    'headerRow': true,
    'headerBackground': true,
    'rowCount': 100000,
    'rowReorder': false,
    'gridDND': false,
    'columnCount': GRID_CONSTANTS.GRID_COLUMN_COUNT_DEFAULT,
    'columnReorder': false,
    'columnSeparator': true,
    'columnChooser': {
        'show': true
    },
    'pagination': {
        'show': false,
        'currentOfTotal': true,
        'navBar': {
            'type': 'complex',
            'isFirstLast': false
        },
        'pageSize': true,
        'pages': GRID_CONSTANTS.GRID_PAGE_SIZES
    },
    'columns': TST_EXECUTION_STATUS_GRID_COLUMNS
};

export const TST_EXECUTION_STATUS_GRID_PAGINATION = {
    show: false,
    isFirstPage: true,
    isLastPage: true,
    pageList: [],
    currentOfTotal: '',
    currentIndex: 1,
    lastIndex: 0,
    disabled: false,
    size: GRID_CONSTANTS.GRID_ROW_COUNT_DEFAULT
};

export const TST_STEP_EXECUTION_STATUS_GRID_TYPE = 'tst_step_execution_status';

export const TST_STEP_EXECUTION_STATUS_GRID_COLUMNS = [
  {
    'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
    'labelId': 'execution_status_number',
    'labelName': I18N_MESSAGES['zephyr.admin.customization.execution.status.id'],
    'labelClass': '',
    'sortable': true,
    'sortOptions': {
      'default': false,
      'order': GRID_CONSTANTS.GRID_CELL_SORT_DESC,
      'isSorted': false,
      'key': 'id',
      'reverse': false,
      'dataType': 'number'
    },
    'resizable': false,
    'flexGrow': 'initial',
    'fixedSize': 61,
    'show': true,
    'min': 61,
    'defaultSize': 'px',
    'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
    'cell': {
      'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
      'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
      'actions': [],
      'key': 'id',
      'pipes': []
    },
    'editable': false,
    'editOptions': {},
    'columnChooser': {}
  },{
    'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
    'labelId': 'execution_status_name',
    'labelName': I18N_MESSAGES['zephyr.admin.customization.execution.status.value'],
    'labelClass': '',
    'sortable': true,
    'sortOptions': {
      'default': false,
      'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
      'isSorted': false,
      'key': 'value',
      'reverse': false,
      'dataType': 'string'
    },
    'resizable': true,
    'flexGrow': 1,
    'fixedSize': 'auto',
    'show': true,
    'min': 100,
    'defaultSize': 'px',
    'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
    'cell': {
      'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
      'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
      'actions': [],
      'key': 'value',
      'pipes': [{
        'name': 'escapeHTMLPipe',
        'args': []
      }]
    },
    'editable': false,
    'editOptions': {},
    'columnChooser': {}
  },{
    'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
    'labelId': 'execution_status_color',
    'labelName': I18N_MESSAGES['zephyr.admin.customization.execution.status.color'],
    'labelClass': '',
    'sortable': true,
    'sortOptions': {
      'default': false,
      'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
      'isSorted': false,
      'key': 'color',
      'reverse': false,
      'dataType': 'string'
    },
    'resizable': false,
    'flexGrow': 'initial',
    'fixedSize': 160,
    'show': true,
    'min': 160,
    'defaultSize': 'px',
    'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
    'cell': {
      'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
      'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
      'actions': [],
      'key': 'color',
      'pipes':[{
        'name': 'gridAction',
        'args': [{
          'key': 'execution-status-box'
        }]
      },{
        'name': 'sanitization',
        'args': [{
          'key': 'safeHTML'
        }]
      }],
    },
    'editable': false,
    'editOptions': {},
    'columnChooser': {
      'show': true,
      'default': false
    }
  },{
    'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TOGGLE,
    'labelId': 'execution_status_enable',
    'labelName': I18N_MESSAGES['zephyr.admin.customization.execution.status.enable'],
    'labelClass': '',
    'sortable': true,
    'sortOptions': {
      'default': false,
      'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
      'isSorted': false,
      'key': 'active',
      'reverse': false,
      'dataType': 'string'
    },
    'resizable': false,
    'flexGrow': 'initial',
    'fixedSize': 160,
    'show': true,
    'min': 160,
    'defaultSize': 'px',
    'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
    'cell': {
      'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
      'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
      'actions': [],
      'key': '',
      'pipes':[{
        'name': 'gridAction',
        'args': [{
          'key': 'execution-status-enable-toggle-button'
        }]
      },{
        'name': 'sanitization',
        'args': [{
          'key': 'safeHTML'
        }]
      }],
    },
    'editable': false,
    'editOptions': {},
    'columnChooser': {}
  }
];

export const TST_STEP_EXECUTION_STATUS_GRID_OPTIONS = {
  'headerRow': true,
  'headerBackground': true,
  'rowCount': 100000,
  'rowReorder': false,
  'gridDND': false,
  'columnCount': GRID_CONSTANTS.GRID_COLUMN_COUNT_DEFAULT,
  'columnReorder': false,
  'columnSeparator': true,
  'columnChooser': {
    'show': true
  },
  'pagination': {
    'show': false,
    'currentOfTotal': true,
    'navBar': {
      'type': 'complex',
      'isFirstLast': false
    },
    'pageSize': true,
    'pages': GRID_CONSTANTS.GRID_PAGE_SIZES
  },
  'columns': TST_STEP_EXECUTION_STATUS_GRID_COLUMNS
};

export const TST_STEP_EXECUTION_STATUS_GRID_PAGINATION = {
  show: false,
  isFirstPage: true,
  isLastPage: true,
  pageList: [],
  currentOfTotal: '',
  currentIndex: 1,
  lastIndex: 0,
  disabled: false,
  size: GRID_CONSTANTS.GRID_ROW_COUNT_DEFAULT
};


export const RELEASE_SETUP_APPLICATION_ID = 8;
export const PROJECT_SETUP_APPLICATION_ID = 3;
export const RESOURCE_MANAGEMENT_APPLICATION_ID = 2;
export const MANAGER_ROLE_ID = 1;
export const LEAD_ROLE_ID = 2;
export const TESTER_ROLE_ID = 3;
export const DEFECT_USER_ROLE_ID = 4;
