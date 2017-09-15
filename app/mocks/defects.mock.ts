export var OPEN_DEFECT_SUMMARIES = {
    count: 247,
    name: 'Open Defects',
    color: '#289295',
    viewAll: true,
    groups: [
      {
        name: '',
        items: [
          // {
          //     name: 'Mapped',
          //     count: 207,
          //     highlightCount: false
          // },
          // {
          //     name: 'Not Mapped',
          //     count: 37,
          //     highlightCount: false
          // }
        ]
      }
    ]
};

export var DEFECT_SUMMARIES = {
    totalDefectCount: 42,
    openDefects: {
        count: 17,
        projects: {
            'Project 1': 6,
            'Project 2': 4,
            'Project 3': 7
        }
    },
    visibleDefects: {
        count: 20,
        projects: {
            'Project 1': 6,
            'Project 2': 8,
            'Project 3': 6
        }
    },
    closedDefects: {
        count: 5,
        projects: {
            'Project 1': 1,
            'Project 2': 4,
        }
    }
};

export var DEFECT_DETAILS_ROWS = [{
    id: 'ZFJ-6',
    status: 'OPEN',
    summary: 'This is ZFJ-6',
    testCycles: [{
        id: 1,
        name: 'Regression'
    },{
        id: 2,
        name: 'Load Testing'
    }],
    testCases: [{
        id: 1670,
        name: 'Testcase 1'
    }, {
        id: 1689,
        name: 'Testcase 2'
    }, {
        id: 1933,
        name: 'Testcase 3'
    }]
}, {
    id: 'ZFJ-5',
    status: 'OPEN',
    summary: 'This is ZFJ-5',
    testCycles: [{
        id: 1,
        name: 'Regression'
    },{
        id: 2,
        name: 'Load Testing'
    }],
    testCases: [{
        id: 1670,
        name: 'Testcase 1'
    }, {
        id: 1689,
        name: 'Testcase 2'
    }, {
        id: 1933,
        name: 'Testcase 3'
    }]
}, {
    id: 'BUG-3',
    status: 'INVALID',
    summary: 'This is BUG-3',
    testCycles: [{
        id: 1,
        name: 'Regression'
    },{
        id: 2,
        name: 'Load Testing'
    }],
    testCases: [{
        id: 1670,
        name: 'Testcase 1'
    }, {
        id: 1689,
        name: 'Testcase 2'
    }, {
        id: 1933,
        name: 'Testcase 3'
    }]
}, {
    id: 'BUG-4',
    status: 'IN PROGRESS',
    summary: 'This is BUG-4',
    testCycles: [{
        id: 1,
        name: 'Regression'
    },{
        id: 2,
        name: 'Load Testing'
    }],
    testCases: [{
        id: 1670,
        name: 'Testcase 1'
    }, {
        id: 1689,
        name: 'Testcase 2'
    }, {
        id: 1933,
        name: 'Testcase 3'
    }]
}, {
    id: 'BUG-5',
    status: 'CLOSED',
    summary: 'This is BUG-5',
    testCycles: [{
        id: 1,
        name: 'Regression'
    },{
        id: 2,
        name: 'Load Testing'
    }],
    testCases: [{
        id: 1670,
        name: 'Testcase 1'
    }, {
        id: 1689,
        name: 'Testcase 2'
    }, {
        id: 1933,
        name: 'Testcase 3'
    }]
}, {
    id: 'BUG-6',
    status: 'IN PROGRESS',
    summary: 'This is BUG-6',
    testCycles: [{
        id: 1,
        name: 'Regression'
    },{
        id: 2,
        name: 'Load Testing'
    }],
    testCases: [{
        id: 1670,
        name: 'Testcase 1'
    }, {
        id: 1689,
        name: 'Testcase 2'
    }, {
        id: 1933,
        name: 'Testcase 3'
    }]
}, {
    id: 'BUG-7',
    status: 'IN PROGRESS',
    summary: 'This is BUG-7',
    testCycles: [{
        id: 1,
        name: 'Regression'
    },{
        id: 2,
        name: 'Load Testing'
    }],
    testCases: [{
        id: 1670,
        name: 'Testcase 1'
    }, {
        id: 1689,
        name: 'Testcase 2'
    }, {
        id: 1933,
        name: 'Testcase 3'
    }]
}, {
    id: 'BUG-8',
    status: 'IN PROGRESS',
    summary: 'This is BUG-8',
    testCycles: [{
        id: 1,
        name: 'Regression'
    },{
        id: 2,
        name: 'Load Testing'
    }],
    testCases: [{
        id: 1670,
        name: 'Testcase 1'
    }, {
        id: 1689,
        name: 'Testcase 2'
    }, {
        id: 1933,
        name: 'Testcase 3'
    }]
}, {
    id: 'BUG-9',
    status: 'CLOSED',
    summary: 'This is BUG-9',
    testCycles: [{
        id: 1,
        name: 'Regression'
    },{
        id: 2,
        name: 'Load Testing'
    }],
    testCases: [{
        id: 1670,
        name: 'Testcase 1'
    }, {
        id: 1689,
        name: 'Testcase 2'
    }, {
        id: 1933,
        name: 'Testcase 3'
    }]
}, {
    id: 'BUG-10',
    status: 'CLOSED',
    summary: 'This is BUG-10',
    testCycles: [{
        id: 1,
        name: 'Regression'
    },{
        id: 2,
        name: 'Load Testing'
    }],
    testCases: [{
        id: 1670,
        name: 'Testcase 1'
    }, {
        id: 1689,
        name: 'Testcase 2'
    }, {
        id: 1933,
        name: 'Testcase 3'
    }]
}, {
    id: 'BUG-11',
    status: 'CLOSED',
    summary: 'This is BUG-11',
    testCycles: [{
        id: 1,
        name: 'Regression'
    },{
        id: 2,
        name: 'Load Testing'
    }],
    testCases: [{
        id: 1670,
        name: 'Testcase 1'
    }, {
        id: 1689,
        name: 'Testcase 2'
    }, {
        id: 1933,
        name: 'Testcase 3'
    }]
}, {
    id: 'BUG-12',
    status: 'CLOSED',
    summary: 'This is BUG-12',
    testCycles: [{
        id: 1,
        name: 'Regression'
    },{
        id: 2,
        name: 'Load Testing'
    }],
    testCases: [{
        id: 1670,
        name: 'Testcase 1'
    }, {
        id: 1689,
        name: 'Testcase 2'
    }, {
        id: 1933,
        name: 'Testcase 3'
    }]
}, {
    id: 'BUG-13',
    status: 'IN PROGRESS',
    summary: 'This is BUG-13',
    testCycles: [{
        id: 1,
        name: 'Regression'
    },{
        id: 2,
        name: 'Load Testing'
    }],
    testCases: [{
        id: 1670,
        name: 'Testcase 1'
    }, {
        id: 1689,
        name: 'Testcase 2'
    }, {
        id: 1933,
        name: 'Testcase 3'
    }]
}, {
    id: 'BUG-14',
    status: 'OPEN',
    summary: 'This is BUG-14',
    testCycles: [{
        id: 1,
        name: 'Regression'
    },{
        id: 2,
        name: 'Load Testing'
    }],
    testCases: [{
        id: 1670,
        name: 'Testcase 1'
    }, {
        id: 1689,
        name: 'Testcase 2'
    }, {
        id: 1933,
        name: 'Testcase 3'
    }]
}, {
    id: 'BUG-15',
    status: 'OPEN',
    summary: 'This is BUG-15',
    testCycles: [{
        id: 1,
        name: 'Regression'
    },{
        id: 2,
        name: 'Load Testing'
    }],
    testCases: [{
        id: 1670,
        name: 'Testcase 1'
    }, {
        id: 1689,
        name: 'Testcase 2'
    }, {
        id: 1933,
        name: 'Testcase 3'
    }]
}];

