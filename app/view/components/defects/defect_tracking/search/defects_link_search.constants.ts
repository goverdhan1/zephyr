import * as GRID_CONSTANTS from '../../../grid/grid.constant';

export const DEFECTS_LINK_SEARCH_GRID_TYPE = 'DEFECTS_LINK_SEARCH';
export const DEFECTS_LINK_SEARCH_GRID_COLUMNS = [{
    'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
    'labelId': 'defect-search-id',
    'labelName': 'ID',
    'labelClass': 'defect-search-id',
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
                'store': 'defectsSearch'
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
    'labelId': 'defect-search-issuetype',
    'labelName': 'Issue Type',
    'labelClass': 'defect-search-issuetype',
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
        'default': true
    }
}, {
    'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
    'labelId': 'defect-search-status',
    'labelName': 'Status',
    'labelClass': 'defect-search-status',
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
    'labelId': 'defect-search-summary',
    'labelName': 'Summary',
    'labelClass': 'defect-search-summary',
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
        'default': true
    }
}, {
    'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
    'labelId': 'defect-search-created-on',
    'labelName': 'Created On',
    'labelClass': 'defect-search-created-on',
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
        'default': true
    }
}, {
    'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
    'labelId': 'defect-search-assigned-to',
    'labelName': 'Assigned To',
    'labelClass': 'defect-search-assigned-to',
    'sortable': true,
    'sortOptions': {
        'default': false,
        'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
        'isSorted': false,
        'key': 'assigned_to',
        'reverse': false,
        'dataType': 'string'
    },
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
        'default': true
    }
}, {
    'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
    'labelId': 'defect-search-priority',
    'labelName': 'Priority',
    'labelClass': 'defect-search-priority',
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
        'default': true
    }
}, {
    'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
    'labelId': 'defect-search-link',
    'labelName': 'Link',
    'labelClass': 'defect-search-link',
    'sortable': false,
    'sortOptions': {},
    'resizable': false,
    'fixedSize': 41,
    'show': true,
    'min': 60,
    'flexGrow': 'initial',
    'defaultSize': 'px',
    'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
    'cell': {
        'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
        'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
        'actions': [],
        'key': 'link',
        'pipes': [{
            'name': 'gridAction',
            'args': [{
                'key': 'link-icon'
            }, {
                'class': 'defect-link-icon'
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
    'labelId': 'defect-search-link-subtask',
    'labelName': 'Subtask',
    'labelClass': 'defect-search-link-subtask',
    'sortable': false,
    'sortOptions': {},
    'resizable': false,
    'fixedSize': 41,
    'show': true,
    'min': 60,
    'flexGrow': 'initial',
    'defaultSize': 'px',
    'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
    'cell': {
        'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
        'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
        'actions': [],
        'key': 'isSubtask',
        'pipes': [{
            'name': 'gridAction',
            'args': [{
                'key': 'subtask-icon'
            }, {
                'class': 'defect-subtask-link-icon'
            }]
        }]
    },
    'editable': false,
    'editOptions': {},
    'columnChooser': {
        'show': true,
        'default': true
    }
}];

export const DEFECTS_LINK_SEARCH_GRID_OPTIONS = {
	'headerRow': true,
	'headerBackground': true,
	'rowCount': GRID_CONSTANTS.GRID_ROW_COUNT_DEFAULT,
	'rowReorder': false,
	'gridDND': false,
	'columnCount': GRID_CONSTANTS.GRID_COLUMN_COUNT_DEFAULT,
	'columnReorder': false,
	'columnSeparator': true,
	'columnChooser': {
		'show': false
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
	'columns': DEFECTS_LINK_SEARCH_GRID_COLUMNS
};

export const DEFECTS_LINK_SEARCH_GRID_PAGINATION = {
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
