import {
  Component, Input, Output, AfterViewChecked, AfterContentInit, EventEmitter, ElementRef, OnDestroy,
  OnChanges, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy, OnInit, Inject
} from '@angular/core';

import {Router, ActivatedRoute} from '@angular/router';

import {ZephyrStore} from '../../../store/zephyr.store';
import {NotificationStore} from '../../../store/notification.store';

import {TCRAction} from '../../../actions/tcr.action';
import {GridAction} from '../../../actions/grid.action';
import {GridComponent} from '../grid/grid.component';

// Constants

import {I18N_MESSAGES} from '../../../utils/messages/messages.en';
import {TCR_GRID_TYPE, TCR_GRID_OPTIONS, TCR_GRID_PAGINATION, } from './tcr_grid.constant';
import {NEXT_PAGE, PREV_PAGE} from '../common/paginator/paginator.constant';
import {NotificationAction} from '../../../actions/notification.action';
import {NOTIFICATION_ENTITY_CONSTANTS} from '../../../utils/constants/notification.constants';
import {constructNotificationStoreMetadata} from '../../../utils/notification/notification.util';
import {Observable} from 'rxjs/Rx';
import {REQ_COVERAGE_GRID_TYPE, REQ_GRID_TYPE} from '../requirements/req_grid.constant';
import {PouchDBPrefsServices} from '../../../services/pouch.db.service';
import {CoverageGridComponent} from '../common/coverage-grid/coverage-grid.component';
import {DEFAULT_GRID_STATE} from '../../../reducers/grid.reducer';

declare var jQuery: any, _;

/**
 * <zui-tcr-grid
 [releaseId]="_releaseId"
 [selectedTreeNode]="selectedTreeNode"
 [selectedTctIds]="selectedTctIds"
 (onTcrGridRowClick)="tcrGridRowClick($event)"
 (onClearSelectedTctIds)="clearSelectedTctIds($event)"
 ></zui-tcr-grid>
 */
