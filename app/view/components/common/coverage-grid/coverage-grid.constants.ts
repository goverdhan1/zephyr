// Import the i18n messages
import {I18N_MESSAGES} from '../../../../utils/messages/messages.en';
import * as GRID_CONSTANTS from '../../grid/grid.constant';

export const SAVED_MAPS_GRID_TYPE = 'saved_maps';
export const IMPORT_JOBS_GRID_TYPE = 'import_jobs';

export const SAVED_MAPS_GRID_COLUMNS = [
    {
		'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
		'labelId': 'savedMap_id',
		'labelName': I18N_MESSAGES['zephyr.grid.id'],
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
			'actions': [],
			'key': 'id',
			'pipes': []
		},
		'editable': false,
		'editOptions': {},
		'columnChooser': {}
	}, {
		'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
		'labelId': 'savedMap_name',
		'labelName': I18N_MESSAGES['zephyr.grid.map.name'],
		'labelClass': '',
		'sortable': false,
		'sortOptions': {},
		'resizable': false,
		'flexGrow': 1,
		'fixedSize': 'auto',
		'show': true,
		'min': 122,
		'defaultSize': 'px',
		'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
		'cell': {
			'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
			'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
			'actions': [],
			'key': 'name',
			'pipes': []
		},
		'editable': false,
		'editOptions': {},
		'columnChooser': {}
	}, {
		'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
		'labelId': 'savedMap_creationDate',
		'labelName': I18N_MESSAGES['zephyr.grid.map.created.on'],
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
			'actions': [],
			'key': 'creationDate',
			'pipes': []
		},
		'editable': false,
		'editOptions': {},
		'columnChooser': {}
	}, {
		'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
		'labelId': 'savedMap_action',
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
			'pipes': [{
                'name': 'importConstants',
                'args': [{
                    'key': 'icon',
                    'type': 'savedMaps'
                }]
            }],
			'key': null,
			'actions': []
		},
		'editable': false,
		'editOptions': {},
		'columnChooser': {}
	}
];

export const SAVED_MAPS_GRID_OPTIONS = {
	'headerRow': true,
	'headerBackground': true,
	'gridDND': false,
	'rowCount': GRID_CONSTANTS.GRID_ROW_COUNT_DEFAULT,
	'rowReorder': false,
	'columnCount': GRID_CONSTANTS.GRID_COLUMN_COUNT_DEFAULT,
	'columnReorder': false,
	'columnSeparator': true,
	'columnChooser': {
		'show': false
	},
	'pagination': {
		'show': false
	},
	'columns': SAVED_MAPS_GRID_COLUMNS
};


export const IMPORT_JOBS_GRID_COLUMNS = [{
		'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
		'labelId': 'importJobs_id',
		'labelName': I18N_MESSAGES['zephyr.grid.id'],
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
			'actions': [],
			'key': 'id',
			'pipes': []
		},
		'editable': false,
		'editOptions': {},
		'columnChooser': {}
	},
    {
		'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
		'labelId': 'importJobs_name',
		'labelName': I18N_MESSAGES['zephyr.grid.job.name'],
		'labelClass': '',
		'sortable': false,
		'sortOptions': {},
		'resizable': false,
		'flexGrow': 1,
		'fixedSize': 'auto',
		'show': true,
		'min': 122,
		'defaultSize': 'px',
		'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
		'cell': {
			'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
			'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
			'actions': [],
			'key': 'name',
			'pipes': []
		},
		'editable': false,
		'editOptions': {},
		'columnChooser': {}
	},
    {
		'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
		'labelId': 'importJobs_fieldsMap',
		'labelName': I18N_MESSAGES['zephyr.grid.fields.map'],
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
			'actions': [],
			'key': 'fieldMap',
			'pipes': [{
                'name': 'objectParser',
                'args': [{
                    'key': 'name'
                }]
            }]
		},
		'editable': false,
		'editOptions': {},
		'columnChooser': {}
	},
    {
		'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
		'labelId': 'importJobs_scheduledOn',
		'labelName': I18N_MESSAGES['zephyr.grid.scheduled.on'],
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
			'actions': [],
			'key': 'scheduledDate',
            'pipes': [{
                'name': 'date',
                'args': ['MM/DD/YYYY']
            }]
		},
		'editable': false,
		'editOptions': {},
		'columnChooser': {}
	},
    {
		'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
		'labelId': 'importJobs_path',
		'labelName': I18N_MESSAGES['zephyr.grid.path'],
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
			'actions': [],
			'key': 'folder',
            'pipes': []
		},
		'editable': false,
		'editOptions': {},
		'columnChooser': {}
	},
    {
		'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
		'labelId': 'importJobs_status',
		'labelName': I18N_MESSAGES['zephyr.grid.status'],
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
			'actions': [],
			'key': 'status',
            'pipes': [{
            'name': 'importConstants',
            'args': [{
                'key': 'status'
            }]
        }]
		},
		'editable': false,
		'editOptions': {},
		'columnChooser': {}
	},
    {
		'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
		'labelId': 'importJobs_action',
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
			'actions': [],
			'key': 'status',
            'pipes': [{
                'name': 'importConstants',
                'args': [{
                    'key': 'icon'
                }]
            }]
		},
		'editable': false,
		'editOptions': {},
		'columnChooser': {}
	}
];

export const IMPORT_JOBS_GRID_OPTIONS = {
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
	'pagination': {
		'show': false
	},
	'columns': IMPORT_JOBS_GRID_COLUMNS
};
