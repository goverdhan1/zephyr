// Import the i18n messages
import {I18N_MESSAGES} from '../../../utils/messages/messages.en';
import {UtililtyFunctions} from '../../../utils/scripts/utils';
import * as GRID_CONSTANTS from '../grid/grid.constant';

let utililtyFunction = new UtililtyFunctions();

export const TCE_GRID_TYPE = 'tce';
export const TCE_ZBOT_GRID_TYPE = 'tce_zbot';
export const TCE_SEARCH_GRID_TYPE = 'tce_search';
export const GRID_ROW_COUNT_DEFAULT = 50;

export const TCE_GRID_COLUMNS = [

    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_CHECKBOX,
        'labelId': 'testcase_select',
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
    },
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'testcase_id',
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
    },
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'tce_name',
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
                    'key': 'name'
                }]
            },
              {
                'name': 'escapeHTMLPipe',
                'args': []
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
        'labelId': 'tce_ma',
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
    },
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'tce_assigned_to',
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
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
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
        'editOptions': {},
        'columnChooser': {
            'show': true,
            'default': false
        }
    },
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'tce_notes',
        'labelName': I18N_MESSAGES['zephyr.testcase.notes'],
        'labelClass': '',
        'sortable': false,
        'sortOptions': {},
        'resizable': true,
        'fixedSize': '200',
        'show': true,
        'min': 200,
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
        'editable': true,
        'editOptions': {
            'selectedOption' : {},
            'selectOptions' : {},
            'type':'textarea'
        },
        'inlineEdit':true,
        'columnChooser': {
            'show': true,
            'default': false
        }
    },
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'tce_status',
        'labelName': I18N_MESSAGES['zephyr.testcase.status'],
        'labelClass': '',
        'customClass': 'tce-execution-status',
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
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['DROPDOWN'],
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
            }
            ,
            {
                'name': 'sanitization',
                'args': [{
                    'key': 'safeHTML'
                }]
            }]

        },
        // 'editable': false,
        // 'editOptions': {},
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
                        'key': 'status-select'
                    }]
                }]
            },
            'templateResult' : utililtyFunction.statusSelectTemplateFunction,
            'templateSelection' : utililtyFunction.statusSelectSelectedOptionTemplateFunction,
            'type':'select',
            'unescapeHTML': true
        },
        'inlineEdit':true,
        'columnChooser': {
            'show': true,
            'default': false
        }
    },
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'tce_defect',
        'labelName': I18N_MESSAGES['zephyr.testcase.defect'],
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
                    'key': 'defects'
                }]
            }, {
              'name': 'gridAction',
              'args': [{
                'key': '' +
                'tce-defects'
              }]
            }]
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
        'labelId': 'tce_alt_id',
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
    },
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'tce_attachment_count',
        'labelName': I18N_MESSAGES['zephyr.testcase.attachment'],
        'labelClass': '',
        'sortable': false,
        'sortOptions': {},
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
                    'key': 'attachmentCount'
                }]
            },{
                'name': 'link',
                'args': [{
                    'class': 'zui-link grid_link_click attachment_count'
                }]
            }]
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
        'labelId': 'tce_priority',
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
    },
  {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'tce_est_time',
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
        'fixedSize': '130',
        'show': false,
        'min': 130,
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
    },
  {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'tce_executed_by',
        'labelName': I18N_MESSAGES['zephyr.testcase.executed.by'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'executedBy',
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
            'key': 'executedBy',
            'pipes':  [{
                'name': 'gridAction',
                'args': [{
                    'key': 'executedby-name-mapping'
                }]
            }]
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
        'labelId': 'tce_coverage',
        'labelName': I18N_MESSAGES['zephyr.testcase.req.Coverage'],
        'labelClass': '',
        'sortable': false,
        'sortOptions': {
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
            'pipes': [{
                    'name': 'objectParser',
                    'args': [{
                        'key': 'requirementIds'
                    }]
                },
                {
                    'name': 'gridAction',
                    'args': [{
                        'key': 'requirementIds'
                    }]
            }]
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
        'labelId': 'tce_executed_on',
        'labelName': I18N_MESSAGES['zephyr.testcase.executed.on'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'testcase.execDate',
            'reverse': false,
            'dataType': 'string'
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
            'pipes':[{
                'name': 'objectParser',
                'args': [{
                    'key': 'execDate'
                }]
            }]
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
        'labelId': 'tce_created_by',
        'labelName': I18N_MESSAGES['zephyr.testcase.version'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'versionId',
            'reverse': false,
            'dataType': 'string'
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
            'key': 'versionId',
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
        'labelId': 'tce_actual_time',
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

export const TCE_GRID_OPTIONS = {
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
    'columns': TCE_GRID_COLUMNS
};

export const TCE_GRID_PAGINATION = {
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

export const TCE_ZBOT_GRID_COLUMNS = [
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'testcase_order_id',
        'labelName': I18N_MESSAGES['zephyr.testcase.orderId'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_DESC,
            'isSorted': true,
            'key': 'testcase.orderId',
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
                    'key': 'orderId'
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
        'labelId': 'testcase_id',
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
    },
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'tce_name',
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
        'min': 120,
        'flexGrow': '1',
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
                    'key': 'name'
                }]
            },
              {
                'name': 'escapeHTMLPipe',
                'args': []
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
        'labelId': 'tce_ma',
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
    },
  {
    'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
    'labelId': 'tce_path',
    'labelName': I18N_MESSAGES['zephyr.testcase.path'],
    'labelClass': '',
    'resizable': false,
    'fixedSize': 'auto',
    'show': true,
    'min': 180,
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
          'key': 'scriptPath'
        }]
      }]
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
    'labelId': 'tce_realtimemessage',
    'labelName': I18N_MESSAGES['zephyr.testcase.realtimemessase'],
    'labelClass': '',
    'ellipsis': 'no-ellipsis',
    'resizable': false,
    'fixedSize': 'auto',
    'show': true,
    'min': 180,
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
          'key': 'realtTimeStatus'
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

export const TCE_ZBOT_GRID_OPTIONS = {
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
    'columns': TCE_ZBOT_GRID_COLUMNS
};

export const TCE_ZBOT_GRID_PAGINATION = {
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

export const TCE_SEARCH_GRID_COLUMNS = [

    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_CHECKBOX,
        'labelId': 'testcase_select',
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
    },
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'testcase_id',
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
    },
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'tce_name',
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
                    'key': 'name'
                }]
            },
              {
                'name': 'escapeHTMLPipe',
                'args': []
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
        'labelId': 'tce_ma',
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
    },
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'tce_assigned_to',
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
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
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
        'editOptions': {},
        'columnChooser': {
            'show': true,
            'default': false
        }
    },
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'tce_notes',
        'labelName': I18N_MESSAGES['zephyr.testcase.notes'],
        'labelClass': '',
        'sortable': false,
        'sortOptions': {},
        'resizable': true,
        'fixedSize': '200',
        'show': true,
        'min': 200,
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
        'editOptions': {
            'selectedOption' : {},
            'selectOptions' : {},
            'type':'textarea'
        },
        'inlineEdit':true,
        'columnChooser': {
            'show': true,
            'default': false
        }
    },
    {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'tce_status',
        'labelName': I18N_MESSAGES['zephyr.testcase.status'],
        'labelClass': '',
        'customClass': 'tce-execution-status',
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
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['DROPDOWN'],
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
            }
            ,
            {
                'name': 'sanitization',
                'args': [{
                    'key': 'safeHTML'
                }]
            }]

        },
        // 'editable': false,
        // 'editOptions': {},
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
                        'key': 'status-select'
                    }]
                }]
            },
            'templateResult' : utililtyFunction.statusSelectTemplateFunction,
            'templateSelection' : utililtyFunction.statusSelectSelectedOptionTemplateFunction,
            'type':'select',
            'unescapeHTML': true
        },
        'inlineEdit':true,
        'columnChooser': {
            'show': true,
            'default': false
        }
    },{
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'tce_alt_id',
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
        'labelId': 'tce_priority',
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
        'labelId': 'tce_est_time',
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
        'fixedSize': '130',
        'show': false,
        'min': 130,
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
        'labelId': 'tce_created_by',
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
        'fixedSize': '150',
        'min': 150,
        'flexGrow': 'initial',
        'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
        'show': true,
        'cell': {
            'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
            'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
            'actions': [],
            'key': 'testcase',
            'pipes': [{
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
        'labelId': 'tce_executed_by',
        'labelName': I18N_MESSAGES['zephyr.testcase.executed.by'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'executedBy',
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
            'key': 'executedBy',
            'pipes':  [{
                'name': 'gridAction',
                'args': [{
                    'key': 'executedby-name-mapping'
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
        'labelId': 'testcase_project',
        'labelName': I18N_MESSAGES['zephyr.testcase.project'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_DESC,
            'isSorted': false,
            'key': 'testcase.project',
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
                    'key': 'project'
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
        'labelId': 'testcase_release',
        'labelName': I18N_MESSAGES['zephyr.testcase.release'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_DESC,
            'isSorted': false,
            'key': 'testcase.release',
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
                    'key': 'release'
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
        'labelId': 'testcase_cycle',
        'labelName': I18N_MESSAGES['zephyr.testcase.cycle'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_DESC,
            'isSorted': false,
            'key': 'testcase.cycle',
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
                    'key': 'cycle'
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
        'labelId': 'tce_phase',
        'labelName': I18N_MESSAGES['zephyr.testcase.phase'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'testcase.phase',
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
                    'key': 'phase'
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
        'labelId': 'tce_executed_on',
        'labelName': I18N_MESSAGES['zephyr.testcase.executed.on'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'testcase.execDate',
            'reverse': false,
            'dataType': 'string'
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
            'pipes':[{
                'name': 'objectParser',
                'args': [{
                    'key': 'execDate'
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
        'labelId': 'tce_created_by',
        'labelName': I18N_MESSAGES['zephyr.testcase.version'],
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
            'isSorted': false,
            'key': 'versionId',
            'reverse': false,
            'dataType': 'string'
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
            'key': 'versionId',
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {
            'show': true,
            'default': false
        }
    },{
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'tce_actual_time',
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

export const TCE_SEARCH_GRID_OPTIONS = {
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
    'columns': TCE_SEARCH_GRID_COLUMNS
};

export const TCE_SEARCH_GRID_PAGINATION = {
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
