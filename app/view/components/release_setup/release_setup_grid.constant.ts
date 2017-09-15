// Import the i18n messages
import {I18N_MESSAGES} from '../../../utils/messages/messages.en';
import * as GRID_CONSTANTS from '../grid/grid.constant';

export const RELEASE_GRID_TYPE = 'release';
export const RELEASE_SETUP_GRID_TYPE = 'release_setup';

export const RELEASE_GRID_COLUMNS = [
    {
		'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
		'labelId': 'release_number',
		'labelName': I18N_MESSAGES['zephyr.grid.release.order.id'],
		'labelClass': '',
		'sortable': true,
		'sortOptions': {
			'default': false,
			'order': GRID_CONSTANTS.GRID_CELL_SORT_DESC,
			'isSorted': false,
			'key': 'orderId',
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
			'key': 'orderId',
			'pipes': []
		},
		'editable': false,
		'editOptions': {},
		'columnChooser': {}
	},{
		'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
		'labelId': 'release_label',
		'labelName': I18N_MESSAGES['zephyr.grid.release.name'],
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
	},{
		'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
		'labelId': 'release_start_date',
		'labelName': I18N_MESSAGES['zephyr.grid.release.start.date'],
		'labelClass': '',
		'sortable': true,
		'sortOptions': {
			'default': false,
			'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
			'isSorted': false,
			'key': 'startDate',
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
			'key': 'startDate',
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
	},{
		'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
		'labelId': 'release_end_date',
		'labelName': I18N_MESSAGES['zephyr.grid.release.end.date'],
		'labelClass': '',
		'sortable': true,
		'sortOptions': {
			'default': false,
			'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
			'isSorted': false,
			'key': 'endDate',
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
			'key': 'endDate',
			'pipes': [{
                'name': 'date',
                'args': ['MM/DD/YYYY']
            }]
		},
		'editable': false,
		'editOptions': {},
		'columnChooser': {}
	},{
		'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
		'labelId': 'release_visible',
		'labelName': I18N_MESSAGES['zephyr.grid.release.visible'],
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
			'actions': [],
			'key': 'status',
			'pipes': [{
                'name': 'gridAction',
                'args': [{
                    'key': 'release-visible'
                }]
            }]
		},
		'editable': false,
		'editOptions': {},
		'columnChooser': {}
	},{
		'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
		'labelId': 'release_action',
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
                name: 'clone',
                key: 'editable',
                className: 'clone',
                title : 'Clone',
                show: true
            },{
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

export const RELEASE_GRID_OPTIONS = {
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
	'columns': RELEASE_GRID_COLUMNS
};

export const RELEASE_GRID_PAGINATION = {
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
