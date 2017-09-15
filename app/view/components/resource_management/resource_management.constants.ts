
import {I18N_MESSAGES} from '../../../utils/messages/messages.en';
import * as GRID_CONSTANTS from '../grid/grid.constant';

export const RESOURCE_GRID_TYPE = 'resource';

export const RESOURCE_GRID_COLUMNS = [
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'id',
        'labelName': I18N_MESSAGES['zephyr.resource.id'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_DESC,
            'isSorted': true,
            'key': 'id',
            'reverse': false,
            'dataType': 'number'
        },
        'resizable': true,
        'fixedSize': '41',
        'show': true,
        'min': 41,
        'flexGrow': 'initial',
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'id',
            'pipes': null
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {
            'show': true,
            'default': true
        }
    },
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'resource-management-name',
        'labelName': I18N_MESSAGES['zephyr.resource.name'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'fullName',
            'reverse': false,
            'dataType': 'string'
        },
        'resizable': false,
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
            'key': 'fullName',
            'pipes': null
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
        'labelId': 'resource-management-title',
        'labelName': I18N_MESSAGES['zephyr.resource.title'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'title',
            'reverse': false,
            'dataType': 'string'
        },
        'resizable': false,
        'fixedSize': 'auto',
        'show': true,
        'min': 120,
        'flexGrow': 'initial',
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'title',
            'pipes': null
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {
            'show': true,
            'default': false
        }
    },
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'resource-management-roles',
        'labelName': I18N_MESSAGES['zephyr.resource.roles'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'roleName',
            'reverse': false,
            'dataType': 'string'
        },
        'resizable': false,
        'fixedSize': 'auto',
        'show': true,
        'min': 120,
        'flexGrow': 'initial',
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'roles',
            'pipes': [{
                        'name': 'gridAction',
                       'args': [{
                            'key': 'resource-management-role'
                        }]
                    }],
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {
            'show': true,
            'default': false
        }
    },
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'resource-management-projects',
        'labelName': I18N_MESSAGES['zephyr.resource.projects'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'numberOfProjectsAssociated',
            'reverse': false,
            'dataType': 'number'
        },
        'resizable': false,
        'fixedSize': 'auto',
        'show': true,
        'min': 120,
        'flexGrow': 'initial',
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'numberOfProjectsAssociated',
            'pipes': null
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {
            'show': true,
            'default': false
        }
    },
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'resource-management-location',
        'labelName': I18N_MESSAGES['zephyr.resource.location'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'location',
            'reverse': false,
            'dataType': 'string'
        },
        'resizable': false,
        'fixedSize': 'auto',
        'show': true,
        'min': 140,
        'flexGrow': 'initial',
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'location',
            'pipes': null
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {
            'show': true,
            'default': false
        }
    },
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'resource-management-workPhoneNumber',
        'labelName': I18N_MESSAGES['zephyr.resource.workPhoneNumber'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'workPhoneNumber',
            'reverse': false,
            'dataType': 'number'
        },
        'resizable': false,
        'fixedSize': 'auto',
        'show': true,
        'min': 120,
        'flexGrow': 'initial',
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'workPhoneNumber',
            'pipes': null
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {
            'show': true,
            'default': false
        }
    },
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'resource-management-email',
        'labelName': I18N_MESSAGES['zephyr.resource.email'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'email',
            'reverse': false,
            'dataType': 'string'
        },
        'resizable': false,
        'fixedSize': 'auto',
        'show': false,
        'min': 180,
        'flexGrow': 'initial',
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'email',
            'pipes': null
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {
            'show': true,
            'default': false
        }
    },
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'resource-management-username',
        'labelName': I18N_MESSAGES['zephyr.resource.username'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'username',
            'reverse': false,
            'dataType': 'string'
        },
        'resizable': false,
        'fixedSize': 'auto',
        'show': false,
        'min': 180,
        'flexGrow': 'initial',
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'username',
            'pipes': null
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {
            'show': true,
            'default': false
        }
    },
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'resource-management-loggedIn',
        'labelName': I18N_MESSAGES['zephyr.resource.loggedIn'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'loginStatus',
            'reverse': false,
            'dataType': 'string'
        },
        'resizable': false,
        'fixedSize': 'auto',
        'show': true,
        'min': 120,
        'flexGrow': 'initial',
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'loggedIn',
            'pipes': [{
                        'name': 'gridAction',
                       'args': [{
                            'key': 'resource-management-logged-in'
                        }]
                    }],
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {
            'show': true,
            'default': false
        }
    },
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'resource-management-lastSuccessfulLogin',
        'labelName': I18N_MESSAGES['zephyr.resource.lastSuccessfulLogin'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'lastSuccessfulLogin',
            'reverse': false,
            'dataType': 'number'
        },
        'resizable': false,
        'fixedSize': 'auto',
        'show': false,
        'min': 120,
        'flexGrow': 'initial',
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
          'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
          'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
          'actions': [],
          'key': 'lastSuccessfulLoginString',
          'pipes': null
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {
            'show': true,
            'default': false
        }
    }//,
    // {
    //     'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
    //     'labelId': 'resource-management-lastPasswordChange',
    //     'labelName': I18N_MESSAGES['zephyr.resource.lastPasswordChange'],
    //     'labelClass': '',
    //     'sortable': true,
    //     'sortOptions': {
    //         'default': false,
    //         'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
    //         'isSorted': false,
    //         'key': 'lastPasswordChange',
    //         'reverse': false,
    //         'dataType': 'number'
    //     },
    //     'resizable': false,
    //     'fixedSize': 'auto',
    //     'show': false,
    //     'min': 120,
    //     'flexGrow': 'initial',
    //     'defaultSize': 'px',
    //     'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
    //     'cell': {
    //         'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
    //         'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
    //         'actions': [],
    //         'key': 'lastPasswordChange',
    //         'pipes': [{
    //                     'name': 'date',
    //                     'args': ['MM/DD/YYYY']
    //                 }],
    //     },
    //     'editable': false,
    //     'editOptions': {},
    //     'columnChooser': {
    //         'show': true,
    //         'default': false
    //     }
    //}
];
export const RESOURCE_GRID_OPTIONS = {
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
    'columns': RESOURCE_GRID_COLUMNS
};
export const RESOURCE_GRID_PAGINATION = {
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
