import {
  OnDestroy, Component, Input, Output, EventEmitter, ElementRef, AfterViewInit, NgZone, OnChanges,
  SimpleChanges, ViewChild
} from '@angular/core';
import {I18N_MESSAGES} from '../../../../utils/messages/messages.en';
import {ZephyrStore} from "../../../../store/zephyr.store";
import {RequirementsAction} from '../../../../actions/requirements.action';
import {FETCH_REQ_GRID_ON_SEARCH} from '../../../../utils/constants/action.events';
import {REQ_GRID_TYPE, REQ_GRID_PAGINATION, REQ_TRACEABILITY_GRID_TYPE} from "../../requirements/req_grid.constant";

import * as GRID_CONSTANTS from '../../grid/grid.constant';
import {GridComponent} from "../../grid/grid.component";

declare var _: any, jQuery: any;

@Component({
    selector: 'zui-inline-table-zql',
    templateUrl: 'inline-table-zql.html',
    viewProviders: [RequirementsAction]
})
export class InlineTableZQLComponent implements AfterViewInit, OnDestroy {
    @ViewChild(GridComponent) gridComponent: GridComponent;
    @Input() parentId; //If in a single page multiple inline options are defined then parentId is used to distinguish between them.
    @Input() releaseId = null; //If in a single page multiple inline options are defined then parentId is used to distinguish between them.
    // @Input() options = [];
    @Input() columns = [];
    @Input() searchOn = [];
    @Input() key = '';
    @Input() selectedOptions = [];

    @Output() onRowSelection: EventEmitter<any> = new EventEmitter();
    searchText =  "";

    reqGridColumns: Array<Object>;
    viewReqGridRows: Array<Object> = [];
    isFirstPage: boolean;
    isLastPage: boolean;

    searchOffset = 0;
    releases;
    currentRecord = 1;
    totalRecords;
    paginationOptions = REQ_GRID_PAGINATION;

    isAdvancedSearch = true;
    _zephyrStore;
    hideDialogBox = true;
    selections = [];
    unsubscribe;
    public filter : string = "";
    public lastSearchTerm : string = "";
    public i18nMessages = I18N_MESSAGES;
    private gridPageSize = GRID_CONSTANTS.GRID_ROW_COUNT_DEFAULT;
    private identifiers = [];
    private masterOptions = [];
    private currentPage;

    private _reqGridType = REQ_TRACEABILITY_GRID_TYPE;

    constructor(private _reqAction: RequirementsAction) {
      this._zephyrStore = ZephyrStore.getZephyrStore();

      this.unsubscribe = this._zephyrStore.subscribe(() => {
        let state = _.cloneDeep(this._zephyrStore.getState().requirements);
        let reqStateEvent = state.event;

        if (reqStateEvent === FETCH_REQ_GRID_ON_SEARCH && state.reqGrid) {
          this.totalRecords = state.reqGrid.totalCount;
          this.currentPage = state.reqGrid.currentPage;
          this.isFirstPage = state.reqGrid.isFirstPage;
          this.isLastPage = state.reqGrid.isLastPage;
          this.reqGridColumns = state.reqGrid.columns;
          this.paginationOptions = state.reqGrid.paginationOptions;

          this.viewReqGridRows = state.reqGrid.rows.map(item => {
            let maps = item.requirementReleaseTestcaseCountMapping;

            let coverage = 0;

            if (Array.isArray(maps)) {
              maps.forEach(item => {
                coverage += item.testcaseCount || 0;
              });
            }

            item.coverage = coverage;
            return item;
          });
        }
      });

    }


    ngOnDestroy() {
      let state = _.cloneDeep(this._zephyrStore.getState().requirements);
      let reqStateEvent = state.event;

      if (reqStateEvent.length) {
        this.viewReqGridRows = [];
        this._zephyrStore.dispatch(this._reqAction.clearReqEvent());
      }
    }

    ngAfterViewInit(){

      if (this.selectedOptions.length) {
        this.searchText = "id in (" + this.selectedOptions.join(",") + ")";
        this.fetchRequirementOnSearch(1, this.searchText);
      } else {
        this.searchText = "";
      }

    }

    reqGridRowSelection(value) {
      this.selectedOptions = value || [];

      if (this.onRowSelection) {
        this.onRowSelection.emit({
          selectedOptions : this.selectedOptions
        });
      }
    }

    fetchRequirements(value) {
      this.fetchRequirementOnSearch(value);
    }

    resetValues() {
      this.searchText = "";
      this._zephyrStore.dispatch(this._reqAction.clearReqEvent());
      this._zephyrStore.dispatch(this._reqAction.clearReqGridData());
      this.viewReqGridRows = [];
    }

    reqGridPrevClick(value) {
      this.fetchRequirements(value);
    }
    reqGridNextClick(value) {
      this.fetchRequirements(value);
    }
    reqGridPaginateByIndex(value) {
      this.fetchRequirements(value);
    }
    reqGridPageSizeChange(value) {
      this.gridPageSize = value;
      this._zephyrStore.dispatch(this._reqAction._clearGridSelection());
      this.fetchRequirements(1);
    }

