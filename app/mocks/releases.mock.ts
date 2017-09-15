import {ReleaseModel} from '../models/release.model';

export var RELEASES: ReleaseModel[] = [
    {
        id: '1',
        name: 'Release 1.0',
        dueDate: '22-05-2016',
        description: 'Release description!',
        status: {
            id: '1',
            name: 'Delivered',
            color: 'green',
            description: 'delivered'
        }
    },
    {
        id: '10002',
        name: 'Release 2.0',
        dueDate: '22-05-2016',
        description: 'Release description!',
        status: {
            id: '2',
            name: 'Inprogress',
            color: '#22b7a1',
            description: 'delivered'
        }
    },
    {
        id: '10003',
        name: 'Release 3.0',
        dueDate: '22-05-2016',
        description: 'Release description!',
        status: {
            id: '1',
            name: 'Inactive',
            color: '',
            description: 'delivered'
        }
    }
];

export var RELEASE_SUMMARIES = [
    {
        count: 247,
        name: 'Requirements',
        color: '#289295',
        viewAll: false,
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
    },
    {
        count: 2321,
        name: 'Test Cases',
        color: '#289295',
        viewAll: false,
        groups: [
            // {
            //     name: 'Tags',
            //     items: [
            //         {
            //             name: 'Installation',
            //             count: 24,
            //             highlightCount: true
            //         },
            //         {
            //             name: 'Security',
            //             count: 24,
            //             highlightCount: true
            //         }
            //     ]
            // },
            // {
            //     name: 'Created by',
            //     items: [
            //         {
            //             name: 'Samir',
            //             count: 24,
            //             highlightCount: false
            //         },
            //         {
            //             name: 'Dhanush',
            //             count: 24,
            //             highlightCount: false
            //         }
            //     ]
            // }
        ]
    },
    {
        count: '64%',
        name: 'Execution Progress',
        color: '#289295',
        viewAll: true,
        groups: [
            {
                name: 'Test Cycle',
                items: [
                    // {
                    //     name: 'BUT',
                    //     count: '100%',
                    //     highlightCount: false
                    // },
                    // {
                    //     name: 'Regression',
                    //     count: '0%',
                    //     highlightCount: false
                    // },
                    // {
                    //     name: 'Security',
                    //     count: '0%',
                    //     highlightCount: false
                    // }
                ]
            }
        ]
    },
    {
        count: 72,
        name: 'Defects Linked to Execution',
        color: '#289295',
        viewAll: true,
        groups: [
            // {
            //     name: '',
            //     items: [
            //         {
            //             name: 'Pro 1',
            //             count: 4,
            //             highlightCount: false
            //         },
            //         {
            //             name: 'Pro 2',
            //             count: 17,
            //             highlightCount: false
            //         },
            //         {
            //             name: 'Pro 3',
            //             count: 23,
            //             highlightCount: false
            //         },
            //         {
            //             name: 'Pro 4',
            //             count: 32,
            //             highlightCount: false
            //         }
            //     ]
            // }
        ]
    }
];

export var RELEASE_CALENDER_DATA = [{
    data: [{
            month: 'Aug',
            count: 0
        }, {
            month: 'Sep',
            count: 234
        }, {
            month: 'Oct',
            count: 345
        }, {
            month: 'Nov',
            count: 345
        }],
        name: 'Series #1'
    }, {
        data: [{
            month: 'Aug',
            count: 0
        }, {
            month: 'Sep',
            count: 267
        }, {
            month: 'Oct',
            count: 573
        }, {
            month: 'Nov',
            count: 345
        }],
        name: 'Series #2'
    }
];

export var RELEASE_REPORT_DATA =  [
    [ 1,  501],
    [ 2, 604],
    [ 3, 445],
    [ 4,   590],
    [ 5,   450],
    [ 4,   390],
    [ 5,   550]
];

export var TESTCASE_TIME_SERIES_DATA = {
  'timeSeries': [
    {
      'xItem': 'Cloning',
      'yItem': 32
    },
    {
      'xItem': 'Login',
      'yItem': 29
    },
    {
      'xItem': 'Provisioning',
      'yItem': 28
    },
    {
      'xItem': 'Testcase',
      'yItem': 28
    },
    {
      'xItem': 'Cluster',
      'yItem': 26
    },
    {
      'xItem': 'Testcase Versioning',
      'yItem': 26
    },
    {
      'xItem': 'Testcase History',
      'yItem': 26
    },
    {
      'xItem': 'Performance',
      'yItem': 24
    },
    {
      'xItem': 'Release',
      'yItem': 23
    },
    {
      'xItem': 'Trends',
      'yItem': 15
    },
    {
      'xItem': '191',
      'yItem': 13
    },
    {
      'xItem': '87',
      'yItem': 13
    },
    {
      'xItem': '102',
      'yItem': 12
    },
    {
      'xItem': '106',
      'yItem': 12
    },
    {
      'xItem': '108',
      'yItem': 11
    },
    {
      'xItem': '112',
      'yItem': 11
    },
    {
      'xItem': '178',
      'yItem': 9
    },
    {
      'xItem': '2032',
      'yItem': 6
    },
    {
      'xItem': '199',
      'yItem': 6
    },
    {
      'xItem': '182',
      'yItem': 5
    }
  ]
};
