// Import the i18n messages
import {I18N_MESSAGES} from '../../../utils/messages/messages.en';
import * as GRID_CONSTANTS from '../grid/grid.constant';

export const TESTCASE_HISTORY_GRID_TYPE = 'testcase_history';

export const TESTCASE_HISTORY_GRID_COLUMNS = [
    {
		'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
		'labelId': 'history_author',
		'labelName': I18N_MESSAGES['zephyr.grid.author'],
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
			'key': 'author',
			'pipes': [{
				'name': 'gridAction',
				'args': [{
					'key': 'user'
				}]
			}]
		},
		'editable': false,
		'editOptions': {},
		'columnChooser': {}
	}, {
		'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
		'labelId': 'history_created_on',
		'labelName': I18N_MESSAGES['zephyr.grid.created.on'],
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
			'key': 'creationTime',
			'pipes': [{
                'name': 'date',
                'args': ['MM/DD/YYYY']
            }]
		},
		'editable': false,
		'editOptions': {},
		'columnChooser': {}
	}, {
		'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
		'labelId': 'history_version_name',
		'labelName': I18N_MESSAGES['zephyr.grid.version.name'],
		'labelClass': '',
		'sortable': false,
		'sortOptions': {},
		'resizable': false,
		'flexGrow': 1,
		'fixedSize': 'auto',
		'show': true,
		'min': 122,
		'defaultSize': 'px',
		'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
		'cell': {
			'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
			'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
			'actions': [],
			'key': 'versionName',
			'pipes': []
		},
		'editable': false,
		'editOptions': {},
		'columnChooser': {}
	}
];

export const TESTCASE_HISTORY_GRID_OPTIONS = {
	'headerRow': true,
	'headerBackground': false,
	'rowCount': GRID_CONSTANTS.GRID_ROW_COUNT_DEFAULT,
	'rowReorder': false,
	'gridDND': false,
	'columnCount': GRID_CONSTANTS.GRID_COLUMN_COUNT_DEFAULT,
	'columnReorder': false,
	'columnSeparator': false,
	'columnChooser': {
		'show': false
	},
	'pagination': {
		'show': false
	},
	'columns': TESTCASE_HISTORY_GRID_COLUMNS
};
