import * as GRID_CONSTANTS from '../../grid/grid.constant';

export const IMPORT_JIRA_GRID_TYPE = 'IMPORT_JIRA';
export const IMPORT_JIRA_GRID_COLUMNS = [{
    'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_CHECKBOX,
    'labelId': 'req_select_all',
    'labelName': '',
    'labelClass': 'grid_checkbox_all',
    'sortable': false,
    'sortOptions': {},
    'resizable': false,
    'fixedSize': 41,
    'show': true,
    'min': 41,
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
                'name': 'req_select'
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
    'labelId': 'requirement-import-jira-id',
    'labelName': 'ID',
    'labelClass': 'requirement-import-jira-id',
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
        'pipes': null
    },
    'editable': false,
    'editOptions': {},
    'columnChooser': {
        'show': true,
        'default': true
    }
}, {
    'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
    'labelId': 'requirement-import-jira-project',
    'labelName': 'Project',
    'labelClass': 'requirement-import-jira-project',
    'sortable': true,
    'sortOptions': {
        'default': false,
        'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
        'isSorted': false,
        'key': 'product',
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
        'key': 'product',
        'pipes': null
    },
    'editable': false,
    'editOptions': {},
    'columnChooser': {
        'show': true,
        'default': true
    }
}, {
    'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
    'labelId': 'requirement-import-jira-status',
    'labelName': 'Status',
    'labelClass': 'requirement-import-jira-status',
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
        'default': true
    }
}, {
    'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
    'labelId': 'requirement-import-jira-summary',
    'labelName': 'Summary',
    'labelClass': 'requirement-import-jira-summary',
    'sortable': true,
    'sortOptions': {
        'default': false,
        'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
        'isSorted': false,
        'key': 'shortDesc',
        'reverse': false,
        'dataType': 'string'
    },
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
}, {
    'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
    'labelId': 'requirement-import-jira-created-on',
    'labelName': 'Created On',
    'labelClass': 'requirement-import-jira-created-on',
    'sortable': true,
    'sortOptions': {
        'default': false,
        'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
        'isSorted': false,
        'key': 'creation_time',
        'reverse': false,
        'dataType': 'number'
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
        'key': 'creation_time',
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
    'labelId': 'requirement-import-jira-assigned-to',
    'labelName': 'Assigned To',
    'labelClass': 'requirement-import-jira-assigned-to',
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
    'show': true,
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
    'labelId': 'requirement-import-jira-priority',
    'labelName': 'Priority',
    'labelClass': 'requirement-import-jira-priority',
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
    'labelId': 'requirement-import-jira-component',
    'labelName': 'Component',
    'labelClass': 'requirement-import-jira-component',
    'sortable': false,
    'sortOptions': {
        'default': false,
        'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
        'isSorted': false,
        'key': 'multiComponents',
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
    'labelId': 'requirement-import-jira-version',
    'labelName': 'Affects Versions',
    'labelClass': 'requirement-import-jira-version',
    'sortable': false,
    'sortOptions': {
        'default': false,
        'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
        'isSorted': false,
        'key': 'multiVersions',
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
    'labelId': 'requirement-import-jira-reportedBy',
    'labelName': 'Reported By',
    'labelClass': 'requirement-import-jira-reportedBy',
    'sortable': true,
    'sortOptions': {
        'default': false,
        'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
        'isSorted': false,
        'key': 'created_by',
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

export const IMPORT_JIRA_GRID_OPTIONS = {
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
	'columns': IMPORT_JIRA_GRID_COLUMNS
};

export const IMPORT_JIRA_GRID_PAGINATION = {
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
