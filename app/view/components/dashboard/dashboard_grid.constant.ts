import * as GRID_CONSTANTS from '../grid/grid.constant';
import {I18N_MESSAGES} from '../../../utils/messages/messages.en';

export const DASHBOARD_GRID_TYPE = 'dashboard';
export const DASHBOARD_GRID_COLUMNS = [
  {
    'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
    'labelId': 'dashboard_id',
    'labelName': I18N_MESSAGES['zephyr.dashboard.grid.id'],
    'labelClass': '',
    'sortable': true,
    'sortOptions': {
      'default': false,
      'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
      'isSorted': true,
      'key': 'id',
      'reverse': true,
      'dataType': 'number'
    },
    'resizable': false,
    'fixedSize': '61',
    'show': true,
    'min': 61,
    'flexGrow': 'initial',
    'defaultSize': 'px',
    'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
    'cell': {
      'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
      'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
      'actions': [],
      'key': 'id'
    },
    'editable': false,
    'editOptions': {},
    'columnChooser': {}
  },
  {
    'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
    'labelId': 'dashboard_name',
    'labelName': I18N_MESSAGES['zephyr.dashboard.grid.name'],
    'labelClass': '',
    'sortable': true,
    'sortOptions': {
      'default': false,
      'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
      'isSorted': false,
      'key': 'name',
      'reverse': true,
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
      'key': 'name'
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
    'labelId': 'dashboard_desc',
    'labelName': I18N_MESSAGES['zephyr.dashboard.grid.desc'],
    'labelClass': '',
    'sortable': true,
    'sortOptions': {
      'default': false,
      'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
      'isSorted': false,
      'key': 'description',
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
      'key': 'description'
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
    'labelId': 'dashboard_creator_id',
    'labelName': I18N_MESSAGES['zephyr.dashboard.grid.craetor'],
    'labelClass': '',
    'sortable': true,
    'sortOptions': {
      'default': false,
      'order': GRID_CONSTANTS.GRID_CELL_SORT_ASC,
      'isSorted': false,
      'key': 'creatorName',
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
      'key': 'creatorName'
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
    'labelId': 'dashboard_actions',
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
        name: 'edit',
        key: 'settings.editable',
        className: 'edit',
        title : 'Edit',
        show: true
      },{
        name: 'delete',
        key: 'settings.editable',
        className: 'delete',
        title : 'Delete',
        show: true
      }, {
        name: 'favorite',
        key: 'settings.favorite',
        className: 'favorite',
        title : 'Mark Favorite',
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

export const DASHBOARD_GRID_OPTIONS = {
  'headerRow': true,
  'headerBackground': true,
  'rowCount': GRID_CONSTANTS.GRID_ROW_COUNT_DEFAULT,
  'rowReorder': false,
  'columnCount': GRID_CONSTANTS.GRID_COLUMN_COUNT_DEFAULT,
  'columnReorder': false,
  'gridDND': false,
  'columnSeparator': true,
  'columnChooser': {
    'show': false
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
  'columns': DASHBOARD_GRID_COLUMNS
};

export const DASHBOARD_GRID_PAGINATION = {
  show: true,
  isFirstPage: true,
  isLastPage: true,
  pageList: [],
  currentOfTotal: '',
  currentIndex: 1,
  lastIndex: 0,
  disabled: false,
  size: GRID_CONSTANTS.GRID_ROW_COUNT_DEFAULT
};
