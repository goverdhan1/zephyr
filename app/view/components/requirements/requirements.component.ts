import {
  ViewContainerRef, ComponentFactoryResolver, Component, ViewChild, Injector, AfterViewInit, OnDestroy,
  Compiler, Inject, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';

import {Router, ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Rx';

import {Resizable} from '../../../utils/scripts/resizable';
import {constructNotificationStoreMetadata, checkIfNotificationIsPending} from '../../../utils/notification/notification.util';
import {RequirementDetailsComponent} from './requirement_details.component';
import {GridComponent} from '../grid/grid.component';
import {ReqContextMenu} from './tree/requirements_contextMenu';

import {GridAction} from '../../../actions/grid.action';
import {RequirementsAction as ReqAction} from '../../../actions/requirements.action';
import {ReleaseAction} from '../../../actions/release.action';
import {GlobalAction} from '../../../actions/global.action';
import {DefectsAction} from '../../../actions/defects.action';
import {NotificationAction} from '../../../actions/notification.action';
import {ToastrService} from '../../../services/toastr.service';

// Constants
import { REQ_GRID_TYPE, REQ_GRID_PAGINATION } from './req_grid.constant';
import * as GRID_CONSTANTS from '../grid/grid.constant';
import {REQ_OPERATION_OPTIONS, REQ_OPERATION_CONSTANTS} from './operations/requirement_operations.constant';
import {NEXT_RECORD, PREV_RECORD} from '../common/paginator/paginator.constant';
import {NOTIFICATION_APP_CONSTANTS, NOTIFICATION_ENTITY_CONSTANTS} from '../../../utils/constants/notification.constants';
import {I18N_MESSAGES} from '../../../utils/messages/messages.en';
import {FETCH_REQUIREMENT_PATH_SUCCESS, FETCH_REQ_GRID} from '../../../utils/constants/action.events';
import {ZEE_NAV_COLUMNS} from '../projects/project_leftnav.data';

import {JIRA_REQUIREMENT_TYPE} from '../../../utils/constants/application.constants';

import {NotificationStore} from '../../../store/notification.store';
import {ZephyrStore} from '../../../store/zephyr.store';
import {TCR_COVERAGE_GRID_TYPE, TCR_GRID_TYPE} from "../tcr/tcr_grid.constant";
import {CoverageGridComponent} from "../common/coverage-grid/coverage-grid.component";
import {Subscription} from "rxjs/Subscription";
import {Http} from "@angular/http";

declare var jQuery: any, _;
var req_self;

@Component({
    selector: 'zee-test-requirements',
    templateUrl: 'requirements.html',
    viewProviders: [ReqAction, GridAction, ReleaseAction, GlobalAction, NotificationAction, DefectsAction],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class RequirementsComponent implements AfterViewInit, OnDestroy {
    @ViewChild('target', {read: ViewContainerRef}) target : ViewContainerRef;
    @ViewChild(RequirementDetailsComponent) reqDetailsComponent: RequirementDetailsComponent;
    @ViewChild(GridComponent) grid: GridComponent;
    @ViewChild(CoverageGridComponent) coverageComponent: CoverageGridComponent;
    httpEndSubscriber: Subscription;

    isAscOrder = true;
    sortColumn = 'id';
    isPanelCollapsed= false;
    isDetailView= false;
    expandTree= false;
    _isMobile= false;
    mobileNavigation = {
      showTree: false,
      showGrid: false,
      showTestcase: false
    };
    selectedReqIds = [];
    isFromApplyNotification;
    _currentNode;
    lastReqId;
    toggleForDetails = true;
    breadCrumbsList: Array<Object>;
    projectId = 1;
    releaseId;
    navColumns;
    resizable;
    selectedTreeId;
    prevSelectedTreeId;
    previousURLParams;
    treeData: Array<Object>;
    contextMenuItems;
    reqGridColumns: Array<Object>;
    reqGridRows: Array<Object> = [];
    viewReqGridRows: Array<Object> = [];
    isFirstPage: boolean;
    isLastPage: boolean;
    isMenuShown;
    reqId;
    isAdvancedSearch;
    selectedNode;
    createNode;
    deleteNode;
    renameNode;
    treeSelector;
    reqImportTestOptions = REQ_OPERATION_OPTIONS;
    reqConstants = REQ_OPERATION_CONSTANTS;
    isSearchView = false; // Intially folder tree view is displayed
    searchOffset = 0;
    searchText = '';
    paramSub;
    releases;
    currentRecord = 1;
    totalRecords;
    paginationOptions = REQ_GRID_PAGINATION;
    reqContextMenu;
    inRelease = true;
    treeType;
    parenttype;
    appId;
    defectSystemType;
    firstTimeSelect = false;
    syncClicked = false;
    _pageFromNotification;
    _reqPathFetch=false;
    _treeFetch=false;
    _prevReqId;
    _tcrGridType = TCR_COVERAGE_GRID_TYPE;
    coverageTestcaseIds = [];
    i18nMessages = I18N_MESSAGES;
    _reqGridType = REQ_GRID_TYPE;
    gridPageSize = GRID_CONSTANTS.GRID_ROW_COUNT_DEFAULT;
    currentPage;
    _zephyrStore;
    _notificationStore;
    details_editable;
    isGlobal;
    isImported;
    unsubscribe;
    selectFilter = undefined;
    filterCriteria = {a_attr: 'data-parenttype', value: 'global'};
    selectRow = '';
    forceSelect;
    changeDetectionDebounce;
    threshold = null;
    offset;
    dropExternal = {
        scope: 'requirement'
    };
    doAllocate = {
        source: 'global',
        target: 'release'
    };
    syncMessages = {
      'success' : 'Syncing completed successfully',
      'failure' : 'Syncing failed'
    };

    constructor(public router: Router, private _gridAction: GridAction, private route: ActivatedRoute,
        private injector: Injector, private _reqAction: ReqAction, private resolver: ComponentFactoryResolver,
        @Inject(Http) private _http : any,
        private _releaseAction: ReleaseAction, private _globalAction : GlobalAction, private _defectsAction : DefectsAction,
        private _notificationAction: NotificationAction, private compiler: Compiler, target: ViewContainerRef, @Inject(ToastrService) private toastrService: ToastrService,
        private cdr: ChangeDetectorRef) {
        req_self = this;
        this.appId = NOTIFICATION_APP_CONSTANTS.REQUIREMENT_APP.name;
        this._notificationStore = NotificationStore.getNotificationStore();

        this.target = target;
        this.navColumns = ZEE_NAV_COLUMNS;
        this.contextMenuItems = {};
        this._zephyrStore = ZephyrStore.getZephyrStore();
        this.unsubscribe = this._zephyrStore.subscribe(() => {

            let state = this._zephyrStore.getState();
            let reqStateEvent = state.requirements.event;
            let defectSystem = state.global.defectSystem;
            if(defectSystem && defectSystem['systemType']) {
                this.defectSystemType = defectSystem['systemType'];
            }

            this.selectFilter = this.isGlobal ? this.filterCriteria : undefined;

            if(reqStateEvent === 'FETCH_REQ_TREE_DATA_SUCCESS') {
              this.setTreeData(state.requirements.treeData);
              this.setLeftNavData(state);
              this._zephyrStore.dispatch(this._reqAction.clearReqEvent());
              this.releases = state.release.releases;
              this.setReleasesDropdown(this.releases);
            }

            if (state.requirements.selectNode) {
                this.forceSelect = state.requirements.selectNode;
                this._zephyrStore.dispatch(this._reqAction._onSelectReqNode(null));
                setTimeout(() => {
                    this.forceSelect = null;
                }, 1000);
            }

            let size = state.requirements.reqGrid.size;

            if (state.requirements.dataLoaded) {
              this.totalRecords = state.requirements.reqGrid.totalCount;
              this.currentPage = state.requirements.reqGrid.currentPage;
              this.isFirstPage = state.requirements.reqGrid.isFirstPage;
              this.isLastPage = state.requirements.reqGrid.isLastPage;
              this.reqGridColumns = state.requirements.reqGrid.columns;
              this.paginationOptions = state.requirements.reqGrid.paginationOptions;

              let rows = JSON.parse(JSON.stringify(state.requirements.reqGrid.rows));
              this.reqGridRows = rows;
              this.viewReqGridRows = state.requirements.reqGrid.rows;

              if (reqStateEvent === FETCH_REQ_GRID) {
                this._zephyrStore.dispatch(this._reqAction.clearReqEvent());
                this.reqDetailsComponent.hideReqDetails();
                if (!this.viewReqGridRows.length) {
                  this.currentPage = Math.ceil(this.totalRecords / size);
                  this.fetchRequirements(this.currentPage);
                }
                this.selectRow = 'last';
                this.triggerChange();
              }

              if (this.selectRow) {
                let selectRow = this.selectRow;
                this.selectRow = '';

                let lastId = this.lastReqId;
                this.lastReqId = null;

                setTimeout(() => {

                  if (lastId) {

                    let index = _.findIndex(this.viewReqGridRows, {id: lastId});
                    jQuery(`#grid-table-req .flex-bar:nth-child(${index + 1})`).trigger('click');

                  } else {
                    let gridRow = jQuery(`#grid-table-req .flex-bar:${selectRow}`).trigger('click')[0];
                    if (gridRow) {
                      gridRow.scrollIntoView(false);
                    }
                  }
                  this.triggerChange();
                }, 501);

              }

              this._zephyrStore.dispatch(this._reqAction.clearReqFlag());

              setTimeout(() => {
                this.setGridDrag();
                this.triggerChange();
              }, 301);
            }

            let reqObj;

            if(reqStateEvent == FETCH_REQUIREMENT_PATH_SUCCESS) {
              this._zephyrStore.dispatch(this._reqAction.clearReqEvent());
              if(state.requirements['reqPaths']) {
                let index = state.requirements['reqPaths']['index'];
                this._pageFromNotification = Math.floor(index / this.gridPageSize) + 1;
                this._reqPathFetch = true;
                this.navigateReqOnNotification();
              }
            }

            if('REQ_DT_JIRA_USER_UPDATE' === reqStateEvent) {
                this._zephyrStore.dispatch(this._reqAction.clearReqEvent());
                this.reqSyncCallback();
            }

            if('CLEAR_REQ_GRID_SELECTION' === reqStateEvent) {
                this._zephyrStore.dispatch(this._reqAction.clearReqEvent());
                this.clearSelectedReqIds();
            }

            if ('FETCH_JIRA_REQUIREMENT' === reqStateEvent) {
                // reqStateEvent will be cleared on UPDATE_REQ_OBJ

                if (this.threshold) {
                  clearTimeout(this.threshold);
                }

                this.threshold = setTimeout(() => {
                  reqObj = this.reqGridRows.filter(item => item['id'] === this.reqId)[0];
                  if (reqObj) {
                    reqObj['details'] = state.requirements.jiraDetails;
                    this._zephyrStore.dispatch(this._reqAction.updateReqObj(reqObj, this.releaseId));
                  }
                }, 10);
            }

            if(reqStateEvent === 'CREATE_REQ_SUCCESS') {
                this._zephyrStore.dispatch(this._reqAction.clearReqEvent());
                let reqid = state.requirements.reqObj.id;
                setTimeout(() => {
                  // set the added row as default select
                  jQuery('#grid-table-req .flex-bar').removeClass('selected-row').filter(`[data-id="${reqid}"]`).addClass('selected-row').trigger('click');

                  let gridRow = document.getElementsByClassName('flex-bar selected-row')[0];
                  if (gridRow) {
                    gridRow.scrollIntoView(false);
                    jQuery('zephyr-inline-edit.zephyr-testcase-name').find('.zephyr-overlay-icon').trigger('click');
                  }
                }, 500);
            }

            let currId = jQuery('#grid-table-req').find('.flex-bar.selected-row').data('id');

            if(reqStateEvent === 'UPDATE_REQ_OBJ') {
              this._zephyrStore.dispatch(this._reqAction.clearReqEvent());

              setTimeout(() => {
                let reqId = state.requirements.reqObj.id;
                reqObj = this.reqGridRows.filter(item => item['id'] === reqId)[0];

                if (reqObj) {
                  if (String(reqId) === String(currId)) {
                    reqObj = JSON.parse(JSON.stringify(state.requirements.reqObj));
                    if (this.reqDetailsComponent) {
                      this.reqDetailsComponent.onReqDetailsUpdate(reqObj, this.releaseId);
                    }
                    jQuery('#grid-table-req').find(`.flex-bar[data-id=${reqId}]`).addClass('selected-row');
                  }

                }

                this.triggerChange();
                //Repainting grid
                this.repaintGrid();
              }, 52);
            }

            if(reqStateEvent === 'SYNC_REQ_NODE_SUCCESS') {
                this._zephyrStore.dispatch(this._reqAction.clearReqEvent());
                jQuery('#reqSyncNodeModal').modal('hide');
                jQuery('.modal-backdrop').remove();
                jQuery('#reqSyncNodeModal').remove();
                jQuery('#' + this.selectedNode[0] + '> a').trigger('click');
            }
            if ('FETCH_RELEASES_AND_PROJECT' === reqStateEvent) {
                this._zephyrStore.dispatch(this._reqAction.clearReqEvent());
                this.fetchTreeDataWithReleaseDetails(state);
            }

            this.triggerChange();
      });

      this.paramSub = this.route.params.subscribe(params => {
        this.setURLParams(params);
      });

      this.httpEndSubscriber = this._http.httpCallCompletedObservable.subscribe(() => {

        if (this.reqId) {
            let index = _.findIndex(this.viewReqGridRows, {id: this.reqId});

            setTimeout(() => {
              jQuery(`#grid-table-req .flex-bar:nth-child(${index + 1})`).trigger('click');
            }, 10);

        }

      });

    }

    getURLQueryParams() {
      let _qParams = {};

      if(this.selectedTreeId) {
        _qParams['treeId'] = this.selectedTreeId;
      }

      if(this.reqId) {
        _qParams['reqId'] = this.reqId;
      }

      _qParams['pageSize'] = this.paginationOptions.size;
      _qParams['pageView'] = this.isSearchView ? 'search' : 'folder';
      if(this.isSearchView) {
        _qParams['searchText'] = this.searchText || '';
        _qParams['searchType'] = this.isAdvancedSearch ? 'zql': 'text';
        _qParams['inRelease'] = this.inRelease;
      }
      _qParams['offset'] = this.gridPageSize * (this.currentPage - 1);

      if(this.currentRecord) {
        _qParams['currentIndex'] = this.currentRecord;
      }
      _qParams['isGlobal'] = this.isGlobal;

      return _qParams;
    }

    updateRouteUrl() {
      let _urlParams = this.getURLQueryParams();
      this.previousURLParams = _urlParams;
      this.router.navigate(['requirements', this.releaseId, _urlParams]);

    }

    setURLParams(params) {
      this.releaseId = params['id'];

      if(params['treeId']) {
        this.selectedTreeId = +params['treeId'];
        this.isGlobal = JSON.parse(params['isGlobal'] || 'false');
        this.selectFilter = this.isGlobal ? this.filterCriteria : undefined;

        if(params['reqId']) {
          this.reqId = +params['reqId'];
          this.lastReqId = +params['reqId'];
        } else {
          this.reqId = null;
        }

      } else {
        this.selectedTreeId = null;
      }

      this.offset = +(params.offset || '0');

      if(params['pageView']) {

        if(params['pageSize']) {
          this.gridPageSize = +params['pageSize'];
        }

        this.currentRecord = +params['currentIndex'];
        this.isSearchView = params['pageView'] === 'search';

        if(this.isSearchView) {
          this.searchText = params['searchText'] || '';
          this.isAdvancedSearch = params['searchType'] === 'zql';
          this.inRelease = JSON.parse(params.inRelease || 'true');

          if (this.searchText) {
            this.onSearchGo({
              value: this.searchText,
              isAdvancedSearch: this.isAdvancedSearch
            });
          }
        }

      }

    }

    repaintGrid() {
        jQuery('grid').find('.grid-content').css({display: 'none'});
        setTimeout(() => {
            jQuery('grid').find('.grid-content').css({display: 'block'});
        });
    }
    setGridDrag() {
        if (this.isGlobal || this.isImported) {
            this.grid.attachDraggableUI();
        } else {
            this.grid.cancelDraggable();
        }
    }
    clearSelectedReqIds() {
        this.selectedReqIds = [];
        this.reqId = null;
    }
    applyNotifications(ev) {
        this._pageFromNotification = '';
        this.isFromApplyNotification = 'NOTIFICATION_START';
        this._treeFetch = false;
        this._reqPathFetch = false;
        this._prevReqId = this.reqId;
        this._zephyrStore.dispatch(this._reqAction.clearReqGridData());
        this.fetchTreeDataWithReleaseDetails(this._zephyrStore.getState());
        this.reqDetailsComponent.hideReqDetails();
        this._notificationStore.dispatch(this._notificationAction.applyNotification(this.appId,true));
        if(this.reqId) {
          this._zephyrStore.dispatch(this._reqAction.fetchRequirementPathByID(this.reqId, this.releaseId));
        }
        if(this.selectedTreeId && this.isFromApplyNotification == 'NOTIFICATION_START') {
          this.isFromApplyNotification = 'NOTIFICATION_REQ_FETCH';
          this.onreqTreeClick(this._currentNode);
          this._treeFetch = true;
          this.navigateReqOnNotification();
        }
    }
    checkIfNotificationIsPending() {
      return checkIfNotificationIsPending(this.appId, NOTIFICATION_ENTITY_CONSTANTS.REQUIREMENT_TREE, '', this.releaseId);
    }
    navigateReqOnNotification() {
        if(this._treeFetch && this._reqPathFetch && this._pageFromNotification) {
            setTimeout(() => {
                this.reqGridNextClick(this._pageFromNotification);
                this._pageFromNotification = '';
                // self.isFromApplyNotification = '';
                setTimeout(() => {
                    jQuery('.req-grid-table .flex-bar[data-id="' + this._prevReqId + '"]').trigger('click');
                },250);
            },20);
            this._treeFetch = false;
            this._reqPathFetch = false;
        }
    }
    ngAfterViewInit() {
        this.reqContextMenu = new ReqContextMenu(this.target, this.resolver, this._reqAction,
            this._zephyrStore, this.releaseId, this.appId, this._notificationAction, this.releaseId);

        this.initResizable();

        let state = this._zephyrStore.getState();

        if (Array.isArray(state.release.releases) && state.release.releases.length && state.project.id) {
            this._zephyrStore.dispatch(this._releaseAction._fetchReleaseAndProject(state.release.releases, state.project.id));
        }
        this.reqDetailsComponent.hideReqDetails();
        this._notificationStore.dispatch(this._notificationAction.applyNotification(this.appId, true));
    }
    handleRequirementSubscription() {
      if(this.selectedTreeId && this.appId) {
        let metadata = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.REQUIREMENT, this.selectedTreeId, '');
        let prevMeta;
        if(this.prevSelectedTreeId) {
            prevMeta = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.REQUIREMENT, this.prevSelectedTreeId, '');
        }
        this.prevSelectedTreeId = this.selectedTreeId;
        this._notificationStore.dispatch(this._notificationAction.subscribeToTopic(metadata, '', this.appId));
      }
    }
    handleTreeSubscription() {
        if(this.releaseId && this.appId) {
            let metadata = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.REQUIREMENT_TREE,
                this.projectId, this.releaseId);
            this._notificationStore.dispatch(this._notificationAction.subscribeToTopic(metadata, '', this.appId));
        }
    }
    handleUnsubscription() {
      if(this.releaseId && this.appId) {
        let metadata = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.REQUIREMENT_TREE, this.projectId, this.releaseId);
        this._notificationStore.dispatch(this._notificationAction.unSubscribeFromTopic(metadata, this.appId));
      }
      if(this.prevSelectedTreeId && this.appId) {
        let metadata = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.REQUIREMENT, this.prevSelectedTreeId, '');
        this._notificationStore.dispatch(this._notificationAction.unSubscribeFromTopic(metadata, this.appId));
      }
    }
    ngOnDestroy() {
        this._zephyrStore.dispatch(this._reqAction.clearReqGridData());
        this.handleUnsubscription();
        this.unsubscribe();

        if (this.paramSub) {
          this.paramSub.unsubscribe();
        }
    }

    initResizable() {
        this.resizable = new Resizable();
        this.resizable.attachResizable(jQuery('.zui-flex-h-resizable'), jQuery('.zui-w-handle'), {
            lockHeight: true,
            minWidth: jQuery('.zui-flex-h-resizable').outerWidth(),
            maxWidth: 500,
        });

        this.resizable.attachResizable(jQuery('.zui-flex-v-resizable'), jQuery('.zui-s-handle'), {
            lockWidth: true,
            maxHeight: 600
        });
    }
    reqSyncCallback() {
        req_self.syncClicked = true;
        req_self._zephyrStore.dispatch(req_self._defectsAction.getDefectUser());
    }
    reqContextMenuItems() {
        return req_self.reqContextMenu.contextMenuItems(req_self.selectedNode, req_self.treeSelector, req_self.isGlobal, req_self.isImported,
            req_self.reqSyncCallback);
    }
    onTreeNodeDrag(event) {
        if (event.showAllocate) {
            jQuery('.js-blur-wrapper').addClass('blur-overlay-partial');
        }
    }
    onTreeNodeDrop() {
        jQuery('.js-blur-wrapper').removeClass('blur-overlay-partial');
    }
    onReqNodeDragAndDrop(data) {
        if (jQuery(`[data-id=${data.sourceNodeId}]`).parent().hasClass('operation-disabled')) {
            jQuery(`[data-id=${data.sourceNodeId}]`).parent().removeClass('operation-disabled');
            return;
        }
        if(this.checkIfNotificationIsPending()) {
          this._zephyrStore.dispatch(this._notificationAction.handlePendingNotificationError());
          return;
        }
        data.targetNodeReleaseId = data.targetNodeReleaseId || 0 === data.targetNodeReleaseId ? data.targetNodeReleaseId : this.releaseId;
        if(data.operation === 'move_node') {
            this._zephyrStore.dispatch(this._reqAction.moveReqNode(data));
        } else if(data.operation === 'copy_node') {
            this._zephyrStore.dispatch(this._reqAction.copyReqNode(data));
        } else if (data.operation === 'allocate') {
            this._zephyrStore.dispatch(this._reqAction.allocateReqNode(data.sourceNodeId, data.targetNodeReleaseId));
        }
    }
    checkCb(operation, node, node_parent, node_position, more) {

        if ('move_node' === operation) {
            // for global node, do not drop onto imported nodes (copy/move for global nodes, allocate for local nodes)
            if ('global' === (node.a_attr || {})['data-parenttype'] && 'import' === (node_parent.a_attr || {})['data-parenttype']) {
                jQuery(`#${node.id}`).addClass('operation-disabled');
                return false;
            }
        }

        // do not allow drop onto imported node or on the invisible jstree root node
        if ('import' === (node_parent.a_attr || {})['data-parenttype'] || '#' === node_parent.id) {
            jQuery(`#${node.id}`).addClass('operation-disabled');
            return false;
        }

        jQuery(`#${node.id}`).removeClass('operation-disabled');
        return true;
    }
    onTreeDrop(ev) {

        // global rows can be copied/moved only onto global nodes, allocated onto local nodes
        // imported rows can be copied/moved onto global nodes and local nodes

        if (('global' === ev.parentType || 'release' === ev.parentType) && (this.isGlobal || this.isImported)) {
            let isRelease = 'release' === ev.parentType;
            if ('copy' === ev.operation) {
                this._zephyrStore.dispatch(this._reqAction.copyRequirement(this.selectedTreeId, ev.dropId, ev.dragId, this.releaseId, isRelease));
            } else if ('allocate' === ev.operation) {
                this._zephyrStore.dispatch(this._reqAction.allocateRequirement(this.releaseId, ev.dragId));
            } else if ('move' === ev.operation) {
                let grid = this._zephyrStore.getState().requirements.reqGrid;
                this._zephyrStore.dispatch(this._reqAction.moveRequirement(this.selectedTreeId, ev.dropId, ev.dragId, this.releaseId, grid.offset, grid.size, grid.currentPage, isRelease));
            }
        }
    }
    dragCb(nodes, event) {
        // do not allow drag of local nodes, or root nodes
        return nodes.every(item => {
            return 'release' !== (item.a_attr || {})['data-parenttype'] && '#' !== item.parent;
        });
    }
    fetchTreeDataWithReleaseDetails(state) {

        this.projectId = state.requirements.projectId;
        this.handleTreeSubscription();
        let selectedRelease = _.find(state.requirements.releases, ['id', Number(this.releaseId)]);

        this._zephyrStore.dispatch(this._reqAction.fetchTreeDataWithReleaseDetails(this.releaseId, this.projectId, true, selectedRelease));

    }
    onBreadCrumbClick(ev) {
        let target = ev.target;
        if ('parent' === target.dataset.type) {
            if ('Imported' !== target.innerText) {
                this.router.navigateByUrl('/release/' + this.releaseId);
            }
        } else {
            if (target.dataset.nodeid) {
                jQuery('.tree-tcr').find('[data-id=' + target.dataset.nodeid + ']').trigger('click');
            }
        }
    }
    treeInstance(ev) {
        this.treeSelector = ev;
    }
    setTreeData(data) {
        if(!this.isFromApplyNotification) {
            this.treeData = data;
        } else {
            data.redrawTree = false;
            this.treeData = data;
        }
    }
    clearTreeUpdate () {
        this.createNode = null;
        this.deleteNode = null;
        this.renameNode = null;
    }
    onreqTreeClick(target) {
        this._currentNode = JSON.parse(JSON.stringify(target));
        this.selectedTreeId = target.selectedNodeId;
        this.breadCrumbsList = target.bCrumbData;
        this.selectedNode = target.selectedNode;
        this.treeType = target.type;
        this.parenttype = target.parenttype;

        this.details_editable = 'import' !== target.type;

        this._zephyrStore.dispatch(this._reqAction.clearReqGridData());
        this.reqDetailsComponent.hideReqDetails();

        let anchorName = target.bCrumbData[0].text;

        this.isGlobal = 'Global' === anchorName;
        this.isImported = 'Imported' === anchorName;

        if(!this.selectedTreeId) {
            this.isMenuShown = false;
            this.reqGridRows = [];
            // this.grid.clear();
            return;
        }
        this.isMenuShown = true;

        if (!target.showMenu) {
            this.selectRow = 'first';
            this.offset = 0;
            this.currentRecord = 1;
        }
        this.clearSelectedReqIds();
        this._zephyrStore.dispatch(this._reqAction._clearGridSelection());
        let page = this.offset ? (this.offset / this.gridPageSize) + 1 : 1;
        this.fetchRequirementsOnTree(page);
        this.handleRequirementSubscription();
        this.updateRouteUrl();
    }
    reqGridRowClick(target) {
        let index = Number(target.dataset.index);
        this.currentRecord = ((this.currentPage - 1) * this.gridPageSize) + index + 1;

        let reqDetails = this.reqGridRows[index];
        if(!reqDetails) {
            return;
        }
        this.reqId = reqDetails['id'];

        if (JIRA_REQUIREMENT_TYPE === reqDetails['requirementType'] && !reqDetails.hasOwnProperty('details') &&
            this.defectSystemType && Number(this.defectSystemType) === reqDetails['requirementType']) {

            this._zephyrStore.dispatch(this._reqAction.getJiraDescription(reqDetails['externalId']));
        } else {
            setTimeout(() => {
              if (this.reqDetailsComponent) {
                this.reqDetailsComponent.onReqDetailsUpdate(reqDetails, this.releaseId);
                // this.reqDetailsComponent.onReqDetailsUpdate(reqObj, this.releaseId);
              }
                this.triggerChange();
            }, 301);
        }

      setTimeout(() => {
        jQuery('.zephyr-editable-field').addClass('active');
        jQuery('.zephyr-editable-field .zephyr-inline-field-name').focus();
      },200);

      this.updateRouteUrl();
    }

    onSort($event) {
      this.sortColumn = $event.key;
      this.isAscOrder = $event.sortType === "asc";
      this.fetchRequirements(this.currentPage);
    }

    showReqCoverage(event) {
      let index = jQuery(event.target).parents(".flex-bar").index();
      this.coverageTestcaseIds = this.viewReqGridRows[index]['testcaseIds'];

      setTimeout(() => {
        jQuery('#zee-coverage-modal').modal('show');
        this.coverageComponent.ngOnChanges(null);
      }, 301);
    }

    reqGridRowSelection(value) {
      // if (value.length) {
      //   let index = value[value.length - 1];
      //
      //   if (!this.selectedReqIds.length) {
      //     this.reqGridRowClick(jQuery("#grid-table-req").find(`[data-id=${index}]`));
      //   }
      // }

      this.selectedReqIds = value || [];
      this.setGridDrag();
    }
    reqGridPrevClick(value) {
        this.selectRow = 'last';
        this.fetchRequirements(value);
    }
    reqGridNextClick(value) {
        this.selectRow = 'first';
        this.fetchRequirements(value);
    }
    reqGridPaginateByIndex(value) {
        this.selectRow = 'first';
        this.fetchRequirements(value);
    }
    reqGridPageSizeChange(value) {
        this.gridPageSize = value;
        this.selectRow = 'first';
        this._zephyrStore.dispatch(this._reqAction._clearGridSelection());
        this.fetchRequirements(1);
    }
    fetchRequirements(value) {
        if(this.isSearchView) {
            this.fetchRequirementOnSearch(value);
        } else {
            this.fetchRequirementsOnTree(value);
        }

        this.updateRouteUrl();
    }
    fetchRequirementOnSearch(page, isSearch = false) {
        this.currentPage = page;
        this.searchOffset = this.gridPageSize * (page - 1);

        let queryParams = {
            'firstresult': this.searchOffset,
            'maxresults': this.gridPageSize,
            'currentPage': this.currentPage,
            'size': this.gridPageSize,
            'entityType': 'requirement',
             order: this.sortColumn,
             isascorder: this.isAscOrder
        }, dataParams = {
            'entityType': 'requirement',
            'useRelease' : this.inRelease,
            'releaseId': this.releaseId
        };

        if(this.inRelease) {
            queryParams['releaseId'] = this.releaseId;
        }

        queryParams['isZql'] = this.isAdvancedSearch || false;
        queryParams['word'] = this.isAdvancedSearch ? (this.searchText || '') : this.searchText;

        if (isSearch) {
          this._zephyrStore.dispatch(this._reqAction._clearGridSelection());
        }

        this._zephyrStore.dispatch(this._reqAction.fetchRequirementsOnSearch(queryParams, dataParams));
    }

    fetchRequirementsOnTree(value?) {

        if(!this.selectedTreeId) {
            return;
        }

        this.currentPage = value || 1;

        let params:any = {
            pageSize: this.gridPageSize,
            offset: this.gridPageSize * (this.currentPage - 1),
            currentPage : this.currentPage,
            treeId: this.selectedTreeId,
            order: this.sortColumn,
            isascorder: this.isAscOrder
        };

        if(!this.isGlobal && !this.isImported) {
            params.releaseId = this.releaseId;
        }

        this._zephyrStore.dispatch(this._reqAction.fetchReqByCriteria(params, this.releaseId));
    }

    toggleSearchFolderView(isSearchViewType) {

       this.isSearchView = isSearchViewType;
        //switch view modal
       // jQuery('#switch-to-search-modal').modal();
      this.isSearchView = isSearchViewType;
      this._zephyrStore.dispatch(this._reqAction.clearReqGridData());
      if (!this.reqDetailsComponent) {
        return;
      }
      this.reqDetailsComponent.hideReqDetails();

      if (this.isSearchView) {
        this.isMenuShown = true;

        let openByDefault = jQuery('#requirement-fullscreen-resizer').hasClass('requirement-default-view');
        if (!openByDefault) {
          let event = {
            currentTarget: '#requirement-fullscreen-resizer'
          };
          this.reqDetailsComponent.panelCollapsible({event, openByDefault});
        }

        this.selectRow = 'first';
        this._zephyrStore.dispatch(this._reqAction._clearGridSelection());
        if(this.searchText){
          this.fetchRequirementOnSearch(1, true);
        }
      } else {
        jQuery('.jstree-clicked.zee-tcr-anchor').trigger('click');
      }

      this.toggleForDetails = false;

      setTimeout(() => {
        this.toggleForDetails = true;
      }, 100);

      this.updateRouteUrl();
    }

    onSearchGo(param) {
        this.searchText = param.value;
        this.isAdvancedSearch = param.isAdvancedSearch;

        if (this.reqDetailsComponent) {
          this.reqDetailsComponent.hideReqDetails();
        }

        this.selectRow = 'first';
        this.updateRouteUrl();
        this._zephyrStore.dispatch(this._reqAction._clearGridSelection());
        this.fetchRequirementOnSearch(1, true);
    }

    setLeftNavData(state) {
        if(state.project.id) {
            this.navColumns.header.title = state.project.name;
            this.navColumns.header.subtitle = state.project.description;
            this.navColumns.header.link = `/project/${state.project.id}`;
            this.navColumns.header.isSelected = false;
            _.filter(this.navColumns.group.items, (item) => {
                if(item.key == 'release-setup') {
                    item.isActive = true;
                } else {
                    item.isActive = false;
                }
            });
        }
    }

    navigateToProject(ev) {
        if(this.navColumns.header.link.length) {
            this.router.navigateByUrl(this.navColumns.header.link);
        }
    }
    setReleasesDropdown(releases) {
        this.releases = releases.map((obj) => {
            return {id: obj.id, text: obj.name};
        });
        this.navColumns.releases = this.releases;
    }
    onRecordChange(ev) {
        this.currentRecord = ev.currentRecord;

        switch(ev.type) {
            case NEXT_RECORD:
                if (this.currentRecord % this.gridPageSize === 1) {
                    this.reqGridNextClick(this.currentPage + 1);
                } else {
                    jQuery('#grid-table-req .selected-row').next().trigger('click');
                }
                break;

            case PREV_RECORD:
                if (this.currentRecord % this.gridPageSize === 0) {
                    this.reqGridPrevClick(this.currentPage - 1);
                } else {
                    jQuery('#grid-table-req .selected-row').prev().trigger('click');
                }
                break;
        }
    }
    saveMap(data) {
        let reqObj = this.reqGridRows.filter(item => item['id'] === this.reqId)[0];
        if (reqObj) {
            reqObj['testcaseIds'] = data.testcaseIds;
           // reqObj['testcaseNames'] = data.names;
            reqObj['requirementReleaseTestcaseCountMapping'] = data.releaseTestcaseCountMap;
            this._zephyrStore.dispatch(this._reqAction.updateReqObj(reqObj, null));

        }
    }
    reqGridLinkClick(target) {
        window.open(target.text, '_blank');
    }
    jobCompleted() {
        let releaseId = this.releaseId;
        let projectId = this.projectId;
        this._zephyrStore.dispatch(this._reqAction.syncComplete({releaseId, projectId}));
    }
    onShowDTUpdateUserModal(selectedVal) {
        if(selectedVal === 'false') {
            jQuery('#defect-update-user-modal').modal('hide');
            this.syncClicked = false;
            jQuery('#reqSyncNodeModal').modal();
        } else {
            jQuery('#defect-update-user-modal').modal();
        }
    }
    onCloseDTUpdateUserModal() {
        jQuery('#defect-update-user-modal').modal('hide');
    }
    triggerChange() {
        if (this.changeDetectionDebounce) {
            clearTimeout(this.changeDetectionDebounce);
        }
        let firstDetection = !this.changeDetectionDebounce;
        this.changeDetectionDebounce = setTimeout(() => {
            let that = this;
            this.changeDetectionDebounce = null;
            if(this.cdr) { this.cdr.markForCheck(); }
        }, firstDetection ? 200 : 300);
    }
}
