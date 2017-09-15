import {I18N_MESSAGES} from '../../../../utils/messages/messages.en';
import * as TESCASE_OPERATIONS from '../../testcase/operations/testcase_operations.constant';

export const TCR_BULK_OPERATION_OPTIONS = {
    'add-create': {
        id: TESCASE_OPERATIONS.TCR_OPERATION_ADD_CREATE_ID,
        header: I18N_MESSAGES['zephyr.button.add-create'],
        title: I18N_MESSAGES['zephyr.button.add-create']
    },
    'create': {
        id: TESCASE_OPERATIONS.TCR_OPERATION_CREATE_ID,
        header: I18N_MESSAGES['zephyr.button.add'],
        title: I18N_MESSAGES['zephyr.button.add']
    },
    'clone': {
        id: TESCASE_OPERATIONS.TCR_OPERATION_CLONE_ID,
        header: I18N_MESSAGES['zephyr.button.clone'],
        title: I18N_MESSAGES['zephyr.button.clone']
    },
    'edit': {
        id: TESCASE_OPERATIONS.TCR_OPERATION_EDIT_ID,
        header: I18N_MESSAGES['zephyr.button.edit'],
        title: I18N_MESSAGES['zephyr.button.edit']
    },
    'delete': {
        id: TESCASE_OPERATIONS.TCR_OPERATION_DELETE_ID,
        header: I18N_MESSAGES['zephyr.button.delete'],
        title: I18N_MESSAGES['zephyr.button.delete']
    },
    'export': {
        id: TESCASE_OPERATIONS.TCR_OPERATION_EXPORT_ID,
        header: I18N_MESSAGES['zephyr.button.export'],
        title: I18N_MESSAGES['zephyr.operation.export.title'],
        label: I18N_MESSAGES['zephyr.operation.export.testcase.label'],
        reportType: '',
        exportType: 'EXPORT_TYPE_TESTCASE',
        searchCriteria: '',
        suggestedFieldName: TESCASE_OPERATIONS.TCR_TESTCASE_SUGGESTED_FILE_NAME
    },
    'map': {
        id: TESCASE_OPERATIONS.TCR_MAP_ID,
        header: I18N_MESSAGES['zephyr.button.map'],
        title: I18N_MESSAGES['zephyr.button.map']
    }
};

export const TCR_BULK_OPERATION = 'zui-tcr-bulk-operations';
export const TCR_OPERATION_OPTIONS = {
    'import': {
        id: TESCASE_OPERATIONS.TESTCASE_ID,
        header: I18N_MESSAGES['zephyr.import.testcase.header'],
        message:  'Valid Testcase Value',
        instructionsDesc: I18N_MESSAGES['zephyr.import.instructions.testcase.description'],
        type: 'testcase'
    }
};
