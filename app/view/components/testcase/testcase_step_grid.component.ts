import {Component, Input, AfterViewInit, OnChanges,Output, OnDestroy, EventEmitter} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

declare var _ , jQuery;
declare var moment: any;
//import {ExpanderDirective} from '../../directives/expander/expander.directive';
import {ZephyrStore} from '../../../store/zephyr.store';
import {TestcaseAction} from '../../../actions/testcase.action';
import {UPDATE_SINGLE_TEST_STEP_RESULT_FOR_ATTACHMENTS} from '../../../utils/constants/action.events';
//import {InlineRowsEditComponent} from '../inline_edit/inline_rows_edit.component';
//import {GridComponent} from '../grid/grid.component';

// Constants
import {TESTCASE_STEP_GRID, TESTSTEP_FIELD_OPTIONS, getTeststepNonEditableOptions,
    TESTSTEP_GRID_TYPE, TESTSTEP_GRID_OPTIONS, TESTSTEP_SEARCH_GRID_TYPE} from './testcase.constant';
declare var $: any;

@Component({
	selector: TESTCASE_STEP_GRID,
	templateUrl: 'testcase_step_grid.html'
})
export class TestcaseStepGridComponent implements AfterViewInit, OnChanges, OnDestroy {
    @Input() editable;
    @Input() cyclePhaseId;
    @Input() rtsId;
    @Input() isExpanded;
    @Input() isSearchView;
    @Input() areExecDetailsEnabled;
    @Output() onTestStepAttachmentClicked: EventEmitter<any> = new EventEmitter();
    teststep = {
        steps: []
    };
    tcid;
    zephyrStore;
    action: string ='zee-collapse';
    stepOptions = {};
    testcaseGridColumns;
    testcaseGridRows;
    isFirstPage;
    isLastPage;
    paginationOptions;
    currentPage;
    noData;
    unsubscribe;
    testStepResults = [];
    _testStepGridType = TESTSTEP_GRID_TYPE;
    _testStepSearchGridType = TESTSTEP_SEARCH_GRID_TYPE;
    gridPageSize;
	_releaseId;
    _teststep;
    constructor(private testcaseAction: TestcaseAction, private route: ActivatedRoute) {
		//this._releaseId = params.getParam('id');
        this.route.params.subscribe(params => {
            this._releaseId = params['id'];
        });
        this.gridPageSize = TESTSTEP_GRID_OPTIONS.rowCount;
        this.zephyrStore = ZephyrStore.getZephyrStore();
		this.unsubscribe = this.zephyrStore.subscribe((x) => {
            let state = this.zephyrStore.getState();
            if(state && state.testcase) {
                // console.log('grid in testcase', state.testcase, state.testcase.testStepGrid.rows);
                //this.testcaseGridColumns = state.testcase.testStepGrid.columns;
                this.testcaseGridRows = state.testcase.testStepGrid.rows;
                this.testStepResults = state.testcase.testStepResults;
                // this.isFirstPage = state.testcase.testStepGrid.isFirstPage;
                // this.isLastPage = state.testcase.testStepGrid.isLastPage;

                //this.tceGridColumns = state.tce.tceGrid.columns;
                this.paginationOptions = state.testcase.testStepGrid.paginationOptions;
                this.currentPage = state.testcase.testStepGrid.currentPage;
                this.noData = state.testcase.testStepGrid.noData;
                this.disableAttachmentCountLink();
                // console.debug('checking grid in stepgrid', this.testcaseGridColumns, this.testcaseGridRows);
            } else {
                this.testcaseGridRows = [];
            }
            if (state.testcase.event == UPDATE_SINGLE_TEST_STEP_RESULT_FOR_ATTACHMENTS) {
                this.onTestStepAttachmentClicked.emit({id : state.testcase.testStepId,attachmentType : 'testStepResult'});
                this.zephyrStore.dispatch(this.testcaseAction.clearTestcaseTestStep());
            }
		});
    }
    ngOnDestroy() {
        this.unsubscribe();
    }
    ngAfterViewInit() {
        // // In case non editable then set the constants
        // if(this.editable) {
        //     this.stepOptions = TESTSTEP_FIELD_OPTIONS;
        // } else {
        //     this.stepOptions = getTeststepNonEditableOptions();
        // }
    }
    ngOnChanges(changes) {
        if(changes[this.rtsId]) {
            this.isExpanded = false;
        }
        this.action = this.isExpanded ? 'zee-expand': 'zee-collapse';
        let _prevAction = !this.isExpanded ? 'zee-expand': 'zee-collapse';
//        console.log('changes in grid',changes, this.isExpanded, this.action);
        jQuery('#zee-testcase-step-details-grid-module').removeClass(_prevAction).addClass(this.action);
    }

