/**
 * Primary nav is the primary navigation bar of the SPA
 * contains buttons
 */
import {Component, Input, Output, EventEmitter, OnDestroy} from '@angular/core';

import {ZephyrStore} from '../../../store/zephyr.store';
import {TestcaseAction} from '../../../actions/testcase.action';

// Constants
import {TESTCASE_DETAILS_COMPONENT} from './testcase.constant';
import {TESTCASE_OPERATION_OPTIONS} from './operations/testcase_operations.constant';

@Component({
	selector: TESTCASE_DETAILS_COMPONENT,
	templateUrl: 'testcase_primary_nav.html'
})
export class TestcasePrimaryNavComponent implements OnDestroy {
    @Input() editable;
    @Input() isDetailView;
    @Input() isSearchView;
    @Input() releaseId;
    @Output() updateTestCase: EventEmitter<any> = new EventEmitter();
    nameValidation;
    descriptionValidation;

    zephyrStore;
    unsubscribe;
    //TODO-CHECK
    testcase = {
        project: {},
        release: {},
        treeNodes: {
            hierarchy: []
        },
        id: null,
        name: '',
        description: ''
    };
    tcOpOptions = JSON.parse(JSON.stringify(TESTCASE_OPERATION_OPTIONS));
    private _testcase = {
        testcase: {
            id: null
        }
    };
    constructor(private testcaseAction: TestcaseAction) {
        this.zephyrStore = ZephyrStore.getZephyrStore();

        this.nameValidation = '^.{1,255}$';
        this.descriptionValidation = '^(.|[\n\r]){0,1024}$';

		this.unsubscribe = this.zephyrStore.subscribe(() => {
            let _state = this.zephyrStore.getState();
            if(_state && _state.testcase && _state.tcr && _state.tcr.treeData) {
                this.setTestcasePrimaryNavDetails(_state);
            }
		});
    }
    ngOnDestroy() {
        this.unsubscribe();
    }
    setTestcasePrimaryNavDetails(state) {
        this._testcase = state.testcase.testcase;
        this.testcase.project = state.project;
        this.testcase.id = state.testcase.testcase.testcase.id;
        this.testcase.name = state.testcase.testcase.testcase.name;
        this.testcase.description = state.testcase.testcase.testcase.description;
    }
    saveDescription(value) {
        this._testcase.testcase['description'] = value;
        this.updateTestCase.emit();
    }
    saveName(value) {
        this._testcase.testcase['name'] = value;
        this.updateTestCase.emit();
    }
}
