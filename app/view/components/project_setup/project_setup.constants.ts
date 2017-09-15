import * as GRID_CONSTANTS from '../grid/grid.constant';
import {I18N_MESSAGES} from '../../../utils/messages/messages.en';

export const PROJECT_SETUP_GRID_TYPE = 'projectSetup';

export const PROJECT_SETUP_GRID_COLUMNS = [
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'id',
        'labelName': I18N_MESSAGES['zephyr.project.setup.grid.id'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_DESC,
            'isSorted': false,
            'key': 'id',
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
            'key': 'id',
            'pipes': []
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {
            'show': false,
            'default': false
        }
    },{
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'project_name',
        'labelName': I18N_MESSAGES['zephyr.project.setup.grid.name'],
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
        'columnChooser': {
            'show': true,
            'default': false
        }
    },{
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'release_type',
        'labelName': I18N_MESSAGES['zephyr.project.setup.grid.type'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'isolationLevel',
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
            'key': 'isolationLevel',
            'pipes': [{
                'name': 'gridAction',
                'args': [{
                    'key': 'project-type'
                }]
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
        'labelId': 'release_lead',
        'labelName': I18N_MESSAGES['zephyr.project.setup.grid.lead'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'lead.fullname',
            'reverse': false,
            'dataType': 'string'
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
            'key': 'lead',
            'pipes': [{
                'name': 'objectParser',
                'args': [{
                    'key': 'fullname'
                }]
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
        'labelId': 'totalResourcesId',
        'labelName': I18N_MESSAGES['zephyr.project.setup.grid.resources'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_DESC,
            'isSorted': false,
            'key': 'totalResources',
            'reverse': false,
            'dataType': 'number'
        },
        'resizable': false,
        'flexGrow': 'initial',
        'fixedSize': 120,
        'show': true,
        'min': 120,
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'totalResources',
            'pipes': [{
                'name': 'gridAction',
                'args': [{
                    'key': 'project-resources-count'
                }]
            }]
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {
            'show': true,
            'default': false
        }
    }
    // ,{
    //     'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
    //     'labelId': 'project_name',
    //     'labelName': I18N_MESSAGES['zephyr.project.setup.grid.description'],
    //     'labelClass': '',
    //     'sortable': true,
    //     'sortOptions': {
    //         'default': false,
    //         'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
    //         'isSorted': false,
    //         'key': 'description',
    //         'reverse': false,
    //         'dataType': 'string'
    //     },
    //     'resizable': true,
    //     'flexGrow': 1,
    //     'fixedSize': 'auto',
    //     'show': true,
    //     'min': 100,
    //     'defaultSize': 'px',
    //     'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
    //     'cell': {
    //         'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
    //         'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
    //         'actions': [],
    //         'key': 'description',
    //         'pipes': [{
    //           'name': 'escapeHTMLPipe',
    //           'args': []
    //         }]
    //     },
    //     'editable': false,
    //     'editOptions': {},
    //     'columnChooser': {
    //         'show': true,
    //         'default': false
    //     }
    // }
    ,{
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'project_start_date',
        'labelName': I18N_MESSAGES['zephyr.project.setup.grid.start.date'],
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
        'fixedSize': 100,
        'show': true,
        'min': 100,
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
        'fixedSize': 100,
        'show': true,
        'min': 100,
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
            'show': true,
            'default': false
        }
    },{
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'project_action',
        'labelName': I18N_MESSAGES['zephyr.grid.actions'],
        'labelClass': '',
        'sortable': false,
        'sortOptions': {},
        'resizable': false,
        'flexGrow': 'initial',
        'fixedSize': 80,
        'show': true,
        'min': 80,
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [{
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
        'columnChooser': {
            'show': false,
            'default': true
        }
    }
];

export const PROJECT_SETUP_GRID_OPTIONS = {
    'headerRow': true,
    'headerBackground': true,
    'rowCount': 100000,
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
    'columns': PROJECT_SETUP_GRID_COLUMNS
};

export const PROJECT_SETUP_GRID_PAGINATION = {
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
