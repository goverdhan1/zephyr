import {Component, Input, OnChanges, AfterViewInit, OnDestroy} from '@angular/core';
//import {ROUTER_DIRECTIVES} from '@angular/router';

declare var $;
import {ZephyrStore} from '../../../store/zephyr.store';
// import {GridComponent} from '../grid/grid.component';
import {TestcaseAction} from '../../../actions/testcase.action';

// Constants
import {TESTCASE_HISTORY} from './testcase.constant';
import {TESTCASE_HISTORY_GRID_TYPE} from './testcase_history_grid.constant';

@Component({
	selector: TESTCASE_HISTORY,
	templateUrl: 'testcase_history.html'
})
export class TestcaseHistoryComponent implements OnChanges, AfterViewInit, OnDestroy {
    @Input() editable;
    @Input() isExpanded;
    @Input() testcaseId;
    @Input() treeType;
    _prevTestcaseId;
    testid;
    histories = [];
    action: string = 'zee-collapse';
    historyGridType = TESTCASE_HISTORY_GRID_TYPE;
    noData = false;
    zephyrStore;
    unsubscribe;
    constructor(private _testcaseAction: TestcaseAction) {
        this.zephyrStore = ZephyrStore.getZephyrStore();
		this.unsubscribe = this.zephyrStore.subscribe((x) => {
            this.setHistoryDetails(this.zephyrStore.getState().testcase);
		});
    }
    ngOnDestroy() {
        this.unsubscribe();
    }
    setHistoryDetails(testcase) {
        this.histories = testcase.histories;
        this.testid = testcase.testcase.testcase.id;
    }
    ngAfterViewInit() {
        this.action = this.isExpanded ? 'zee-expand': 'zee-collapse';
        if(this.isExpanded) {
            this._prevTestcaseId = this.testid;
            if(this.treeType != 'import') {
                this.histories = [];
                this.zephyrStore.dispatch(this._testcaseAction.fetchTestcaseHistory(this.testid));
            }
        }
    }
	ngOnChanges(changedNode) {
        if(this.testid != this._prevTestcaseId) {
            this.isExpanded = false;
        }
        if(this.isExpanded  && this.testid != this._prevTestcaseId) {
            this._prevTestcaseId = this.testid;
            if(this.treeType != 'import') {
                this.histories = [];
                this.zephyrStore.dispatch(this._testcaseAction.fetchTestcaseHistory(this.testid));
            }
        }
        let _prevAction = this.isExpanded ? 'zee-collapse': 'zee-expand';
        this.action = this.isExpanded ? 'zee-expand': 'zee-collapse';
        $('#zee-testcase-history-details-module').removeClass(_prevAction).addClass(this.action);
    }
    onPanelToggle(ev) {
        if(ev.action == 'zee-expand') {
            this.isExpanded = true;
            if(this.testid && this.testid != this._prevTestcaseId) {
                this._prevTestcaseId = this.testid;
                if(this.treeType != 'import') {
                    this.histories = [];
                    this.zephyrStore.dispatch(this._testcaseAction.fetchTestcaseHistory(this.testid));
                }
            }
        } else {
            this.isExpanded = false;
        }
    }
}
