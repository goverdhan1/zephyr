import {Component, Input} from '@angular/core';

// Constants
import {TESTCASE_ADD_CREATE_DIALOG} from '../testcase.constant';
import * as TESTCASE_CONSTS from './testcase_operations.constant';

/**
 * <zee-add-create-dialog
        [fieldOptions]="fieldOptions"
        [isDisabled]="false"
        [tcrCatalogTreeId]="tcrCatalogTreeId"
    ></zee-create-dialog>
 * @param fieldOptions: id, header, title
 * @param isDisabled: disable or enable the button
 * @param tcrCatalogTreeId
 */
@Component({
	selector: TESTCASE_ADD_CREATE_DIALOG,
	templateUrl: 'testcase_add_create_edit.html'
})
export class TestcaseAddCreateComponent {
    zephyrStore;
    @Input() fieldOptions;
    @Input() isDisabled;
    @Input() tcrCatalogTreeId;
    @Input() releaseId;
    testcase = TESTCASE_CONSTS.TESTCASE_REQUEST;
}
