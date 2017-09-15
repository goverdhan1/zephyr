import {Component, Input, Output, EventEmitter, OnDestroy} from '@angular/core';

import {ZephyrStore} from '../../../store/zephyr.store';
import {TestcaseAction} from '../../../actions/testcase.action';
import {TestcaseExecutionAction} from '../../../actions/testcaseExecution.action';

// Constants
import {TESTCASE_EXECUTION_TIME} from './testcase.constant';

@Component({
	selector: TESTCASE_EXECUTION_TIME,
	templateUrl: 'testcase_execution_time.html'
})
export class TestcaseExecutionTimeComponent implements OnDestroy {
    @Input() editable;
	@Output() updateTestCase: EventEmitter<any> = new EventEmitter();
    time = {
        actualTime: null
    };
    action: string = 'zee-expand';
    zephyrStore;
    loggedInUserId;
    _pipeArgs = ['dd:hh:mm'];
    unsubscribe;
    _tcExecution;
    executionObject;
    private _testcase = {
        testcase: {
            id: null
        }
    };
    constructor(private testcaseAction: TestcaseAction, private testcaseExecutionAction : TestcaseExecutionAction) {
        this.zephyrStore = ZephyrStore.getZephyrStore();
        this.loggedInUserId = this.zephyrStore.getState().loggedInUser.id;
		this.unsubscribe = this.zephyrStore.subscribe((x) => {
            let _state = this.zephyrStore.getState();
            if(_state && _state.testcase && _state.tce) {
                this.executionObject = this.setExecutionObject(_state.testcase, _state.tce);
                this.setActualTimeDetails();
            }
		});
    }
    ngOnDestroy() {
        this.unsubscribe();
    }
    setActualTimeDetails() {
        if(this.executionObject && this.executionObject.length) {
            this.time = {
                actualTime: this.executionObject[0]['actualTime']
            };
        }
    }

    setExecutionObject (testcase, execution) {
        this._testcase = testcase.testcase;
        this._tcExecution = execution.executions;
        return this._tcExecution.filter((row)=> {
            return row.id === this._testcase['id'];
        });
    }

    saveActualTime(value, type) {
        if(this.executionObject && this.executionObject.length) {
            this.zephyrStore.dispatch(this.testcaseExecutionAction.updateExecutionDetailsById(
            this.executionObject[0].executionId, value, type, this.loggedInUserId , null));
        }
    }
}
