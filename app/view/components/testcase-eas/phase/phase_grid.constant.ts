import {I18N_MESSAGES} from '../../../../utils/messages/messages.en';
import * as GRID_CONSTANTS from '../../grid/grid.constant';

export const PHASE_GRID_TYPE = 'phase';
export const FREEFORM_BROWSE_GRID_TYPE = 'freeFormBrowse';
export const FREEFORM_GRID_TYPE = 'freeFormPhase';
export const ADD_OTHER_CYCLE_GRID_TYPE = 'ADD_OTHER_CYCLE_GRID_TYPE';

export const ADD_OTHER_CYCLE_GRID_COLUMNS = [
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_CHECKBOX,
        'labelId': 'phase_testcase_select_all',
        'labelName': I18N_MESSAGES['zephyr.testcase.select.all'],
        'labelClass': 'grid_checkbox_all',
        'sortable': false,
        'sortOptions': {},
        'resizable': false,
        'fixedSize': 41,
        'show': true,
        'min': 41,
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
    },{
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'phase_testcase_id',
        'labelName': I18N_MESSAGES['zephyr.testcase.id'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_DESC,
            'isSorted': true,
            'key': 'testcase.id',
            'reverse': false,
            'dataType': 'number'
        },
        'resizable': true,
        'fixedSize': '76',
        'show': true,
        'min': 76,
        'flexGrow': 'initial',
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'testcase',
            'pipes': [{
                'name': 'objectParser',
                'args': [{
                    'key': 'id'
                }]
            }]
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {
            'show': true,
            'default': true
        }
    },{
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'phase_testcsae_name',
        'labelName': I18N_MESSAGES['zephyr.testcase.name'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'testcase.name',
            'reverse': false,
            'dataType': 'string'
        },
        'resizable': false,
        'fixedSize': 'auto',
        'show': true,
        'min': 180,
        'flexGrow': '1',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'testcase',
            'pipes': [{
                'name': 'objectParser',
                'args': [{
                    'key': 'name'
                }]
            }]
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {
            'show': true,
            'default': true
        }
    },{
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'phase_assign_to',
        'labelName': I18N_MESSAGES['zephyr.testcase.assigned.to'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'testcase.testerId',
            'reverse': false,
            'dataType': 'number'
        },
        'resizable': false,
        'fixedSize': '150',
        'min': 150,
        'flexGrow': 'initial',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'show': true,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['DROPDOWN'],
            'actions': [],
            'key': 'testcase',
            'pipes': [{
                'name': 'objectParser',
                'args': [{
                    'key': 'testerId'
                }]
            },
            {
              'name': 'gridAction',
               'args': [{
                    'key': 'user'
                }]
            }]
        },
        'editable': false,
        'editOptions': {
            'selectedOption' : {
                'pipes' : [{
                    'name': 'objectParser',
                    'args': [{
                        'key': 'testerId'
                    }]
                }]
            },
            'selectOptions' : {
                'pipes' : [{
                    'name': 'gridAction',
                    'args': [{
                        'key': 'user-allocated-to-current-project-select-options'
                    }]
                }]
            },
            'type':'select'
        },
        'inlineEdit':true,
        'columnChooser': {
            'show': true,
            'default': false
        }
    },{
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'phase_testcase_alt_id',
        'labelName': I18N_MESSAGES['zephyr.testcase.altid'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'testcase.externalId',
            'reverse': false,
            'dataType': 'number'
        },
        'resizable': false,
        'fixedSize': '122',
            'show': false,
        'min': 122,
        'flexGrow': 'initial',
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'testcase',
            'pipes': [{
                'name': 'objectParser',
                'args': [{
                    'key': 'externalId'
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
        'labelId': 'phase_testcase_ma',
        'labelName': I18N_MESSAGES['zephyr.testcase.ma'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'testcase.automated',
            'reverse': true,
            'dataType': 'number'
        },
        'resizable': false,
        'fixedSize': '122',
        'show': false,
        'min': 122,
        'flexGrow': 'initial',
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'testcase',
            'pipes': [{
                    'name': 'objectParser',
                    'args': [{
                        'key': 'automated'
                    }]
                },
                {
                    'name': 'gridAction',
                    'args': [{
                        'key': 'automated'
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
        'labelId': 'phase_testcase_status',
        'labelName': I18N_MESSAGES['zephyr.testcase.status'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'testcase.status',
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
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'title' : {
                'key' : 'testcase',
                'pipes':[{
                    'name': 'objectParser',
                    'args': [{
                        'key': 'status'
                    }]
                },
                {
                    'name': 'gridAction',
                    'args': [{
                        'key': 'status-mapping'
                    }]
                }]
            },
            'key': 'testcase',
            'pipes':[{
                'name': 'objectParser',
                'args': [{
                    'key': 'status'
                }]
            },
            {
                'name': 'gridAction',
                'args': [{
                    'key': 'execution-status'
                }]
            },
            {
                'name': 'sanitization',
                'args': [{
                    'key': 'safeHTML'
                }]
            }],
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {
            'show': true,
            'default': false
        }
    },{
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'phase_testcase_notes',
        'labelName': I18N_MESSAGES['zephyr.testcase.notes'],
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
            'key': 'testcase',
            'pipes': [{
                'name': 'objectParser',
                'args': [{
                    'key': 'comment'
                }]
            }],
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {
            'show': true,
            'default': false
        }
    },{
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'phase_testcase_priority',
        'labelName': I18N_MESSAGES['zephyr.testcase.priority'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'testcase.priority',
            'reverse': false,
            'dataType': 'number'
        },
        'resizable': false,
        'fixedSize': '122',
            'show': false,
        'min': 122,
        'flexGrow': 'initial',
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'testcase',
            'pipes':  [{
                'name': 'objectParser',
                'args': [{
                    'key': 'priority'
                }]
            },
            {
                'name': 'gridAction',
                'args': [{
                    'key': 'testcasePriority'
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
        'labelId': 'phase_testcase_est_time',
        'labelName': I18N_MESSAGES['zephyr.testcase.estimated.time'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'testcase.estimatedTime',
            'reverse': false,
            'dataType': 'number'
        },
        'resizable': false,
        'fixedSize': '122',
            'show': true,
        'min': 122,
        'flexGrow': 'initial',
        'defaultSize': '122px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'testcase',
            'pipes':  [{
                'name': 'objectParser',
                'args': [{
                    'key': 'estimatedTime'
                }]
            },
            {
                'name': 'timeParser',
                'args': ['dd:hh:mm']
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
        'labelId': 'phase_testcase_created_by',
        'labelName': I18N_MESSAGES['zephyr.testcase.created.by'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'testcase.creatorId',
            'reverse': false,
            'dataType': 'number'
        },
        'resizable': false,
        'fixedSize': '122',
            'show': true,
        'min': 122,
        'flexGrow': 'initial',
        'defaultSize': 'auto',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'testcase',
            'pipes':  [{
                'name': 'objectParser',
                'args': [{
                    'key': 'creatorId'
                }]
            },
            {
                'name': 'gridAction',
                'args': [{
                    'key': 'user'
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
        'labelId': 'phase_testcase_actualtime',
        'labelName': I18N_MESSAGES['zephyr.testcase.actual.time'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'testcase.actualTime',
            'reverse': false,
            'dataType': 'number'
        },
        'resizable': false,
        'fixedSize': '114',
        'show': false,
        'min': 114,
        'flexGrow': 'initial',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions':  [],
            'key': 'testcase',
            'pipes':  [{
                'name': 'objectParser',
                'args': [{
                    'key': 'actualTime'
                }]
            },
            {
                'name': 'timeParser',
                'args': ['dd:hh:mm']
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

export const PHASE_GRID_COLUMNS = [
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_CHECKBOX,
        'labelId': 'phase_testcase_select_all',
        'labelName': I18N_MESSAGES['zephyr.testcase.select.all'],
        'labelClass': 'grid_checkbox_all',
        'sortable': false,
        'sortOptions': {},
        'resizable': false,
        'fixedSize': 41,
        'show': true,
        'min': 41,
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
    },{
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'phase_testcase_id',
        'labelName': I18N_MESSAGES['zephyr.testcase.id'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_DESC,
            'isSorted': true,
            'key': 'testcase.id',
            'reverse': false,
            'dataType': 'number'
        },
        'resizable': true,
        'fixedSize': '76',
        'show': true,
        'min': 76,
        'flexGrow': 'initial',
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'testcase',
            'pipes': [{
                'name': 'objectParser',
                'args': [{
                    'key': 'id'
                }]
            }]
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {
            'show': true,
            'default': true
        }
    },{
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'phase_testcsae_name',
        'labelName': I18N_MESSAGES['zephyr.testcase.name'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'testcase.name',
            'reverse': false,
            'dataType': 'string'
        },
        'resizable': false,
        'fixedSize': 'auto',
        'show': true,
        'min': 180,
        'flexGrow': '1',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'testcase',
            'pipes': [{
                'name': 'objectParser',
                'args': [{
                    'key': 'name'
                }]
            }]
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {
            'show': true,
            'default': true
        }
    },{
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'phase_assign_to',
        'labelName': I18N_MESSAGES['zephyr.testcase.assigned.to'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'testcase.testerId',
            'reverse': false,
            'dataType': 'number'
        },
        'resizable': false,
        'fixedSize': '150',
        'min': 150,
        'flexGrow': 'initial',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'show': true,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['DROPDOWN'],
            'actions': [],
            'key': 'testcase',
            'pipes': [{
                'name': 'objectParser',
                'args': [{
                    'key': 'testerId'
                }]
            },
            {
              'name': 'gridAction',
               'args': [{
                    'key': 'user'
                }]
            }]
        },
        'editable': true,
        'editOptions': {
            'selectedOption' : {
                'pipes' : [{
                    'name': 'objectParser',
                    'args': [{
                        'key': 'testerId'
                    }]
                }]
            },
            'selectOptions' : {
                'pipes' : [{
                    'name': 'gridAction',
                    'args': [{
                        'key': 'user-allocated-to-current-project-select-options'
                    }]
                }]
            },
            'type':'select'
        },
        'inlineEdit':true,
        'columnChooser': {
            'show': true,
            'default': false
        }
    },{
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'phase_testcase_alt_id',
        'labelName': I18N_MESSAGES['zephyr.testcase.altid'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'testcase.externalId',
            'reverse': false,
            'dataType': 'number'
        },
        'resizable': false,
        'fixedSize': '122',
            'show': false,
        'min': 122,
        'flexGrow': 'initial',
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'testcase',
            'pipes': [{
                'name': 'objectParser',
                'args': [{
                    'key': 'externalId'
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
        'labelId': 'phase_testcase_ma',
        'labelName': I18N_MESSAGES['zephyr.testcase.ma'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'testcase.automated',
            'reverse': true,
            'dataType': 'number'
        },
        'resizable': false,
        'fixedSize': '122',
        'show': false,
        'min': 122,
        'flexGrow': 'initial',
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'testcase',
            'pipes': [{
                    'name': 'objectParser',
                    'args': [{
                        'key': 'automated'
                    }]
                },
                {
                    'name': 'gridAction',
                    'args': [{
                        'key': 'automated'
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
        'labelId': 'phase_testcase_status',
        'labelName': I18N_MESSAGES['zephyr.testcase.status'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'testcase.status',
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
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'title' : {
                'key' : 'testcase',
                'pipes':[{
                    'name': 'objectParser',
                    'args': [{
                        'key': 'status'
                    }]
                },
                {
                    'name': 'gridAction',
                    'args': [{
                        'key': 'status-mapping'
                    }]
                }]
            },
            'key': 'testcase',
            'pipes':[{
                'name': 'objectParser',
                'args': [{
                    'key': 'status'
                }]
            },
            {
                'name': 'gridAction',
                'args': [{
                    'key': 'execution-status'
                }]
            },
            {
                'name': 'sanitization',
                'args': [{
                    'key': 'safeHTML'
                }]
            }],
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {
            'show': true,
            'default': false
        }
    },{
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'phase_testcase_notes',
        'labelName': I18N_MESSAGES['zephyr.testcase.notes'],
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
            'key': 'testcase',
            'pipes': [{
                'name': 'objectParser',
                'args': [{
                    'key': 'comment'
                }]
            }],
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {
            'show': true,
            'default': false
        }
    },{
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'phase_testcase_priority',
        'labelName': I18N_MESSAGES['zephyr.testcase.priority'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'testcase.priority',
            'reverse': false,
            'dataType': 'number'
        },
        'resizable': false,
        'fixedSize': '122',
            'show': false,
        'min': 122,
        'flexGrow': 'initial',
        'defaultSize': 'px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'testcase',
            'pipes':  [{
                'name': 'objectParser',
                'args': [{
                    'key': 'priority'
                }]
            },
            {
                'name': 'gridAction',
                'args': [{
                    'key': 'testcasePriority'
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
        'labelId': 'phase_testcase_est_time',
        'labelName': I18N_MESSAGES['zephyr.testcase.estimated.time'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'testcase.estimatedTime',
            'reverse': false,
            'dataType': 'number'
        },
        'resizable': false,
        'fixedSize': '122',
            'show': true,
        'min': 122,
        'flexGrow': 'initial',
        'defaultSize': '122px',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'testcase',
            'pipes':  [{
                'name': 'objectParser',
                'args': [{
                    'key': 'estimatedTime'
                }]
            },
            {
                'name': 'timeParser',
                'args': ['dd:hh:mm']
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
        'labelId': 'phase_testcase_created_by',
        'labelName': I18N_MESSAGES['zephyr.testcase.created.by'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'testcase.creatorId',
            'reverse': false,
            'dataType': 'number'
        },
        'resizable': false,
        'fixedSize': '122',
        'show': true,
        'min': 122,
        'flexGrow': 'initial',
        'defaultSize': 'auto',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'testcase',
            'pipes':  [{
                'name': 'objectParser',
                'args': [{
                    'key': 'creatorId'
                }]
            },
            {
                'name': 'gridAction',
                'args': [{
                    'key': 'user'
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
        'labelId': 'phase_testcase_actualtime',
        'labelName': I18N_MESSAGES['zephyr.testcase.actual.time'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'testcase.actualTime',
            'reverse': false,
            'dataType': 'number'
        },
        'resizable': false,
        'fixedSize': '114',
        'show': false,
        'min': 114,
        'flexGrow': 'initial',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions':  [],
            'key': 'testcase',
            'pipes':  [{
                'name': 'objectParser',
                'args': [{
                    'key': 'actualTime'
                }]
            },
            {
                'name': 'timeParser',
                'args': ['dd:hh:mm']
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
        'labelId': 'release_visible',
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
                name: '',
                key: 'stateFlag',
                className: '',
                title : 'Click to toggle flag between set and reset',
                show: true,
                'pipes': {
                    'action' : [{
                            'name': 'gridAction',
                            'args': [{
                                'key': 'flag-action'
                            }]
                        }],
                    'image' : [{
                        'name': 'gridAction',
                        'args': [{
                            'key': 'flag-image'
                        }]
                    }]
                }
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

export const FREEFORM_GRID_COLUMNS = [
  {
    'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_CHECKBOX,
    'labelId': 'phase_testcase_select_all',
    'labelName': I18N_MESSAGES['zephyr.testcase.select.all'],
    'labelClass': 'grid_checkbox_all',
    'sortable': false,
    'sortOptions': {},
    'resizable': false,
    'fixedSize': 41,
    'show': true,
    'min': 41,
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
  },{
    'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
    'labelId': 'phase_testcase_id',
    'labelName': I18N_MESSAGES['zephyr.testcase.id'],
    'labelClass': '',
    'sortable': true,
    'sortOptions': {
      'default': false,
      'order': GRID_CONSTANTS.GRID_CELL_SORT_DESC,
      'isSorted': true,
      'key': 'testcase.id',
      'reverse': false,
      'dataType': 'number'
    },
    'resizable': true,
    'fixedSize': '76',
    'show': true,
    'min': 76,
    'flexGrow': 'initial',
    'defaultSize': 'px',
    'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
    'cell': {
      'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
      'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
      'actions': [],
      'key': 'testcase',
      'pipes': [{
        'name': 'objectParser',
        'args': [{
          'key': 'id'
        }]
      }]
    },
    'editable': false,
    'editOptions': {},
    'columnChooser': {
      'show': true,
      'default': true
    }
  },{
    'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
    'labelId': 'phase_testcsae_name',
    'labelName': I18N_MESSAGES['zephyr.testcase.name'],
    'labelClass': '',
    'sortable': true,
    'sortOptions': {
      'default': false,
      'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
      'isSorted': false,
      'key': 'testcase.name',
      'reverse': false,
      'dataType': 'string'
    },
    'resizable': false,
    'fixedSize': 'auto',
    'show': true,
    'min': 180,
    'flexGrow': '1',
    'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
    'cell': {
      'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
      'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
      'actions': [],
      'key': 'testcase',
      'pipes': [{
        'name': 'objectParser',
        'args': [{
          'key': 'name'
        }]
      }]
    },
    'editable': false,
    'editOptions': {},
    'columnChooser': {
      'show': true,
      'default': true
    }
  },{
    'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
    'labelId': 'phase_assign_to',
    'labelName': I18N_MESSAGES['zephyr.testcase.assigned.to'],
    'labelClass': '',
    'sortable': true,
    'sortOptions': {
      'default': false,
      'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
      'isSorted': false,
      'key': 'testcase.testerId',
      'reverse': false,
      'dataType': 'number'
    },
    'resizable': false,
    'fixedSize': '150',
    'min': 150,
    'flexGrow': 'initial',
    'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
    'show': true,
    'cell': {
      'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
      'type': GRID_CONSTANTS.GRID_CELL_TYPES['DROPDOWN'],
      'actions': [],
      'key': 'testcase',
      'pipes': [{
        'name': 'objectParser',
        'args': [{
          'key': 'testerId'
        }]
      },
        {
          'name': 'gridAction',
          'args': [{
            'key': 'user'
          }]
        }]
    },
    'editable': true,
    'editOptions': {
      'selectedOption' : {
        'pipes' : [{
          'name': 'objectParser',
          'args': [{
            'key': 'testerId'
          }]
        }]
      },
      'selectOptions' : {
        'pipes' : [{
          'name': 'gridAction',
          'args': [{
            'key': 'user-allocated-to-current-project-select-options'
          }]
        }]
      },
      'type':'select'
    },
    'inlineEdit':true,
    'columnChooser': {
      'show': true,
      'default': false
    }
  },{
    'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
    'labelId': 'phase_testcase_alt_id',
    'labelName': I18N_MESSAGES['zephyr.testcase.altid'],
    'labelClass': '',
    'sortable': true,
    'sortOptions': {
      'default': false,
      'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
      'isSorted': false,
      'key': 'testcase.externalId',
      'reverse': false,
      'dataType': 'number'
    },
    'resizable': false,
    'fixedSize': '122',
    'show': false,
    'min': 122,
    'flexGrow': 'initial',
    'defaultSize': 'px',
    'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
    'cell': {
      'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
      'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
      'actions': [],
      'key': 'testcase',
      'pipes': [{
        'name': 'objectParser',
        'args': [{
          'key': 'externalId'
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
    'labelId': 'phase_testcase_ma',
    'labelName': I18N_MESSAGES['zephyr.testcase.ma'],
    'labelClass': '',
    'sortable': true,
    'sortOptions': {
      'default': false,
      'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
      'isSorted': false,
      'key': 'testcase.automated',
      'reverse': true,
      'dataType': 'number'
    },
    'resizable': false,
    'fixedSize': '122',
    'show': true,
    'min': 122,
    'flexGrow': 'initial',
    'defaultSize': 'px',
    'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
    'cell': {
      'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
      'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
      'actions': [],
      'key': 'testcase',
      'pipes': [{
        'name': 'objectParser',
        'args': [{
          'key': 'automated'
        }]
      },
        {
          'name': 'gridAction',
          'args': [{
            'key': 'automated'
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
    'labelId': 'phase_testcase_status',
    'labelName': I18N_MESSAGES['zephyr.testcase.status'],
    'labelClass': '',
    'sortable': true,
    'sortOptions': {
      'default': false,
      'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
      'isSorted': false,
      'key': 'testcase.status',
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
      'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
      'actions': [],
      'title' : {
          'key' : 'testcase',
          'pipes':[{
              'name': 'objectParser',
              'args': [{
                  'key': 'status'
              }]
          },
          {
              'name': 'gridAction',
              'args': [{
                  'key': 'status-mapping'
              }]
          }]
      },
      'key': 'testcase',
      'pipes':[{
        'name': 'objectParser',
        'args': [{
          'key': 'status'
        }]
      },
        {
          'name': 'gridAction',
          'args': [{
            'key': 'execution-status'
          }]
        },
        {
          'name': 'sanitization',
          'args': [{
            'key': 'safeHTML'
          }]
        }],
    },
    'editable': false,
    'editOptions': {},
    'columnChooser': {
      'show': true,
      'default': false
    }
  },{
    'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
    'labelId': 'phase_testcase_notes',
    'labelName': I18N_MESSAGES['zephyr.testcase.notes'],
    'labelClass': '',
    'sortable': false,
    'sortOptions': {},
    'resizable': true,
    'fixedSize': '200',
    'show': true,
    'min': 122,
    'flexGrow': 'initial',
    'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
    'cell': {
      'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
      'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
      'actions': [],
      'key': 'testcase',
      'pipes': [{
        'name': 'objectParser',
        'args': [{
          'key': 'comment'
        }]
      }],
    },
    'editable': false,
    'editOptions': {},
    'columnChooser': {
      'show': true,
      'default': false
    }
  },{
    'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
    'labelId': 'phase_testcase_priority',
    'labelName': I18N_MESSAGES['zephyr.testcase.priority'],
    'labelClass': '',
    'sortable': true,
    'sortOptions': {
      'default': false,
      'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
      'isSorted': false,
      'key': 'testcase.priority',
      'reverse': false,
      'dataType': 'number'
    },
    'resizable': false,
    'fixedSize': '122',
    'show': false,
    'min': 122,
    'flexGrow': 'initial',
    'defaultSize': 'px',
    'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
    'cell': {
      'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
      'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
      'actions': [],
      'key': 'testcase',
      'pipes':  [{
        'name': 'objectParser',
        'args': [{
          'key': 'priority'
        }]
      },
        {
          'name': 'gridAction',
          'args': [{
            'key': 'testcasePriority'
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
    'labelId': 'phase_testcase_est_time',
    'labelName': I18N_MESSAGES['zephyr.testcase.estimated.time'],
    'labelClass': '',
    'sortable': true,
    'sortOptions': {
      'default': false,
      'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
      'isSorted': false,
      'key': 'testcase.estimatedTime',
      'reverse': false,
      'dataType': 'number'
    },
    'resizable': false,
    'fixedSize': '122',
    'show': true,
    'min': 122,
    'flexGrow': 'initial',
    'defaultSize': '122px',
    'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
    'cell': {
      'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
      'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
      'actions': [],
      'key': 'testcase',
      'pipes':  [{
        'name': 'objectParser',
        'args': [{
          'key': 'estimatedTime'
        }]
      },
        {
          'name': 'timeParser',
          'args': ['dd:hh:mm']
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
    'labelId': 'phase_testcase_created_by',
    'labelName': I18N_MESSAGES['zephyr.testcase.created.by'],
    'labelClass': '',
    'sortable': true,
    'sortOptions': {
      'default': false,
      'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
      'isSorted': false,
      'key': 'testcase.creatorId',
      'reverse': false,
      'dataType': 'number'
    },
    'resizable': false,
    'fixedSize': '122',
    'show': false,
    'min': 122,
    'flexGrow': 'initial',
    'defaultSize': 'auto',
    'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
    'cell': {
      'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
      'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
      'actions': [],
      'key': 'testcase',
      'pipes':  [{
        'name': 'objectParser',
        'args': [{
          'key': 'creatorId'
        }]
      },
        {
          'name': 'gridAction',
          'args': [{
            'key': 'user'
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
    'labelId': 'phase_testcase_actualtime',
    'labelName': I18N_MESSAGES['zephyr.testcase.actual.time'],
    'labelClass': '',
    'sortable': true,
    'sortOptions': {
      'default': false,
      'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
      'isSorted': false,
      'key': 'testcase.actualTime',
      'reverse': false,
      'dataType': 'number'
    },
    'resizable': false,
    'fixedSize': '114',
    'show': true,
    'min': 114,
    'flexGrow': 'initial',
    'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
    'cell': {
      'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
      'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
      'actions':  [],
      'key': 'testcase',
      'pipes':  [{
        'name': 'objectParser',
        'args': [{
          'key': 'actualTime'
        }]
      },
        {
          'name': 'timeParser',
          'args': ['dd:hh:mm']
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
    'labelId': 'release_visible',
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
        name: '',
        key: 'stateFlag',
        className: '',
        title : 'Click to toggle flag between set and reset',
        show: true,
        'pipes': {
          'action' : [{
            'name': 'gridAction',
            'args': [{
              'key': 'flag-action'
            }]
          }],
          'image' : [{
            'name': 'gridAction',
            'args': [{
              'key': 'flag-image'
            }]
          }]
        }
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


export const FREEFORM_GRID_OPTIONS = {
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
    'show': false,
    'currentOfTotal': true,
    'navBar': {
      'type': 'complex',
      'isFirstLast': false
    },
    'pageSize': true,
    'pages': GRID_CONSTANTS.GRID_PAGE_SIZES
  },
  'columns': FREEFORM_GRID_COLUMNS
};

export const PHASE_GRID_OPTIONS = {
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
    'columns': PHASE_GRID_COLUMNS
};

export const ADD_OTHER_CYCLE_GRID_OPTIONS = {
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
    'columns': ADD_OTHER_CYCLE_GRID_COLUMNS
};

/**
 * Set the pagination row count in the pageSize if it does not exists
 */
// TCR_GRID_OPTIONS.pagination.pages.unshift(TCR_GRID_OPTIONS.rowCount);

export const PHASE_GRID_PAGINATION = {
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
