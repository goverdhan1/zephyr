import {Component, ViewChild, Input, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {ZephyrStore} from '../../../../../store/zephyr.store';
import {DefectsAction} from '../../../../../actions/defects.action';
import {GridAction} from '../../../../../actions/grid.action';
import {DefectsAdvancedSearchFinderComponent} from './advanced/defects_advanced_search_finder.component';
import {DefectsBasicSearchComponent} from './basic/defects_basic_search.component';

// Constants
import {DEFECT_EXPORT_OPTIONS, DEFECT_MAX_RECORDS_EXPORT, DEFECT_TRACKING_SEARCH_GRID_TYPE, DEFECT_TRACKING_SEARCH_GRID_PAGINATION,
    DEFECT_TRACKING_SEARCH_GRID_OPTIONS} from './defect_tracking_search.constants';
import {I18N_MESSAGES} from '../../../../../utils/messages/messages.en';

declare var jQuery: any, _;

@Component({
    selector: 'defect-tracking-search',
    templateUrl: 'defect_tracking_search.html',
    viewProviders: [DefectsAction, GridAction],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class DefectTrackingSearchComponent implements OnDestroy {
    @ViewChild(DefectsAdvancedSearchFinderComponent) dtSearchCmp: DefectsAdvancedSearchFinderComponent;
    @ViewChild(DefectsBasicSearchComponent) dtBasicSearchCmp: DefectsBasicSearchComponent;

    @Output() onDefectRowClick: EventEmitter<any> = new EventEmitter();
    @Output() onFetchIssueMetaData: EventEmitter<any> = new EventEmitter();
    @Output() defectBulkUpdate: EventEmitter<any> = new EventEmitter();
    @Output() onCreateSubtask: EventEmitter<any> = new EventEmitter();
    @Output() resetSelectedDefect: EventEmitter<any> = new EventEmitter();
    filters = [];
    releaseId;
    rowClicked = false;
    maxDefectsForExport = DEFECT_MAX_RECORDS_EXPORT;
    gridPageSize;
    currentPage;
    previousURLParams;
    issuestatus;
    isFirstPage;
    isLastPage;
    user;
    version;
    gridRows;
    gridAllRows;
    data;
    viewDefGridRows: Array<Object> = [];
    projectName;
    totalCount;
    gridBarDefectId;
    issueType;
    isBasicSearched;
    basicSearchParams = {};
    isBasicView = true;
    searchLinkTitle = 'Advanced';
    searchLinkTooltip = 'Switch to advanced search using JQL';
    selectedDefectIds = [];
    selectedDefects = [];
    selectedSearchCriteria:any = 'jql';
    defectOperationConstants = DEFECT_EXPORT_OPTIONS;
    paginationOptions = DEFECT_TRACKING_SEARCH_GRID_PAGINATION;
    paginationType;
    priority;
    unsubscribe;
    changeDetectionDebounce;
    // subTaskParentIssueId;
    _defectDetailsGridType = DEFECT_TRACKING_SEARCH_GRID_TYPE;
    i18nMessages = I18N_MESSAGES;
    selectedFilter = '';
    query = '';
    basicSearchURLParams = {};
    private zephyrStore;
    constructor(private route: ActivatedRoute, public router: Router, private _gridAction: GridAction,
        private _defectsAction: DefectsAction, private cdr: ChangeDetectorRef) {

        this.route.params.subscribe(params => {
            this.releaseId = params['id'];
        });

        this.gridPageSize = DEFECT_TRACKING_SEARCH_GRID_OPTIONS.rowCount;
        this.zephyrStore = ZephyrStore.getZephyrStore();
        this.unsubscribe = this.zephyrStore.subscribe(() => {
            this.onStateChange();
        });

        // need 2 subscribe on route params as release id needs to be set before state change, but url needs to be set after
        this.route.params.subscribe(params => {
            this.setURLParams(params);
        });

    }
    ngOnDestroy() {
        this.unsubscribe();
        this.zephyrStore.dispatch(this._defectsAction.resetDefectDetails());
    }
    onStateChange() {
        let state = this.zephyrStore.getState();
        let defectDetailState = state.defectDetails;
        let defectsSearchState = state.defectsSearch;
        let defectDetailGrid = defectDetailState.grid;
        this.currentPage = defectDetailGrid.currentPage;
        this.isFirstPage = defectDetailGrid.isFirstPage;
        this.isLastPage = defectDetailGrid.isLastPage;
        this.gridRows = defectDetailGrid.rows;
        this.gridAllRows = defectDetailGrid.allRows;
        this.totalCount = defectDetailGrid.totalCount;
        this.paginationOptions = defectDetailGrid.paginationOptions;

        if(!this.paginationType) {
            this.clearSelectDefects();
        }
        if(this.paginationType === 'PREV') {
            setTimeout(() => {
                jQuery('.defect-details-grid .flex-bar:last').trigger('click');
                this.triggerChange();
            }, 200);
        } else if(this.paginationType === 'NEXT') {
            setTimeout(() => {
                jQuery('.defect-details-grid .flex-bar:first').trigger('click');
                this.triggerChange();
            }, 200);
        }

        this.paginationType = null;

        if(defectDetailState.event === 'UPDATE_DEFECT_DETAILS_SUCCESS') {
            this.zephyrStore.dispatch(this._defectsAction.clearDefectDetailsEvent());
            this.searchDefects();
        }
        if(defectDetailState.event === 'FETCH_DEFECTS_DETAILS_FILTERS') {
            this.zephyrStore.dispatch(this._defectsAction.clearDefectDetailsEvent());
            this.filters = defectDetailState.filters;
            if(defectDetailState.filters && defectDetailState.filters.length) {
                this.setURLParams(this.updateRouteUrl());
                setTimeout(() => {
                    this.triggerChange();
                });
            }
        }
        if(defectsSearchState.event === 'GET_DEFECT_BULK_METADATA') {
            this.zephyrStore.dispatch(this._defectsAction.clearDefectsSearchEvent());
            this.showBulkEditModal();
        }
        this.triggerChange();
    }
    getURLQueryParams(paramExtras) {
        let _qParams = {};

        _qParams['view'] = this.isBasicView ? 'basic' : 'advanced';

        if(this.gridBarDefectId) {
            _qParams['defectId'] = this.gridBarDefectId;
        }

        if (this.isBasicView) {
            Object.keys(paramExtras).forEach(key => {
                _qParams[key] = paramExtras[key];
            });
        } else {

            _qParams['search'] = this.selectedSearchCriteria;
            if(this.selectedFilter) {
                _qParams['filter'] = this.selectedFilter;
            }
            if (this.query) {
                _qParams['query'] = this.query;
            }
        }

        return _qParams;
    }

    updateRouteUrl(paramExtras={}) {
        let _urlParams = this.getURLQueryParams(paramExtras);
        this.previousURLParams = _urlParams;
        this.router.navigate(['defect-tracking', this.releaseId, _urlParams]);
        return _urlParams;
    }

    basicSearchSelect(event) {
        this.updateRouteUrl(event);
    }

    setURLParams(params) {

        let isIdSearch = false;
        if(params['defectId']) {
            this.gridBarDefectId = params['defectId'];
            isIdSearch = true;
        }

        if ('advanced' === params.view) {
            this.isBasicView = false;
            this.basicSearchURLParams = {};
            if (params['search']) {
                this.selectedSearchCriteria = params['search'];
                if('filters' === this.selectedSearchCriteria) {
                    this.selectedFilter = params['filter'] || '';

                    if (!this.filters.length) {
                        this.zephyrStore.dispatch(this._defectsAction.getFiltersDefectDetails());
                        // will be called again once filters are fetched
                        return;
                    }
                    if (!isIdSearch) {
                        this.searchDefectsByFilters();
                    }
                } else if ('jql' === this.selectedSearchCriteria) {
                    this.query = params['query'] || '';
                    if (!isIdSearch) {
                        if(this.query) {
                            this.searchDefectsByJQL();
                        } else {
                            this.getDefectDetails();
                        }
                    }
                }
            }
        } else {
            this.isBasicView = true;
            if(params['project'] && this.basicSearchURLParams['project'] !== params['project']) {
                this.zephyrStore.dispatch(this._defectsAction.getDefectLightMetaData(params['project']));
            }
            this.basicSearchURLParams = {};
            Object.keys(params).forEach(key => {
                this.basicSearchURLParams[key] = params[key];
            });
        }
        if (isIdSearch) {
            this.searchDefectById();
        }

    }

    clearSelectDefects() {
        this.selectedDefects = [];
        this.selectedDefectIds = [];
    }
    clearAllRows() {
        this.zephyrStore.dispatch(this._defectsAction.clearDefectsDetailsAllRows());
    }
    getDefectDetails() {

        this.zephyrStore.dispatch(this._defectsAction.fetchDefectDetails({
            pageSize: this.gridPageSize,
            offset: this.gridPageSize * (this.currentPage - 1),
            currentPage: this.currentPage
        }));
        this.updateRouteUrl();
    }
    gridPrevClick(value) {
        this.paginationType = 'PREV';
        this.currentPage = value;
        this.searchDefects();
    }
    gridNextClick(value) {
        this.paginationType = 'NEXT';
        this.currentPage = value;
        this.searchDefects();
    }
    gridPaginateByIndex(value) {
        this.paginationType = 'INDEX';
        this.currentPage = value;
        this.searchDefects();
    }
    gridRowSelection(value) {
        /**
         * if (value.length > 20) {
         *     this.toastrService.error('Selection of more than 500 defects currently not supported.');
         *
         *     let currentIds = _.clone(this.selectedDefectIds);
         *     this.selectedDefectIds = [];
         *     setTimeout(() => {
         *         this.selectedDefectIds = _.clone(currentIds);
         *     }, 100);
         * } else {
         *     this.selectedDefectIds = value;
         * }
         */

        this.selectedDefectIds = value;
    }
    gridPageSizeChange(value) {
        this.gridPageSize = value;
        this.currentPage = 1;
        this.zephyrStore.dispatch(this._defectsAction.updateDefectDetailsPageSize({
            size: this.gridPageSize,
            currentPage: 1
        }));
    }
    searchDefectById() {
        if(!this.gridBarDefectId) {
            this.zephyrStore.dispatch(this._defectsAction.onInfo('Please enter defect id'));
        } else {
            this.zephyrStore.dispatch(this._defectsAction.getDefectByIdDefDetail(this.gridBarDefectId));
        }
    }
    updateURLID() {
        this.rowClicked = false;
        this.clearAllRows();
        this.resetSelectedDefect.emit();
        this.updateRouteUrl();
    }
    searchDefectsByJQL() {
        let params = {
            pageSize: this.gridPageSize,
            offset: this.gridPageSize * (this.currentPage - 1),
            currentPage: this.currentPage,
            jqlQuery: this.query
        };
        this.zephyrStore.dispatch(this._defectsAction.getDefectsByJQLDefDetail(params));
    }
    updateURLJQL(data) {
        this.query = data.jqlQuery;

        this.rowClicked = false;
        this.resetSelectedDefect.emit();
        this.gridBarDefectId = '';
        this.updateRouteUrl();

    }
    updateURLFilters(data) {
        this.selectedFilter = data.selectedFilter;
        this.rowClicked = false;
        this.resetSelectedDefect.emit();
        this.gridBarDefectId = '';
        this.updateRouteUrl();

    }
    searchDefectsByFilters() {
        if (this.selectedFilter) {
            let params = {
                pageSize: this.gridPageSize,
                offset: this.gridPageSize * (this.currentPage - 1),
                currentPage: this.currentPage,
                filterId: this.selectedFilter
            };
            this.zephyrStore.dispatch(this._defectsAction.getDefectsByFiltersDefDetail(params));
        } else {
            this.zephyrStore.dispatch(this._defectsAction.onInfo('Please select a fliter'));
        }
    }
    selectedSearchCriteriaChange(searchCriteria) {
        this.selectedSearchCriteria = searchCriteria;
        if(searchCriteria === 'filters') {
            this.query = '';
        } else {
            this.filters = [];
            this.selectedFilter = '';
        }
        this.updateRouteUrl();
    }
    searchDefects() {
        if(this.isBasicView && this.isBasicSearched) {
            let _params = _.cloneDeep(this.basicSearchParams);
            _params['pageSize'] = this.gridPageSize;
            _params['offset'] = this.gridPageSize * (this.currentPage - 1);
            _params['currentPage'] = this.currentPage;
            this.defectsBasicSearch(_params);
        } else {
            this.dtSearchCmp.searchDefects({searchFromButton: false});
        }
        this.updateRouteUrl();
    }
    /**
     * On grid link click
     * 1. testcase: navigate to testcase
     */
    onGridLinkClick(ev) {
        if(ev.className.indexOf('testcase-link')) {
            let _tcId = jQuery(ev).attr('value');
            if(_tcId) {
                let _rowIndex = jQuery(ev).closest('.flex-bar').data('index');
                let _gridRow = this.gridRows[_rowIndex];
                if(_gridRow && _gridRow.testcases && _.isArray(_gridRow.testcases)) {

                    let _testcase = _gridRow.testcases.filter(testcase => testcase.id == _tcId)[0];

                    if(_testcase && _.isPlainObject(_testcase) && _testcase.releaseId) {

                        let _testcaseURL = `/tce/${_testcase.releaseId};pageView=search;searchText=id%20%3D%20${_tcId};searchType=zql`;

                        /**
                         * As firefox browser will navigate to value of href and not testcaseURL,
                         * remove href from the <a> tag.
                         * Note: preventDefault() in the grid component did not help
                         */

                        jQuery(ev).removeAttr('href');
                        this.router.navigateByUrl(_testcaseURL);
                    }
                }
            }
        }
    }
    isBulkEditButtonDisabled() {
        return !(Array.isArray(this.selectedDefectIds) && this.selectedDefectIds.length > 1);
    }
    isCreateSubTaskButtonDisabled() {
        if(this.selectedDefectIds && this.selectedDefectIds.length === 1) {
            let defectObj = _.find(this.gridRows, {id: this.selectedDefectIds[0]});
            return _.isPlainObject(defectObj) && defectObj.isSubtask;
        }
        return true;
    }
    createSubTask(ev) {
        let selectedDefectId = this.selectedDefectIds[0];
        let defect = _.find(this.gridRows, {'id': selectedDefectId});
        if(defect) {
            if(defect.isSubtask) {
                this.zephyrStore.dispatch(this._defectsAction.onError('Sub-task cannot be created for issue type Sub-task'));
            } else {
                this.onCreateSubtask.emit(defect);
            }
        }
    }

    showBulkEditModal() {
        let projectName;

        let isSameProj = this.selectedDefectIds.every((defectId, index) => {
            this.selectedDefects[index] = _.find(this.gridAllRows, {'id': defectId});
            if(index > 0 && projectName != this.selectedDefects[index].product) {
                this.zephyrStore.dispatch(this._defectsAction.onError('Please select same project'));
                return false;
            }
            projectName = this.selectedDefects[index].product;
            return true;
        });
        if (!isSameProj) {
            return;
        }
        let state = this.zephyrStore.getState();
        if(Object.keys(state.defectsSearch.metaDataByproject).length) {
            jQuery('#defect-bulk-edit').modal();
            return;
        }
        this.zephyrStore.dispatch(this._defectsAction.getLightMetaDataForBulkEdit(this.selectedDefects[0].product));
    }

    gridRowClick(arg) {
        let rowId = jQuery(arg).data('id');
        let index = jQuery(arg).data('index');
        let defect = _.find(this.gridRows, {'id': rowId});
        if(defect) {
            this.onDefectRowClick.emit({defect, index});
        }
        this.rowClicked = true;
    }
    toggleSearch() {
        if(this.isBasicView) {
            this.isBasicView = false;
            this.searchLinkTitle = 'Basic';
            this.searchLinkTooltip = 'Switch to basic search';
            jQuery('.defect-basic-search').find('.basic-search-select').val(null).trigger('change');
            this.dtBasicSearchCmp.resetSelectedFields();
            this.dtBasicSearchCmp.resetFields();
        } else {
            this.isBasicView = true;
            this.searchLinkTitle = 'Advanced';
            this.searchLinkTooltip = 'Switch to advanced search using JQL';
        }
        this.clearAllRows();
        this.gridBarDefectId = '';
        this.currentPage = 1;
        this.rowClicked = false;
        this.resetSelectedDefect.emit();
        this.updateRouteUrl();
    }
    onDefectBasicSearch(params) {
        this.rowClicked = false;
        this.resetSelectedDefect.emit();
        this.clearAllRows();
        this.currentPage = 1;

        if(!params) {
            this.getDefectDetails();
            return;
        }
        this.isBasicSearched = true;
        this.basicSearchParams = params;
        params['pageSize'] = this.gridPageSize;
        params['offset'] = this.gridPageSize * (this.currentPage - 1);
        params['currentPage'] = this.currentPage;
        this.zephyrStore.dispatch(this._defectsAction.defectBasicSearch(params));
        this.updateRouteUrl();
    }
    defectsBasicSearch(params) {
        this.resetSelectedDefect.emit();
        // this.clearAllRows();
        if(!params) {
            this.getDefectDetails();
            return;
        }
        this.isBasicSearched = true;
        this.basicSearchParams = params;
        params['pageSize'] = this.gridPageSize;
        params['offset'] = this.gridPageSize * (this.currentPage - 1);
        params['currentPage'] = this.currentPage;
        this.zephyrStore.dispatch(this._defectsAction.defectBasicSearch(params));
    }
    onDefectBulkUpdate(selectedDefects) {
        let gridRows = this.gridRows;
        this.defectBulkUpdate.emit({selectedDefects, gridRows});
    }
    searchFromButton(ev) {
        this.clearAllRows();
        this.currentPage = 1;
        this.resetSelectedDefect.emit();
    }
    triggerChange() {
        if (this.changeDetectionDebounce) {
            clearTimeout(this.changeDetectionDebounce);
        }
        let firstDetection = !this.changeDetectionDebounce;
        this.changeDetectionDebounce = setTimeout(() => {
            this.changeDetectionDebounce = null;
            if(this.cdr) { this.cdr.markForCheck(); }
        }, firstDetection ? 200 : 300);
    }
}
