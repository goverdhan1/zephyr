// Import the i18n messages
import {I18N_MESSAGES} from '../../../utils/messages/messages.en';
import {UtililtyFunctions} from '../../../utils/scripts/utils';
import * as GRID_CONSTANTS from '../grid/grid.constant';

let utililtyFunction = new UtililtyFunctions();

export const ZAUTO_GRID_TYPE = 'zauto';
export const GRID_ROW_COUNT_DEFAULT = 50;

export const ZAUTO_GRID_COLUMNS = [

    // {
	// 	'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_CHECKBOX,
	// 	'labelId': 'automation_select_all',
	// 	'labelName': I18N_MESSAGES['zephyr.zautomation.select.all'],
	// 	'labelClass': 'grid_checkbox_all',
	// 	'sortable': false,
	// 	'sortOptions': {},
	// 	'resizable': false,
	//     'fixedSize': 41,
	// 	'show': true,
	// 	'min': 41,
	// 	'flexGrow': 'initial',
	// 	'defaultSize': 0,
	// 	'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
	// 	'cell': {
	// 		'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
	// 		'type': GRID_CONSTANTS.GRID_CELL_TYPES['CHECKBOX'],
	// 		'actions': [],
	// 		'key': 'id',
	// 		'pipes': [{
	// 			'name': 'checkbox',
	// 			'args': [{
	// 				'class': 'grid_checkbox',
	// 				'name': 'automation_select'
	// 			}]
	// 		}]
	// 	},
	// 	'editable': false,
	// 	'editOptions': {},
	// 	'columnChooser': {
	// 		'show': false,
	// 		'default': false
	// 	}
	// },  *BULK SELECT

 {
    'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
    'labelId': 'automation_id',
    'labelName': 'Id',
    'labelClass': '',
    'sortable': true,
    'sortOptions': {
      'default': false,
      'order': GRID_CONSTANTS.GRID_CELL_SORT_DESC,
      'isSorted': false,
      'key': 'id',
      'reverse': true,
      'dataType': 'number'
    },
    'resizable': false,
    'fixedSize': '61',
    'show': true,
    'min': 61,
    'flexGrow': 'initial',
    'defaultSize': 'px',
    'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
    'cell': {
      'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
      'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
      'actions': [],
      'key': 'id'
    },
    'editable': false,
    'editOptions': {},
    'columnChooser': {}
  },
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'zbotAgentMachine',
        'labelName': 'Agent Machine1',
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_DESC,
            'isSorted': false,
            'key': 'zbotAgentMachine',
            'reverse': false,
            'dataType': 'string'
        },
        'resizable': true,
        'fixedSize': '150',
        'show': true,
        'min': 250,
        'flexGrow': 'initial',
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
             'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
             'actions': [],
             'key': 'zbotAgentMachine'
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {
            'show': true,
            'default': true
        }
    },
     {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'zbotResultPath',
        'labelName': 'Result Path',
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_DESC,
            'isSorted': false,
            'key': 'resultPath',
            'reverse': false,
            'dataType': 'string'
        },
        'resizable': true,
        'fixedSize': '150',
        'show': true,
        'min': 330,
        'flexGrow': 'initial',
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
             'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
             'actions': [],
             'key': 'resultPath'
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {
            'show': true,
            'default': true
        }
    },
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'zblast_location',
        'labelName': 'Framework',
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_DESC,
            'isSorted': false,
            'key': 'automationFramework',
            'reverse': false,
            'dataType': 'string'
        },
        'resizable': true,
        'fixedSize': '130',
        'show': true,
        'min': 200,
        'flexGrow': 'initial',
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
             'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
             'actions': [],
             'key': 'automationFramework'
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {
            'show': true,
            'default': true
        }
    },
    {
    'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
    'labelId': 'zautomation_execution',
    'labelName': 'Execute Job',
    'labelClass': '',
    'sortable': false,
    'sortOptions': {},
    'resizable': false,
    'flexGrow': 'initial',
    'fixedSize': 90,
    'show': true,
    'min': 90,
    'defaultSize': 'px',
    'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
    'cell': {
      'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
      'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
      'actions': [],
      'key': '',
      'pipes': [{
              'name': 'gridAction',
              'args': [{
                'key': 'schedule_automation'
              }]
            }]
    },
    'editable': false,
    'editOptions': {},
    'columnChooser': {}
  },
   {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'status',
        'labelName': 'Status',
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': '',
            'reverse': true,
            'dataType': 'string'
        },
        'resizable': false,
        'fixedSize': '150',
        'show': true,
        'min': 150,
        'flexGrow': 'initial',
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'status'
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {
            'show': true,
            'default': false
        }
    },
     {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'scheduleDate',
        'labelName': 'Schedule Date',
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': '',
            'reverse': true,
            'dataType': 'date'
        },
        'resizable': false,
        'fixedSize': '150',
        'show': false,
        'min': 150,
        'flexGrow': 'initial',
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'jobScheduleDate',
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
    },
  {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'modifyDate',
        'labelName': 'Modify Date',
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': '',
            'reverse': true,
            'dataType': 'date'
        },
        'resizable': false,
        'fixedSize': '150',
        'show': false,
        'min': 150,
        'flexGrow': 'initial',
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'jobModifyDate',
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
    },
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'createDate',
        'labelName': 'Create Date',
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': '',
            'reverse': true,
            'dataType': 'date'
        },
        'resizable': false,
        'fixedSize': '150',
        'show': false,
        'min': 150,
        'flexGrow': 'initial',
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'jobCrationDate',
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
    },
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'createdBy',
        'labelName': 'Created By',
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'createdBy',
            'reverse': true,
            'dataType': 'string'
        },
        'resizable': false,
        'fixedSize': '150',
        'show': false,
        'min': 150,
        'flexGrow': 'initial',
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'createdBy'
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {
            'show': true,
            'default': false
        }
    },
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'prefix',
        'labelName': 'Prefix',
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'prefix',
            'reverse': true,
            'dataType': 'string'
        },
        'resizable': false,
        'fixedSize': '150',
        'show': true,
        'min': 150,
        'flexGrow': 'initial',
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'prefix'
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {
            'show': true,
            'default': true
        }
    },
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'zcycleDuration',
        'labelName': 'Cycle Duration',
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'cycleDuration',
            'reverse': true,
            'dataType': 'string'
        },
        'resizable': false,
        'fixedSize': '150',
        'show': true,
        'min': 150,
        'flexGrow': 'initial',
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'cycleDuration',
            'pipes': [{
              'name': 'gridAction',
              'args': [{
                'key': 'cycle_duration'
              }]
            }]
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {
            'show': true
        }
    },
 {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'zautomation_action',
        'labelName': 'Action',
        'labelClass': '',
        'sortable': false,
        'sortOptions': {},
        'resizable': false,
        'flexGrow': 'initial',
        'fixedSize': 60,
        'show': true,
        'min': 60,
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [{
                name: 'delete',
                key: 'settings.editable',
                className: 'delete',
                title : 'Delete',
                show: true
            }],
            'key': '',
            'pipes': []
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {
            'show': true,
            'default': true
        }
    }
  ];
    export const ZAUTO_GRID_OPTIONS = {
    'headerRow': true,
    'headerBackground': true,
    'rowCount': GRID_CONSTANTS.GRID_ROW_COUNT_DEFAULT,
    'rowReorder': false,
    'gridDND': true,
    'gridDNDOptions': {
		'scope': 'automation',
		'dragTitle': 'automation',
		'selectDraggable': true,
		'doAllocate' : {
	        'source': 'global',
	        'target': 'release'
	    }
	},
    'columnCount': GRID_CONSTANTS.GRID_COLUMN_COUNT_DEFAULT,
    'columnReorder': false,
    'columnSeparator': true,
    'columnChooser': {
        'show': true
    },
    'secondaryId': {
        'show': true,
        'key': 'testcase'
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
    'columns': ZAUTO_GRID_COLUMNS
};
 export const ZAUTO_GRID_PAGINATION = {
	show: true,
	isFirstPage: true,
	isLastPage: true,
	pageList: [],
	currentOfTotal: '',
	currentIndex: 1,
	lastIndex: 0,
	disabled: false,
	size: GRID_CONSTANTS.GRID_ROW_COUNT_DEFAULT
};
