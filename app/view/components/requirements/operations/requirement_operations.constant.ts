import {I18N_MESSAGES} from '../../../../utils/messages/messages.en';

export const REQ_OPERATION_CREATE_ID = 'requirement_1';
export const REQ_OPERATION_CLONE_ID = 'requirement_2';
export const REQ_OPERATION_EXPORT_ID = 'requirement_3';
export const REQ_OPERATION_DELETE_ID = 'requirement_4';
export const REQ_OPERATION_ALLOCATE_ID = 'requirement_9';

export const REQ_OPERATION_CREATE_ID_DETAIL = 'requirement_5';
export const REQ_OPERATION_CLONE_ID_DETAIL = 'requirement_6';
export const REQ_OPERATION_EXPORT_ID_DETAIL = 'requirement_7';
export const REQ_OPERATION_DELETE_ID_DETAIL = 'requirement_8';

export const REQ_REQUIREMENT_SUGGESTED_FILE_NAME = 'requirementExport_';

/*
 * Default request JSON that can be passed to create requirements
 */
export const REQUIREMENT_REQUEST =  {
    'requirementTreeId': 3,
    'name': 'Untitled requirement',
    'details': 'requirement details',
    'createdBy': 1,
    'lastModifiedBy': 1,
    'requirementType': 0,
    'testcaseIds': [],
    'releaseIds': [1],
    'customProperties': null
};

export const REQ_OPERATION_OPTIONS = {
    'import': {
        id: 'requirement',
        header: I18N_MESSAGES['zephyr.import.requirement.header'],
        message:  'Valid Requirement Value',
        instructionsDesc: I18N_MESSAGES['zephyr.import.instructions.requirement.description'],
        type: 'requirement'
    }
};

export const REQ_OPERATION_CONSTANTS = {
    'create': {
        id: REQ_OPERATION_CREATE_ID,
        header: I18N_MESSAGES['zephyr.button.add'],
        title: I18N_MESSAGES['zephyr.button.add']
    },
    'clone': {
        id: REQ_OPERATION_CLONE_ID,
        header: I18N_MESSAGES['zephyr.button.clone'],
        title: I18N_MESSAGES['zephyr.button.clone']
    },
    'allocate': {
        id: REQ_OPERATION_ALLOCATE_ID,
        header: I18N_MESSAGES['zephyr.button.allocate'],
        title: I18N_MESSAGES['zephyr.button.allocate']
    },
    'delete': {
        id: REQ_OPERATION_DELETE_ID,
        header: I18N_MESSAGES['zephyr.button.delete'],
        title: I18N_MESSAGES['zephyr.requirement.operations.delete.title']
    },
    'export': {
        id: REQ_OPERATION_EXPORT_ID,
        header: I18N_MESSAGES['zephyr.button.export'],
        title: I18N_MESSAGES['zephyr.operation.export.title'],
        choiceTitle: I18N_MESSAGES['zephyr.operation.export.choice.title'],
        label: I18N_MESSAGES['zephyr.operation.export.requirement.label'],
        reportType: '',
        exportType: 'EXPORT_TYPE_REQUIREMENT',
        searchCriteria: '',
        suggestedFieldName: REQ_REQUIREMENT_SUGGESTED_FILE_NAME,
        titleMaxLength: '100',
        isTreeNodeSelected: false
    }
};

export const REQ_OPERATION_CONSTANTS_DETAILS = {
    'create': {
        id: REQ_OPERATION_CREATE_ID_DETAIL,
        header: I18N_MESSAGES['zephyr.button.add'],
        title: I18N_MESSAGES['zephyr.button.add']
    },
    'clone': {
        id: REQ_OPERATION_CLONE_ID_DETAIL,
        header: I18N_MESSAGES['zephyr.button.clone'],
        title: I18N_MESSAGES['zephyr.button.clone']
    },
    'delete': {
        id: REQ_OPERATION_DELETE_ID_DETAIL,
        header: I18N_MESSAGES['zephyr.button.delete'],
        title: I18N_MESSAGES['zephyr.button.delete']
    },
    'export': {
        id: REQ_OPERATION_EXPORT_ID_DETAIL,
        header: I18N_MESSAGES['zephyr.button.export'],
        title: I18N_MESSAGES['zephyr.operation.export.title'],
        label: I18N_MESSAGES['zephyr.operation.export.requirement.label'],
        reportType: '',
        exportType: 'EXPORT_TYPE_REQUIREMENT',
        searchCriteria: '',
        suggestedFieldName: REQ_REQUIREMENT_SUGGESTED_FILE_NAME,
        titleMaxLength: '100'
    }
};
