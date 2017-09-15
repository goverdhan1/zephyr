import {Component, Input, OnDestroy} from '@angular/core';

import {ZephyrStore} from '../../../../store/zephyr.store';
import {TCRAction} from '../../../../actions/tcr.action';
import {TestcaseAction} from '../../../../actions/testcase.action';

// Constants
import {TESTCASE_MAP_DIALOG} from '../testcase.constant';

const REQAPPID = 9;

/**
 * <zee-map-dialog
        [fieldOptions]="fieldOptions"
        [isDisabled]="false"
        [releaseId]="releaseId"
        [testcaseIds]="testcaseIds"
    ></zee-map-dialog>
 * @param fieldOptions: id, header, title
 * @param isDisabled: disable or enable the button
 * @param testcaseIds
 * @param releaseId
 */
@Component({
	selector: TESTCASE_MAP_DIALOG,
	templateUrl: 'testcase_map.html'
})
export class TestcaseMapComponent implements OnDestroy {
    zephyrStore;
    @Input() fieldOptions;
    @Input() isDisabled;
    @Input() releaseId;
    @Input() testcaseIds = [];
    unsubscribe;
    isReqPerm = false;

    constructor(private tcrAction: TCRAction, private _testcaseAction: TestcaseAction) {
        this.zephyrStore = ZephyrStore.getZephyrStore();
        this.unsubscribe = this.zephyrStore.subscribe(() => {
            let state = this.zephyrStore.getState();
            let reqApp = state.leftnav.project.group.filter(item => item.appId === REQAPPID)[0] || {};
            this.isReqPerm = reqApp.permission;
        });
    }
    isEditabe() {
        return !this.isDisabled && Array.isArray(this.testcaseIds) && this.testcaseIds.length > 1 && this.isReqPerm;
    }
    ngOnDestroy() {
        this.unsubscribe();
    }
    saveMap(map) {
        let state = this.zephyrStore.getState();
        let tcrRows = state.tcr.tcrGrid.rows.filter(item => ~this.testcaseIds.indexOf(item.testcase.id));
        tcrRows.forEach(testcase => {
            let thisMap :any = map[testcase.testcase.id];
            testcase.testcase.requirementIds = Array.isArray(thisMap) ? thisMap : [];

            // testcase.testcase.requirementNames = Array.isArray(thisMap) ? thisMap : [];

            this.zephyrStore.dispatch(this._testcaseAction.updateTestcaseDetailsById(testcase, true));
        });
        this.zephyrStore.dispatch(this.tcrAction._clearGridSelection());
    }
}
