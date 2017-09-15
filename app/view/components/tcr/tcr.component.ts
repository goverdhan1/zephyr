import {
  Component, Injector, AfterViewInit, Input, ViewChild,
  AfterViewChecked, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {ZephyrStore} from '../../../store/zephyr.store';
import {Resizable} from '../../../utils/scripts/resizable';
import {TcrGridComponent} from './tcr_grid.component';
import {TcrTreeComponent} from './tree/tcr_tree.component';

import {TCRAction} from '../../../actions/tcr.action';
import {ReleaseAction} from '../../../actions/release.action';
import {GlobalAction} from '../../../actions/global.action';

// Constants
import {I18N_MESSAGES} from '../../../utils/messages/messages.en';
import {ZEE_NAV_COLUMNS} from '../projects/project_leftnav.data';
import {TCR_OPERATION_OPTIONS} from './operations/tcr_operations.constant';
import * as TCR_MOBILE_OPTIONS from './tcr_mobile.constants';
import {TCR_GRID_TYPE} from './tcr_grid.constant';
import {NEXT_RECORD, PREV_RECORD, NEXT_PAGE, PREV_PAGE} from '../common/paginator/paginator.constant';
import {NOTIFICATION_APP_CONSTANTS} from '../../../utils/constants/notification.constants';
import {TestcaseAction} from '../../../actions/testcase.action';
import {NotificationStore} from '../../../store/notification.store';
import {NotificationAction} from '../../../actions/notification.action';
import {FETCH_TESTCASE_PATH_SUCCESS} from '../../../utils/constants/action.events';
import {Observable} from 'rxjs/Rx';

import {TCR_BULK_OPERATION_OPTIONS} from './operations/tcr_operations.constant';

declare var jQuery: any, _, window: any;

@Component({
    selector: 'zee-test-repository',
    templateUrl: 'tcr.html',
    viewProviders: [TCRAction, ReleaseAction, TestcaseAction, GlobalAction] ,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class TcrComponent implements AfterViewInit, AfterViewChecked, OnDestroy {
    @ViewChild(TcrGridComponent) tcrGridUI: TcrGridComponent;
    @ViewChild(TcrTreeComponent) tcrTreeUI: TcrTreeComponent;
    treeData: Array<Object>;
    breadCrumbsList: Array<Object>;
    isFirstPage: boolean;
    currentRecord: number = 1;
    totalRowCount: number;
    currentPage :number =  1;
    previousPage :number =  0;
    isLastPage: boolean;
    resizable;
    isSearchView = false; // Intially folder tree view is displayed
    isDetailView = false; // Intially list view is displayed
    expandTree = false;
    isMenuShown = false;
    selectedTctIds = [];
    selectedTestcaseIds = [];
    isPanelCollapsed;
    tcrImportTestOptions = TCR_OPERATION_OPTIONS;
    mobileNavigation = TCR_MOBILE_OPTIONS.MOBILE_STATES;
    gridPageSize = 50;
    tcrGridCmp;
    unsubscribe;
    querySub;
    paramSub;
    treeType;
    details_editable;
    previousURLParams;
    isAdvancedSearch;
    appId = NOTIFICATION_APP_CONSTANTS.TCR_APP.name;
    fieldOptions;
    inRelease = true;
    public navColumns;
    public releases;
    public testcaseId = null;
    public tcTestcaseId = null;
    _isMobile;
    _releaseId;
    selectedTreeNode;
    selectedTreeNodeObs:Observable<any> = Observable.of(null);
    i18nMessages = I18N_MESSAGES;
    routeDebounce;
    private _zephyrStore;
    private _notificationStore;
    private _releaseIdObs: Observable<any>;
    private _isGridShown = false;
    private prevSelectedTreeNode;
    private _queryParams = {};
    private openNode;
    private doDirtyCheck = true;
    private releaseTime;
    private isReleasesLoaded;
    private showDocker = true;
    /**
     * Creates an instance of TcrComponent.
     *
     * @param {Router} router
     * @param {TCRAction} _tcrAction
     * @param {Injector} injector
     * @param {ReleaseAction} _releaseAction
     * @param {ActivatedRoute} route
     *
     * @memberOf TcrComponent
     */
    constructor(public router: Router, private _tcrAction: TCRAction, private cdr: ChangeDetectorRef,
        private injector: Injector, private _testcaseAction: TestcaseAction, private _notificationAction: NotificationAction,
        private _releaseAction: ReleaseAction, private route: ActivatedRoute, private globalAction: GlobalAction) {

        this.navColumns = ZEE_NAV_COLUMNS;
        this.details_editable = true;
        this._zephyrStore = ZephyrStore.getZephyrStore();
        this._notificationStore = NotificationStore.getNotificationStore();
        this.fieldOptions = _.cloneDeep(TCR_BULK_OPERATION_OPTIONS['export']);
        this.fieldOptions['isSecondSearchCriteria'] = false;
        this.fieldOptions['maxSize'] = this.totalRowCount;
        this.paramSub = this.route.params.subscribe(params => {

            this._releaseId = params['id'];
            this._releaseIdObs = Observable.of(this._releaseId);

            if(this.routeDebounce) {
                clearTimeout(this.routeDebounce);
            }
            this.routeDebounce = setTimeout(() => {
                this.routeDebounce = null;

                if(this.tcrGridCmp) {
                    this.previousURLParams = params;
                    this.setURLParams(params);
                    this.onPanelCollapsed(false);
                } else {
                    this.setReleases(0);
                }
                if(!this.selectedTreeNode && !this.isSearchView) {
                    this.testcaseId = null;
                    this._zephyrStore.dispatch(this._tcrAction.clearTcrGridData({} , TCR_GRID_TYPE));
                }
            }, 51);
        });
        // this._zephyrStore.dispatch(this._tcrAction.clearTcrGridData({} , TCR_GRID_TYPE));

        this.unsubscribe = this._zephyrStore.subscribe((x) => {
            let state = this._zephyrStore.getState();
            let treeData = state.tcr.treeData;
            this.isReleasesLoaded = state.tcr.isReleasesLoaded;
            this.setTreeData(treeData);
            if(state.tcr.tcrGrid.event == 'FETCH_TESTCASES_BY_TREE_ID_SUCCESS') {
                setTimeout(() => {
                    this.onGridDataFetch(state);
                }, 301);
            }

            if(this._isMobile != state.global.isMobile) {
                this._isMobile = state.global.isMobile;
                this.mobileCurrentView(TCR_MOBILE_OPTIONS.TCR_MOBILE_SHOW_TREE);
            }
            if(state.tcr.tcrGrid.event == 'DELETE_TESTCASE_SUCCESS') {
                this.testcaseId = null;
            }
            this.setLeftNavData(state);
            this.releases = state.release.releases;
            this.setReleasesDropdown(this.releases);
            if(state.testcase.event == FETCH_TESTCASE_PATH_SUCCESS) {
                this._zephyrStore.dispatch(this._testcaseAction.clearFetchTestcasePath());
                if(state.testcase['tcPaths']) {
                    let pathVal = state.testcase['tcPaths'];
                    let nodes = pathVal['nodeIds'];
                    if(nodes && nodes.length > 0) {
                        this.selectedTreeNode = nodes[nodes.length-1];
                        this.selectedTreeNodeObs = Observable.of(this.selectedTreeNode);
                        this.testcaseId = pathVal['entityId'];
                        let index = pathVal['index'];
                        let page = Math.floor(index/this.tcrGridUI.gridPageSize)+1;
                        this.tcrGridUI.currentPage = page;
                        this.tcrGridUI.fetchTestcasesOnUpdate();
                        setTimeout(() => {
                            this.updateDefaultViewOnNotification();
                            this.testcaseId = pathVal['entityId'];
                            this.updateTCRURL();
                        }, 20);
                    }
                }
                this.tcrGridUI.fetchTestcasesOnUpdate();
                this.updateDefaultViewOnNotification();
            }
            if (state.tcr.tcrGrid.event === 'UPDATE_BULK_TCR')  {
                this._zephyrStore.dispatch(this._tcrAction.clearTCRGridEvent(null));
                this.clearSelectedTctIds();
                let testcase = state.tcr.tcrGrid.rows.filter(item => item.id === this.testcaseId)[0];
                if (testcase) {
                    this._zephyrStore.dispatch(this._testcaseAction._onUpdateTestcaseDetailsById(testcase));
                }
            }
        });
    }

    ngAfterViewInit() {
        if(this.tcrGridUI) {
            this.tcrGridCmp = this.tcrGridUI;
            if (this.previousURLParams) {
                this.setURLParams(this.previousURLParams);
            }
            // On page load if tree is seleted then get the grid data
            // else if search text then search view grid data
            this.displayTCRGridOnTreeOperation();
            this.getReleaseDetails();
        }
        if(this.isDetailView) {
            return;
        }
        this.resizable = new Resizable();
        this.resizable.attachResizable(jQuery('.zui-flex-v-resizable'), jQuery('.zui-s-handle'), {
            lockWidth: true,
            maxHeight: 600
        });
        this.resizable.attachResizable(jQuery('#tcr-h-resizer'), jQuery('#tcr-h-resizer-handle'), {
            lockHeight: true,
            minWidth: jQuery('#tcr-h-resizer').outerWidth(),
            maxWidth: 500,
        });
    }
    ngAfterViewChecked() {
        /**
         * If grid view is enable in mobile then trigger Call the tcr grid component to fetch testcases
         */
        if(this._isMobile && this.mobileNavigation.showGrid && this._isGridShown) {
            this.tcrGridUI.selectedTreeNode = this.selectedTreeNode;
            this.tcrGridUI.fetchTestcases();
            this.clearSelectedTctIds();
            this._isGridShown = false;
        }
        jQuery('#tcr-h-resizer').css('height', jQuery('.zui-flex-h-fixed').height() + 'px');
    }
    ngOnDestroy() {
        if(this.appId && this._notificationStore) {
          this._notificationStore.dispatch(this._notificationAction.discardAppNotifications(this.appId));
        }
        this.isDetailView = false;
        this.unsubscribe();
        if(this.paramSub) {
            this.paramSub.unsubscribe();
        }
    }

    setReleases(counter) {

        if (this.isReleasesLoaded) {
            this.setReleaseData();
        } else {
            if (counter > 10) {
                return;
            }
            this.releaseTime = setTimeout(() => {
                this.setReleases(++counter);
            }, 50);
        }
    }

    setReleaseData() {
        if (!localStorage.getItem(`${window.tab}-currentRelease`)) {
          let releases = JSON.parse(localStorage.getItem('releases'));

          if (!releases) {
            let state = this._zephyrStore.getState();
            this.router.navigate(['/project', state.projects.userAllocatedProjects[0]]);
          } else {
            let release = releases.filter(rel => rel.id == this._releaseId);
            localStorage.setItem(`${window.tab}-currentRelease`, JSON.stringify(release));
          }
      }
    }

    /**
     * On success of fetching testcases,
     * set the page indexes
     * update the url
     * get the testcase details
     */
    onGridDataFetch(state) {
        this.previousPage = this.currentPage;
        this.currentPage = state.tcr.tcrGrid.currentPage;
        if(!state.tcr.tcrGrid || !state.tcr.tcrGrid.rows || !state.tcr.tcrGrid.rows.length) {
            this.testcaseId = null; // Remove once routing is fixed
        } else {
            this.totalRowCount = state.tcr.tcrGrid.totalCount;
            this.fieldOptions['maxSize'] = this.totalRowCount;
        }
        this.updateTCRURL();
    }
    getReleaseDetails() {
        let state = this._zephyrStore.getState();

        let selectedRelease = state.release.releases.filter(item => item.id === Number(this._releaseId))[0];

        if (!selectedRelease) {
            this._zephyrStore.dispatch(this._releaseAction.fetchReleaseById(this._releaseId));
        }
    }
    /**
     * Set the mobile navigation parameters for TCR,
     * If isMobile, set the key to true else make the keys false
     */
    mobileCurrentView(key) {
        _.each(this.mobileNavigation, (_value, _key) => {
            if(key == _key && this._isMobile) {
                this.mobileNavigation[_key] = true;
            } else
                this.mobileNavigation[_key] = false;
        });
    }
    clearSelectedTctIds() {
        this.selectedTctIds = [];
        this.selectedTestcaseIds = [];
    }
    onPanelCollapsed(isPanelCollapsed) {
        this.isPanelCollapsed = isPanelCollapsed;
        this.setDetailHeight();
        this.updateTCRURL();
    }
    setDetailHeight() {
        if(this.isSearchView) {
            jQuery('.zui-flex-v-resizable').css('max-height', 'none');
        } else {
            jQuery('.zui-flex-v-resizable').css('max-height', `${jQuery('.zui-flex-h-fixed').height()}px`);
        }
    }
    setLeftNavData(state) {
        if(state.project.id) {
            this.navColumns.header.title = state.project.name;
            this.navColumns.header.subtitle = state.project.description;
            this.navColumns.header.link = `/project/${state.project.id}`;
            this.navColumns.header.isSelected = false;
            _.filter(this.navColumns.group.items, (item) => {
                if(item.key == 'repository-setup') {
                    item.isActive = true;
                } else {
                    item.isActive = false;
                }
            });
        }
    }
    getTestcaseById() {
        if(this.tcrGridCmp && Array.isArray(this.tcrGridCmp.tcrGridRows)) {
            let _testcase = this.tcrGridCmp.tcrGridRows.filter(item => item.id === this.testcaseId)[0];
            if(_testcase) {
                this._zephyrStore.dispatch(this._testcaseAction.setTestcaseFromGrid(_testcase));
            }
        }
    }
    navigateToProject(ev) {
        if(this.navColumns.header.link.length) {
            this.router.navigateByUrl(this.navColumns.header.link);
        }
    }
    setTreeData(data) {
        if(!this.resizable || data.tree.length <= 1) {
            return;
        }
        this.treeData = data;
    }
    setURLParams(params) {
        if(params['treeId']) {
            this.selectedTreeNode = +params['treeId'];
        } else {
            this.selectedTreeNode = null;
        }
        this.selectedTreeNodeObs = Observable.of(this.selectedTreeNode);
        if(params['testcaseId']) {
            this.testcaseId = +params['testcaseId'];
            this.getTestcaseById();
        } else {
            this.testcaseId = null;
        }
        if(params['pageView']) {
            if(params['pageSize']) {
                this.tcrGridCmp.updateGridPageSize(Number(params['pageSize']));
            }
            this.currentRecord = +params['currentIndex'];
            this.isSearchView = (params['pageView'] === 'search') ? true: false;
            this.tcrGridCmp.isSearchView = this.isSearchView;

            let currentPage = ((+params.offset || 0) / params['pageSize']) + 1;
            this.tcrGridCmp.currentPage = currentPage;
            this.currentPage = currentPage;

            if(this.isSearchView) {
                this.tcrGridCmp.searchText = params['searchText'] || '';
                this.tcrGridCmp.searchOffset = +params.offset;
                this.inRelease = JSON.parse(params.inRelease || 'true');

                if(params['searchType']) {
                    this.isAdvancedSearch = params['searchType'] === 'zql';
                }
            }
        }
        if(params['viewType']) {
            this.isDetailView = (params['viewType'] === 'detail') ? true: false;
        }
        if(params['collapsed']) {
            this.isPanelCollapsed = true;
        }
    }
    getURLQueryParams() {
        let _qParams = {};

        if(this.selectedTreeNode) {
            _qParams['treeId'] = this.selectedTreeNode;
        }
        if(this.testcaseId) {
            _qParams['testcaseId'] = this.testcaseId;
        }

        _qParams['viewType'] = this.isDetailView ? 'detail' : 'list';

        _qParams['pageSize'] = this.tcrGridCmp.gridPageSize;
        _qParams['pageView'] = this.isSearchView ? 'search' : 'folder';
        _qParams['offset'] = this.isSearchView ? this.tcrGridCmp.searchOffset : (this.tcrGridCmp.gridPageSize * (this.tcrGridCmp.currentPage - 1));

        if(this.isSearchView) {
            _qParams['searchText'] = this.tcrGridCmp.searchText || '';
            _qParams['searchType'] = this.isAdvancedSearch ? 'zql' : 'text';
            _qParams['inRelease'] = this.inRelease;
        }
        if(this.currentRecord) {
            _qParams['currentIndex'] = this.currentRecord;
        }
        if(this.isPanelCollapsed) {
            _qParams['collapsed'] = true;
        }
        return _qParams;
    }
    updateTCRURL() {
        let _urlParams = this.getURLQueryParams();
        this.previousURLParams = _urlParams;
        this.router.navigate(['tcr', this._releaseId, _urlParams]);
        setTimeout(() => {
            if (this.testcaseId) {
                let grid_row = jQuery('#tcr-grid .flex-bar').removeClass('selected-row').filter(`[data-id="${this.testcaseId}"]`).addClass('selected-row')[0];
                if (grid_row) {
                    grid_row.scrollIntoView(false);
                }
                this.getTestcaseById();
            }
        }, 301);
    }
    /**
     * On tcr tree click,
     * set the selected node Id, breadcrumb list
     * Fetch the testcases for the selected node
     * Clear the previously selected tctids
     */
    onTcrTreeClick(target) {
        this.selectedTreeNode = target.selectedNodeId;
        this.selectedTreeNodeObs = Observable.of(this.selectedTreeNode);
        this.treeType = target.type;
        this.details_editable = 'import' !== this.treeType;
        this.breadCrumbsList = target.breadCrumbsList;

        if(target.showMenu) {
            this.isMenuShown = true;
        } else {
            this.testcaseId = null;
            this.currentRecord = 1;
        }

        if(!this.selectedTreeNode) {
            this.isMenuShown = false;
            this.tcrGridCmp.clearGridRows();
            this.tcrGridCmp.initGridData(); // To clear the pagination
            return;
        }
        this.updateTCRURL();
        this.isMenuShown = true;
        // Change the mobile view state to show grid view
        this.mobileCurrentView(TCR_MOBILE_OPTIONS.TCR_MOBILE_SHOW_GRID);
        this.displayTCRGridOnTreeOperation();
    }
    onTreeDrop(ev) {
        // allow drop only onto release node
        if ('release' === ev.parentType) {
            let data;
            if(ev.operation === 'move') {
                data = {
                    sourceNodeId: this.selectedTreeNode,
                    targetNodeId: ev.dropId,
                    ids: ev.dragId
                };
                this._zephyrStore.dispatch(this._tcrAction.moveTestcase(data));
            } else if(ev.operation === 'copy') {
                data = {
                    releaseId: ev.release,
                    targetNodeId: ev.dropId,
                    ids: ev.dragId
                };
                this._zephyrStore.dispatch(this._tcrAction.copyTestcase(data, this.selectedTreeNode));
            }
        }
    }
    displayTCRGridOnTreeOperation() {
        this._isGridShown = true;
        if(!this._isMobile && this.tcrGridCmp) {
            // Call the tcr grid component to fetch testcases
            this.tcrGridCmp.selectedTreeNode = this.selectedTreeNode;
            this.tcrGridCmp.initGridData();
            this.tcrGridCmp.fetchTestcasesOnUpdate();
            this.clearSelectedTctIds();
        }
    }
    onBreadCrumbClick(ev) {
        let target = ev.target,
            _nodeId = target.dataset.nodeid;
        if(target.tagName.toUpperCase() === 'BUTTON' && target.dataset.islast != 'true') {
            if(target.dataset.type != 'parent' && _nodeId) {
                jQuery('zui-tcr-tree a.zee-tcr-anchor[data-id="' + _nodeId + '"]').trigger('click');
            } else if(target.dataset.type == 'parent' && target.innerText != 'Imported') {
                this.router.navigateByUrl('/release/' + this._releaseId);
            }
        }
    }
    applyNotifications(ev) {
      // remember previous selections
      // let _curTestcaseId = this.testcaseId;
      let _curTestcaseId=null;
      this.prepareForNotification();
      setTimeout(() => {
        if(_curTestcaseId) {
          //tree node is selected - need to handle it separately
          this._zephyrStore.dispatch(this._testcaseAction.fetchTestcasePathByTCTID(_curTestcaseId));
        } else if(this.selectedTreeNode) {
          //tree node selected only - refresh tree and refresh grid
          this.tcrGridUI.fetchTestcasesOnUpdate();
          this.updateDefaultViewOnNotification();
        } else {
          //tree node is not selected - so just refresh the tree
          this.updateDefaultViewOnNotification();
        }
        // refresh
        // re-select
        // update notifications
        this._notificationStore.dispatch(this._notificationAction.applyNotification(this.appId,true));
      },20);
    }

    prepareForNotification() {
      if(this.tcrGridUI) {
        this.tcrGridUI.clearSelectedTctIds();
        this.testcaseId = null;
      }
      this.clearSelectedTctIds();
      this.testcaseId = null;
      let size = this.tcrGridCmp.gridPageSize;
      this._zephyrStore.dispatch(this._tcrAction.clearTcrGridData({size}, TCR_GRID_TYPE));
    }

    updateDefaultViewOnNotification() {
      this.tcrTreeUI.fetchTreeDataWithReleaseDetails();
      if(this.cdr) { this.cdr.markForCheck(); }
    }

    updateView() {
        // update the view, when notification is 'applied'
    }

    // dismissSwitchViewModal(isSearchViewType,doSwitch) {
    //   if(doSwitch){
    //   }
    // }

    toggleSearchFolderView(isSearchViewType) {
        if (this.promptForSave()) {
            return;
        }
      //jQuery('#switch-to-search-modal').modal();
      this._zephyrStore.dispatch(this._tcrAction.clearTcrGridData({}, TCR_GRID_TYPE));
      this.isSearchView = isSearchViewType;
      this.tcrGridCmp.isSearchView = isSearchViewType;

      if (isSearchViewType) {
        this.details_editable = true;
        this.prevSelectedTreeNode = this.selectedTreeNode;
        this.selectedTreeNode = null;
        this.selectedTreeNodeObs = Observable.of(this.selectedTreeNode);
        this.isMenuShown = false;
        if(this.tcrGridCmp.searchText){
          this.tcrGridCmp.fetchTestcasesOnUpdate();
        }
      } else {
        this.details_editable = 'import' !== this.treeType;
        this.selectedTreeNode = this.prevSelectedTreeNode;
        if (this.selectedTreeNode) {
          this.tcrGridCmp.fetchTestcases();
        }
        setTimeout(() => {
          jQuery('#tcr-grid .flex-bar:last').trigger('click');
        }, 50);
      }

      let coll = jQuery('div#testcase-fullscreen-resizer.testcase-full-view');
      let panel = coll.parents('zee-testcase').parent().siblings('.zui-flex-v-resizable');
      let chevron_type = coll.removeClass('testcase-full-view').addClass('testcase-default-view').find('span');
      if (chevron_type.find('fa-chevron-down')) {
        coll.removeClass('testcase-full-view').addClass('testcase-default-view').find('span').removeClass('fa-chevron-down').addClass('fa-chevron-up');
      } else {
        coll.removeClass('testcase-full-view').addClass('testcase-default-view').find('span').removeClass('fa-chevron-up').addClass('fa-chevron-down');
      }
      panel.removeClass('collapse');

      this.setDetailHeight();
      this.updateTCRURL();
      this.clearSelectedTctIds();
      this.testcaseId = null;
      this.breadCrumbsList = [];

    }
    /**
     * on click of tcr grid row, resize, display testcase in detail mode
     */
    reloadTestcase() {
        let tempTestcase = {id: this.testcaseId};
        this.tcrGridRowClick(tempTestcase);
        this.tcrGridUI.uncheckGridCheckboxAll(true);
    }

    tcrGridRowClick(testcaseId) {
        this.testcaseId = testcaseId.id;
        this.tcTestcaseId = testcaseId.testcaseId;
        if(testcaseId.index && testcaseId.index.length) {
            this.currentRecord = ((this.currentPage - 1) * this.tcrGridCmp.gridPageSize) + Number(testcaseId.index) + 1;
            this.totalRowCount = this._zephyrStore.getState().tcr.tcrGrid.totalCount;
            this.fieldOptions['maxSize'] = this.totalRowCount;
        }

        if(this.testcaseId && jQuery('#zephyr-tcr-panel-resizable').hasClass('hide')) {
            jQuery('#zephyr-tcr-panel-resizable').removeClass('hide').addClass('show');
        }
        // Change the mobile state to show testcase view
        this.mobileCurrentView(TCR_MOBILE_OPTIONS.TCR_MOBILE_SHOW_TESTCASE);
        this.setDetailHeight();
        this.updateTCRURL();

    }

    tcrGridRowSelection(testcaseIds) {
        let tctIds = testcaseIds[0];
        if(this.selectedTreeNode && tctIds && tctIds.length) {
            this.isMenuShown = true;
        }
        this.selectedTctIds = tctIds;
        this.selectedTestcaseIds = testcaseIds[1];

        jQuery('.zephyr-editable-field').addClass('active');
        jQuery('.zephyr-editable-field zephyr-inline-field-name').focus();

    }
    /**
     * Event handler for event emitted from search component
     * @param isAdvancedSearch
     * @param value
     */
    onSearchGo(param) {
        // Trigger tcr grid component's search testcases
        this.tcrGridCmp.searchOffset = 0;
        this.tcrGridCmp.searchText = param.value;
        this.tcrGridCmp.currentPage = 1;
        this.isAdvancedSearch = param.isAdvancedSearch;
        this.tcrGridCmp.fetchTestcasesOnSearch(param.value);
        this.updateTCRURL();
    }
    navigateToPreviousOnMobile() {
        if(this.mobileNavigation.showTestcase) {
            this.mobileCurrentView(TCR_MOBILE_OPTIONS.TCR_MOBILE_SHOW_GRID);
        } else if(this.mobileNavigation.showGrid) {
            this.mobileCurrentView(TCR_MOBILE_OPTIONS.TCR_MOBILE_SHOW_TREE);
        }
    }
    setReleasesDropdown(releases) {
        if(releases && releases.length) {
            this.releases = releases.map((obj) => {
                return {id: obj.id, text: obj.name};
            });
            this.navColumns.releases = this.releases;
        }
    }

    recordChanged($event) {
        let record = $event.currentRecord % this.tcrGridCmp.paginationOptions.size;

        let goToRecord = (currentRecord, gridPageSize) => {
            let testcaseObject = this.tcrGridCmp.tcrGridRows[currentRecord % gridPageSize];
            this.tcrGridRowClick({
                id: testcaseObject['id'],
                index: currentRecord % gridPageSize,
                testcaseId: testcaseObject['testcase']['id']
            });
        };

        jQuery(`.tcr-grid-table .flex-bar:nth-child(${record})`).addClass('selected-row');
        switch($event.type) {
            case NEXT_RECORD:
                this.currentRecord++;

                if (this.currentRecord % this.tcrGridCmp.gridPageSize === 1) {
                    this.tcrGridCmp.tcrGridNextClick(this.tcrGridCmp.currentPage + 1);
                } else {
                    goToRecord(this.currentRecord - 1, this.tcrGridCmp.gridPageSize);
                }
                break;

            case PREV_RECORD:
                this.currentRecord--;

                if (this.currentRecord % this.tcrGridCmp.gridPageSize === 0) {
                    this.tcrGridCmp.tcrGridPrevClick(this.tcrGridCmp.currentPage - 1);
                } else {
                    goToRecord(this.currentRecord - 1, this.tcrGridCmp.gridPageSize);
                }
                break;
        }
        setTimeout(() => {
            this.updateTCRURL();
        }, 201);
    }
    toggleListDetailView(isDetailViewType) {
        this.isDetailView = isDetailViewType;
        jQuery('#tcr-h-resizer').removeAttr('style');
        this.updateTCRURL();
    }
    onTreeExpand() {
        this.expandTree = true;
    }
    onTreeCollapse() {
        this.expandTree = false;
    }
    onToggleNode(openNode) {
        this.openNode = openNode;
    }
    onGlobalCopy(isCopy) {
        if (isCopy) {
            this._zephyrStore.dispatch(this._tcrAction.fetchTreeDataByReleaseId());
        }
    }
    promptForSave() {
        let isDirty = this._zephyrStore.getState().global.isDirty;
        if (this.doDirtyCheck && isDirty && !confirm('There is unsaved data in the testcase. Are you sure you want to continue?')) {
            return true;
        }
        this._zephyrStore.dispatch(this.globalAction.clearDirtyCheck());
        return false;

    }
    OnContextMenuClick() {
        this.fieldOptions['isSecondSearchCriteria'] = false;
    }

}