export var DEFECTS_SEARCH_ROWS = [{
    id: 'ZFJ-6',
    status: 'OPEN',
    summary: 'This is ZFJ-6',
    createdOn: 1371407400000,
    assignedTo: 'admin',
    priority: 'Medium'
},
{
    id: 'ZFJ-1',
    status: 'OPEN',
    summary: 'This is ZFJ-1',
    createdOn: 1371407400000,
    assignedTo: 'admin',
    priority: 'Medium'
},
{
    id: 'ZFJ-2',
    status: 'OPEN',
    summary: 'This is ZFJ-2',
    createdOn: 1371407400000,
    assignedTo: 'admin',
    priority: 'Medium'
},
{
    id: 'ZFJ-3',
    status: 'OPEN',
    summary: 'This is ZFJ-3',
    createdOn: 1371407400000,
    assignedTo: 'admin',
    priority: 'Medium'
},
{
    id: 'ZFJ-4',
    status: 'OPEN',
    summary: 'This is ZFJ-4',
    createdOn: 1371407400000,
    assignedTo: 'admin',
    priority: 'Medium'
},
{
    id: 'ZFJ-5',
    status: 'OPEN',
    summary: 'This is ZFJ-5',
    createdOn: 1371407400000,
    assignedTo: 'admin',
    priority: 'Medium'
},
{
    id: 'ZFJ-7',
    status: 'OPEN',
    summary: 'This is ZFJ-7',
    createdOn: 1371407400000,
    assignedTo: 'admin',
    priority: 'Medium'
},
{
    id: 'ZFJ-8',
    status: 'OPEN',
    summary: 'This is ZFJ-8',
    createdOn: 1371407400000,
    assignedTo: 'admin',
    priority: 'Medium'
},
{
    id: 'ZFJ-9',
    status: 'OPEN',
    summary: 'This is ZFJ-9',
    createdOn: 1371407400000,
    assignedTo: 'admin',
    priority: 'Medium'
},
{
    id: 'ZFJ-10',
    status: 'OPEN',
    summary: 'This is ZFJ-10',
    createdOn: 1371407400000,
    assignedTo: 'admin',
    priority: 'Medium'
},
{
    id: 'ZFJ-11',
    status: 'OPEN',
    summary: 'This is ZFJ-11',
    createdOn: 1371407400000,
    assignedTo: 'admin',
    priority: 'Medium'
},
{
    id: 'ZFJ-12',
    status: 'OPEN',
    summary: 'This is ZFJ-12',
    createdOn: 1371407400000,
    assignedTo: 'admin',
    priority: 'Medium'
},
{
    id: 'ZFJ-13',
    status: 'OPEN',
    summary: 'This is ZFJ-13',
    createdOn: 1371407400000,
    assignedTo: 'admin',
    priority: 'Medium'
},
{
    id: 'ZFJ-14',
    status: 'OPEN',
    summary: 'This is ZFJ-14',
    createdOn: 1371407400000,
    assignedTo: 'admin',
    priority: 'Medium'
},
{
    id: 'ZFJ-15',
    status: 'OPEN',
    summary: 'This is ZFJ-15',
    createdOn: 1371407400000,
    assignedTo: 'admin',
    priority: 'Medium'
}];

