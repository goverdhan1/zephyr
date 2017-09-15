import {I18N_MESSAGES} from '../../../utils/messages/messages.en';
import * as GRID_CONSTANTS from '../grid/grid.constant';

export const REQ_GRID_TYPE = 'req';
export const REQ_TRACEABILITY_GRID_TYPE = 'req_traceability';
export const REQ_COVERAGE_GRID_TYPE = 'req_coverage';
export const TCE_REQ_COVERAGE_GRID_TYPE = 'tce_req_coverage';

export const REQ_GRID_COLUMNS = [
	{
		'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_CHECKBOX,
		'labelId': 'req_select_all',
		'labelName': I18N_MESSAGES['zephyr.requirement.select.all'],
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
					'name': 'req_select'
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
		'labelId': 'req_id',
		'labelName': I18N_MESSAGES['zephyr.requirement.id'],
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
			'key': 'id',
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
		'labelId': 'req_name',
		'labelName': I18N_MESSAGES['zephyr.requirement.name'],
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
	},
  {
		'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
		'labelId': 'req_altId',
		'labelName': I18N_MESSAGES['zephyr.requirement.altid'],
		'labelClass': '',
		'sortable': true,
		'sortOptions': {
			'default': false,
			'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
			'isSorted': false,
			'key': 'externalId',
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
			'key': 'externalId'
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
		'labelId': 'req_coverage',
		'labelName': I18N_MESSAGES['zephyr.requirement.req.Coverage'],
		'labelClass': '',
    	'customClass': 'testcaseIds dialog-trigger',
    	'sortable': true,
		'sortOptions': {
			'default': false,
			'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
			'isSorted': false,
			'key': 'coverage',
			'reverse': false,
			'dataType': 'number'
		},
		'resizable': false,
		'fixedSize': '122',
		'show': true,
		'min': 130,
		'flexGrow': 'initial',
		'defaultSize': 'px',
		'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
		'cell': {
			'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
			'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
			'actions': [],
			'key': 'coverage',
			'pipes': [{
					'name': 'gridAction',
					'args': [{
						'key': 'testcaseIds'
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
		'labelId': 'req_priority',
		'labelName': I18N_MESSAGES['zephyr.requirement.priority'],
		'labelClass': '',
		'sortable': true,
		'sortOptions': {
			'default': false,
			'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
			'isSorted': false,
			'key': 'priority',
			'reverse': false,
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
			'key': 'priority',
			'pipes':  [{
				'name': 'gridAction',
				'args': [{
					'key': 'reqPriority'
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
		'labelId': 'req_link',
		'labelName': I18N_MESSAGES['zephyr.requirement.link'],
		'labelClass': '',
		'sortable': false,
		'sortOptions': {
			'default': false,
			'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
			'isSorted': false,
			'key': 'url',
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
			'key': 'url',
			'pipes':  [{
				'name': 'link',
				'args': [{
                    'class': 'zui-link grid_link_click req_grid_link'
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


export const REQ_COVERAGE_GRID_COLUMNS = [
  {
    'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
    'labelId': 'req_id',
    'labelName': I18N_MESSAGES['zephyr.requirement.id'],
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
      'key': 'id',
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
    'labelId': 'req_name',
    'labelName': I18N_MESSAGES['zephyr.requirement.name'],
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
  },
  {
    'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
    'labelId': 'req_altId',
    'labelName': I18N_MESSAGES['zephyr.requirement.altid'],
    'labelClass': '',
    'sortable': true,
    'sortOptions': {
      'default': false,
      'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
      'isSorted': false,
      'key': 'externalId',
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
      'key': 'externalId'
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
    'labelId': 'req_priority',
    'labelName': I18N_MESSAGES['zephyr.requirement.priority'],
    'labelClass': '',
    'sortable': true,
    'sortOptions': {
      'default': false,
      'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
      'isSorted': false,
      'key': 'priority',
      'reverse': false,
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
      'key': 'priority',
      'pipes':  [{
        'name': 'gridAction',
        'args': [{
          'key': 'reqPriority'
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
    'labelId': 'req_link',
    'labelName': I18N_MESSAGES['zephyr.requirement.link'],
    'labelClass': '',
    'sortable': false,
    'sortOptions': {
      'default': false,
      'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
      'isSorted': false,
      'key': 'url',
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
      'key': 'url',
      'pipes':  [{
        'name': 'link',
        'args': [{
          'class': 'zui-link grid_link_click req_grid_link'
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



export const REQ_GRID_OPTIONS = {
	'headerRow': true,
	'headerBackground': true,
	'rowCount': GRID_CONSTANTS.GRID_ROW_COUNT_DEFAULT,
	'rowReorder': false,
	'gridDND': true,
	'gridDNDOptions': {
		'scope': 'requirement',
		'dragTitle': 'requirement',
		'selectDraggable': true,
		'doAllocate' : {
	        'source': 'global',
	        'target': 'release'
	    }
	},
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
	'columns': REQ_GRID_COLUMNS
};

export const REQ_COVERAGE_GRID_OPTIONS = {
  'headerRow': true,
  'headerBackground': true,
  'rowCount': GRID_CONSTANTS.GRID_ROW_COUNT_DEFAULT,
  'rowReorder': false,
  'gridDND': true,
  'gridDNDOptions': {
    'scope': 'requirement',
    'dragTitle': 'requirement',
    'selectDraggable': true,
    'doAllocate' : {
      'source': 'global',
      'target': 'release'
    }
  },
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
  'columns': REQ_COVERAGE_GRID_COLUMNS
};

export const REQ_GRID_PAGINATION = {
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
