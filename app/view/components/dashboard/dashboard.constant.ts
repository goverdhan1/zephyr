import {ReleaseStatusRequirementsGadgetComponent} from './gadgets/release_status_requirements/release_status_requirements.component';

export const BLANK_DASHBOARD_ID = -1;
export const GADGET_COLUMN_WIDTH_1 = 1;
export const GADGET_COLUMN_WIDTH_2 = 2;
export const GADGET_COLUMN_WIDTH_3 = 3;
export const DASHBOARD_LAYOUT_ONE_COLUMN = 1;
export const DASHBOARD_LAYOUT_TWO_COLUMN = 2;
export const DASHBOARD_LAYOUT_THREE_COLUMN = 3;
// export const DASHBOARD_LAYOUT_FREE_COLUMN = 4;

export const DASHBOARD_GADGET_INITIAL_STATE = {
    id: '',
    name: '',
    description: '',
    component: '',
    createdOn: null,
    properties: {
        component: {
          name : ''
        },
        settings: {
          editableUsers: [],
          pin: false,
          minimize: false,
          editable: true,
          editMode: true
        },
        config: {

        }
    }
};

export const DASHBOARD_INITIAL_STATE = {
    // id: 'dashboard-',
    name: '',
    description: '',
    // creatorId: null,
    createdOn: null,
    properties: {
        settings: {
            sharedUsers: [],
            favorite: true,
            selected: true,
            draggable: true,
            editable: true
        },
        style: {
            layout: DASHBOARD_LAYOUT_ONE_COLUMN
        }
    },
    gadgets: []
};

export const DASHBOARDS_INITIAL_STATE = {
    rows: [],
    currentPage: 1,
    isPaginationRequired: true,
    size: 10,
    totalCount: 0,
    isLastPage: true,
    isFirstPage: true,
    offset: 0
};

export const DASHBOARD_GADGETS_MAPPING = {
    'ReleaseStatusRequirementsGadgetComponent' : ReleaseStatusRequirementsGadgetComponent
};

export const DASHBOARD_PREDEFINED_GADGETS = [
    {
        id: 'gadget_1',
        name: 'Release Status - Requirements',
        description: 'Release Status details with requirements metrics',
        componentName: 'ReleaseStatusRequirementsGadgetComponent',
        params: {
            entityType: 'testcase',
            searchText: '',
            searchOffset: 0
        }
    }
    // {
    //     id: 'gadget_2',
    //     name: 'Test Case Distribution By User',
    //     description: 'Test Case Distribution By Phase chart view',
    //     componentName: 'TestCaseDistByPhaseComponent',
    //     params: {
    //         releaseId: null,
    //         releaseName: '',
    //         projectId: null,
    //         projectName: '',
    //         chartKey: 'P1',
    //         chartType: 'pie',
    //         searchString: ''
    //     }
    // },
    // {
    //     id: 'gadget_3',
    //     name: 'Test Case Distribution By Phase',
    //     description: 'Test Case Distribution By Phase chart view',
    //     componentName: 'TestCaseDistByPhaseComponent',
    //     params: {
    //         releaseId: null,
    //         releaseName: '',
    //         projectId: null,
    //         projectName: '',
    //         chartKey: 'P2',
    //         chartType: 'pie',
    //         searchString: ''
    //     }
    // }
];

export const DASHBOARD_LAYOUT_GADGETS_CLASS = {};
DASHBOARD_LAYOUT_GADGETS_CLASS[DASHBOARD_LAYOUT_ONE_COLUMN] = 'col-xs-12';
DASHBOARD_LAYOUT_GADGETS_CLASS[DASHBOARD_LAYOUT_TWO_COLUMN] = 'col-xs-6';
DASHBOARD_LAYOUT_GADGETS_CLASS[DASHBOARD_LAYOUT_THREE_COLUMN] = 'col-xs-4';
