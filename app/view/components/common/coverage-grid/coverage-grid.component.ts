import {Component, Input, OnDestroy, OnChanges} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

import {ZephyrStore} from '../../../../store/zephyr.store';

import {REQ_COVERAGE_GRID_TYPE, REQ_GRID_TYPE, TCE_REQ_COVERAGE_GRID_TYPE} from '../../requirements/req_grid.constant';
import {TCR_COVERAGE_GRID_TYPE, TCR_GRID_TYPE} from '../../tcr/tcr_grid.constant';
import {RequirementsAction} from '../../../../actions/requirements.action';
import {TCRAction} from '../../../../actions/tcr.action';
import {FETCH_REQ_GRID_ON_SEARCH} from '../../../../utils/constants/action.events';

@Component({
    selector: 'zui-coverage-grid',
    viewProviders: [RequirementsAction, TCRAction],
    templateUrl: 'coverage-grid.html'
})
export class CoverageGridComponent implements OnChanges, OnDestroy {
  @Input() gridType = '';
  @Input() ids: Array<Object>;
  @Input() releaseId: any;
  @Input() useRelease = true;

  entityType;
  unsubscribe;

  _zephyrStore;
  rows;

  debounce;

  constructor(private _reqAction : RequirementsAction, private _tcrAction: TCRAction) {
    this._zephyrStore = ZephyrStore.getZephyrStore();

    this.unsubscribe = this._zephyrStore.subscribe((x) => {
      let state = this._zephyrStore.getState();

      if(state.tcr.event == 'SORT_TCR_COVERAGE_GRID_SUCCESS' || state.tcr.tcrGrid.event == 'FETCH_TESTCASES_BY_TREE_ID_SUCCESS') {
        this._zephyrStore.dispatch(this._tcrAction.clearTCRGridEvent(null));
        this.rows = state.tcr.tcrGrid.rows;
      }

      if ((state.requirements.event === FETCH_REQ_GRID_ON_SEARCH || state.requirements.event === 'SORT_REQ_COVERAGE_GRID_SUCCESS') && state.requirements.reqGrid) {
        this._zephyrStore.dispatch(this._reqAction.clearReqEvent());
        this.rows = state.requirements.reqGrid.rows;
      }

    });
  }

  ngOnChanges(changes) {

   if(changes && changes['ids']) {
     if (this.debounce) {
       clearTimeout(this.debounce);
     }

     let firstDetection = !this.debounce;

     this.debounce = setTimeout(() => {
       this.debounce = null;

       let queryParams = {
         'firstresult': 0,
         'maxresults': 100000,
         'currentPage': 1,
         'size': 100000,
         'entityType': 'requirement'
       }, dataParams = {
         'entityType': 'requirement',
         'releaseId': this.releaseId
       };

       let searchText = `id in (${this.ids.join(',')})`;

       queryParams['isZql'] = true;
       queryParams['word'] = (searchText || '');

       switch (this.gridType) {
         case TCE_REQ_COVERAGE_GRID_TYPE :
         case REQ_COVERAGE_GRID_TYPE:
           this.entityType = 'Testcase';
           dataParams.entityType = 'requirement';
           this.getCoveredRequirements(queryParams, dataParams);
           break;

         case TCR_COVERAGE_GRID_TYPE:
           this.entityType = 'Requirement';
           dataParams.entityType = 'testcase';
           this.getCoveredTestcases(queryParams, dataParams);
           break;
       }

     }, firstDetection ? 200 : 300);
   }

  }

  reqGridLinkClick(target) {
    window.open(target.text, '_blank');
  }

  ngOnDestroy() {
    this.unsubscribe();
    this.rows = [];

    switch(this.gridType) {
        case REQ_COVERAGE_GRID_TYPE :
        case REQ_COVERAGE_GRID_TYPE :
        this._zephyrStore.dispatch(this._reqAction.clearReqGridData());

        break;

      case TCR_COVERAGE_GRID_TYPE:
        this._zephyrStore.dispatch(this._tcrAction.clearTcrGridData({size: 0}, TCR_GRID_TYPE));

        break;
    }
  }

  getCoveredTestcases(queryParams, dataParams) {
    queryParams['entityType'] = dataParams['entityType'];

    if (this.useRelease) {
      queryParams['releaseId'] = dataParams['releaseId'];
    } else {
      delete queryParams['releaseId'];
    }

    // queryParams['releaseId'] = dataParams['releaseId'];
    this._zephyrStore.dispatch(this._tcrAction.fetchTestCasesOnSearch(queryParams, TCR_COVERAGE_GRID_TYPE, false, true));
  }

  getCoveredRequirements(queryParams, dataParams) {
    queryParams['entityType'] = dataParams['entityType'];
    queryParams['releaseId'] = dataParams['releaseId'];

    if (this.useRelease) {
      queryParams['releaseId'] = dataParams['releaseId'];
    } else {
      delete queryParams['releaseId'];
    }

    this._zephyrStore.dispatch(this._reqAction.fetchRequirementsOnSearch(queryParams, dataParams, true, true));
  }

}