@Component({
  selector: 'zui-tcr-grid',
  templateUrl: 'tcr_grid.html',
  viewProviders: [TCRAction, GridAction, NotificationAction],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TcrGridComponent implements AfterViewChecked, OnDestroy, OnChanges, OnInit {
  @ViewChild(GridComponent) gridNewUI: GridComponent;
  @ViewChild(CoverageGridComponent) coverageComponent: any;
  @Input() selectedTctIds;
  @Input() secIds;
  @Input() isSearchView; // Intially folder tree view is displayed
  @Input() isAdvancedSearch;
  @Input() bubblePagination = false;
  @Input() selectedTreeNodeObs:Observable<any>;
  @Input() isDetailView;
  @Input() gridPageSize;
  @Input() emitBrowseEvent = false;
  @Input() appId;
  @Input() inRelease;
  @Input() showCoverage = true;
  @Input() testcaseId = '';
  //TOOD-CHECK
  @Input() releaseId;
  @Output() onClearSelectedTc;
  @Output() onClearSelectedTctIds: EventEmitter<any> = new EventEmitter();
  @Output() onTcrGridRowClick: EventEmitter<any> = new EventEmitter();
  @Output() onTcrGridRowSelection: EventEmitter<any> = new EventEmitter();
  @Output() GridIndexPagination: EventEmitter<any> = new EventEmitter();
  @Output() GridPageSizeChanged: EventEmitter<any> = new EventEmitter();
  tcrGridRows: Array<Object> = [];
  tcrGridColumns: Array<Object> = [];
  listViewColumns: Array<Object> = [];
  noData = false;
  paginationOptions = TCR_GRID_PAGINATION;
  searchOffset = 0;
  searchText = '';
  disableCheckbox = false;
  currentPage;
  unsubscribe;
  coverageRequirementIds = [];
  selectedTreeNode;
  hideReset = false;
  _reqGridType = REQ_COVERAGE_GRID_TYPE;
  sortColumn = 'id';
  isAscOrder = true;
  orderColumn = 'id';
  _tcrGridType = TCR_GRID_TYPE;
  _zephyrStore;
  _releaseId;
  i18nMessages = I18N_MESSAGES;
  _prevTreeId;
  selectRow = '';
  changeDetectionDebounce;
  constructor(private _tcrAction: TCRAction, private _notificationAction: NotificationAction, private cdr: ChangeDetectorRef, private _gridAction: GridAction,
              @Inject(PouchDBPrefsServices) private pouchDBSercvice: PouchDBPrefsServices) {

    this.gridPageSize = TCR_GRID_OPTIONS.rowCount;
    this._zephyrStore = ZephyrStore.getZephyrStore();
    this.selectedTreeNode = null;

    this.unsubscribe = this._zephyrStore.subscribe(() => {
      let state = this._zephyrStore.getState();
      this.currentPage = state.tcr.tcrGrid.currentPage;
      this.tcrGridColumns = _.cloneDeep(state.tcr.tcrGrid.columns);
      this.listViewColumns = _.cloneDeep(this.gridNewUI._gridOptions.columns);
      this.noData = state.tcr.tcrGrid.noData;
      this.paginationOptions = state.tcr.tcrGrid.paginationOptions;

      setTimeout(() => {

        if ('UPDATE_TESTCASES_BY_TREE_ID_SUCCESS' === state.tcr.tcrGrid.event) {
            this.repaintGrid();
            this._zephyrStore.dispatch(this._tcrAction.clearTCRGridEvent(null));

        }
        this.tcrGridRows = state.tcr.tcrGrid.rows;

        if(state.tcr.tcrGrid.event == 'CREATE_TESTCASE_SUCCESS') {
            this._zephyrStore.dispatch(this._tcrAction.clearTCRGridEvent(null));
            jQuery('#zee-create-edit-modal-tcr_6').modal('hide');
            this.selectFirstRow();
        }

        if(state.tcr.tcrGrid.event == 'DELETE_TESTCASE_SUCCESS') {
            this._zephyrStore.dispatch(this._tcrAction.clearTCRGridEvent(null));
            // For last row
            if (this.tcrGridRows.length && (state.tcr.tcrGrid.totalCount != 1 && this.tcrGridRows.length == 1) && (this.currentPage > 1)) {
                this.currentPage = this.currentPage - 1;
            }
            this.renderGridData();
            this.clearSelectedTctIds();
        }
        if(state.tcr.tcrGrid.event == 'CLEAR_GRID_SELECTION') {
            this._zephyrStore.dispatch(this._tcrAction.clearTCRGridEvent(null));
            this.clearSelectedTctIds();
        }

        if(state.tcr.tcrGrid.event == 'FETCH_TESTCASES_BY_TREE_ID_SUCCESS') {
            this._zephyrStore.dispatch(this._tcrAction.clearTCRGridEvent(null));

            setTimeout(() => {
              if (this.emitBrowseEvent) {
                this._zephyrStore.dispatch(this._tcrAction.setTCREventForBrowse());
              }
            }, 301);

            this.currentPage = state.tcr.tcrGrid.currentPage;

            if(this.isDetailView) {
                this.hideReset = true;

                this.tcrGridColumns.forEach((column) => {
                    column['show'] = false;
                    if(column['labelId'] === 'TCR_DETAIL_VIEW_COLUMN') {
                        column['show'] = true;
                    }
                });
                this.gridNewUI.onMultipleColumnSelection(this.tcrGridColumns, false);
            } else {
              this.hideReset = false;
            }
            if(this.tcrGridRows && this.tcrGridRows.length) {
                setTimeout(() => {
                    let grid_row;
                    if (this.testcaseId) {
                        grid_row = jQuery(`#tcr-grid .flex-bar[data-id="${this.testcaseId}"]`).trigger('click')[0];
                    } else {
                        grid_row = jQuery(`#tcr-grid .flex-bar:${this.selectRow || 'first'}`).trigger('click')[0];
                    }
                    this.selectRow = '';
                    if (grid_row) {
                        grid_row.scrollIntoView(false);
                    }
                }, 301);
            }
        }
        this.triggerChange();
      }, 301);
      setTimeout(() => {
          this.gridNewUI.attachDraggableUI();
      }, 100);
      this.triggerChange();
    });
  }

  repaintGrid() {
    jQuery('grid').find('.grid-content').css({display: 'none'});
    setTimeout(() => {
        jQuery('grid').find('.grid-content').css({display: 'block'});
    });
  }

  selectFirstRow() {
    setTimeout(() => {
      let grid_row = jQuery('#tcr-grid .flex-bar:last').trigger('click')[0];
      if (grid_row) {
        grid_row.scrollIntoView(false);
      } else {
        this.selectFirstRow();
      }
      jQuery('zephyr-inline-edit.zephyr-testcase-name').find('.zephyr-overlay-icon').trigger('click');
    }, 501);
  }

  ngOnInit() {
    if(this.selectedTreeNodeObs) {
      this.selectedTreeNodeObs.subscribe(x => {
        this.selectedTreeNode = x;
      });
    }
  }
  ngOnDestroy() {
    this.handleUnsubscription();
    // this.gridNewUI.onMultipleColumnSelection(this.gridNewUI._gridOptions.columns);
    this.unsubscribe();
  }
  ngAfterViewChecked() {
    this.toggleCheckboxSelection();
  }
  ngOnChanges(changedKey) {
    let isDetailViewChanged = changedKey['isDetailView'];
    if(isDetailViewChanged && (typeof isDetailViewChanged.currentValue == 'boolean') &&
    (typeof isDetailViewChanged.previousValue == 'boolean') &&
     (isDetailViewChanged.currentValue !== isDetailViewChanged.previousValue)) {
      if(this.isDetailView) {
        this.hideReset = true;
        this.tcrGridColumns.forEach((column) => {
          column['show'] = false;
          if(column['labelId'] === 'TCR_DETAIL_VIEW_COLUMN') {
            column['show'] = true;
          }
        });

        // this.gridNewUI.onMultipleColumnSelection(this.gridNewUI._gridOptions.columns);

        this.gridNewUI.onMultipleColumnSelection(this.tcrGridColumns, false);
        if (this.tcrGridRows && this.tcrGridRows.length && !this.isDetailView) {
          jQuery('#tcr-grid .flex-bar:first').trigger('click');
        }
      } else {
        this.hideReset = false;

        this.pouchDBSercvice.getValue('grid', this._tcrGridType, (doc) => {
          this.gridNewUI.setColumnsAfterFetch(doc);
        }, () => {
          this._zephyrStore.dispatch(this._gridAction.resetInitialGridState(this._tcrGridType));
        });

      }
    }
  }
  updateGridPageSize(value) {
    this.gridPageSize = value;
    this._zephyrStore.dispatch(this._tcrAction.updateGridSize('tcrGrid', value));
  }
  initGridData() {
    let size = this.gridPageSize;
    let currentPage = this.currentPage;
    this._zephyrStore.dispatch(this._tcrAction.clearTcrGridData({currentPage, size}, TCR_GRID_TYPE));
  }
  clearSelectedTctIds() {
    this.selectedTctIds = [];
    this.secIds = [];
    this.onClearSelectedTctIds.emit(this.selectedTctIds);
  }
  renderGridData() {
    this.fetchTestcases();
    setTimeout(() => {
      this._zephyrStore.dispatch(this._tcrAction.clearTCRGridEvent(null));
    });
  }
  clearGridRows() {
    this.tcrGridRows = [];
    // this.gridNewUI.ngOnDestroy();
  }
  tcrGridColumnChooserClick(target) {
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
    this._zephyrStore.dispatch(this._tcrAction.configureTcrGridColumn(data));
  }
  tcrGridRowClick(targetRow) {
    let index = targetRow.dataset.index;
    let testcaseObject = this.tcrGridRows[index];
    if(!testcaseObject || !testcaseObject['id']) {
      return;
    }
    setTimeout(() => {
        this.onTcrGridRowClick.emit({
          id: testcaseObject['id'],
          index: index,
          testcaseId: testcaseObject['testcase']['id']
        });
    }, 501);
  }
  tcrGridMouseEnter() {
    if(!this._zephyrStore.getState().tcr.tcrGrid.rows.length) {
      return;
    }
    this._zephyrStore.dispatch(this._tcrAction.configureTcrGridColumn({
      'columnId': 'testcase_select',
      'isChecked': true
    }));
  }
  tcrGridMouseLeave() {
    this._zephyrStore.dispatch(this._tcrAction.configureTcrGridColumn({
      'columnId': 'testcase_select',
      'isChecked': false
    }));
  }
  tcrGridRowSelection(value) {
    this.selectedTctIds = value[0] || [];
    this.secIds = value[1] || [];
    this.onTcrGridRowSelection.emit(value);
  }
  fetchTest(page?) {
    this.currentPage = page || 1;
    this.fetchTestcases();
  }

  tcrGridPrevClick(value) {
    if (!this.bubblePagination) {
      if(this.isSearchView) {
        this.currentPage = value;
        if(this.searchOffset >= this.gridPageSize) {
          this.searchOffset = this.gridPageSize * (this.currentPage - 1);
          this.fetchTestcasesOnSearch(this.searchText, null, null, true);
        }
      } else {
        this.selectRow = 'last';
        this.fetchTest(value);
      }
    } else {
        this.currentPage = value;
        this.GridIndexPagination.emit(value);
    }
  }

  tcrGridNextClick(value) {
    if (!this.bubblePagination) {
      if(this.isSearchView) {
        this.currentPage = value;
        this.searchOffset = this.gridPageSize * (this.currentPage - 1);
        this.fetchTestcasesOnSearch(this.searchText, null, null, true);
      } else {
        this.selectRow = 'first';
        this.fetchTest(value);
      }
    } else {
        this.currentPage = value;
        this.GridIndexPagination.emit(value);
    }

  }

  tcrGridPageSizeChange(value) {

    if (!this.bubblePagination) {
      this.gridPageSize = value;

      if(this.isSearchView) {
        this.currentPage = 1;
        this.searchOffset = this.gridPageSize * (this.currentPage - 1);
        this.fetchTestcasesOnSearch(this.searchText, this.releaseId);
      } else {
        this.selectRow = 'first';
        this.fetchTest(1);
      }
    } else {
      this.GridPageSizeChanged.emit(value);
    }
  }
  tcrGridPaginateByIndex(value) {
    if (!this.bubblePagination) {
      if(this.isSearchView) {
        this.currentPage = value;
        this.searchOffset = this.gridPageSize * (this.currentPage - 1);
        this.fetchTestcasesOnSearch(this.searchText, this.releaseId, null, true);
      } else {
        if(!this.selectedTreeNode) {
          return;
        }
        this.selectRow = 'first';
        this.fetchTest(value);
      }
    } else {
      this.GridIndexPagination.emit(value);
    }
  }
  fetchTestcasesOnUpdate() {
    if(this.isSearchView) {
      this.fetchTestcasesOnSearch(this.searchText);
    } else {
      if(!this.selectedTreeNode) {
        return;
      }
      this.fetchTestcases();
    }
  }
  /**
   * Based on disableCheckbox,
   * enable/disable the testcase selection chekbox
   */
  toggleCheckboxSelection() {

    jQuery('#zui-freeform-testcase-add-grid-wrapper')
      .find('input[type=checkbox].grid_checkbox_all, input[type=checkbox].grid_checkbox').prop('disabled', this.disableCheckbox);
  }
  fetchTestcases() {
    let curMetadata = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.TESTCASE, this.selectedTreeNode, '');
    let prevMetadata;
    if(this._prevTreeId) {
      prevMetadata = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.TESTCASE, this._prevTreeId, '');
    }
    this._prevTreeId = this.selectedTreeNode;

    this._zephyrStore.dispatch(this._tcrAction.fetchTestCasesOnTreeClick({
      treeId: this.selectedTreeNode,
      pageSize: this.gridPageSize,
      offset: this.gridPageSize * (this.currentPage - 1),
      currentPage: this.currentPage,
      order: this.orderColumn,
      isascorder: this.isAscOrder
    }));

    if (this.appId) {
      NotificationStore.getNotificationStore().dispatch(this._notificationAction.subscribeToTopic(curMetadata,prevMetadata,this.appId));
    }
  }

  onSort(event) {
    this.isAscOrder = event.sortType === 'asc';

    // this code is for to check sort by customfield.
    let isCustomfieldCheck = event.key.split('.')[1];
    this.orderColumn = isCustomfieldCheck === 'customProperties' ? event.key : isCustomfieldCheck;

    this.fetchTestcases();
  }

  handleUnsubscription() {
    if (this.appId && this.selectedTreeNode) {
        let curMetadata = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.TESTCASE,this.selectedTreeNode,'');
        NotificationStore.getNotificationStore().dispatch(this._notificationAction.unSubscribeFromTopic(curMetadata,this.appId));
    }

  }
  fetchTestcasesOnSearch(value, releaseId?, projectId?, isPagination?) {
    let queryParams = {
      'firstresult': this.searchOffset,
      'maxresults': this.gridPageSize,
      'currentPage': this.currentPage,
      'size': this.gridPageSize,
      'entityType': 'testcase'
    }, searchType = 'testcases';

    if (projectId) {
      queryParams['projectId'] = projectId;
    }

    if (this.inRelease) {
      queryParams['releaseId'] = this.releaseId;
    }

    queryParams['isZql'] = this.isAdvancedSearch;

    if (value) {
      queryParams['word'] = value;
    }
    this._zephyrStore.dispatch(this._tcrAction.fetchTestCasesOnSearch(queryParams, TCR_GRID_TYPE, isPagination));
  }
  uncheckGridCheckboxAll(deselectAll) {
    this.clearSelectedTctIds();

    if(deselectAll) {
      this.gridNewUI.deselectAllCheckbox();
    }
  }
  triggerChange() {
      if (this.changeDetectionDebounce) {
          clearTimeout(this.changeDetectionDebounce);
      }
      let firstDetection = !this.changeDetectionDebounce;
      this.changeDetectionDebounce = setTimeout(() => {
        this.changeDetectionDebounce = null;
        if(this.cdr) { this.cdr.markForCheck(); }
      }, firstDetection ? 50: 300);
  }

  showTestcaseCoverage(event) {
    if (this.showCoverage) {
      let index = jQuery(event.target).parents('.flex-bar').index();
      this.coverageRequirementIds = this.tcrGridRows[index]['testcase']['requirementIds'];

      setTimeout(() => {
        jQuery('#zee-coverage-modal').modal('show');

        if (this.coverageComponent) {
          this.coverageComponent.ngOnChanges();
        }
      }, 100);
    }
  }

}
