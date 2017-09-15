import {I18N_MESSAGES} from '../../../utils/messages/messages.en';
import {UtililtyFunctions} from '../../../utils/scripts/utils';
import * as GRID_CONSTANTS from '../grid/grid.constant';

let utililtyFunction = new UtililtyFunctions();

export const FILEWATCH_GRID_TYPE = 'file_watcher';
export const GRID_ROW_COUNT_DEFAULT = 50;

export const FILE_WATCHER_GRID_COLUMNS = [
    
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
        'labelName': 'Agent Machine',
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
        'labelId': 'zbotFolderPath',
        'labelName': 'Folder Path',
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_DESC,
            'isSorted': false,
            'key': 'folderPath',
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
             'key': 'folderPath'
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {
            'show': true,
            'default': true
        }
    },

    //   {
    //     'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
    //     'labelId': 'zbotPhaseName',
    //     'labelName': 'Phase Name',
    //     'labelClass': '',
    //     'sortable': true,
    //     'sortOptions': {
    //         'default': false,
    //         'order': GRID_CONSTANTS.GRID_CELL_SORT_DESC,
    //         'isSorted': false,
    //         'key': 'phaseName',
    //         'reverse': false,
    //         'dataType': 'string'
    //     },
    //     'resizable': true,
    //     'fixedSize': '150',
    //     'show': true,
    //     'min': 330,
    //     'flexGrow': 'initial',
    //     'defaultSize': 'px',
    //     'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
    //     'cell': {
    //         'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
    //          'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
    //          'actions': [],
    //          'key': 'phaseName'
    //     },
    //     'editable': false,
    //     'editOptions': {},
    //     'columnChooser': {
    //         'show': true,
    //         'default': true
    //     }
    // },

    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'sleepoverPeriod',
        'labelName': 'Sleepover Period',
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_DESC,
            'isSorted': false,
            'key': 'delay',
            'reverse': false,
            'dataType': 'string'
        },
        'resizable': true,
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
             'key': 'delay'
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
        'labelId': 'jobInformation',
        'labelName': 'Job Information',
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'jobInformation',
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
            'key': 'jobInformation'
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
		'labelId': 'file_watch_action',
		'labelName': 'Action',
		'labelClass': '',
		'sortable': false,
		'sortOptions': {},
		'resizable': false,
		'flexGrow': 'initial',
		'fixedSize': 122,
		'show': true,
		'min': 240,
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
                    'key': 'play-pause-delete-icon'
                }]
            }]
		},
		'editable': false,
		'editOptions': {},
		'columnChooser': {}
	}

    //  {
    //     'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
    //     'labelId': 'file_watch_action',
    //     'labelName': 'Action',
    //     'labelClass': '',
    //     'sortable': false,
    //     'sortOptions': {},
    //     'resizable': false,
    //     'flexGrow': 'initial',
    //     'fixedSize': 60,
    //     'show': true,
    //     'min': 60,
    //     'defaultSize': 'px',
    //     'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
    //     'cell': {
    //         'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
    //         'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
    //         'actions': [{
    //             name: 'delete',
    //             key: 'settings.editable',
    //             className: 'delete',
    //             title : 'Delete',
    //             show: true
    //         }],
    //         'key': '',
    //         'pipes': []
    //     },
    //     'editable': false,
    //     'editOptions': {},
    //     'columnChooser': {
    //         'show': true,
    //         'default': true
    //     }
    // }

      ];

     export const FILE_WATCH_GRID_OPTIONS = {
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
    'columns': FILE_WATCHER_GRID_COLUMNS
};
 export const FILE_WATCH_GRID_PAGINATION = {
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
