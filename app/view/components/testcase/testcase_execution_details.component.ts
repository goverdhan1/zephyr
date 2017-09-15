import {Component, Input, Output, EventEmitter, OnDestroy, Inject} from '@angular/core';

import {ActivatedRoute} from '@angular/router';
import {UtililtyFunctions} from '../../../utils/scripts/utils';
import {GridActionsPipe} from '../../pipes/grid_actions.pipe';
import {SanitizationPipe} from '../../pipes/sanitization.pipe';

declare var _;
declare var jQuery: any;
//import {ExpanderDirective} from '../../directives/expander/expander.directive';
import {ZephyrStore} from '../../../store/zephyr.store';
import {TestcaseAction} from '../../../actions/testcase.action';
import {TestcaseExecutionAction} from '../../../actions/testcaseExecution.action';

import { ADMIN_PREFERENCES} from '../admin/admin.constant';
import {TESTCASE_EXECUTION_DETAILS, TESTSTEP_FIELD_OPTIONS, getTeststepNonEditableOptions,
    TESTSTEP_GRID_TYPE, TESTSTEP_GRID_OPTIONS} from './testcase.constant';
import {Subscription} from "rxjs";
import {Http} from "@angular/http";


@Component({
  selector: TESTCASE_EXECUTION_DETAILS,
  templateUrl: 'testcase_execution_details.html',
})
export class TestcaseExecutionDetailsComponent implements OnDestroy {
    @Input() editable;
    @Input() pageSize;
    @Input() currentRecord = -1;
    @Input() isSearchView;
    @Output() emitAttachmentCount: EventEmitter<any> = new EventEmitter();
    zephyrStore;
    action: string ='zee-expand';
    match;
    loggedInUserId;
    statusSelectEditOptions = {unescapeHTML: true};
    testcase = {
        comment: '',
        status: '',
        defects: { defects : [] , status : ''},
        statuses: [],
        executionId : '',
        field: ''
    };
    _adminPrefKeyExecutionStatus = [];
    unsubscribe;
    _testcase;
    _tcExecution;



    constructor(private testcaseAction: TestcaseAction,private testcaseExecutionAction: TestcaseExecutionAction,
        private route: ActivatedRoute, @Inject(Http) private _http : any) {
        this.zephyrStore = ZephyrStore.getZephyrStore();
        this.loggedInUserId = this.zephyrStore.getState().loggedInUser.id;
        let utililtyFunction = new UtililtyFunctions();
        this.statusSelectEditOptions['templateSelection'] = utililtyFunction.statusSelectSelectedOptionTemplateFunction;
        this.statusSelectEditOptions['templateResult'] = utililtyFunction.statusSelectTemplateFunction;
        this.unsubscribe = this.zephyrStore.subscribe((x) => {
            this.setTestcaseDetails(this.zephyrStore.getState().testcase, this.zephyrStore.getState().tce);
            this._adminPrefKeyExecutionStatus = this.zephyrStore.getState().adminPref[ADMIN_PREFERENCES.TESTRESULT_TESTRESULTSTATUS_LOV] ?
            JSON.parse(this.zephyrStore.getState().adminPref[ADMIN_PREFERENCES.TESTRESULT_TESTRESULTSTATUS_LOV]) : [];
            this.disableDefectLink();
        });
    }
    ngOnDestroy() {
        this.unsubscribe();
    }
    disableDefectLink() {
        if(this.isSearchView && !this.editable) {
            jQuery('.defect-link').addClass('disable');
        } else {
            jQuery('.defect-link').removeClass('disable');
        }
    }
    setTestcaseDetails(testcase, tce) {
        this._testcase = testcase.testcase;
        this._tcExecution = tce.executions;
        this.match = this._tcExecution.filter(row => row.id === this._testcase.id);
        if(this.match && this.match.length) {
            this.testcase = this.match[0].testcase;
            this.testcase.executionId = this.match[0].executionId;
            let stausArray = [];

            if (Array.isArray(this._adminPrefKeyExecutionStatus) && this._adminPrefKeyExecutionStatus.length) {
              this.testcase.field = this._adminPrefKeyExecutionStatus[0].value || '';
            }

            this._adminPrefKeyExecutionStatus.forEach(status => {
                if (status.active == 'true') {
                    let modifiedObject = {};
                        modifiedObject['text'] = status.value;
                        modifiedObject['id'] = status.id;
                        modifiedObject['color'] = status.color;
                    stausArray.push(modifiedObject);
                }
                if (this.testcase.status === status.id) {
                    this.testcase.field = status.value;
                }
            });

            //console.log('this testcase', this.match);
            this.testcase.statuses = stausArray;
        }
    }

    returnExecution() {
        let match = null;
        let executions = this.zephyrStore.getState().tce;

        if(executions && executions.tceGrid.rows) {
            let index = 0;

            let record = this.currentRecord % this.pageSize;

            record = record === 0 ? 10 : record;

            if (this.isSearchView) {
              index = jQuery(`#grid-table-tce_search .flex-bar:nth-child(${record})`).index();
            } else {
              index = jQuery(`#grid-table-tce .flex-bar:nth-child(${record})`).index();
            }

            match = executions.tceGrid.rows[index];
        }

        return match;
    }

    updateDetails(value, type) {
        let execDetails = this.returnExecution();

        if(type == 'status' && !value) {
            return;
        }

        this.zephyrStore.dispatch(this.testcaseExecutionAction.updateExecutionDetailsById(execDetails, value, type, this.loggedInUserId , execDetails.id));

        if (type === 'status' && value === 10) {
          // this.zephyrStore.dispatch(this.testcaseExecutionAction.updateExecutionDetailsById(execDetails.executionId, '', 'notes', this.loggedInUserId , execDetails.id));
          this.zephyrStore.dispatch(this.testcaseExecutionAction.resetAttachmentCountForTestcaseSteps());
        }

    }

    defectsClick(event) {
        jQuery('#defect-link-modal').modal();
    }

    //refreshes the attachment count
    attachmentsCountRefreshed (data) {
        this.emitAttachmentCount.emit(data);
    }




}
