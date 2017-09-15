import {Component, Input, Output, EventEmitter} from '@angular/core';

import {ZephyrStore} from '../../../../store/zephyr.store';
import {TestcaseAction} from '../../../../actions/testcase.action';
import {TCRAction} from '../../../../actions/tcr.action';

// Constants
import {TESTCASE_DELETE_DIALOG} from '../testcase.constant';

/**
 * <zee-delete-dialog
        [fieldOptions]="fieldOptions"
        [isDisabled]="false"
        [tcrCatalogTreeId]="tcrCatalogTreeId"
    ></zee-delete-dialog>
 * @param fieldOptions: id, header, title
 * @param isDisabled: disable or enable the button
 * @param tctIds: list of tct ids
 */
@Component({
	selector: TESTCASE_DELETE_DIALOG,
    providers: [TestcaseAction],
	templateUrl: 'testcase_delete.html'
})
export class TestcaseDeleteComponent {
    zephyrStore;
    @Input() fieldOptions;
    @Input() isDisabled;
    @Input() tctIds;
    @Input() testcaseIds;

    constructor(private testcaseAction: TestcaseAction, private tcrAction: TCRAction) {
        this.zephyrStore = ZephyrStore.getZephyrStore();
    }
    disableButton() {
        return (this.isDisabled || !this.tctIds.length);
    }
    onTriggerDelete() {
        //
    }
    onClickDelete() {
        this.zephyrStore.dispatch(this.tcrAction._clearGridSelection());
        this.zephyrStore.dispatch(this.testcaseAction.deleteTestcaseByTCTId(this.tctIds,this.testcaseIds));
    }
}
