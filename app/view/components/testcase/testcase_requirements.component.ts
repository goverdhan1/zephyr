import {Component, Input, Output, EventEmitter, OnChanges, AfterViewInit, OnDestroy} from '@angular/core';

import {ZephyrStore} from '../../../store/zephyr.store';
import {TestcaseAction} from '../../../actions/testcase.action';


// Constants
import {TESTCASE_MAPPED_REQUIREMENTS} from './testcase.constant';
import {ACTION_EXPAND, ACTION_COLLAPSE} from '../../../utils/constants/application.constants';

const REQAPPID = 9;

declare var jQuery, _;

@Component({
	selector: TESTCASE_MAPPED_REQUIREMENTS,
	templateUrl: 'testcase_requirements.html'
})
export class TestcaseRequirementsComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input() editable;
	@Input() allowRequirementMapping;
	@Input() isExpanded;
	@Output() updateTestCase: EventEmitter<any> = new EventEmitter();
    testid;
    _prevTestcaseId;
    coverage = '';
    action: string = 'zee-expand';
    zephyrStore;
    unsubscribe;
	expanded: string = ACTION_EXPAND;
	collapsed: string = ACTION_COLLAPSE;
	isMapPerm = false;
	testcase;
    constructor(private _testcaseAction: TestcaseAction) {
        this.zephyrStore = ZephyrStore.getZephyrStore();
		this.unsubscribe = this.zephyrStore.subscribe(() => {
			let state = this.zephyrStore.getState();
			this.testcase = state.testcase.testcase.testcase;
            this.setMappedRequirementsDetails();

			let reqApp = state.leftnav.project.group.filter(item => item.appId === REQAPPID)[0] || {};
			this.isMapPerm = reqApp.permission && this.editable;
		});
    }
    ngOnDestroy() {
        this.unsubscribe();
    }
    setMappedRequirementsDetails() {
        this.testid = this.testcase.id || 0;
		let coverage = (this.testcase.requirementIds || []).length;
		this.coverage = ('Maps to ' + coverage + ' requirement') + (0 === coverage || 1 === coverage ? '' : 's');
    }
    ngAfterViewInit() {
        this.action = this.isExpanded ? 'zee-expand': 'zee-collapse';
    }
	ngOnChanges(changedNode) {
        if(this.testid != this._prevTestcaseId) {
            this.isExpanded = false;
        }
		this._prevTestcaseId = this.testid;
        let _prevAction = this.isExpanded ? 'zee-collapse': 'zee-expand';
        this.action = this.isExpanded ? 'zee-expand': 'zee-collapse';
        jQuery('#zee-testcase-requirement-details-module').removeClass(_prevAction).addClass(this.action);
    }
    onPanelToggle(ev) {
		this.isExpanded = 'zee-expand' === ev.action;
    }
	saveMap(data) {
		jQuery('#zee-testcase-requirement-details-module').removeClass(this.expanded).addClass(this.collapsed);

    	// let keys = _.keys(data.names);
    	// let values = _.values(data.names);

		this.testcase.requirementIds = Array.isArray(data.ids) ? data.ids : [];
    	// this.testcase.requirementNames = Array.isArray(values) ? values : [];
		this.updateTestCase.emit();
	}
}
