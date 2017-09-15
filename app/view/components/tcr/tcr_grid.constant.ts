// Import the i18n messages
declare var _;

import {I18N_MESSAGES} from '../../../utils/messages/messages.en';
import * as GRID_CONSTANTS from '../grid/grid.constant';

export const TCR_GRID_TYPE = 'tcr';
export const TCR_COVERAGE_GRID_TYPE = 'tcr_coverage';
export const GLOBAL_TCR_GRID_TYPE = 'global';
export const LOCAL_TCR_GRID_TYPE = 'local';
export const FIND_ADD_GRID_TYPE = 'find_add';

declare var _;

export const TCR_GRID_COLUMNS = [
	{
		'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_CHECKBOX,
		'labelId': 'testcase_select_all',
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
		'labelId': 'TCR_DETAIL_VIEW_COLUMN',
		'labelName': I18N_MESSAGES['zephyr.search.entity.type.testcase'],
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
		'show': false,
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
                'name': 'listParser',
                'args': [{
                    'params': [{
                        'key': 'id',
                        'pipe': 'text'
                    }, {
                        'key': 'name',
                        'pipe': 'text'
                    }],
                    'seperator': '/'
                }]
            }, {
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
		'labelId': 'tcr_name',
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
			}, {
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
		'labelId': 'tcr_alt_id',
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
		'labelId': 'tcr_ma',
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
		'min': 40,
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
				}, {
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
		'labelId': 'tcr_coverage',
		'labelName': I18N_MESSAGES['zephyr.testcase.req.Coverage'],
		'labelClass': '',
		'sortable': true,
    	'customClass': 'coverage',
		'sortOptions': {
			'default': false,
			'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
			'isSorted': false,
			'key': 'testcase.requirementIds',
			'reverse': false,
			'dataType': 'number'
		},
		'resizable': false,
		'fixedSize': '130',
		'show': false,
		'min': 130,
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
						'key': 'requirementIds'
					}]
				}, {
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
		'labelId': 'tcr_$',
		'labelName': I18N_MESSAGES['zephyr.testcase.$'],
		'labelClass': '',
		'sortable': false,
		'sortOptions': {
			'default': false,
			'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
			'isSorted': false,
			'key': 'original.testcaseLink',
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
			'key': 'original',
			'pipes': [{
					'name': 'gridAction',
					'args': [{
						'key': 'testcaseLink'
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
		'labelId': 'tcr_priority',
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
			}, {
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
		'labelId': 'tcr_est_time',
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
		'show': true,
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
			}, {
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
		'labelId': 'tcr_created_by',
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
			}, {
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
		'labelId': 'tcr_created_on',
		'labelName': I18N_MESSAGES['zephyr.testcase.created.on'],
		'labelClass': '',
		'sortable': true,
		'sortOptions': {
			'default': false,
			'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
			'isSorted': false,
			'key': 'testcase.tcCreationDate',
			'reverse': false,
			'dataType': 'string'
		},
		'resizable': false,
		'fixedSize': '114',
		'show': true,
		'min': 114,
		'flexGrow': 'initial',
		'defaultSize': 'px',
		'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
		'cell': {
			'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
			'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
			'actions':  [],
			'key': 'testcase',
			'pipes':  [{
				'name': 'objectParser',
				'args': [{
					'key': 'tcCreationDate'
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
];

export const GLOBAL_TCC_GRID_COLUMNS = [
	{
		'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_CHECKBOX,
		'labelId': 'global_tcc_select_all',
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
					'name': 'global_tcc_select'
				}]
			}]
		},
		'editable': false,
		'editOptions': {},
		'columnChooser': {
			'show': false,
			'default': false
		}
	}, {
		'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
		'labelId': 'global_tcc_id',
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
		'resizable': false,
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
	}, {
		'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
		'labelId': 'global_tcc_name',
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
			}, {
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
	}, {
		'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
		'labelId': 'tcr_alt_id',
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
	}, {
		'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
		'labelId': 'tcr_ma',
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
		'min': 40,
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
				}, {
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
	}, {
		'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
		'labelId': 'tcr_ma',
		'labelName': I18N_MESSAGES['zephyr.testcase.req.Coverage'],
		'labelClass': '',
		'sortable': true,
		'sortOptions': {
			'default': false,
			'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
			'isSorted': false,
			'key': 'testcase.requirementIds',
			'reverse': false,
			'dataType': 'number'
		},
		'resizable': false,
		'fixedSize': '130',
		'show': false,
		'min': 130,
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
						'key': 'requirementIds'
					}]
				}, {
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
	}, {
		'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
		'labelId': 'tcr_$',
		'labelName': I18N_MESSAGES['zephyr.testcase.$'],
		'labelClass': '',
		'sortable': true,
		'sortOptions': {
			'default': false,
			'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
			'isSorted': false,
			'key': 'original.testcaseLink',
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
			'key': 'original',
			'pipes': [{
					'name': 'gridAction',
					'args': [{
						'key': 'testcaseLink'
					}]
				}]
		},
		'editable': false,
		'editOptions': {},
		'columnChooser': {
			'show': false,
			'default': false
		}
	}, {
		'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
		'labelId': 'tcr_priority',
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
			}, {
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
	}, {
		'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
		'labelId': 'tcr_est_time',
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
			}, {
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
	}, {
		'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
		'labelId': 'tcr_created_by',
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
			}, {
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
	}, {
		'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
		'labelId': 'tcr_created_on',
		'labelName': I18N_MESSAGES['zephyr.testcase.created.on'],
		'labelClass': '',
		'sortable': true,
		'sortOptions': {
			'default': false,
			'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
			'isSorted': false,
			'key': 'testcase.tcCreationDate',
			'reverse': false,
			'dataType': 'string'
		},
		'resizable': false,
		'fixedSize': '114',
		'show': false,
		'min': 114,
		'flexGrow': 'initial',
		'defaultSize': 'px',
		'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
		'cell': {
			'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
			'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
			'actions':  [],
			'key': 'testcase',
			'pipes':  [{
				'name': 'objectParser',
				'args': [{
					'key': 'tcCreationDate'
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

export const FIND_AND_ADD_GRID_COLUMNS = _.cloneDeep(TCR_GRID_COLUMNS);

export const TCR_GRID_OPTIONS = {
	'headerRow': true,
	'headerBackground': true,
	'rowCount': GRID_CONSTANTS.GRID_ROW_COUNT_DEFAULT,
	'rowReorder': false,
	'gridDND': true,
	'gridDNDOptions': {
		'scope': 'tcr',
		'dragTitle': 'testcase',
		'selectDraggable': true
	},
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
	'columns': TCR_GRID_COLUMNS
};

export const FIND_AND_ADD_GRID_OPTIONS = {
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
	'columns': FIND_AND_ADD_GRID_COLUMNS
};

export const GLOBAL_TCC_GRID_OPTIONS = {
	'headerRow': true,
	'headerBackground': true,
	'rowCount': GRID_CONSTANTS.GRID_ROW_COUNT_DEFAULT,
	'rowReorder': false,
	'columnCount': GRID_CONSTANTS.GRID_COLUMN_COUNT_DEFAULT,
	'columnReorder': false,
	'gridDND': true,
	'gridDNDOptions': {
		'containment': '#zee-global-tcr-tree-modal',
		'dragTitle': 'testcase',
		'zIndex': 1051,
		'scope': 'global_tree',
		'alwaysCopy': true,
		'selectDraggable': true
	},
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
	'columns': GLOBAL_TCC_GRID_COLUMNS
};
export const LOCAL_TCC_GRID_OPTIONS = {
	'headerRow': true,
	'headerBackground': true,
	'rowCount': GRID_CONSTANTS.GRID_ROW_COUNT_DEFAULT,
	'rowReorder': false,
	'columnCount': GRID_CONSTANTS.GRID_COLUMN_COUNT_DEFAULT,
	'columnReorder': false,
	'gridDND': false,
	'gridDrop': true,
	'gridDropOptions': {
		'scope': 'global_tree',
	},
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
	'columns': GLOBAL_TCC_GRID_COLUMNS
};

/**
 * Set the pagination row count in the pageSize if it does not exists
 */
// TCR_GRID_OPTIONS.pagination.pages.unshift(TCR_GRID_OPTIONS.rowCount);
export const TCR_GRID_PAGINATION = {
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
export const FIND_ADD_ADD_GRID_PAGINATION = _.cloneDeep(TCR_GRID_PAGINATION);
