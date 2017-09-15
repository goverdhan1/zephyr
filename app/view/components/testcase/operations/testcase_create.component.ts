import {Component, Input, AfterViewInit} from '@angular/core';

import {ZephyrStore} from '../../../../store/zephyr.store';
import {TestcaseAction} from '../../../../actions/testcase.action';
import {GlobalAction} from '../../../../actions/global.action';
import {TCRAction} from '../../../../actions/tcr.action';

// Constants
import {TESTCASE_CREATE_DIALOG} from '../testcase.constant';
import * as TESTCASE_CONSTS from './testcase_operations.constant';

declare var jQuery: any;

/**
 * <zee-create-dialog
        [fieldOptions]="fieldOptions"
        [isDisabled]="false"
        [tcrCatalogTreeId]="tcrCatalogTreeId"
    ></zee-create-dialog>
 * @param fieldOptions: id, header, title
 * @param isDisabled: disable or enable the button
 * @param tcrCatalogTreeId
 * @param tctIds: list of testcase ids
 */
@Component({
	selector: TESTCASE_CREATE_DIALOG,
    providers: [TestcaseAction, GlobalAction],
	templateUrl: 'testcase_create_edit.html'
})
export class TestcaseCreateComponent implements AfterViewInit {
    TESTCASE_CLONE_LIMIT = 200;
    zephyrStore;
    @Input() fieldOptions;
    @Input() isDisabled;
    @Input() tcrCatalogTreeId;
    @Input() tctIds;
    @Input() releaseId;
    @Input() tceGridRows;
    @Input() testcaseIds;
    @Input() doDirtyCheck = false;
    @Input() tooltip;

    isBulkEdit = false;
    private testcase = TESTCASE_CONSTS.TESTCASE_REQUEST;
    constructor(private _testcaseAction: TestcaseAction, private globalAction: GlobalAction, private tcrAction: TCRAction) {
        this.zephyrStore = ZephyrStore.getZephyrStore();
    }
    ngAfterViewInit() {
        let id = this.fieldOptions.id;
        this.isBulkEdit = (id === TESTCASE_CONSTS.TCR_OPERATION_EDIT_ID || id === TESTCASE_CONSTS.TESCASE_OPERATION_EDIT_ID);
    }
    disableButton() {
        return this.isDisabled ||
          (this.fieldOptions.id == TESTCASE_CONSTS.TCR_OPERATION_CLONE_ID && !this.tctIds.length) ||
          (this.fieldOptions.id == TESTCASE_CONSTS.TCR_OPERATION_EDIT_ID && (this.tctIds.length ? !(this.tctIds.length > 1) : !this.tctIds.length));
    }
    createTestcase() {
        try {
            this.testcase['tcrCatalogTreeId'] = this.tcrCatalogTreeId;
            this.testcase['testcase'].releaseId = this.releaseId;
            this.testcase['testcase'].estimatedTime = this.getEstimatedTime();
            this.zephyrStore.dispatch(this._testcaseAction.createTestcase(this.testcase));
        } catch(e) {
//            console.log(e);
        }
    }
    getEstimatedTime() {
        return this.zephyrStore.getState().adminPref[TESTCASE_CONSTS.TESTCASE_EST_TIME_KEY] || 600;
    }
    cloneTestcase() {
        let tctIdsObj = {'ids': this.tctIds};
        try {
            if(this.tctIds.length > this.TESTCASE_CLONE_LIMIT) {
                window['selectedTctIdsObj'] = tctIdsObj;    //TODO:: remove global reference
                jQuery('#clone-limit-modal').modal();
            } else {
                this.zephyrStore.dispatch(this._testcaseAction.cloneTestcase(this.tcrCatalogTreeId, this.tcrCatalogTreeId, tctIdsObj));
            }
        } catch(e) {
          //  console.log(e);
        }
    }
    cloneTestcaseOnUserApproval() {
        this.zephyrStore.dispatch(this._testcaseAction.cloneTestcase(this.tcrCatalogTreeId, this.tcrCatalogTreeId, window['selectedTctIdsObj']));
        jQuery('#clone-limit-modal').modal('hide');
    }
    onAddClick() {
        switch(this.fieldOptions.id) {
            case TESTCASE_CONSTS.TCR_OPERATION_CREATE_ID:
            case TESTCASE_CONSTS.TESCASE_OPERATION_CREATE_ID:

                this.zephyrStore.dispatch(this.tcrAction._clearGridSelection());
                if (this.promptForSave()) {
                    return;
                }

                this.createTestcase();
                break;
            case TESTCASE_CONSTS.TCR_OPERATION_CLONE_ID:
            case TESTCASE_CONSTS.TESCASE_OPERATION_CLONE_ID:
                if (this.promptForSave()) {
                    return;
                }
                this.cloneTestcase();
                break;
            case TESTCASE_CONSTS.TCR_OPERATION_EDIT_ID:
            case TESTCASE_CONSTS.TESCASE_OPERATION_EDIT_ID:
                if (this.promptForSave()) {
                    return;
                }
                break;
            default:
                break;
        }
    }

    promptForSave() {
        let isDirty = this.zephyrStore.getState().global.isDirty;
        if (this.doDirtyCheck && isDirty && !confirm('There is unsaved data in the testcase. Are you sure you want to continue?')) {
            return true;
        }
        this.zephyrStore.dispatch(this.globalAction.clearDirtyCheck());
        return false;

    }
}
