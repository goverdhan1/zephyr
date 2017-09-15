import {I18N_MESSAGES} from '../../../../utils/messages/messages.en';

/*
 * Default request JSON that can be passed to create testcase
 * explicitly send customProperties as null to avoid 500 in case of mandatory field. [ZEPHYR-12998]
 */
export const TESTCASE_REQUEST =  {
    'tcrCatalogTreeId': null,
    'testcase': {
        'name': 'Untitled',
        'description': '',
        'isComplex': false,
        'estimatedTime': 600,
        'writerId': 0,
        'lastUpdaterId': 0,
        'oldId': 0,
        'automated': false,
        'requirementIds': [],
        'attachmentCount': 0,
        'releaseId':1,
        'automatedDefault':false,
        'customProperties': null
    }
};

export const TESTCASE_ID = 'testcase';
export const TESCASE_OPERATION_CREATE_ID = 'testcase_1';
export const TESCASE_OPERATION_CLONE_ID = 'testcase_2';
export const TESCASE_OPERATION_EDIT_ID = 'testcase_3';
export const TESCASE_OPERATION_DELETE_ID = 'testcase_4';
export const TESCASE_OPERATION_EXPORT_ID = 'testcase_5';
export const TCR_OPERATION_CREATE_ID = 'tcr_1';
export const TCR_OPERATION_CLONE_ID = 'tcr_2';
export const TCR_OPERATION_EDIT_ID = 'tcr_3';
export const TCR_OPERATION_DELETE_ID = 'tcr_4';
export const TCR_OPERATION_EXPORT_ID = 'tcr_5';
export const TCR_OPERATION_ADD_CREATE_ID = 'tcr_6';
export const TCR_MAP_ID = 'tcr_7';
export const TCE_OPERATION_EDIT_ID = 'tcr_3';
export const TCE_OPERATION_EXPORT_ID = 'tcr_5';
export const TESTCASE_SUGGESTED_FILE_NAME = 'testcaseExport_';
export const TCR_TESTCASE_SUGGESTED_FILE_NAME = 'testcaseExport_';
export const TCE_TESTCASE_SUGGESTED_FILE_NAME = 'testcaseExport_';
export const TESTCASE_OPERATION_OPTIONS = {
    'create': {
        id: TESCASE_OPERATION_CREATE_ID,
        header: I18N_MESSAGES['zephyr.button.add'],
        title: I18N_MESSAGES['zephyr.button.add']
    },
    'clone': {
        id: TESCASE_OPERATION_CLONE_ID,
        header: I18N_MESSAGES['zephyr.button.clone'],
        title: I18N_MESSAGES['zephyr.button.clone']
    },
    'edit': {
        id: TESCASE_OPERATION_EDIT_ID,
        header: I18N_MESSAGES['zephyr.button.edit'],
        title: I18N_MESSAGES['zephyr.button.edit']
    },
    'delete': {
        id: TESCASE_OPERATION_DELETE_ID,
        header: I18N_MESSAGES['zephyr.button.delete'],
        title: I18N_MESSAGES['zephyr.button.delete']
    },
    'export': {
        id: TESCASE_OPERATION_EXPORT_ID,
        header: I18N_MESSAGES['zephyr.button.export'],
        title: I18N_MESSAGES['zephyr.operation.export.title'],
        label: I18N_MESSAGES['zephyr.operation.export.testcase.label'],
        reportType: 'CUSTOM_REPORT_TYPE_TESTCASE_GRID',
        exportType: 'EXPORT_TYPE_TESTCASE',
        searchCriteria: '',
        suggestedFieldName: TESTCASE_SUGGESTED_FILE_NAME
    }
};

export const TESTCASE_EST_TIME_KEY = 'testcase.estimatedTimeToTest.VALUE';
