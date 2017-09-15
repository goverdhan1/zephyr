// Import the i18n messages
import {I18N_MESSAGES} from '../../../utils/messages/messages.en';
import {UtililtyFunctions} from '../../../utils/scripts/utils';
import * as GRID_CONSTANTS from '../grid/grid.constant';

let utililtyFunction = new UtililtyFunctions();

export const TCEP_GRID_TYPE = 'tcep';
export const TCEP_GRID_ROW_COUNT_DEFAULT = 50;

export var TCEP_GRID_COLUMNS = [];
    export const TCEP_GRID_OPTIONS = {
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
    'columns': TCEP_GRID_COLUMNS
};
 export const TCEP_GRID_PAGINATION = {
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
