import {Component, ViewChild, AfterViewInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {ZephyrStore} from '../../../../../../store/zephyr.store';
import {DefectsAction} from '../../../../../../actions/defects.action';
import {GridAction} from '../../../../../../actions/grid.action';
import {ImportAction} from '../../../../../../actions/import.action';
import {DefectsAdvancedSearchFinderComponent} from './defects_advanced_search_finder.component';

// Constants
import {IMPORT_JIRA_GRID_PAGINATION, IMPORT_JIRA_GRID_OPTIONS} from '../../../../../../view/components/requirements/operations/import_jira_grid.constants';
import {DEFECTS_LINK_SEARCH_GRID_PAGINATION, DEFECTS_LINK_SEARCH_GRID_OPTIONS} from '../defects_link_search.constants';
import {I18N_MESSAGES} from '../../../../../../utils/messages/messages.en';

declare var jQuery: any, _;

@Component({
    selector: 'defects-advanced-search',
    templateUrl: 'defects_advanced_search.html',
    viewProviders: [DefectsAction, GridAction, ImportAction]
})

export class DefectsAdvancedSearchComponent implements AfterViewInit, OnDestroy {
    @ViewChild(DefectsAdvancedSearchFinderComponent) dtSearchCmp: DefectsAdvancedSearchFinderComponent;
    @Input() isFileNewDefect;
    @Input() searchGridType;
    @Input() testcaseId;
    @Input() scheduleId;
    @Input() hideHeader;
    @Input() type;
    @Input() hiddenOptions;
    @Output() searchCriteria: EventEmitter<any> = new EventEmitter();
    @Output() onCreateSubtask: EventEmitter<any> = new EventEmitter();
    @Output() showFileNewDefectDialog: EventEmitter<any> = new EventEmitter();
    @Output() onGridSelection: EventEmitter<any> = new EventEmitter();
    @Output() setFolderstructure: EventEmitter<any> = new EventEmitter();


    selectedReqIds = [];
    releaseId;
    gridPageSize;
    currentPage;
    isFirstPage;
    isLastPage;
    gridRows;
    allRows = [];
    selectedSearchCriteria='id';
    filters;
    paginationOptions;
    unsubscribe;
    i18nMessages = I18N_MESSAGES;
    private zephyrStore;
    constructor(private route: ActivatedRoute, public router: Router, private _gridAction: GridAction,
        private _defectsAction: DefectsAction, private _importAction: ImportAction) {
        this.route.params.subscribe(params => {
            this.releaseId = params['id'];
        });
        this.zephyrStore = ZephyrStore.getZephyrStore();
        this.unsubscribe = this.zephyrStore.subscribe((x) => {
            this.onStateChange();
        });

    }
    ngAfterViewInit() {
        if(this.searchGridType === 'DEFECTS_LINK_SEARCH') {
            this.gridPageSize = DEFECTS_LINK_SEARCH_GRID_OPTIONS.rowCount;
            this.paginationOptions = DEFECTS_LINK_SEARCH_GRID_PAGINATION;
        } else if(this.searchGridType === 'IMPORT_JIRA') {
            this.gridPageSize = IMPORT_JIRA_GRID_OPTIONS.rowCount;
            this.paginationOptions = IMPORT_JIRA_GRID_PAGINATION;
        }
        this.zephyrStore.dispatch(this._defectsAction.updateDefectsSearchGridType(this.searchGridType));
    }
    ngOnDestroy() {
        this.zephyrStore.dispatch(this._defectsAction.resetDefectsSearch());
        this.unsubscribe();
    }

    onSelectFolderStructure(Obj){
            this.setFolderstructure.emit(Obj);
    }
    onStateChange() {

        let defectsSearchState = this.zephyrStore.getState().defectsSearch;
        let defectsSearchGrid = defectsSearchState.grid;
        this.currentPage = defectsSearchGrid.currentPage;
        this.isFirstPage = defectsSearchGrid.isFirstPage;
        this.isLastPage = defectsSearchGrid.isLastPage;
        this.gridRows = defectsSearchGrid.rows;
        this.allRows = defectsSearchGrid.allRows;
        this.paginationOptions = defectsSearchGrid.paginationOptions;

        if(defectsSearchState.event === 'RESET_DEFECT_SEARCH_SUCCESS') {
            this.zephyrStore.dispatch(this._defectsAction.clearDefectsSearchEvent());
            this.selectedSearchCriteria='id';
        }

        if(defectsSearchState.event === 'UPDATE_DEFECT_SEARCH_SUCCESS') {
            this.zephyrStore.dispatch(this._defectsAction.clearDefectsSearchEvent());
            if (this.allRows.length) {
                this.searchDefects(false);
            }
        }

        if(defectsSearchState.event === 'FETCH_DEFECTS_SEARCH_FILTERS') {
            this.zephyrStore.dispatch(this._defectsAction.clearDefectsSearchEvent());
            this.filters = defectsSearchState.filters;
            if(this.filters && this.filters.length) {
                setTimeout(() => {
                    jQuery('#defectFiltersDropdown').val(this.filters[0].id).trigger('change');
                }, 100);
            }
        }
    }
    gridPrevClick(value) {
        this.currentPage = value;
        this.searchDefects(true);
    }
    gridNextClick(value) {
        this.currentPage = value;
        this.searchDefects(true);
    }
    gridPaginateByIndex(value) {
        this.currentPage = value;
        this.searchDefects(true);
    }
    getFilters() {
        this.zephyrStore.dispatch(this._defectsAction.getFilters());
    }
    searchDefectById(data) {
        if(!data.defectId) {
            this.zephyrStore.dispatch(this._defectsAction.onInfo('Please enter defect id'));
            return;
        }
        if (!data.isPagination) {
            this.clearGridSelection();
        }
        this.zephyrStore.dispatch(this._defectsAction.getDefectById(data.defectId));
    }

    searchDefectsByJQL(data) {
        let jqlQuery = data.jqlQuery;
        if(!jqlQuery) {
            jqlQuery = '';
        }
        if (!data.isPagination) {
            this.clearGridSelection();
        }
        this.searchCriteria.emit({'JQL': jqlQuery});
        let params = {
            pageSize: this.gridPageSize,
            offset: this.gridPageSize * (this.currentPage - 1),
            currentPage: this.currentPage,
            jqlQuery: jqlQuery
        };
        this.zephyrStore.dispatch(this._defectsAction.getDefectsByJQL(params, this.type));
    }
    searchDefectsByFilters(data) {
        if(!data.selectedFilter) {
            this.zephyrStore.dispatch(this._defectsAction.onInfo('Please select a fliter'));
            return;
        }
        if (!data.isPagination) {
            this.clearGridSelection();
        }
        let filterName = _.find(this.filters, {id: String(data.selectedFilter)}).text;
        this.searchCriteria.emit({'filter': filterName, id: data.selectedFilter});
        let params = {
            pageSize: this.gridPageSize,
            offset: this.gridPageSize * (this.currentPage - 1),
            currentPage: this.currentPage,
            filterId: data.selectedFilter
        };
        this.zephyrStore.dispatch(this._defectsAction.getDefectsByFilters(params, this.type));
    }
    selectedSearchCriteriaChange(searchCriteria) {
        this.selectedSearchCriteria = searchCriteria;
        if(searchCriteria === 'filters') {
            this.getFilters();
        }

        this.searchCriteria.emit({'reset': true});
    }
    searchDefects(isPagination) {
        this.dtSearchCmp.searchDefects({isPagination, searchFromButton: false});
    }
    gridIconClick(target) {
        if(jQuery(target).prop('tagName') === 'I') {
            target = jQuery(target).parent();
        }
        let index = jQuery(target).closest('div.flex-bar').data('index');
        let bugObj = _.cloneDeep(this.gridRows[index]);
        let currentlyLinkedDefectsGrid = this.zephyrStore.getState().currentlyLinkedDefects.grid;
        let linkedDefects = currentlyLinkedDefectsGrid['rows'];
        if(jQuery(target).hasClass('defect-link-icon')) {
            if(_.find(linkedDefects, {id: bugObj.id})) {
                this.zephyrStore.dispatch(this._defectsAction.onInfo(this.i18nMessages['zephyr.defect.already.linked']));
                return;
            }
            bugObj['mapTestcaseId'] = this.testcaseId;
            bugObj['mapScheduleId'] = this.scheduleId;
            this.zephyrStore.dispatch(this._defectsAction.mapDefectSchedule(bugObj));
        } else {
            this.onCreateSubtask.emit(bugObj);
        }
    }
    gridPageSizeChange(value) {
        this.gridPageSize = value;
        this.currentPage = 1;
        this.zephyrStore.dispatch(this._defectsAction.updateDefectSearchPageSize({
            size: this.gridPageSize,
            currentPage: 1
        }));
    }
    clearGridSelection() {
        let reqIds = [];
        this.gridRowSelection(reqIds);
    }
    gridRowSelection(value) {
        this.selectedReqIds = value;
        this.onGridSelection.emit(value);
    }
    importRequirementsFromJIRA(requestObj, releaseId, type, importAll = false) {
        let selectedReqObjs = [];
        this.selectedReqIds.forEach(reqId => {
            let reqObj = _.find(this.allRows, {id: reqId});
            if(reqObj) {
                selectedReqObjs.push(reqObj);
            }
        });
        requestObj['bugs'] = selectedReqObjs;
        this.zephyrStore.dispatch(this._importAction.importRequirementsFromJIRA(requestObj, releaseId, 'requirement', importAll));
    }
    openFileNewDefectDialog() {
        this.showFileNewDefectDialog.emit();
    }
}
