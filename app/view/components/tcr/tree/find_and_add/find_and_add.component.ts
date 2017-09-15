import {Component, OnDestroy, ViewChild, AfterViewInit, Input, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ZQLSearchComponent} from '../../../common/search/zql_search.component';

import {ZephyrStore} from '../../../../../store/zephyr.store';

import {GridAction} from '../../../../../actions/grid.action';
import {TCRAction} from '../../../../../actions/tcr.action';
import {TestcaseAction} from '../../../../../actions/testcase.action';

import {I18N_MESSAGES} from '../../../../../utils/messages/messages.en';
import {FIND_ADD_GRID_TYPE, FIND_ADD_ADD_GRID_PAGINATION, FIND_AND_ADD_GRID_COLUMNS, FIND_AND_ADD_GRID_OPTIONS} from '../../tcr_grid.constant';
import {UPDATE_FIND_ADD_GRID_SIZE_SUCCESS} from '../../../../../utils/constants/action.events';


declare var jQuery, window;

@Component({
  selector: 'find-and-add',
  viewProviders: [GridAction, TCRAction ,TestcaseAction],
  templateUrl: 'find_and_add.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FindAndAddComponent implements OnDestroy, AfterViewInit {
    @ViewChild(ZQLSearchComponent) zqlComponent: ZQLSearchComponent;
    @Input() searchFieldSrcId: string;
    @Input() treeId: string;
    zephyrStore;
    state;
    unsubscribe;
    i18nMessages;
    TESTCASE_ADD_LIMIT = 200;

    releaseId : number;
    searchOffset: number;
    gridPageSize: number;
    currentPage: number;
    searchInfo: string;
    currentRelease: string;
    currentProject: string;
    searchTextBinding;
    searchText;
    findNaddGridType;
    gridObject;
    selectedTctIds;
    showTable: boolean;
    excludingMetadata: Array<Object>;
    isModalShown = false;

    constructor(private _gridAction: GridAction , private _tcrAction: TCRAction, private route: ActivatedRoute,
        private _testcaseAction : TestcaseAction, private cdr: ChangeDetectorRef) {
        this.zephyrStore = ZephyrStore.getZephyrStore();
        this.findNaddGridType = FIND_ADD_GRID_TYPE;
        this.i18nMessages = I18N_MESSAGES;
        this.searchTextBinding = '';
        this.selectedTctIds = [];
        this.gridObject = {};
        this.gridObject.paginationOptions = FIND_ADD_ADD_GRID_PAGINATION;
        this.gridObject.columns = FIND_AND_ADD_GRID_COLUMNS;
        this.gridPageSize = FIND_AND_ADD_GRID_OPTIONS.rowCount;
        this.excludingMetadata = ['project' , 'projectid' , 'release' , 'releaseid'];
        this.currentProject = localStorage.getItem(`${window.tab}-currentProject`) && JSON.parse(localStorage.getItem(`${window.tab}-currentProject`)).name;
        this.currentRelease = localStorage.getItem(`${window.tab}-currentRelease`) && JSON.parse(localStorage.getItem(`${window.tab}-currentRelease`)).text;
        this.searchInfo = 'Search will be only applicable under "' + this.currentProject +'" project and "' + this.currentRelease
                           + '" release';
        this.route.params.subscribe(params => {
            this.releaseId = params['id'];
        });
        this.showTable = false;
        this.unsubscribe = this.zephyrStore.subscribe(() => {
            this.state  = this.zephyrStore.getState();
            this.gridObject = this.state.tcr.findNaddGrid;
            this.searchOffset = this.state.tcr.findNaddGrid.offset;
            this.gridPageSize = this.state.tcr.findNaddGrid.size;
            this.currentPage = this.state.tcr.findNaddGrid.currentPage;
            if(this.state.tcr.findNaddGrid.event == UPDATE_FIND_ADD_GRID_SIZE_SUCCESS) {
               this.onPageSizeUpdate();
            }
            if(this.cdr) { this.cdr.markForCheck(); }
        });
    }

    ngOnDestroy() {
      this.unsubscribe();
    }

    ngAfterViewInit() {
        jQuery('#find-and-add-modal').on('hidden.bs.modal', () => {
            this.zqlComponent.clearValue();
            this.searchText = '';
            this.searchTextBinding = '';
            this.showTable = false;
            this.selectedTctIds = [];
            let size = this.gridObject.gridPageSize;
            this.zephyrStore.dispatch(this._tcrAction.clearTcrGridData({size}, FIND_ADD_GRID_TYPE));
        }).on('hide.bs.modal', () => {
            this.isModalShown = false;
        }).on('show.bs.modal', () => {
            this.isModalShown = true;
        });
    }

    //This function controls prev action of find n add grid
    findNaddGridPrevClick(value) {
        this.currentPage = value;
        if(this.searchOffset >= this.gridPageSize) {
            this.searchOffset = this.gridPageSize * (this.currentPage - 1);
            this.fetchTestcasesOnSearch(this.searchText, 'prev');
        }
    }

    //This function controls next action of release grid and hides the form
    findNaddGridNextClick(value) {
        this.currentPage = value;
        this.searchOffset = this.gridPageSize * (this.currentPage - 1);
        this.fetchTestcasesOnSearch(this.searchText, 'next');
    }

    // On page size update the state and get releases by size
    findNaddGridPageSizeChange(value) {
        this.gridPageSize = value;
        this.currentPage = 1;
        this.searchOffset = this.gridPageSize * (this.currentPage - 1);
        this.fetchTestcasesOnSearch(this.searchText, '');
    }

    findNaddGridRowSelection (value) {
      this.selectedTctIds = value[0] || [];
    }

    findNaddGridPaginateByIndex(value) {
         this.currentPage = value;
         this.searchOffset = this.gridPageSize * (this.currentPage - 1);
         this.fetchTestcasesOnSearch(this.searchText, '');
    }

    onPageSizeUpdate() {
        this.zephyrStore.dispatch(this._tcrAction.clearTCRGridEvent(UPDATE_FIND_ADD_GRID_SIZE_SUCCESS));
    }

    onZQLGo (param) {
       this.searchText = param;
       this.selectedTctIds = [];
       this.showTable = true;
       this.fetchTestcasesOnSearch(param, null );
    }

    fetchTestcasesOnSearch(value, type) {
        if(!value) {
            let size = this.gridObject.gridPageSize;
            this.zephyrStore.dispatch(this._tcrAction.clearTcrGridData({size}, FIND_ADD_GRID_TYPE));
            return;
        }
        let queryParams = {
            'firstresult': this.searchOffset,
            'maxresults': this.gridPageSize,
            'currentPage': this.currentPage,
            'size': this.gridPageSize,
            'entityType': 'testcase',
            'isZql' : true,
            'releaseId': this.releaseId
        }, dataParams = {
            'releaseId': this.releaseId
        },
        searchType = 'testcases',
        gridType = FIND_ADD_GRID_TYPE.toUpperCase() + '_GRID';

        queryParams['word'] = value;
        if(type == 'prev') {
            this.zephyrStore.dispatch(this._gridAction.paginationSearchRequest(queryParams, gridType , 'PREV', searchType));
        } else if(type == 'next') {
            this.zephyrStore.dispatch(this._gridAction.paginationSearchRequest(queryParams, gridType , 'NEXT', searchType));
        } else {
            this.zephyrStore.dispatch(this._tcrAction.fetchTestCasesOnSearch(queryParams , FIND_ADD_GRID_TYPE));
        }
    }

    addTestcases() {
        let tctIdsObj = {'ids':this.selectedTctIds};
        try {
            if(this.selectedTctIds.length > this.TESTCASE_ADD_LIMIT) {
                window['addSelectedTctIdsObj'] = tctIdsObj;    //TODO:: remove global reference
                jQuery('#find-add-limit-modal').modal();
            } else {
                jQuery('#find-and-add-modal').modal('hide');
                this.zephyrStore.dispatch(this._testcaseAction.cloneTestcase(this.releaseId, this.treeId, {'ids':this.selectedTctIds}));
            }
        } catch(e) {
//            console.log(e);
        }
    }
    addTestcaseOnUserApproval() {
        this.zephyrStore.dispatch(this._testcaseAction.cloneTestcase(this.releaseId, this.treeId, window['addSelectedTctIdsObj']));
        jQuery('#find-and-add-modal').modal('hide');
        jQuery('#find-add-limit-modal').modal('hide');
    }
}