    disableAttachmentCountLink() {
        if(this.isSearchView && !this.areExecDetailsEnabled) {
            $('#grid-table-testcase-search').find('.attachment_count_step').addClass('disable');
        } else {
            $('#grid-table-testcase-search').find('.attachment_count_step').removeClass('disable');
        }
    }

    stepGridColumnChooserClick(target) {
        let targetTag = target.tagName.toUpperCase();

        if(targetTag !== 'LABEL' && targetTag !== 'INPUT') {
            return;
        }
        if(targetTag === 'LABEL') {
            target = target.parentElement.querySelector('INPUT');
        }
        let data = {
            columnId: target.dataset.id,
            isChecked: target.checked
        };
        this.zephyrStore.dispatch(this.testcaseAction.configureStepGridColumn(data));
    }

    setTeststepDetails(testcase) {
        // this._teststep = testcase.teststep;
        // this.tcid = testcase.testcase.testcase.id;
        // this.teststep.steps = this._teststep.steps;
    }
    saveUpdatedSteps(step) {
        // delete step['editMode'];
        // _.each(this._teststep.steps, (_step) => {
        //     if(_step.id === step.id) {
        //         Object.assign(_step, step);
        //     }
        // });
        // this.zephyrStore.dispatch(this.testcaseAction.updateTestcaseTestStep(this.tcid, this._teststep));
    }
    testStepGridLinkClick (target) {
        //let id = jQuery(target).closest('div.flex-bar').data('id');
        let index = jQuery(target).closest('div.flex-bar').data('index');
        let entityType = 'testStepResult';
        let dataObject = this.testcaseGridRows && this.testcaseGridRows[index];
        let id = dataObject.id;
        //INFO: This dummy call is made to fetch attachment-count correctly for unexecuted steps
        if (!(dataObject.stepResults.attachmentCount > 0 || dataObject.stepResults.attachmentCount == '0')) {
            let objectTobeSend = [];
            let stepResultData = JSON.parse(JSON.stringify(dataObject.stepResults));
                stepResultData.comment = stepResultData.comment || '';
                stepResultData.testStepId = dataObject.localId;
                stepResultData.executionDate = moment.now();
                stepResultData.cyclePhaseId = this.cyclePhaseId;
                stepResultData.releaseTestScheduleId = this.rtsId;

                objectTobeSend.push(stepResultData);
            this.zephyrStore.dispatch(this.testcaseAction.updateSingleTestStepResult(objectTobeSend , true , null));
        } else {
           this.onTestStepAttachmentClicked.emit({id : id,attachmentType : entityType});
        }
    }

  testStepGridInlineEditSubmit (data) {
    let that = this;
    let currentTestStepResult :any = [{}];
    let isStatusUpdate = false;
    this.testcaseGridRows.forEach(function(step) {
      if(step.id === data.row.id) {
        currentTestStepResult[0].testStepId = data.row.localId;
        currentTestStepResult[0].executionDate = moment.now();
        currentTestStepResult[0].cyclePhaseId = that.cyclePhaseId;
        currentTestStepResult[0].releaseTestScheduleId = that.rtsId;
        currentTestStepResult[0].status = data.row.stepResults.status;
        currentTestStepResult[0].comment = data.row.stepResults.comment || '';
        currentTestStepResult[0].attachmentCount = data.row.stepResults.attachmentCount || 0;
        if (data.row.id) {
          currentTestStepResult[0].id = data.row.id;
        }
      }
    });

    // updating current test step result with status and comment
    if (data.key === 'testcase_status') {
      isStatusUpdate = true;
      if(!data.event) {
        return;
      } else {
        currentTestStepResult[0].status = data.event;
      }
    } else if (data.key === 'testcase_notes') {
      currentTestStepResult[0].comment = data.event;
    }
    this.zephyrStore.dispatch(this.testcaseAction.updateSingleTestStepResult(currentTestStepResult, false , isStatusUpdate));
  }

}
