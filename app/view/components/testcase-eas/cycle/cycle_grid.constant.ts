// Import the i18n messages
import {I18N_MESSAGES} from '../../../../utils/messages/messages.en';
import * as GRID_CONSTANTS from '../../grid/grid.constant';
export const CYCLE_GRID_TYPE = 'cycle';
export const CYCLE_GRID_COLUMNS = [
    // {
    //     'id': 'Phase',
    //     'name': 'Phase',
    //     'key': 'name',
    //     'pipe': null,
    //     'show': true,
    //     'sort': null
    // },
    // {
    //     'id': 'startDate_flag',
    //     'name': 'Start Date',
    //     'key': 'startDate',
    //     'pipe': [{
    //         'name': 'date',
    //         'args': ['MM/DD/YYYY']
    //     }],
    //     'show': true,
    //     'sort': null
    // },
    // {
    //     'id': 'endDate_flag',
    //     'name': 'End Date',
    //     'key': 'endDate',
    //     'pipe': [{
    //         'name': 'date',
    //         'args': ['MM/DD/YYYY']
    //     }],
    //     'show': true,
    //     'sort': null
    // },
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'Phase',
        'labelName': I18N_MESSAGES['zephyr.grid.phase'],
        'labelClass': '',
        'sortable': false,
        'resizable': false,
        'fixedSize': 'auto',
        'show': true,
        'min': 180,
        'flexGrow': '1',
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'name',
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {
            'show': false,
            'default': false
        }
    },
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'startDate_flag',
        'labelName': I18N_MESSAGES['zephyr.grid.cycle.start.date'],
        'labelClass': '',
        'sortable': false,
        'resizable': false,
        'fixedSize': 'auto',
        'show': true,
        'min': 180,
        'flexGrow': '1',
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'startDate',
            'pipes': [{
                'name': 'date',
                'args': ['MM/dd/yyyy']
            }]
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {
            'show': false,
            'default': false
        }
    },
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'endDate_flag',
        'labelName': I18N_MESSAGES['zephyr.grid.cycle.end.date'],
        'labelClass': '',
        'sortable': false,
        'resizable': false,
        'fixedSize': 'auto',
        'show': true,
        'min': 180,
        'flexGrow': '1',
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'endDate',
            'pipes': [{
                'name': 'date',
                'args': ['MM/dd/yyyy']
            }]
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {
            'show': false,
            'default': false
        }
    }

];

export const CYCLE_GRID_PAGINATION = {
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

export const CYCLE_GRID_OPTIONS = {
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
    'columns': CYCLE_GRID_COLUMNS
};
