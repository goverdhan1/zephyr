import {I18N_MESSAGES} from '../../../../../utils/messages/messages.en';
import * as GRID_CONSTANTS from '../../../grid/grid.constant';

export const DEFECT_TRACKING_SEARCH_GRID_TYPE = 'DEFECT_DETAILS';
export const DEFECT_TRACKING_SEARCH_GRID_COLUMNS = [{
    'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_CHECKBOX,
    'labelId': 'defect_select',
    'labelName': '',
    'labelClass': 'grid_checkbox_all',
    'sortable': false,
    'sortOptions': {},
    'resizable': false,
    'fixedSize': 35,
    'show': true,
    'min': 35,
    'flexGrow': 'initial',
    'defaultSize': 0,
    'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
    'cell': {
        'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
        'type': GRID_CONSTANTS.GRID_CELL_TYPES['CHECKBOX'],
        'actions': [],
        'key': 'id',
        'pipes': [{
            'name': 'checkbox',
            'args': [{
                'class': 'grid_checkbox',
                'name': 'testcase_select'
            }]
        }]
    },
    'editable': false,
    'editOptions': {},
    'columnChooser': {
        'show': false,
        'default': false
    }
}, {
    'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
    'labelId': 'defect-detail-id',
    'labelName': 'ID',
    'labelClass': 'defect-detail-id',
    'sortable': true,
    'sortOptions': {
        'default': false,
        'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
        'isSorted': false,
        'key': 'alternateId',
        'reverse': false,
        'dataType': 'string'
    },
    'resizable': false,
    'fixedSize': 41,
    'show': true,
    'min': 112,
    'flexGrow': 'initial',
    'defaultSize': 'px',
    'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
    'cell': {
        'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
        'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
        'actions': [],
        'key': 'alternateId',
        'pipes': [{
            'name': 'gridAction',
            'args': [{
                'key': 'subtask-parent'
            }, {
                'store': 'defectDetails'
            }]
        }]
    },
    'editable': false,
    'editOptions': {},
    'columnChooser': {
        'show': true,
        'default': true
    }
}, {
    'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
    'labelId': 'defect-detail-issuetype',
    'labelName': 'Issue Type',
    'labelClass': 'defect-detail-issuetype',
    'sortable': true,
    'sortOptions': {
        'default': false,
        'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
        'isSorted': false,
        'key': 'issueTypeName',
        'reverse': false,
        'dataType': 'string'
    },
    'resizable': false,
    'fixedSize': 41,
    'show': true,
    'min': 140,
    'flexGrow': 'initial',
    'defaultSize': 'px',
    'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
    'cell': {
        'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
        'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
        'actions': [],
        'key': 'issueTypeName',
        'pipes': null
    },
    'editable': false,
    'editOptions': {},
    'columnChooser': {
        'show': true,
        'default': false
    }
}, {
    'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
    'labelId': 'defect-detail-summary',
    'labelName': 'Summary',
    'labelClass': 'defect-detail-summary',
    'sortable': true,
    'sortOptions': {
        'default': false,
        'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
        'isSorted': false,
        'key': 'shortDesc',
        'reverse': false,
        'dataType': 'string'
    },
    'ellipsis': 'no-ellipsis',
    'resizable': false,
    'fixedSize': 41,
    'show': true,
    'min': 76,
    'flexGrow': '1',
    'defaultSize': 'px',
    'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
    'cell': {
        'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
        'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
        'actions': [],
        'key': 'shortDesc',
        'pipes': null
    },
    'editable': false,
    'editOptions': {},
    'columnChooser': {
        'show': true,
        'default': false
    }
},{
    'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
    'labelId': 'defect-detail-priority',
    'labelName': 'Priority',
    'labelClass': 'defect-detail-priority',
    'sortable': true,
    'sortOptions': {
      'default': false,
      'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
      'isSorted': false,
      'key': 'priority',
      'reverse': false,
      'dataType': 'string'
    },
    'resizable': false,
    'fixedSize': 41,
    'show': true,
    'min': 140,
    'flexGrow': 'initial',
    'defaultSize': 'px',
    'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
    'cell': {
        'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
        'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
        'actions': [],
        'key': 'priority',
        'pipes': null
    },
    'editable': false,
    'editOptions': {},
    'columnChooser': {
        'show': true,
        'default': false
    }
}, {
    'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
    'labelId': 'defect-detail-status',
    'labelName': 'Status',
    'labelClass': 'defect-detail-status',
    'sortable': true,
    'sortOptions': {
        'default': false,
        'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
        'isSorted': false,
        'key': 'status',
        'reverse': false,
        'dataType': 'string'
    },
    'resizable': false,
    'fixedSize': 41,
    'show': true,
    'min': 140,
    'flexGrow': 'initial',
    'defaultSize': 'px',
    'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
    'cell': {
        'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
        'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
        'actions': [],
        'key': 'status',
        'pipes': null
    },
    'editable': false,
    'editOptions': {},
    'columnChooser': {
        'show': true,
        'default': false
    }
}, {
    'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
    'labelId': 'defect-detail-test-cycles',
    'labelName': 'Test Cycle(s)',
    'labelClass': 'defect-detail-test-cycles',
    'hideTitle': true,
    'sortable': false,
    'sortOptions': {},
    'ellipsis': 'no-ellipsis',
    'resizable': false,
    'fixedSize': 41,
    'show': true,
    'min': 180,
    'flexGrow': 'initial',
    'defaultSize': 'px',
    'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
    'cell': {
        'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
        'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
        'actions': [],
        'key': 'testcases',
        'pipes': [{
            'name': 'listParser',
            'args': [{
                'params': [{
                    'key': 'cycleName',
                    'pipe': null,
                    'hideRowAlike': true,
                    'hideRowAlikeKey': 'cycleId',
                }],
                'seperator': '<br>'
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
    'labelId': 'defect-detail-test-cases',
    'labelName': 'Test Case(s)',
    'labelClass': 'defect-detail-test-cases',
    'hideTitle': true,
    'sortable': false,
    'sortOptions': {},
    'ellipsis': 'no-ellipsis',
    'resizable': false,
    'fixedSize': 41,
    'show': true,
    'min': 180,
    'flexGrow': 'initial',
    'defaultSize': 'px',
    'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
    'cell': {
        'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
        'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
        'actions': [],
        'key': 'testcases',
        'pipes': [{
            'name': 'listParser',
            'args': [{
                'params': [{
                    'key': 'id',
                    'pipe': 'link',
                    'dataKey': 'id'
                }, {
                    'key': 'name',
                    'pipe': 'text',
                    'className': 'testcase-link'
                }],
                'seperator': '<br>'
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
    'labelId': 'defect-detail-component',
    'labelName': 'Component/s',
    'labelClass': 'defect-detail-component',
    'sortable': false,
    'sortOptions': {
        // 'default': false,
        // 'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
        // 'isSorted': false,
        // 'key': 'multiComponents',
        // 'reverse': false,
        // 'dataType': 'string'
    },
    'resizable': false,
    'fixedSize': 41,
    'show': false,
    'min': 140,
    'flexGrow': 'initial',
    'defaultSize': 'px',
    'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
    'cell': {
        'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
        'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
        'actions': [],
        'key': 'multiComponentsMap',
        'pipes': [{
            'name': 'listParser',
            'args': [{
                'params': [{
                    'key': 'OBJECT_VALUE'
                }],
                'seperator': ','
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
    'labelId': 'defect-detail-version',
    'labelName': 'Version/s',
    'labelClass': 'defect-detail-version',
    'sortable': false,
    'sortOptions': {
        // 'default': false,
        // 'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
        // 'isSorted': false,
        // 'key': 'multiVersions',
        // 'reverse': false,
        // 'dataType': 'string'
    },
    'resizable': false,
    'fixedSize': 41,
    'show': false,
    'min': 140,
    'flexGrow': 'initial',
    'defaultSize': 'px',
    'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
    'cell': {
        'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
        'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
        'actions': [],
        'key': 'multiVersionsMap',
        'pipes': [{
            'name': 'listParser',
            'args': [{
                'params': [{
                    'key': 'OBJECT_VALUE'
                }],
                'seperator': ','
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
    'labelId': 'defect-detail-fixVersion',
    'labelName': 'Fix Version/s',
    'labelClass': 'defect-detail-fixVersion',
    'sortable': false,
    'sortOptions': {},
    'resizable': false,
    'fixedSize': 41,
    'show': false,
    'min': 180,
    'flexGrow': 'initial',
    'defaultSize': 'px',
    'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
    'cell': {
        'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
        'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
        'actions': [],
        'key': 'fixVersionsMap',
        'pipes': [{
            'name': 'listParser',
            'args': [{
                'params': [{
                    'key': 'OBJECT_VALUE'
                }],
                'seperator': ','
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
    'labelId': 'defect-detail-assignee',
    'labelName': 'Assignee',
    'labelClass': 'defect-detail-assignee',
    'sortable': true,
    'sortOptions': {
      'default': false,
      'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
      'isSorted': false,
      'key': 'assigned_to',
      'reverse': false,
      'dataType': 'string'
    },
    'resizable': false,
    'fixedSize': 41,
    'show': false,
    'min': 140,
    'flexGrow': 'initial',
    'defaultSize': 'px',
    'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
    'cell': {
        'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
        'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
        'actions': [],
        'key': 'assigned_to',
        'pipes': null
    },
    'editable': false,
    'editOptions': {},
    'columnChooser': {
        'show': true,
        'default': false
    }
}, {
    'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
    'labelId': 'defect-detail-filedBy',
    'labelName': 'Filed By',
    'labelClass': 'defect-detail-filedBy',
    'sortable': true,
    'sortOptions': {
      'default': false,
      'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
      'isSorted': false,
      'key': 'created_by',
      'reverse': false,
      'dataType': 'string'
    },    'resizable': false,
    'fixedSize': 41,
    'show': false,
    'min': 140,
    'flexGrow': 'initial',
    'defaultSize': 'px',
    'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
    'cell': {
        'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
        'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
        'actions': [],
        'key': 'created_by',
        'pipes': null
    },
    'editable': false,
    'editOptions': {},
    'columnChooser': {
        'show': true,
        'default': false
    }
}];

export const DEFECT_TRACKING_SEARCH_GRID_OPTIONS = {
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
	'columns': DEFECT_TRACKING_SEARCH_GRID_COLUMNS
};

export const DEFECT_EXPORT_OPTIONS = {
    id: 'defect_export_1',
    header: I18N_MESSAGES['zephyr.button.export']
};

export const DEFECT_MAX_RECORDS_EXPORT = 500;

export const DEFECT_TRACKING_SEARCH_GRID_PAGINATION = {
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
