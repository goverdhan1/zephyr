import * as GRID_CONSTANTS from '../../../grid/grid.constant';

export const CURRENTLY_LINKED_DEFECTS_GRID_TYPE = 'CURRENTLY_LINKED_DEFECTS';
export const CURRENTLY_LINKED_DEFECTS_GRID_COLUMNS = [{
		'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_CHECKBOX,
		'labelId': 'linked_defect_select_all',
		'labelName': 'linked-defect-select-all',
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
    'labelId': 'linked-defect-id',
    'labelName': 'ID',
    'labelClass': 'linked-defect-id',
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
            'key': 'tce-current-defects'
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
    'labelId': 'linked-defect-status',
    'labelName': 'Status',
    'labelClass': 'linked-defect-status',
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
    'labelId': 'linked-defect-summary',
    'labelName': 'Summary',
    'labelClass': 'linked-defect-summary',
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
        'pipes': [{
            'name': 'escapeHTMLPipe',
            'args': []
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
    'labelId': 'linked-defect-priority',
    'labelName': 'Priority',
    'labelClass': 'linked-defect-priority',
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
}];

export const CURRENTLY_LINKED_DEFECTS_GRID_OPTIONS = {
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
		'show': false,
		'currentOfTotal': true,
		'navBar': {
			'type': 'complex',
			'isFirstLast': false
		},
		'pageSize': true,
		'pages': GRID_CONSTANTS.GRID_PAGE_SIZES
	},
	'columns': CURRENTLY_LINKED_DEFECTS_GRID_COLUMNS
};

export const CURRENTLY_LINKED_DEFECTS_GRID_PAGINATION = {
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
