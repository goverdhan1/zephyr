
import {I18N_MESSAGES} from '../../../utils/messages/messages.en';
import * as GRID_CONSTANTS from '../grid/grid.constant';

export const DEFECTS_ADMIN_GRID_TYPE = 'defects_admin';

export const DEFECTS_ADMIN_GRID_COLUMNS = [
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'defects-admin-name',
        'labelName': I18N_MESSAGES['zephyr.defects.name'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': true,
            'key': 'name',
            'reverse': false,
            'dataType': 'string'
        },
        'resizable': false,
        'fixedSize': 'auto',
        'show': true,
        'min': 300,
        'flexGrow': 'initial',
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'name',
            'pipes': null
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {}
    },
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'defects-admin-value',
        'labelName': I18N_MESSAGES['zephyr.defects.value'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': true,
            'key': 'value',
            'reverse': false,
            'dataType': 'string'
        },
        'resizable': false,
        'ellipsis': 'no-ellipsis',
        'fixedSize': 'auto',
        'show': true,
        'min': 120,
        'flexGrow': '1',
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'value',
            'pipes': null
        },
        'editable': false,
        'editOptions': {},
        'inlineEdit':false,
        'columnChooser': {}
    },
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'defects-admin-active',
        'labelName': I18N_MESSAGES['zephyr.defects.active'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'active',
            'reverse': false,
            'dataType': 'string'
        },
        'resizable': false,
        'fixedSize': 'auto',
        'show': true,
        'min': 60,
        'flexGrow': 'initial',
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_CENTER,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['CHECKBOX'],
            'actions': [],
            'key': 'active',
            'pipes':  [{
                'name': 'gridAction',
                'args': [{
                    'key': 'defects-checkbox'
                }]
            },{
                'name': 'sanitization',
                'args': [{
                    'key': 'safeHTML'
                }]
            }]
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {}
    },
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'defects-admin-delete',
        'labelName': I18N_MESSAGES['zephyr.grid.actions'],
        'labelClass': '',
        'sortable': false,
        'sortOptions': {},
        'resizable': false,
        'flexGrow': 'initial',
        'fixedSize': 122,
        'show': true,
        'min': 60,
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [{
                'name': 'delete',
                'key': 'editable',
                'className': 'delete',
                'title' : 'Delete',
                'show': true
            }],
            'key': '',
            'pipes': []
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {}
    }
];
export const DEFECTS_ADMIN_GRID_OPTIONS = {
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
    'secondaryId': {
        'show': true,
        'key': 'testcase'
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
    'columns': DEFECTS_ADMIN_GRID_COLUMNS
};
export const DEFECTS_ADMIN_GRID_PAGINATION = {
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
