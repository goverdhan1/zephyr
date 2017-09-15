import {Component, Input, ViewChild, AfterViewInit, OnChanges, Inject, OnDestroy} from '@angular/core';
import {Http} from '@angular/http';

import {TCRAction} from '../../../../../../actions/tcr.action';
import {TestcaseEASAction} from '../../../../../../actions/testcaseEAS.action';
import {ZephyrStore} from '../../../../../../store/zephyr.store';
import {TestcaseEASPhaseGridComponent} from '../../phase_grid/phase_grid.component';
import {FIND_ADD_GRID_TYPE, TCR_GRID_PAGINATION, TCR_GRID_COLUMNS, TCR_GRID_OPTIONS} from '../../../../tcr/tcr_grid.constant';

// Constants

import {I18N_MESSAGES} from '../../../../../../utils/messages/messages.en';
import {ADMIN_PREFERENCES} from '../../../../admin/admin.constant';
import {SearchService} from '../../../../../../services/search.service';

declare var jQuery: any, _;

@Component({
    selector: 'zui-testcase-eas-freeform-add-cycles',
    templateUrl: 'testcase_eas_add_cycles.html',
    viewProviders: [TCRAction]
})

export class TestcaseEASFreeFormCyclesComponent implements AfterViewInit, OnChanges, OnDestroy {
    @ViewChild(TestcaseEASPhaseGridComponent) tcrGridUI: TestcaseEASPhaseGridComponent;

    @Input() releaseId;
    @Input() cyclePhaseId;
    @Input() parentTreeId;
    @Input() includeHierarchy;

    goClicked = false;
    selectedTreeNode= [];
    maintainAssignment : Boolean = false;
    selectedTctIds = [];
    phase: any;
    selectedExecutionStatus: any;
    cycles = [];
    searchOffset: number = 0;
    tcrGridRows = [];
    tcrGridColumns =[];
    paginationOptions = TCR_GRID_PAGINATION;
    gridPageSize;
    currentPage;
    cyclePhases  = [];
    executionStatus = [];
    selectedCycle;
    _searchService;
    unsubscribe;
    _fetchCycles = false;
    _zephyrStore;
    i18nMessages = I18N_MESSAGES;
    gridType = 'freeFormBrowse';
    constructor(@Inject(Http) private _http: Http, private _tcrAction: TCRAction, private _testcaseEASAction: TestcaseEASAction) {
        this._searchService = new SearchService(<any>_http);
        // this.gridPageSize = TCR_GRID_OPTIONS.rowCount;

        this._zephyrStore = ZephyrStore.getZephyrStore();

        this.gridPageSize = this._zephyrStore.getState().testcaseEAS.freeFormBrowse.size;

        this.unsubscribe = this._zephyrStore.subscribe(() => {
            let state = this._zephyrStore.getState();

            if(state.testcaseEAS.cycles && state.testcaseEAS.cycles.length && this._fetchCycles) {
                this._fetchCycles = false;
                this.setCycles(state.testcaseEAS.cycles);
            }
        });

        this.setExecutionStatus(this._zephyrStore.getState());
    }

    ngOnChanges(changes) {
      if (!changes.includeHierarchy) {
        this.populateCycles();
      }
    }

    ngAfterViewInit() {
        this.populateCycles();
        jQuery('#zui-eas-freform-add-testcase-modal').on('hide.bs.modal', () => {
            this.populateCycles();
            this._zephyrStore.dispatch(this._testcaseEASAction.clearGridData(this.gridType));
		});
    }
    /**
     * On change of the cycle update the phases
     */
    onCycleChange() {
        // Adding timeout to wait for the selectedCycle model to be updated
        setTimeout(() => {
            this.getPhasesByCycleId(this.selectedCycle);
        }, 10);
    }
    /**
     * On cycle search get the executions
     */
    onCycleSearch(resetPage = false) {
        if (resetPage) {
          this.currentPage = 1;
        }

        let queryParams = {
            'firstresult': this.gridPageSize * (this.currentPage - 1),
            'maxresults': this.gridPageSize,
            'word' : `cyclephaseid=${this.phase}`,
            'currentPage': this.currentPage,
            'entityType': 'execution',
            'isZql' : true,
            'releaseId': this.releaseId
        };

        let selectedExecutionStatus = null;
        let selectedExecutionStatusIndex = parseInt(this.selectedExecutionStatus);

        if (selectedExecutionStatusIndex === 0) {
          selectedExecutionStatus = 'Unexecuted';
        } else if (selectedExecutionStatusIndex) {
          selectedExecutionStatus = this.executionStatus[selectedExecutionStatusIndex].value;
        }

        queryParams.word += selectedExecutionStatus ? ` and status = "${selectedExecutionStatus}"` : '';

        this._zephyrStore.dispatch(this._tcrAction.fetchTestCasesOnSearchCyclePhases(queryParams, FIND_ADD_GRID_TYPE));
        setTimeout(() => {
          this.goClicked = true;
        });
    }

    GridIndexPagination(value) {
        this.currentPage = value;
        this.onCycleSearch();
    }
    gridPageSizeChanged(value) {
        this.gridPageSize = value;
        this.currentPage = 1;
        this.onCycleSearch();
    }
    populateCycles() {
        let cycles = this._zephyrStore.getState().testcaseEAS.cycles;
        if(!cycles && !cycles.length) {
            this._fetchCycles = true;
            this._zephyrStore.dispatch(this._testcaseEASAction.getAllCycles(this.releaseId));
        } else {
            this.setCycles(cycles);
        }
    }

    phaseGridRowSelection(value) {
      this.selectedTctIds = value || [];
    }
    getPhasesByCycleId(id) {
        this.cyclePhases = (this.cycles.filter(cycle => Number(cycle.id) === Number(id))[0] || {}).cyclePhases || [];
        if(Array.isArray(this.cyclePhases) && this.cyclePhases.length) {
            this.cyclePhases = this.cyclePhases.sort(phase => (phase.name || '').toLowerCase());
            this.phase = this.cyclePhases[0].id;
        } else {
            this.phase = 0;
        }
    }
    setCycles(cycles) {
        this.cycles = _.sortBy(cycles, cycle => cycle.name.toLowerCase());


        if(this.cycles.length) {
            this.selectedCycle = (this.cycles.length) ? this.cycles[0]['id'] : null;
            this.getPhasesByCycleId(this.selectedCycle);
        }
    }
    setExecutionStatus(state) {
        let status = state.adminPref[ADMIN_PREFERENCES.TESTRESULT_TESTRESULTSTATUS_LOV];
        this.executionStatus = status.length ? JSON.parse(status) : [];
        // this.executionStatus = this.executionStatus.slice(1);
        // if (this.executionStatus.length) {
        //   this.executionStatus[0].value = 'Not Executed';
        // }
    }

    ngOnDestroy() {
      this.unsubscribe();
    }

    clearSelectedTctIdsPageUpdation(value) {
      this.selectedTctIds = [];
    }

    addTestcases() {
        let _params = {
            maintainassignments: this.maintainAssignment,
            includeHierarchy: this.includeHierarchy,
            cyclePhaseId: this.cyclePhaseId,
            parenttreeid: this.parentTreeId,
            scheduleids: this.selectedTctIds
        };

        this._zephyrStore.dispatch(this._testcaseEASAction.assignTestcasesByCycle(_params));
    }
}
