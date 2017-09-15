declare var _;
import {I18N_MESSAGES} from '../../../utils/messages/messages.en';
import {UtililtyFunctions} from '../../../utils/scripts/utils';
import * as GRID_CONSTANTS from '../grid/grid.constant';


// Testcase component name (should be same as the element name)
export const TESTCASE_COMPONENT = 'zee-testcase';
export const TESTCASE_DETAILS_COMPONENT = 'zee-panel-content1';
export const TESTCASE_TEST_DETAILS = 'zee-panel-content2';
export const TESTCASE_STEP_DETAILS = 'zee-panel-content3';
export const TESTCASE_ATTACHMENTS = 'zee-panel-content4';
export const TESTCASE_MAPPED_REQUIREMENTS = 'zee-panel-content5';
export const TESTCASE_HISTORY = 'zee-panel-content6';
export const TESTCASE_PEOPLE = 'zee-panel-content7';
export const TESTCASE_EXECUTION_PEOPLE = 'zee-panel-content13';

export const TESTCASE_AUTOMATION = 'zee-panel-content8';
export const TESTCASE_TIME = 'zee-panel-content9';
export const TESTCASE_CUSTOMFIELD = 'zee-panel-content10';
export const TESTCASE_STEP_GRID = 'zee-panel-content11';
export const TESTCASE_EXECUTION_DETAILS = 'zee-panel-content12';
export const TESTCASE_EXECUTION_TIME = 'zee-panel-content14';
export const TESTCASE_CREATE_DIALOG = 'zee-create-dialog';
export const TESTCASE_ADD_CREATE_DIALOG = 'zee-add-create-dialog';
export const TESTCASE_MAP_DIALOG = 'zee-map-dialog';
export const TESTCASE_DELETE_DIALOG = 'zee-delete-dialog';
export const TESTCASE_EXPORT_DIALOG = 'zee-export-dialog';
export const TESTCASE_EXPORT_DIALOG_TCE = 'zee-export-dialog-tce';
export const TESTCASE_EXECUTE_MULTIPLE_DIALOG_TCE = 'zee-execute-multiple-dialog-tce';

export const TESTCASE_LEFT_PANEL_ITEMS = ['zee-test-details', 'zee-test-step-details', 'zee-test-attachments',
    'zee-test-mapped-requirement', 'zee-test-history'];
export const TESTCASE_RIGHT_PANEL_ITEMS = ['zee-test-people', 'zee-test-automation', 'zee-test-time', 'zee-test-customfield'];
export const TESTSTEP_GRID_TYPE = 'testcase';
export const TESTSTEP_SEARCH_GRID_TYPE = 'testcase-search';

let editable = true;
let utililtyFunction = new UtililtyFunctions();

export const TESTSTEP_FIELD_OPTIONS = {
    id: 'step',
    autoFocus: true,
    allowCreate: true,
    // allowDelete: true,
    allowEdit: true,
    allowReorder: false,
    allowOperations: true,
    operations: [{
        id: 'delete',
        header: 'Delete',
        showConfirmation: true,
        confirmationOptions: {
            id: 'step-delete',
            header: 'Delete step',
            message: I18N_MESSAGES['zephyr.teststep.delete'],
            action: {
                confirm: 'Delete',
                cancel: 'Cancel'
            }
        }
    },
    {
        id: 'reset',
        header: 'Cancel',
        showConfirmation: true,
        confirmationOptions: {
            id: 'step-reset',
            header: 'Cancel Changes',
            message: I18N_MESSAGES['zephyr.teststep.reset'],
            action: {
                confirm: 'Yes',
                cancel: 'No'
            }
        }
    }/*, {
        id: 'clone',
        header: 'Clone',
        showConfirmation: false
    }*/],
    createPosition: 'bottom',
    columns: [{
            id: 'order-id',
            key: 'orderId',
            header: '#',
            allowEdit: false,
            className: '',
            innerHtml: '',
            notNull: true,
            notNullMessage: ''
        },
        {
            id: 'step',
            key: 'step',
            header: 'Test Steps',
            emptyText: 'Enter Step',
            allowEdit: true,
            className: 'step-th',
            innerHtml: '<textarea id="zee-add-step" class="zee-add-step" style="width: 100%"></textarea>',
            notNull: true,
            notNullMessage: 'Field step cannot be null or empty.'
        },
        {
            id: 'test-data',
            key: 'data',
            header: 'Test Data',
            emptyText: 'Enter Data',
            allowEdit: true,
            className: 'data-th',
            innerHtml: '<textarea id="zee-add-test-data" class="zee-add-data" style="width: 100%"></textarea>',
            notNull: false,
            notNullMessage: ''
        },
        {
            id: 'expected-result',
            key: 'result',
            header: 'Expected Results',
            emptyText: 'Enter Expected Result',
            allowEdit: true,
            className: 'result-th',
            innerHtml: '<textarea id="zee-add-expected-result" class="zee-add-results" style="width: 100%"></textarea>',
            notNull: false,
            notNullMessage: ''
        }
    ],
    noEntriesMsg: 'No Steps found!'
};

