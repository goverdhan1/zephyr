import {I18N_MESSAGES} from '../../../../utils/messages/messages.en';
import * as TESCASE_OPERATIONS from '../../testcase/operations/testcase_operations.constant';

export const TCE_BULK_OPERATION_OPTIONS = {
    'edit': {
        id: TESCASE_OPERATIONS.TCE_OPERATION_EDIT_ID,
        header: I18N_MESSAGES['zephyr.button.edit'],
        title: I18N_MESSAGES['zephyr.button.edit']
    },
    'export': {
        id: TESCASE_OPERATIONS.TCE_OPERATION_EXPORT_ID,
        header: I18N_MESSAGES['zephyr.button.export'],
        title: I18N_MESSAGES['zephyr.operation.export.title'],
        label: I18N_MESSAGES['zephyr.operation.export.tce.label'],
        reportType: '',
        exportType: 'EXPORT_TYPE_TESTSCHEDULE_PHASE',
        searchCriteria: '',
        suggestedFieldName: TESCASE_OPERATIONS.TCE_TESTCASE_SUGGESTED_FILE_NAME
    }
};

export const TCE_BULK_OPERATION = 'zui-tce-bulk-operations';
export const TCE_OPERATION_OPTIONS = {
    'import': {
        id: TESCASE_OPERATIONS.TESTCASE_ID,
        header: I18N_MESSAGES['zephyr.import.testcase.header'],
        instructionsDesc: I18N_MESSAGES['zephyr.import.instructions.testcase.description'],
        type: 'testcase'
    }
};
