import {Component, OnInit, Input, OnDestroy, Output , EventEmitter, OnChanges, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';

import {GridAction} from '../../../../../actions/grid.action';
import {ZephyrStore} from '../../../../../store/zephyr.store';
import {TestcaseEASAction} from '../../../../../actions/testcaseEAS.action';
import {PHASE_GRID_TYPE, PHASE_GRID_OPTIONS, PHASE_GRID_PAGINATION, ADD_OTHER_CYCLE_GRID_TYPE} from '../phase_grid.constant';
import {DELETE_TESTCASE_SUCCESS} from '../../../../../utils/constants/action.events';

declare var jQuery: any, _: any;
const DELETE = 'DELETE';


@Component({
  selector: 'testcase-eas-phase-grid',
  viewProviders: [TestcaseEASAction, GridAction],
  templateUrl: 'phase_grid.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TestcaseEASPhaseGridComponent implements OnDestroy, OnChanges {
    @Input() selectedTctIds;
    @Input() selectedTreeNode;
    @Input() phaseTreeId;
    @Input() bubblePagination = false;
    @Input() keyOnRowSelect = null;
    @Input() gridType ='phaseGrid';
    @Input() keyToCheck = null;

    @Output() onClearSelectedTctIds: EventEmitter<any> = new EventEmitter();
    @Output() onPhaseGridRowClick: EventEmitter<any> = new EventEmitter();
    @Output() onPhaseGridRowSelection: EventEmitter<any> = new EventEmitter();
    @Output() onPhaseGridPageChange: EventEmitter<any> = new EventEmitter();
    @Output() onPhaseGridPageSizeChange: EventEmitter<any> = new EventEmitter();

    phaseGridRows: Array<Object> = [];
    noData = false;
    paginationOptions;
    searchOffset = 0;
    searchText = '';
    disableCheckbox = false;
    testcaseId;
    unsubscribe;
    zephyrStore;
    confirmationObject : any = {};
    idArray= [];
    _phaseGridType = PHASE_GRID_TYPE;
    _showLastRow = false;
    _releaseId;
    constructor(private _testcaseEASAction: TestcaseEASAction,private _gridAction: GridAction, private cdr: ChangeDetectorRef) {
        this.zephyrStore = ZephyrStore.getZephyrStore();
        //updating phase grid
        let state = this.zephyrStore.getState();
        //clearing any selected ID's
        this.clearSelectedTctIds();

        if (state.testcaseEAS[this.gridType]) {
          this.phaseGridRows = state.testcaseEAS[this.gridType].rows;
          this.noData = state.testcaseEAS[this.gridType].noData;
          this.paginationOptions = state.testcaseEAS[this.gridType].paginationOptions;
        }

        this.unsubscribe = this.zephyrStore.subscribe(() => {
           //updating phase grid

          let state = this.zephyrStore.getState();
          this.updateGridPaginationMetrices();

          if (state.testcaseEAS[this.gridType]) {
            this.phaseGridRows = state.testcaseEAS[this.gridType].rows;
            this.noData = state.testcaseEAS[this.gridType].noData;
            this.paginationOptions = state.testcaseEAS[this.gridType].paginationOptions;

            if(state.testcaseEAS[this.gridType].event == DELETE_TESTCASE_SUCCESS) {
               this.zephyrStore.dispatch(this._testcaseEASAction.clearEvents(null));
               this.clearSelectedTctIds();
            }
          }
          if(this.cdr) { this.cdr.markForCheck(); }
          // if(state.testcaseEAS.event == DELETE_TESTCASE_SUCCESS) {
          //    this.zephyrStore.dispatch(this._testcaseEASAction.clearEvents(null));
          //    this.clearSelectedTctIds();
          // }
      });
    }

    updateGridPaginationMetrices() {
      let state = this.zephyrStore.getState();
      //clearing any selected ID's
      // this.clearSelectedTctIds();

      if (state.testcaseEAS[this.gridType]) {
        this.phaseGridRows = state.testcaseEAS[this.gridType].rows;
        this.noData = state.testcaseEAS[this.gridType].noData;
        this.paginationOptions = state.testcaseEAS[this.gridType].paginationOptions;
      }
      if(this.cdr) { this.cdr.markForCheck(); }
    }

    ngOnChanges(changes: SimpleChanges): void {
      if(changes['gridType']) {
        this.updateGridPaginationMetrices();
        if (!_.isEqual(changes['gridType']['currentValue'], changes['gridType']['previousValue'])) {
            this._phaseGridType = 'freeFormBrowse' === this.gridType ? ADD_OTHER_CYCLE_GRID_TYPE : PHASE_GRID_TYPE;
        }
      }
    }

    clearSelectedTctIds() {
      this.selectedTctIds = [];
      this.onClearSelectedTctIds.emit(this.selectedTctIds);
    }

    ngOnDestroy() {
      this.unsubscribe();
    }

    phaseGridRowClick(targetRow) {
      let testcaseObject = this.phaseGridRows[targetRow.dataset.index];
      if(!testcaseObject || !testcaseObject['id']) {
          return;
      }
      this.onPhaseGridRowClick.emit(testcaseObject['id']);
    }
    phaseGridPrevClick(value) {
        this.onPhaseGridPageChange.emit(value);
    }
    phaseGridNextClick(value) {
        this.onPhaseGridPageChange.emit(value);
    }
    phaseGridPaginateByIndex(value) {
        this.onPhaseGridPageChange.emit(value);
    }
    phaseGridPageSizeChange(value) {
        this.onPhaseGridPageSizeChange.emit(value);
    }

    phaseGridRowSelection(value) {
      this.selectedTctIds = value || [];
      this.onPhaseGridRowSelection.emit(this.selectedTctIds);
    }

    //method to update flag in a grid
    phaseGridActionClick ($event) {
      let target = $event.target,
          actionToBaTaken = target.dataset.action,
          trParents = jQuery(target).closest('.flex-bar'),
          targetRow = trParents[0];
      let idArray = [parseInt(targetRow.dataset.id)];
      if (actionToBaTaken === 'delete') {
        jQuery('#confirmation-modal-eas').modal();
        this.confirmationObject['heading'] = 'Confirmation Delete';
        this.confirmationObject['text'] = 'Are you sure you want to delete this testcase';
        this.confirmationObject['buttonText'] = 'Delete';
        this.confirmationObject['showCancelButton'] = true;
        this.confirmationObject['action'] = DELETE;
        this.idArray = idArray;
      } else if (actionToBaTaken === 'star') {
         this.zephyrStore.dispatch(this._testcaseEASAction.updateTestcasesFlag(false , idArray));
      } else if (actionToBaTaken === 'unstar') {
        this.zephyrStore.dispatch(this._testcaseEASAction.updateTestcasesFlag(true , idArray));
      }
      if(this.cdr) { this.cdr.markForCheck(); }
    }

    //function to make API call for assignemnt of single testcase
    phaseGridAssignSelectChange(data) {
      let dataobject  = data.row,
          executionId = dataobject.testcase.executionId,
          testcaseId = dataobject.id,
          cyclePhaseId = this.phaseTreeId,
          assignedId = data.event;
      let dataObject = {};
      if (executionId) {
        if (assignedId == '0') {
          dataObject = {};
          dataObject['unassignedRtsIds'] = [] ;
          dataObject['unassignedRtsIds'].push(executionId);
        } else {
          dataObject = {};
          dataObject['updateRTSList'] = [];
          let executionObject = {};
              executionObject['rtsId'] = executionId;
              executionObject['testerId'] = parseInt(assignedId);
              executionObject['cyclePhaseId'] = cyclePhaseId;
          dataObject['updateRTSList'].push(executionObject);
        }
      } else { if (!(assignedId == '0')) {
            dataObject = {};
            dataObject['createRTSList'] = [];
            let executionObject = {};
                executionObject['tctId'] = testcaseId;
                executionObject['testerId'] = parseInt(assignedId);
                executionObject['cyclePhaseId'] = cyclePhaseId;
            dataObject['createRTSList'].push(executionObject);
          } else {
          dataObject['unassignedRtsIds'] = [];
        }
      }
      if(data.event !== '') {
        this.zephyrStore.dispatch(this._testcaseEASAction.modifyExecution(dataObject));
      }
      if(this.cdr) { this.cdr.markForCheck(); }
    }

    confirmationActionCall($event) {
      let actionString = $event.target.value;
      if (actionString === DELETE) {
        this.zephyrStore.dispatch(this._testcaseEASAction.deleteTestcasesbyCyclePhaseId(this.phaseTreeId , this.idArray));
      }
      jQuery('#confirmation-modal-eas').modal('hide');
    }
}