export const TESTSTEP_GRID_COLUMNS = [
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'testcase_id',
        'labelName': I18N_MESSAGES['zephyr.testcase.id'],
        'labelClass': '',
        'sortable': false,
        'sortOptions': {},
        'resizable': true,
        'fixedSize': '41',
        'show': true,
        'min': 41,
        'flexGrow': 'initial',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'orderId',
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
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT_NOWRAP,
        'labelId': 'testcase_name',
        'labelName': I18N_MESSAGES['zephyr.testcase.steps'],
        'labelClass': '',
        'sortable': false,
        'sortOptions': {},
        'resizable': true,
        'ellipsis': 'no-ellipsis',
        'fixedSize': 'auto',
        'show': true,
        'min': 180,
        'flexGrow': '1',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'step',
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
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT_NOWRAP,
        'labelId': 'testcase_data',
        'labelName': I18N_MESSAGES['zephyr.testcase.data'],
        'labelClass': '',
        'sortable': false,
        'sortOptions': {},
        'resizable': true,
        'ellipsis': 'no-ellipsis',
        'fixedSize': 'auto',
        'show': true,
        'min': 180,
        'flexGrow': 'initial',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'data',
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
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT_NOWRAP,
        'labelId': 'testcase_result',
        'labelName': I18N_MESSAGES['zephyr.testcase.results'],
        'labelClass': '',
        'sortable': false,
        'sortOptions': {},
        'resizable': true,
        'ellipsis': 'no-ellipsis',
        'fixedSize': 'auto',
        'show': true,
        'min': 180,
        'flexGrow': 'initial',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'result',
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
        'labelId': 'testcase_status',
        'labelName': I18N_MESSAGES['zephyr.testcase.status'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'status',
            'reverse': false,
            'dataType': 'number'
        },
        'resizable': false,
        'fixedSize': '150',
        'show': true,
        'min': 150,
        'flexGrow': 'initial',
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['DROPDOWN'],
            'actions': [],
            'key': 'stepResults',
            'title' : {
                'key' : 'stepResults',
                'pipes':[{
                    'name': 'objectParser',
                    'args': [{
                        'key': 'status'
                    }]
                },
                {
                    'name': 'gridAction',
                    'args': [{
                        'key': 'step-status-mapping'
                    }]
                }]
            },
            'pipes':[{
                'name': 'objectParser',
                'args': [{
                    'key': 'status'
                }]
            },
            {
                'name': 'gridAction',
                'args': [{
                    'key': 'step-execution-status'
                }]
            },
            {
                'name': 'sanitization',
                'args': [{
                    'key': 'safeHTML'
                }]
            }]
        },
        'editable': true,
        'editOptions': {
            'selectedOption' : {
                'pipes' : [{
                    'name': 'objectParser',
                    'args': [{
                        'key': 'status'
                    }]
                }]
            },
            'selectOptions' : {
                'pipes' : [{
                    'name': 'gridAction',
                    'args': [{
                        'key': 'step-status-select'
                    }]
                }]
            },
            'templateResult' : utililtyFunction.statusSelectTemplateFunction,
            'templateSelection' : utililtyFunction.statusSelectSelectedOptionTemplateFunction,
            'type':'select',
            'unescapeHTML':true
        },
        'inlineEdit':true,
        'columnChooser': {
            'show': true,
            'default': false
        }
    },
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'testcase_notes',
        'labelName': I18N_MESSAGES['zephyr.testcase.notes'],
        'labelClass': '',
        'sortable': false,
        'scrollCell': true,
        'sortOptions': {},
        'resizable': true,
        'fixedSize': '200',
        'show': false,
        'min': 122,
        'flexGrow': 'initial',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'stepResults',
            'pipes': [{
                'name': 'objectParser',
                'args': [{
                    'key': 'comment'
                }]
            }],
        },
        'editable': true,
        'editOptions': {
            'selectedOption' : {},
            'selectOptions' : {},
            'type':'textarea',
            'validationPattern': '^(.|[\n\r]){0,1024}$'
        },
        'inlineEdit':true,
        'columnChooser': {
            'show': true,
            'default': false
        }
    },
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'testcase_attachment',
        'labelName': I18N_MESSAGES['zephyr.testcase.attachment'],
        'labelClass': '',
        'sortable': false,
        'sortOptions': {},
        'resizable': true,
        'fixedSize': '200',
        'show': false,
        'min': 122,
        'flexGrow': 'initial',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'stepResults',
            'pipes': [{
                'name': 'objectParser',
                'args': [{
                    'key': 'attachmentCount'
                }]
            },{
                'name': 'link',
                'args': [{
                    'class': 'zui-link grid_link_click attachment_count_step'
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

    // {
    //     'id': 'testcase_id',
    //     'name': 'ID',
    //     'property': 'id',
    //     'key': 'orderId',
    //     'pipe' : null,
    //     'show': true,
    //     'sort': null
    // },{
    //     'id': 'testcase_name',
    //     'name': 'Test Steps',
    //     'property': 'step',
    //     'key': 'step',
    //     'pipe' : null,
    //     'show': true,
    //     'sort': null
    // },{
    //     'id': 'testcase_data',
    //     'name': 'Test Data',
    //     'property': 'data',
    //     'key': 'data',
    //     'pipe' : null,
    //     'show': true,
    //     'sort': null
    // },{
    //     'id': 'testcase_result',
    //     'name': 'Expected Results',
    //     'property': 'testcase-result',
    //     'key': 'result',
    //     'pipe' : null,
    //     'show': true,
    //     'sort': null
    // },{
    //     'id': 'testcase_status',
    //     'name': 'Test Step Status',
    //     'property': 'testcase-status',
    //     'key': 'stepResults',
    //     'pipe': [{
    //         'name': 'objectParser',
    //         'args': [{
    //             'key': 'status'
    //         }]
    //     },
    //     {
    //         'name': 'gridAction',
    //         'args': [{
    //             'key': 'status-select'
    //         }]
    //     }],
    //     'show': true,
    //     'sort': null
    // },{
    //     'id': 'testcase_notes',
    //     'name': 'Test Step Notes',
    //     'property': 'testcase-notes',
    //     'key': 'stepResults',
    //     'pipe': [{
    //         'name': 'objectParser',
    //         'args': [{
    //             'key': 'comment'
    //         }]
    //     }],
    //     'inlineEdit': true,
    //     'selectedOption' : {},
    //     'selectOptions' : {},
    //     'editType' : 'text',
    //     'show': true,
    //     'sort': null
    // },{
    //     'id': 'testcase_attachment',
    //     'name': 'Attachment',
    //     'property': 'attachment',
    //     'key': 'stepResults',
    //     'pipe': [{
    //         'name': 'objectParser',
    //         'args': [{
    //             'key': 'attachmentCount'
    //         }]
    //     }],
    //     'show': false,
    //     'inlineEdit': true,
    //     'selectedOption' : {},
    //     'selectOptions' : {},
    //     'editType' : 'text',
    //     'sort': null
    // }
];

export const TESTSTEP_GRID_OPTIONS = {
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
    'columns': TESTSTEP_GRID_COLUMNS
};

export const TESTSTEP_GRID_PAGINATION = {
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

export const TESTSTEP_SEARCH_GRID_COLUMNS = [
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'testcase_id',
        'labelName': I18N_MESSAGES['zephyr.testcase.id'],
        'labelClass': '',
        'sortable': false,
        'sortOptions': {},
        'resizable': true,
        'fixedSize': '41',
        'show': true,
        'min': 41,
        'flexGrow': 'initial',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'orderId',
            'pipes': null,
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {
            'show': true,
            'default': false
        }
    },
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT_NOWRAP,
        'labelId': 'testcase_name',
        'labelName': I18N_MESSAGES['zephyr.testcase.steps'],
        'labelClass': '',
        'sortable': false,
        'sortOptions': {},
        'resizable': true,
        'ellipsis': 'no-ellipsis',
        'fixedSize': 'auto',
        'show': true,
        'min': 180,
        'flexGrow': '1',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'step',
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
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT_NOWRAP,
        'labelId': 'testcase_data',
        'labelName': I18N_MESSAGES['zephyr.testcase.data'],
        'labelClass': '',
        'sortable': false,
        'sortOptions': {},
        'resizable': true,
        'ellipsis': 'no-ellipsis',
        'fixedSize': 'auto',
        'show': true,
        'min': 180,
        'flexGrow': 'initial',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'data',
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
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT_NOWRAP,
        'labelId': 'testcase_result',
        'labelName': I18N_MESSAGES['zephyr.testcase.results'],
        'labelClass': '',
        'sortable': false,
        'sortOptions': {},
        'resizable': true,
        'ellipsis': 'no-ellipsis',
        'fixedSize': 'auto',
        'show': true,
        'min': 180,
        'flexGrow': 'initial',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'result',
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
        'labelId': 'testcase_status',
        'labelName': I18N_MESSAGES['zephyr.testcase.status'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'status',
            'reverse': false,
            'dataType': 'number'
        },
        'resizable': false,
        'fixedSize': '150',
        'show': true,
        'min': 150,
        'flexGrow': 'initial',
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['DROPDOWN'],
            'actions': [],
            'key': 'stepResults',
            'title' : {
                'key' : 'stepResults',
                'pipes':[{
                    'name': 'objectParser',
                    'args': [{
                        'key': 'status'
                    }]
                },
                {
                    'name': 'gridAction',
                    'args': [{
                        'key': 'step-status-mapping'
                    }]
                }]
            },
            'pipes':[{
                'name': 'objectParser',
                'args': [{
                    'key': 'status'
                }]
            },
            {
                'name': 'gridAction',
                'args': [{
                    'key': 'step-execution-status'
                }]
            },
            {
                'name': 'sanitization',
                'args': [{
                    'key': 'safeHTML'
                }]
            }]
        },
        'editable': false,
        'editOptions': {
            'selectedOption' : {
                'pipes' : [{
                    'name': 'objectParser',
                    'args': [{
                        'key': 'status'
                    }]
                }]
            },
            'selectOptions' : {
                'pipes' : [{
                    'name': 'gridAction',
                    'args': [{
                        'key': 'step-status-select'
                    }]
                }]
            },
            'templateResult' : utililtyFunction.statusSelectTemplateFunction,
            'templateSelection' : utililtyFunction.statusSelectSelectedOptionTemplateFunction,
            'type':'select',
            'unescapeHTML':true
        },
        'inlineEdit':true,
        'columnChooser': {
            'show': true,
            'default': false
        }
    },
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'testcase_notes',
        'labelName': I18N_MESSAGES['zephyr.testcase.notes'],
        'labelClass': '',
        'sortable': false,
        'scrollCell': true,
        'sortOptions': {},
        'resizable': true,
        'fixedSize': '200',
        'show': false,
        'min': 122,
        'flexGrow': 'initial',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'stepResults',
            'pipes': [{
                'name': 'objectParser',
                'args': [{
                    'key': 'comment'
                }]
            }],
        },
        'editable': false,
        'editOptions': {
            'selectedOption' : {},
            'selectOptions' : {},
            'type':'textarea',
            'validationPattern': '^(.|[\n\r]){0,1024}$'
        },
        'inlineEdit':true,
        'columnChooser': {
            'show': true,
            'default': false
        }
    },
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'testcase_attachment',
        'labelName': I18N_MESSAGES['zephyr.testcase.attachment'],
        'labelClass': '',
        'sortable': false,
        'sortOptions': {},
        'resizable': true,
        'fixedSize': '200',
        'show': false,
        'min': 122,
        'flexGrow': 'initial',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'stepResults',
            'pipes': [{
                'name': 'objectParser',
                'args': [{
                    'key': 'attachmentCount'
                }]
            },{
                'name': 'link',
                'args': [{
                    'class': 'zui-link grid_link_click attachment_count_step'
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
];

export const TESTSTEP_SEARCH_GRID_OPTIONS = {
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
    'columns': TESTSTEP_SEARCH_GRID_COLUMNS
};

export const TESTSTEP_SEARCH_GRID_PAGINATION = {
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

export function getTeststepNonEditableOptions() {
    let _teststepOptions = JSON.parse(JSON.stringify(TESTSTEP_FIELD_OPTIONS));
    _teststepOptions.allowEdit = false;
    _teststepOptions.allowCreate = false;
    _teststepOptions.allowOperations = false;
    _.each(_teststepOptions.columns, (column) => {
        column.allowEdit = false;
    });
    return _teststepOptions;
}
