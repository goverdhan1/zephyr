// Import the i18n messages
import {I18N_MESSAGES} from '../../../utils/messages/messages.en';
import {UtililtyFunctions} from '../../../utils/scripts/utils';
import * as GRID_CONSTANTS from '../grid/grid.constant';

let utililtyFunction = new UtililtyFunctions();

export const TCEP_GRID_TYPE = 'tcep';
export const TCEP_GRID_ROW_COUNT_DEFAULT = 50;

export const TCEP_GRID_COLUMNS = [

 {
    'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
    'labelId': 'id',
    'labelName': 'Cycles',
    'labelClass': '',
    'sortable': true,
    'sortOptions': {
      'default': false,
      'order': GRID_CONSTANTS.GRID_CELL_SORT_DESC,
      'isSorted': false,
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
     'labelId': 'WIP',
     'labelName': 'WIP',
     'labelClass': '',
     'sortable': true,
     'sortOptions': {
       'default': false,
       'order': GRID_CONSTANTS.GRID_CELL_SORT_DESC,
       'isSorted': false,
       'key': 'WIP',
       'reverse': true,
       'dataType': 'string'
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
       'key': 'WIP'
     },
     'editable': false,
     'editOptions': {},
     'columnChooser': {}
   },
   {
      'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
      'labelId': 'percentageSumDetailedBytotal',
      'labelName': 'Percentage Sum Detailed By Total',
      'labelClass': '',
      'sortable': true,
      'sortOptions': {
        'default': false,
        'order': GRID_CONSTANTS.GRID_CELL_SORT_DESC,
        'isSorted': false,
        'key': 'percentageSumDetailedBytotal',
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
        'key': 'percentageSumDetailedBytotal'
      },
      'editable': false,
      'editOptions': {},
      'columnChooser': {}
    },
    {
       'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
       'labelId': 'skey10',
       'labelName': 'skey10',
       'labelClass': '',
       'sortable': true,
       'sortOptions': {
         'default': false,
         'order': GRID_CONSTANTS.GRID_CELL_SORT_DESC,
         'isSorted': false,
         'key': 'skey10',
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
         'key': 'skey10'
       },
       'editable': false,
       'editOptions': {},
       'columnChooser': {}
     },
     {
        'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
        'labelId': 'Pass',
        'labelName': 'Pass',
        'labelClass': '',
        'sortable': true,
        'sortOptions': {
          'default': false,
          'order': GRID_CONSTANTS.GRID_CELL_SORT_DESC,
          'isSorted': false,
          'key': 'Pass',
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
          'key': 'Pass'
        },
        'editable': false,
        'editOptions': {},
        'columnChooser': {}
      },
      {
         'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
         'labelId': 'total',
         'labelName': 'Total',
         'labelClass': '',
         'sortable': true,
         'sortOptions': {
           'default': false,
           'order': GRID_CONSTANTS.GRID_CELL_SORT_DESC,
           'isSorted': false,
           'key': 'total',
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
           'key': 'total'
         },
         'editable': false,
         'editOptions': {},
         'columnChooser': {}
       },
       {
          'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
          'labelId': 'Fail',
          'labelName': 'Fail',
          'labelClass': '',
          'sortable': true,
          'sortOptions': {
            'default': false,
            'order': GRID_CONSTANTS.GRID_CELL_SORT_DESC,
            'isSorted': false,
            'key': 'Fail',
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
            'key': 'Fail'
          },
          'editable': false,
          'editOptions': {},
          'columnChooser': {}
        },
        {
           'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
           'labelId': 'sumDetailed',
           'labelName': 'sumDetailed',
           'labelClass': '',
           'sortable': true,
           'sortOptions': {
             'default': false,
             'order': GRID_CONSTANTS.GRID_CELL_SORT_DESC,
             'isSorted': false,
             'key': 'sumDetailed',
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
             'key': 'sumDetailed'
           },
           'editable': false,
           'editOptions': {},
           'columnChooser': {}
         },
         {
            'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
            'labelId': 'skey4',
            'labelName': 'skey4',
            'labelClass': '',
            'sortable': true,
            'sortOptions': {
              'default': false,
              'order': GRID_CONSTANTS.GRID_CELL_SORT_DESC,
              'isSorted': false,
              'key': 'skey4',
              'reverse': true,
              'dataType': 'string'
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
              'key': 'skey4'
            },
            'editable': false,
            'editOptions': {},
            'columnChooser': {}
          },
          {
             'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
             'labelId': 'skey3',
             'labelName': 'skey3',
             'labelClass': '',
             'sortable': true,
             'sortOptions': {
               'default': false,
               'order': GRID_CONSTANTS.GRID_CELL_SORT_DESC,
               'isSorted': false,
               'key': 'skey3',
               'reverse': true,
               'dataType': 'string'
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
               'key': 'skey3'
             },
             'editable': false,
             'editOptions': {},
             'columnChooser': {}
           },
           {
              'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
              'labelId': 'Change Status',
              'labelName': 'Change Status',
              'labelClass': '',
              'sortable': true,
              'sortOptions': {
                'default': false,
                'order': GRID_CONSTANTS.GRID_CELL_SORT_DESC,
                'isSorted': false,
                'key': 'Change Status',
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
                'key': 'Change Status'
              },
              'editable': false,
              'editOptions': {},
              'columnChooser': {}
            },
            {
               'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
               'labelId': 'skey2',
               'labelName': 'skey2',
               'labelClass': '',
               'sortable': true,
               'sortOptions': {
                 'default': false,
                 'order': GRID_CONSTANTS.GRID_CELL_SORT_DESC,
                 'isSorted': false,
                 'key': 'skey2',
                 'reverse': true,
                 'dataType': 'string'
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
                 'key': 'skey2'
               },
               'editable': false,
               'editOptions': {},
               'columnChooser': {}
             },
             {
                'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
                'labelId': 'skey1',
                'labelName': 'skey1',
                'labelClass': '',
                'sortable': true,
                'sortOptions': {
                  'default': false,
                  'order': GRID_CONSTANTS.GRID_CELL_SORT_DESC,
                  'isSorted': false,
                  'key': 'skey1',
                  'reverse': true,
                  'dataType': 'string'
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
                  'key': 'skey1'
                },
                'editable': false,
                'editOptions': {},
                'columnChooser': {}
              },
              {
                 'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
                 'labelId': 'dataPointNum',
                 'labelName': 'dataPointNum',
                 'labelClass': '',
                 'sortable': true,
                 'sortOptions': {
                   'default': false,
                   'order': GRID_CONSTANTS.GRID_CELL_SORT_DESC,
                   'isSorted': false,
                   'key': 'dataPointNum',
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
                   'key': 'dataPointNum'
                 },
                 'editable': false,
                 'editOptions': {},
                 'columnChooser': {}
               },
               {
                  'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
                  'labelId': 'Blocked',
                  'labelName': 'Blocked',
                  'labelClass': '',
                  'sortable': true,
                  'sortOptions': {
                    'default': false,
                    'order': GRID_CONSTANTS.GRID_CELL_SORT_DESC,
                    'isSorted': false,
                    'key': 'Blocked',
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
                    'key': 'Blocked'
                  },

                  'editable': false,
                  'editOptions': {},
                  'columnChooser': {}
                }
  ];
    export const TCEP_GRID_OPTIONS = {
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
    'columns': TCEP_GRID_COLUMNS
};
 export const TCEP_GRID_PAGINATION = {
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