    inputKeyPress(event) {
      if (event.which == 13 || event.keyCode == 13) {
        this.searchTable();
      }
      return true;
    }

    onSearchGo(param) {
      this.viewReqGridRows = [];
      this.searchText = param.value;
      this.isAdvancedSearch = param.isAdvancedSearch;
      this._zephyrStore.dispatch(this._reqAction._clearGridSelection());
      this.fetchRequirementOnSearch(1);
    }

    fetchRequirementOnSearch(page, query = "") {
      this.currentPage = page;
      this.searchOffset = this.gridPageSize * (page - 1);

      let queryParams = {
        'firstresult': this.searchOffset,
        'maxresults': this.gridPageSize,
        'currentPage': this.currentPage,
        'size': this.gridPageSize,
        'entityType': 'requirement'
      }, dataParams = {
        'entityType': 'requirement',
        'releaseId': this.releaseId
      };


      queryParams['releaseId'] = this.releaseId;

      queryParams['isZql'] = this.isAdvancedSearch || false;

      if (!query.length) {
        queryParams['word'] = this.isAdvancedSearch ? (this.searchText || '') : this.searchText;
      } else {
        queryParams['word'] = this.isAdvancedSearch ? (query) : this.searchText;
      }

      this._zephyrStore.dispatch(this._reqAction.fetchRequirementsOnSearch(queryParams, dataParams, true));
    }

    searchTable() {
      if (!_.isEqual(this.lastSearchTerm, this.filter)) {
        // this.options.forEach((option) => {
        //   option.show = true;
        //
        //   _.forEach(this.searchOn, (token) => {
        //     option.show = _.startsWith(token.split('.').reduce((o,i)=>o[i], option).toLocaleLowerCase(),
        //       this.filter.trim().toLocaleLowerCase());
        //
        //     if (option.show === true) {
        //       return false;
        //     }
        //
        //     return true;
        //   });
        //
        // });

        jQuery("#select-all-options").prop("checked", false);
        this.lastSearchTerm = this.filter;
      }
    }


    openDialog(value) {
      this.hideDialogBox = false;

      // this.masterOptions = _.cloneDeep(this.options);
      //
      // this.options.forEach(option => {
      //   option.identifier = this.getRowIdentifier(option);
      //   this.identifiers.push(this.getRowIdentifier(option));
      //   option.marked = false;
      //   option.show = true;
      // });

      this.markSelectedOptions(value);
    }

    //value is whether to mark selected or unselected. true to select and false to unselect
    markSelectedOptions(value) {

      // this.options.forEach(option => {
      //   if (this.selectedOptions.indexOf(option.identifier) !== -1 && option.show) {
      //     option.marked = value;
      //
      //     if (!value) {
      //       this.selectedOptions.splice(this.selectedOptions.indexOf(option.identifier), 1);
      //     }
      //   }
      // });
    }

    onSelectAll(checkbox) {
      let status = checkbox.currentTarget.checked;

      if(checkbox.currentTarget.checked) {

        // this.options.forEach(option => {
        //   if (option.show && this.selectedOptions.indexOf(option.identifier) === -1) {
        //     this.selectedOptions.push(option.identifier);
        //     option.marked = true;
        //   }
        // });
      } else {
        this.markSelectedOptions(false);
        // this.selectedOptions.splice(0, this.selectedOptions.length);
      }
    }

    getRowIdentifier(row) {
      return this.key.split(".").reduce((o, i) => o[i], row);
    }

    addToSelected(checkbox, row) {
      if(checkbox.currentTarget.checked) {
        this.selectedOptions.push(row.identifier);
      } else {
        this.selectedOptions.splice(this.selectedOptions.indexOf(this.getRowIdentifier(row)), 1);

        // this.selectedOptions.splice(0, this.selectedOptions.length);
      }
    }

    onUnSelectAll() {
      // this.selectedOptions.splice(0, this.selectedOptions.length);
      // this.options.forEach(option => {
      //   this.selectedOptions.push(option.id);
      // });
      // this.markSelectedOptions(false);
      // this.selectedOptions.splice(0, this.selectedOptions.length);
      jQuery('.zui-gadget-checkbox-select-all').prop('checked', false);
    }

    _toggleCheckbox(data) {
      //console.log(data);
      //this.config.cycles = this.config.cycles || [];
      let _optionId = Number(data.currentTarget.value);
      if(data.currentTarget.checked) {
        this.selectedOptions.push(_optionId);
      } else {
        let i = 0;
        this.selectedOptions.forEach(optionId => {
          if(optionId === _optionId) {
            this.selectedOptions.splice(i, 1);
          } else {
            i++;
          }
        });
      }
    }

    hideDialog() {
      this.hideDialogBox = true;
    }
}
