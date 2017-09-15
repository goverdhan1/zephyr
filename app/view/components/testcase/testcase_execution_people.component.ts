import {Component, Input, OnDestroy} from '@angular/core';
declare var _:any;

import {ZephyrStore} from '../../../store/zephyr.store';

// Constants
import {TESTCASE_EXECUTION_PEOPLE} from './testcase.constant';

@Component({
  selector: TESTCASE_EXECUTION_PEOPLE,
  templateUrl: 'testcase_execution_people.html'
})
export class TestcaseExecutionPeopleComponent implements OnDestroy {
    @Input() editable;
    executioner = {
        executedBy: '',
        executedOn: null
    };
    people = this.executioner;
    action: string = 'zee-expand';
    unsubscribe;
    zephyrStore;
    constructor() {
        //this.people = this.executioner;
        this.zephyrStore = ZephyrStore.getZephyrStore();
        this.unsubscribe = this.zephyrStore.subscribe((x) => {
                this.setPeopleDetails(this.zephyrStore.getState());
        });
    }
    ngOnDestroy() {
        this.unsubscribe();
    }
    setPeopleDetails(state) {
        this.people = JSON.parse(JSON.stringify(this.executioner));
        let testcaseId = state.testcase.testcase.id,
            executionTestcase = state.tce.executions.filter((execution) => {
                return execution.id === testcaseId;
            });
        if(!(executionTestcase && executionTestcase.length)) { return;}
        let _executedBy = executionTestcase[0].executedBy;
        this.people.executedBy = _executedBy || '';
        this.people.executedOn = (executionTestcase[0].lastTestResult) ? executionTestcase[0].lastTestResult.execDate : '';
    }
}