export var FILTERS = [{
    id: 1,
    value: 'Execution filter'
}, {
    id: 2,
    value: 'Assignee filter'
}, {
    id: 3,
    value: 'Project filter'
}, {
    id: 4,
    value: 'Component filter'
}, {
    id: 5,
    value: 'Executed by filter'
}, {
    id: 6,
    value: 'Executed on filter'
}];

export var DEFECT = [{
    id: 'ZFJ-12',
    status: 'OPEN',
    summary: 'This is ZFJ-12',
    createdOn: 1371407400000,
    assignedTo: 'admin',
    priority: 'Medium'
}];

export var DEFECTS = [{
    id: 'ZFJ-8',
    status: 'OPEN',
    summary: 'This is ZFJ-8',
    createdOn: 1371407400000,
    assignedTo: 'admin',
    priority: 'Medium'
},
{
    id: 'ZFJ-9',
    status: 'OPEN',
    summary: 'This is ZFJ-9',
    createdOn: 1371407400000,
    assignedTo: 'admin',
    priority: 'Medium'
},
{
    id: 'ZFJ-10',
    status: 'OPEN',
    summary: 'This is ZFJ-10',
    createdOn: 1371407400000,
    assignedTo: 'admin',
    priority: 'Medium'
},
{
    id: 'ZFJ-11',
    status: 'OPEN',
    summary: 'This is ZFJ-11',
    createdOn: 1371407400000,
    assignedTo: 'admin',
    priority: 'Medium'
}];

export var FILTERED_DEFECTS = [{
    id: 'ZFJ-9',
    status: 'OPEN',
    summary: 'This is ZFJ-9',
    createdOn: 1371407400000,
    assignedTo: 'admin',
    priority: 'Medium'
},
{
    id: 'ZFJ-10',
    status: 'OPEN',
    summary: 'This is ZFJ-10',
    createdOn: 1371407400000,
    assignedTo: 'admin',
    priority: 'Medium'
}];

export var CURRENTLY_LINKED_DEFECTS = [{
    id: 'ZFJ-9',
    status: 'OPEN',
    summary: 'This is ZFJ-9',
    priority: 'Medium'
},
{
    id: 'ZFJ-10',
    status: 'OPEN',
    summary: 'This is ZFJ-10',
    priority: 'Medium'
},
{
    id: 'ZFJ-11',
    status: 'OPEN',
    summary: 'This is ZFJ-11',
    priority: 'Medium'
},
{
    id: 'ZFJ-12',
    status: 'OPEN',
    summary: 'This is ZFJ-12',
    priority: 'Medium'
},
{
    id: 'ZFJ-13',
    status: 'OPEN',
    summary: 'This is ZFJ-13',
    priority: 'Medium'
},
{
    id: 'ZFJ-14',
    status: 'OPEN',
    summary: 'This is ZFJ-14',
    priority: 'Medium'
},
{
    id: 'ZFJ-15',
    status: 'OPEN',
    summary: 'This is ZFJ-15',
    priority: 'Medium'
},
{
    id: 'ZFJ-16',
    status: 'OPEN',
    summary: 'This is ZFJ-16',
    priority: 'Medium'
}];

export var DEFECTS_TO_LINK = [{
    id: 'ZFJ-18',
    status: 'OPEN',
    summary: 'This is ZFJ-18',
    priority: 'Medium'
},
{
    id: 'ZFJ-19',
    status: 'OPEN',
    summary: 'This is ZFJ-19',
    priority: 'Medium'
},
{
    id: 'ZFJ-20',
    status: 'OPEN',
    summary: 'This is ZFJ-20',
    priority: 'Medium'
},
{
    id: 'ZFJ-21',
    status: 'OPEN',
    summary: 'This is ZFJ-21',
    priority: 'Medium'
},
{
    id: 'ZFJ-22',
    status: 'OPEN',
    summary: 'This is ZFJ-22',
    priority: 'Medium'
},
{
    id: 'ZFJ-23',
    status: 'OPEN',
    summary: 'This is ZFJ-23',
    priority: 'Medium'
},
{
    id: 'ZFJ-24',
    status: 'OPEN',
    summary: 'This is ZFJ-24',
    priority: 'Medium'
},
{
    id: 'ZFJ-25',
    status: 'OPEN',
    summary: 'This is ZFJ-25',
    priority: 'Medium'
},
{
    id: 'ZFJ-26',
    status: 'OPEN',
    summary: 'This is ZFJ-26',
    priority: 'Medium'
},
{
    id: 'ZFJ-27',
    status: 'OPEN',
    summary: 'This is ZFJ-27',
    priority: 'Medium'
},
{
    id: 'ZFJ-28',
    status: 'OPEN',
    summary: 'This is ZFJ-28',
    priority: 'Medium'
},
{
    id: 'ZFJ-29',
    status: 'OPEN',
    summary: 'This is ZFJ-29',
    priority: 'Medium'
},
{
    id: 'ZFJ-30',
    status: 'OPEN',
    summary: 'This is ZFJ-30',
    priority: 'Medium'
},
{
    id: 'ZFJ-31',
    status: 'OPEN',
    summary: 'This is ZFJ-31',
    priority: 'Medium'
},
{
    id: 'ZFJ-32',
    status: 'OPEN',
    summary: 'This is ZFJ-32',
    priority: 'Medium'
},
{
    id: 'ZFJ-33',
    status: 'OPEN',
    summary: 'This is ZFJ-33',
    priority: 'Medium'
},
{
    id: 'ZFJ-34',
    status: 'OPEN',
    summary: 'This is ZFJ-34',
    priority: 'Medium'
},
{
    id: 'ZFJ-35',
    status: 'OPEN',
    summary: 'This is ZFJ-35',
    priority: 'Medium'
}];

