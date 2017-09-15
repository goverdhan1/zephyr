// Import the i18n messages
import {I18N_MESSAGES} from '../../../utils/messages/messages.en';
import * as GRID_CONSTANTS from '../grid/grid.constant';

export const PROJECT_RELEASE_GRID_TYPE = 'project_release';

export const PROJECT_RELEASE_GRID_COLUMNS = [
    {
		'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
		'labelId': 'release_number',
		'labelName': I18N_MESSAGES['zephyr.grid.release.order.id'],
		'labelClass': '',
		'sortable': true,
		'sortOptions': {
			'default': false,
			'order': GRID_CONSTANTS.GRID_CELL_SORT_DESC,
			'isSorted': true,
			'key': 'orderId',
			'reverse': false,
      'dataType': 'number'
		},
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
			'key': 'name',
			'pipes': [{
              'name': 'escapeHTMLPipe',
              'args': []
            }, {
                'name': 'link',
                'args': [{
                    'class': 'zui-link grid_link_click release_name'
                }]
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
		'fixedSize': 122,
		'show': true,
		'min': 122,
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
		'fixedSize': 122,
		'show': true,
		'min': 122,
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
		'labelId': 'release_description',
		'labelName': I18N_MESSAGES['zephyr.grid.release.description'],
		'labelClass': '',
		'sortable': true,
		'sortOptions': {
			'default': false,
			'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
			'isSorted': false,
			'key': 'description',
			'reverse': false,
            'dataType': 'string'
		},
		'resizable': false,
		'flexGrow': 1,
		'fixedSize': 'auto',
		'show': true,
		'min': 160,
		'defaultSize': 'px',
		'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
		'cell': {
			'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
			'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
			'actions': [],
			'key': 'description',
			'pipes': []
		},
		'editable': false,
		'editOptions': {},
		'columnChooser': {}
	}
];

export const PROJECT_RELEASE_GRID_OPTIONS = {
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
	'columns': PROJECT_RELEASE_GRID_COLUMNS
};

export const PROJECT_RELEASE_GRID_PAGINATION = {
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
