import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import {ZephyrStore} from '../../../../store/zephyr.store';
import { ADMIN_PREFERENCES } from '../../../components/admin/admin.constant';
import { CUSTOM_FIELD_TYPES } from '../../../../utils/constants/application.constants';
import {TestcaseExecutionAction} from '../../../../actions/testcaseExecution.action';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

declare var $;
declare var _:any;
declare var moment: any;

@Component({
    selector: 'tce-bulk-edit',
    templateUrl: 'tce_bulk_edit.html'
})

export class TceBulkEditComponent implements OnInit {
    @Input() typeOfBulkExecution;
    @Input() tctIds;
    @Input() tceGridRows;
    zephyrStore;
    _adminPrefKeyExecutionStatus;
    statuses;

    constructor(private _testcaseExecutionAction: TestcaseExecutionAction) {
        this.zephyrStore = ZephyrStore.getZephyrStore();
        this._adminPrefKeyExecutionStatus = this.zephyrStore.getState().adminPref[ADMIN_PREFERENCES.TESTRESULT_TESTRESULTSTATUS_LOV] ?
            JSON.parse(this.zephyrStore.getState().adminPref[ADMIN_PREFERENCES.TESTRESULT_TESTRESULTSTATUS_LOV]) : [];
    }

    ngOnInit() {
        this.getStatusArray();
    }

    getStatusArray() {
        this.statuses = this._adminPrefKeyExecutionStatus.map((obj) => {

            return {id: obj.id, text: obj.value};
        });
    }

    updateStatus(ev) {
        let scheduleIds = [];
        let status = ev.id;
        let testerId = null;
        let that = this;

        this.tctIds.forEach(function(tctId) {
            that.tceGridRows.forEach(function(row) {
                if(tctId === row.id) {
                    scheduleIds.push(row.executionId);
                    testerId = row.testerId;
                }
            });
        });

        this.zephyrStore.dispatch(this._testcaseExecutionAction.updateTestcaseStatus(scheduleIds, status, testerId));
        $('#zee-create-edit-modal-tcr_3').modal('hide');
    }
}