export var JQL_FIELDS = [{
        'indexName':'projectId',
        'fieldName':'project',
        'displayName':'Project',
        'i18NName':'Project',
        'supportedOperators':[
            'not in',
            'in',
            'is',
            '!=',
            'is not',
            '='
        ],
        'dataType':'Long',
        'selectionType':'MultiSelect',
        'isDefault':true,
        'visible':true,
        'orderId':1,
        'auto':true,
        'isBasicField':true,
        'searchable':true,
        'orderable':true,
        'supportedOperatorClasses':[
            'EQUALS',
            'NOT_EQUALS',
            'IN',
            'NOT_IN',
            'IS',
            'IS_NOT'
        ]
    },
    {
        'indexName':'priorityId',
        'fieldName':'priority',
        'displayName':'Priority',
        'i18NName':'Priority',
        'supportedOperators':[
            'not in',
            'in',
            'is',
            '!=',
            'is not',
            '='
        ],
        'dataType':'Long',
        'selectionType':'MultiSelect',
        'isDefault':true,
        'visible':true,
        'orderId':7,
        'auto':true,
        'isBasicField':true,
        'searchable':true,
        'orderable':true,
        'supportedOperatorClasses':[
            'EQUALS',
            'NOT_EQUALS',
            'IN',
            'NOT_IN',
            'IS',
            'IS_NOT'
        ]
    },
    {
        'indexName':'cycleId',
        'fieldName':'cycleName',
        'displayName':'Cycle Name',
        'i18NName':'Cycle Name',
        'supportedOperators':[
            'not in',
            'in',
            'is',
            '!=',
            'is not',
            '!~',
            '=',
            '~'
        ],
        'dataType':'String',
        'selectionType':'MultiSelect',
        'isDefault':true,
        'visible':true,
        'orderId':3,
        'auto':true,
        'isBasicField':true,
        'searchable':true,
        'orderable':true,
        'supportedOperatorClasses':[
            'LIKE',
            'NOT_LIKE',
            'EQUALS',
            'NOT_EQUALS',
            'IN',
            'NOT_IN',
            'IS',
            'IS_NOT'
        ]
    },
    {
        'indexName':'status',
        'fieldName':'executionStatus',
        'displayName':'Execution Status',
        'i18NName':'Execution Status',
        'supportedOperators':[
            'not in',
            'in',
            'is',
            '!=',
            'is not',
            '='
        ],
        'dataType':'String',
        'selectionType':'MultiSelect',
        'isDefault':true,
        'visible':true,
        'orderId':4,
        'auto':true,
        'isBasicField':true,
        'searchable':true,
        'orderable':true,
        'supportedOperatorClasses':[
            'EQUALS',
            'NOT_EQUALS',
            'IN',
            'NOT_IN',
            'IS',
            'IS_NOT'
        ]
    },
    {
        'indexName':'versionId',
        'fieldName':'fixVersion',
        'displayName':'Fix Version',
        'i18NName':'Fix Version',
        'supportedOperators':[
            'not in',
            'in',
            'is',
            '!=',
            'is not',
            '='
        ],
        'dataType':'Long',
        'selectionType':'MultiSelect',
        'isDefault':true,
        'visible':true,
        'orderId':2,
        'auto':true,
        'isBasicField':true,
        'searchable':true,
        'orderable':true,
        'supportedOperatorClasses':[
            'IS',
            'EQUALS',
            'NOT_EQUALS',
            'IN',
            'IS_NOT',
            'NOT_IN'
        ]
    },
    {
        'indexName':'executor',
        'fieldName':'executedBy',
        'displayName':'Executed By',
        'i18NName':'Executed By',
        'supportedOperators':[
            'not in',
            'in',
            'is',
            '!=',
            'is not',
            '='
        ],
        'dataType':'String',
        'selectionType':'MultiSelect',
        'isDefault':true,
        'visible':true,
        'orderId':5,
        'auto':true,
        'isBasicField':true,
        'searchable':true,
        'orderable':true,
        'supportedOperatorClasses':[
            'EQUALS',
            'NOT_EQUALS',
            'IN',
            'NOT_IN',
            'IS',
            'IS_NOT'
        ]
    },
    {
        'indexName':'executedOn',
        'fieldName':'executionDate',
        'displayName':'Executed On',
        'i18NName':'Executed On',
        'supportedOperators':[
            '<=',
            'not in',
            'in',
            'is',
            '!=',
            'is not',
            '<',
            '=',
            '>',
            '>='
        ],
        'dataType':'Date',
        'selectionType':'Range',
        'isDefault':true,
        'visible':true,
        'orderId':6,
        'auto':false,
        'isBasicField':true,
        'searchable':true,
        'orderable':true,
        'supportedOperatorClasses':[
            'EQUALS',
            'NOT_EQUALS',
            'IN',
            'NOT_IN',
            'IS',
            'IS_NOT',
            'LESS_THAN',
            'LESS_THAN_EQUALS',
            'GREATER_THAN',
            'GREATER_THAN_EQUALS'
        ]
    },
    {
        'indexName':'creationDate',
        'fieldName':'creationDate',
        'displayName':'Creation Date',
        'i18NName':'Creation Date',
        'supportedOperators':[
            '<=',
            'not in',
            'in',
            'is',
            '!=',
            'is not',
            '<',
            '=',
            '>',
            '>='
        ],
        'dataType':'Date',
        'selectionType':'Range',
        'isDefault':false,
        'visible':false,
        'orderId':8,
        'auto':false,
        'isBasicField':true,
        'searchable':true,
        'orderable':true,
        'supportedOperatorClasses':[
            'EQUALS',
            'NOT_EQUALS',
            'IN',
            'NOT_IN',
            'IS',
            'IS_NOT',
            'LESS_THAN',
            'LESS_THAN_EQUALS',
            'GREATER_THAN',
            'GREATER_THAN_EQUALS'
        ]
    },
    {
        'indexName':'componentId',
        'fieldName':'component',
        'displayName':'Component',
        'i18NName':'Component',
        'supportedOperators':[
            'not in',
            'in',
            'is',
            '!=',
            'is not',
            '='
        ],
        'dataType':'Long',
        'selectionType':'MultiSelect',
        'isDefault':false,
        'visible':false,
        'orderId':9,
        'auto':true,
        'isBasicField':true,
        'searchable':true,
        'orderable':true,
        'supportedOperatorClasses':[
            'EQUALS',
            'NOT_EQUALS',
            'IN',
            'NOT_IN',
            'IS',
            'IS_NOT'
        ]
    },
    {
        'indexName':'issueId',
        'fieldName':'issue',
        'displayName':'Issue',
        'i18NName':'Issue Key',
        'supportedOperators':[
            '<=',
            'not in',
            'in',
            '!=',
            '<',
            '=',
            '>',
            '>='
        ],
        'dataType':'Long',
        'selectionType':'MultiSelect',
        'isDefault':false,
        'visible':true,
        'orderId':10,
        'auto':false,
        'isBasicField':false,
        'searchable':true,
        'orderable':true,
        'supportedOperatorClasses':[
            'EQUALS',
            'NOT_EQUALS',
            'IN',
            'NOT_IN',
            'LESS_THAN',
            'LESS_THAN_EQUALS',
            'GREATER_THAN',
            'GREATER_THAN_EQUALS'
        ]
    }
];

export var ISSUE_METADATA = {
	'issuetype': {
		'required': true,
		'schema': {
			'type': 'issuetype',
			'system': 'issuetype'
		},
		'name': 'Issue Type',
		'key': 'issuetype',
		'hasDefaultValue': false,
		'operations': [],
		'allowedValues': [{
			'self': 'https://jiralocal11.atlassian.net/rest/api/2/issuetype/10003',
			'id': '10003',
			'description': 'A problem which impairs or prevents the functions of the product.',
			'iconUrl': 'https://jiralocal11.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10303&avatarType=issuetype',
			'name': 'Bug',
			'subtask': false,
			'avatarId': 10303
		}]
	},
	'components': {
		'required': false,
		'schema': {
			'type': 'array',
			'items': 'component',
			'system': 'components'
		},
		'name': 'Component/s',
		'key': 'components',
		'hasDefaultValue': false,
		'operations': ['add', 'set', 'remove'],
		'allowedValues': []
	},
	'description': {
		'required': false,
		'schema': {
			'type': 'string',
			'system': 'description'
		},
		'name': 'Description',
		'key': 'description',
		'hasDefaultValue': false,
		'operations': ['set']
	},
	'project': {
		'required': true,
		'schema': {
			'type': 'project',
			'system': 'project'
		},
		'name': 'Project',
		'key': 'project',
		'hasDefaultValue': false,
		'operations': ['set'],
		'allowedValues': [{
			'self': 'https://jiralocal11.atlassian.net/rest/api/2/project/10100',
			'id': '10100',
			'key': 'BB',
			'name': 'BB',
			'avatarUrls': {
				'48x48': 'https://jiralocal11.atlassian.net/secure/projectavatar?avatarId=10324',
				'24x24': 'https://jiralocal11.atlassian.net/secure/projectavatar?size=small&avatarId=10324',
				'16x16': 'https://jiralocal11.atlassian.net/secure/projectavatar?size=xsmall&avatarId=10324',
				'32x32': 'https://jiralocal11.atlassian.net/secure/projectavatar?size=medium&avatarId=10324'
			}
		}]
	},
	'fixVersions': {
		'required': false,
		'schema': {
			'type': 'array',
			'items': 'version',
			'system': 'fixVersions'
		},
		'name': 'Fix Version/s',
		'key': 'fixVersions',
		'hasDefaultValue': false,
		'operations': ['set', 'add', 'remove'],
		'allowedValues': [{
			'self': 'https://jiralocal11.atlassian.net/rest/api/2/version/10000',
			'id': '10000',
			'description': 'dfgfg',
			'name': 'v1',
			'archived': false,
			'released': false,
			'projectId': 10100
		}, {
			'self': 'https://jiralocal11.atlassian.net/rest/api/2/version/10001',
			'id': '10001',
			'description': 'fdgfg',
			'name': 'v2',
			'archived': false,
			'released': false,
			'projectId': 10100
		}, {
			'self': 'https://jiralocal11.atlassian.net/rest/api/2/version/10002',
			'id': '10002',
			'description': 'fdg',
			'name': 'v3',
			'archived': false,
			'released': false,
			'projectId': 10100
		}, {
			'self': 'https://jiralocal11.atlassian.net/rest/api/2/version/10003',
			'id': '10003',
			'description': 'fdgdfg',
			'name': 'v4',
			'archived': false,
			'released': false,
			'projectId': 10100
		}, {
			'self': 'https://jiralocal11.atlassian.net/rest/api/2/version/10004',
			'id': '10004',
			'description': 'dfgdfg',
			'name': 'v5',
			'archived': false,
			'released': false,
			'projectId': 10100
		}]
	},
	'customfield_10210': {
		'required': false,
		'schema': {
			'type': 'version',
			'custom': 'com.atlassian.jira.plugin.system.customfieldtypes:version',
			'customId': 10210
		},
		'name': 'version picker _single version',
		'key': 'customfield_10210',
		'hasDefaultValue': false,
		'operations': ['set'],
		'allowedValues': [{
			'self': 'https://jiralocal11.atlassian.net/rest/api/2/version/10000',
			'id': '10000',
			'description': 'dfgfg',
			'name': 'v1',
			'archived': false,
			'released': false
		}, {
			'self': 'https://jiralocal11.atlassian.net/rest/api/2/version/10001',
			'id': '10001',
			'description': 'fdgfg',
			'name': 'v2',
			'archived': false,
			'released': false
		}, {
			'self': 'https://jiralocal11.atlassian.net/rest/api/2/version/10002',
			'id': '10002',
			'description': 'fdg',
			'name': 'v3',
			'archived': false,
			'released': false
		}, {
			'self': 'https://jiralocal11.atlassian.net/rest/api/2/version/10003',
			'id': '10003',
			'description': 'fdgdfg',
			'name': 'v4',
			'archived': false,
			'released': false
		}, {
			'self': 'https://jiralocal11.atlassian.net/rest/api/2/version/10004',
			'id': '10004',
			'description': 'dfgdfg',
			'name': 'v5',
			'archived': false,
			'released': false
		}]
	},
	'customfield_10211': {
		'required': false,
		'schema': {
			'type': 'string',
			'custom': 'com.atlassian.jira.plugin.system.customfieldtypes:readonlyfield',
			'customId': 10211
		},
		'name': 'text field (read only)',
		'key': 'customfield_10211',
		'hasDefaultValue': false,
		'operations': ['set']
	},
	'customfield_10212': {
		'required': false,
		'schema': {
			'type': 'datetime',
			'custom': 'com.atlassian.jira.plugin.system.customfieldtypes:datetime',
			'customId': 10212
		},
		'name': 'date time picker',
		'key': 'customfield_10212',
		'hasDefaultValue': false,
		'operations': ['set']
	},
	'customfield_10213': {
		'required': false,
		'schema': {
			'type': 'array',
			'items': 'string',
			'custom': 'com.atlassian.jira.plugin.system.customfieldtypes:labels',
			'customId': 10213
		},
		'name': 'labels',
		'key': 'customfield_10213',
		'autoCompleteUrl': 'https://jiralocal11.atlassian.net/rest/api/1.0/labels/null/suggest?customFieldId=10213&query=',
		'hasDefaultValue': false,
		'operations': ['add', 'set', 'remove']
	},
	'customfield_10203': {
		'required': false,
		'schema': {
			'type': 'option',
			'custom': 'com.atlassian.jira.plugin.system.customfieldtypes:radiobuttons',
			'customId': 10203
		},
		'name': 'radio button',
		'key': 'customfield_10203',
		'hasDefaultValue': false,
		'operations': ['set'],
		'allowedValues': [{
			'self': 'https://jiralocal11.atlassian.net/rest/api/2/customFieldOption/10104',
			'value': 'button 1',
			'id': '10104'
		}, {
			'self': 'https://jiralocal11.atlassian.net/rest/api/2/customFieldOption/10105',
			'value': '@@@@button 2',
			'id': '10105'
		}, {
			'self': 'https://jiralocal11.atlassian.net/rest/api/2/customFieldOption/10106',
			'value': 'button 3_ 12345678',
			'id': '10106'
		}]
	},
	'customfield_10127': {
		'required': false,
		'schema': {
			'type': 'array',
			'items': 'string',
			'custom': 'com.pyxis.greenhopper.jira:gh-sprint',
			'customId': 10127
		},
		'name': 'Sprint',
		'key': 'customfield_10127',
		'hasDefaultValue': false,
		'operations': ['set']
	},
	'customfield_10204': {
		'required': false,
		'schema': {
			'type': 'array',
			'items': 'option',
			'custom': 'com.atlassian.jira.plugin.system.customfieldtypes:multiselect',
			'customId': 10204
		},
		'name': 'single list(multiple choice)',
		'key': 'customfield_10204',
		'hasDefaultValue': false,
		'operations': ['add', 'set', 'remove'],
		'allowedValues': [{
			'self': 'https://jiralocal11.atlassian.net/rest/api/2/customFieldOption/10107',
			'value': 'new select 1',
			'id': '10107'
		}, {
			'self': 'https://jiralocal11.atlassian.net/rest/api/2/customFieldOption/10108',
			'value': 'new select 2_!@#$%^&*(',
			'id': '10108'
		}, {
			'self': 'https://jiralocal11.atlassian.net/rest/api/2/customFieldOption/10109',
			'value': 'new select 3_23456789',
			'id': '10109'
		}]
	},
	'customfield_10205': {
		'required': false,
		'schema': {
			'type': 'option',
			'custom': 'com.atlassian.jira.plugin.system.customfieldtypes:select',
			'customId': 10205
		},
		'name': 'single list _ single choice',
		'key': 'customfield_10205',
		'hasDefaultValue': false,
		'operations': ['set'],
		'allowedValues': [{
			'self': 'https://jiralocal11.atlassian.net/rest/api/2/customFieldOption/10110',
			'value': '123456789',
			'id': '10110'
		}, {
			'self': 'https://jiralocal11.atlassian.net/rest/api/2/customFieldOption/10111',
			'value': '@!#$%^&*(',
			'id': '10111'
		}, {
			'self': 'https://jiralocal11.atlassian.net/rest/api/2/customFieldOption/10112',
			'value': 'ASDFGHJKL',
			'id': '10112'
		}]
	},
	'customfield_10206': {
		'required': false,
		'schema': {
			'type': 'string',
			'custom': 'com.atlassian.jira.plugin.system.customfieldtypes:textarea',
			'customId': 10206
		},
		'name': 'free_text field',
		'key': 'customfield_10206',
		'hasDefaultValue': false,
		'operations': ['set']
	},
	'attachment': {
		'required': false,
		'schema': {
			'type': 'array',
			'items': 'attachment',
			'system': 'attachment'
		},
		'name': 'Attachment',
		'key': 'attachment',
		'hasDefaultValue': false,
		'operations': []
	},
	'customfield_10207': {
		'required': false,
		'schema': {
			'type': 'string',
			'custom': 'com.atlassian.jira.plugin.system.customfieldtypes:url',
			'customId': 10207
		},
		'name': 'URL field',
		'key': 'customfield_10207',
		'hasDefaultValue': false,
		'operations': ['set']
	},
	'customfield_10208': {
		'required': false,
		'schema': {
			'type': 'user',
			'custom': 'com.atlassian.jira.plugin.system.customfieldtypes:userpicker',
			'customId': 10208
		},
		'name': 'user picker (single)',
		'key': 'customfield_10208',
		'autoCompleteUrl': 'https://jiralocal11.atlassian.net/rest/api/1.0/users/picker?fieldName=customfield_10208&query=',
		'hasDefaultValue': false,
		'operations': ['set']
	},
	'customfield_10209': {
		'required': false,
		'schema': {
			'type': 'array',
			'items': 'version',
			'custom': 'com.atlassian.jira.plugin.system.customfieldtypes:multiversion',
			'customId': 10209
		},
		'name': 'version picker (multiple version)',
		'key': 'customfield_10209',
		'hasDefaultValue': false,
		'operations': ['set', 'add', 'remove'],
		'allowedValues': [{
			'self': 'https://jiralocal11.atlassian.net/rest/api/2/version/10000',
			'id': '10000',
			'description': 'dfgfg',
			'name': 'v1',
			'archived': false,
			'released': false
		}, {
			'self': 'https://jiralocal11.atlassian.net/rest/api/2/version/10001',
			'id': '10001',
			'description': 'fdgfg',
			'name': 'v2',
			'archived': false,
			'released': false
		}, {
			'self': 'https://jiralocal11.atlassian.net/rest/api/2/version/10002',
			'id': '10002',
			'description': 'fdg',
			'name': 'v3',
			'archived': false,
			'released': false
		}, {
			'self': 'https://jiralocal11.atlassian.net/rest/api/2/version/10003',
			'id': '10003',
			'description': 'fdgdfg',
			'name': 'v4',
			'archived': false,
			'released': false
		}, {
			'self': 'https://jiralocal11.atlassian.net/rest/api/2/version/10004',
			'id': '10004',
			'description': 'dfgdfg',
			'name': 'v5',
			'archived': false,
			'released': false
		}]
	},
	'summary': {
		'required': true,
		'schema': {
			'type': 'string',
			'system': 'summary'
		},
		'name': 'Summary',
		'key': 'summary',
		'hasDefaultValue': false,
		'operations': ['set']
	},
	'reporter': {
		'required': true,
		'schema': {
			'type': 'user',
			'system': 'reporter'
		},
		'name': 'Reporter',
		'key': 'reporter',
		'autoCompleteUrl': 'https://jiralocal11.atlassian.net/rest/api/latest/user/search?username=',
		'hasDefaultValue': false,
		'operations': ['set']
	},
	'priority': {
		'required': false,
		'schema': {
			'type': 'priority',
			'system': 'priority'
		},
		'name': 'Priority',
		'key': 'priority',
		'hasDefaultValue': true,
		'operations': ['set'],
		'allowedValues': [{
			'self': 'https://jiralocal11.atlassian.net/rest/api/2/priority/1',
			'iconUrl': 'https://jiralocal11.atlassian.net/images/icons/priorities/highest.svg',
			'name': 'Highest',
			'id': '1'
		}, {
			'self': 'https://jiralocal11.atlassian.net/rest/api/2/priority/2',
			'iconUrl': 'https://jiralocal11.atlassian.net/images/icons/priorities/high.svg',
			'name': 'High',
			'id': '2'
		}, {
			'self': 'https://jiralocal11.atlassian.net/rest/api/2/priority/3',
			'iconUrl': 'https://jiralocal11.atlassian.net/images/icons/priorities/medium.svg',
			'name': 'Medium',
			'id': '3'
		}, {
			'self': 'https://jiralocal11.atlassian.net/rest/api/2/priority/4',
			'iconUrl': 'https://jiralocal11.atlassian.net/images/icons/priorities/low.svg',
			'name': 'Low',
			'id': '4'
		}, {
			'self': 'https://jiralocal11.atlassian.net/rest/api/2/priority/5',
			'iconUrl': 'https://jiralocal11.atlassian.net/images/icons/priorities/lowest.svg',
			'name': 'Lowest',
			'id': '5'
		}]
	},
	'customfield_10123': {
		'required': false,
		'schema': {
			'type': 'any',
			'custom': 'com.pyxis.greenhopper.jira:gh-epic-link',
			'customId': 10123
		},
		'name': 'Epic Link',
		'key': 'customfield_10123',
		'hasDefaultValue': false,
		'operations': ['set']
	},
	'customfield_10200': {
		'required': false,
		'schema': {
			'type': 'array',
			'items': 'option',
			'custom': 'com.atlassian.jira.plugin.system.customfieldtypes:multicheckboxes',
			'customId': 10200
		},
		'name': 'Multiple Checkbox',
		'key': 'customfield_10200',
		'hasDefaultValue': false,
		'operations': ['add', 'set', 'remove'],
		'allowedValues': [{
			'self': 'https://jiralocal11.atlassian.net/rest/api/2/customFieldOption/10100',
			'value': '1234567890',
			'id': '10100'
		}, {
			'self': 'https://jiralocal11.atlassian.net/rest/api/2/customFieldOption/10101',
			'value': 'checkbox1',
			'id': '10101'
		}, {
			'self': 'https://jiralocal11.atlassian.net/rest/api/2/customFieldOption/10102',
			'value': 'checbox!@#$%^&*()',
			'id': '10102'
		}, {
			'self': 'https://jiralocal11.atlassian.net/rest/api/2/customFieldOption/10103',
			'value': 'CHECKBOX CAPS',
			'id': '10103'
		}]
	},
	'customfield_10201': {
		'required': false,
		'schema': {
			'type': 'date',
			'custom': 'com.atlassian.jira.plugin.system.customfieldtypes:datepicker',
			'customId': 10201
		},
		'name': 'date picker',
		'key': 'customfield_10201',
		'hasDefaultValue': false,
		'operations': ['set']
	},
	'labels': {
		'required': false,
		'schema': {
			'type': 'array',
			'items': 'string',
			'system': 'labels'
		},
		'name': 'Labels',
		'key': 'labels',
		'autoCompleteUrl': 'https://jiralocal11.atlassian.net/rest/api/1.0/labels/suggest?query=',
		'hasDefaultValue': false,
		'operations': ['add', 'set', 'remove']
	},
	'customfield_10202': {
		'required': false,
		'schema': {
			'type': 'number',
			'custom': 'com.atlassian.jira.plugin.system.customfieldtypes:float',
			'customId': 10202
		},
		'name': 'number field',
		'key': 'customfield_10202',
		'hasDefaultValue': false,
		'operations': ['set']
	},
	'customfield_10214': {
		'required': false,
		'schema': {
			'type': 'string',
			'custom': 'com.atlassian.jira.plugin.system.customfieldtypes:textfield',
			'customId': 10214
		},
		'name': 'Text field (single line)',
		'key': 'customfield_10214',
		'hasDefaultValue': false,
		'operations': ['set']
	},
	'customfield_10215': {
		'required': false,
		'schema': {
			'type': 'array',
			'items': 'user',
			'custom': 'com.atlassian.jira.plugin.system.customfieldtypes:multiuserpicker',
			'customId': 10215
		},
		'name': 'user picker (Multiple user)',
		'key': 'customfield_10215',
		'autoCompleteUrl': 'https://jiralocal11.atlassian.net/rest/api/1.0/users/picker?fieldName=customfield_10215&query=',
		'hasDefaultValue': false,
		'operations': ['add', 'set', 'remove']
	},
	'environment': {
		'required': false,
		'schema': {
			'type': 'string',
			'system': 'environment'
		},
		'name': 'Environment',
		'key': 'environment',
		'hasDefaultValue': false,
		'operations': ['set']
	},
	'versions': {
		'required': false,
		'schema': {
			'type': 'array',
			'items': 'version',
			'system': 'versions'
		},
		'name': 'Affects Version/s',
		'key': 'versions',
		'hasDefaultValue': false,
		'operations': ['set', 'add', 'remove'],
		'allowedValues': [{
			'self': 'https://jiralocal11.atlassian.net/rest/api/2/version/10000',
			'id': '10000',
			'description': 'dfgfg',
			'name': 'v1',
			'archived': false,
			'released': false,
			'projectId': 10100
		}, {
			'self': 'https://jiralocal11.atlassian.net/rest/api/2/version/10001',
			'id': '10001',
			'description': 'fdgfg',
			'name': 'v2',
			'archived': false,
			'released': false,
			'projectId': 10100
		}, {
			'self': 'https://jiralocal11.atlassian.net/rest/api/2/version/10002',
			'id': '10002',
			'description': 'fdg',
			'name': 'v3',
			'archived': false,
			'released': false,
			'projectId': 10100
		}, {
			'self': 'https://jiralocal11.atlassian.net/rest/api/2/version/10003',
			'id': '10003',
			'description': 'fdgdfg',
			'name': 'v4',
			'archived': false,
			'released': false,
			'projectId': 10100
		}, {
			'self': 'https://jiralocal11.atlassian.net/rest/api/2/version/10004',
			'id': '10004',
			'description': 'dfgdfg',
			'name': 'v5',
			'archived': false,
			'released': false,
			'projectId': 10100
		}]
	},
	'issuelinks': {
		'required': false,
		'schema': {
			'type': 'array',
			'items': 'issuelinks',
			'system': 'issuelinks'
		},
		'name': 'Linked Issues',
		'key': 'issuelinks',
		'autoCompleteUrl': 'https://jiralocal11.atlassian.net/rest/api/2/issue/picker?'+
            'currentProjectId=&showSubTaskParent=true&showSubTasks=true&currentIssueKey=null&query=',
		'hasDefaultValue': false,
		'operations': ['add']
	},
	'assignee': {
		'required': false,
		'schema': {
			'type': 'user',
			'system': 'assignee'
		},
		'name': 'Assignee',
		'key': 'assignee',
		'autoCompleteUrl': 'https://jiralocal11.atlassian.net/rest/api/latest/user/assignable/search?project=BB&username=',
		'hasDefaultValue': false,
		'operations': ['set']
	}
};

