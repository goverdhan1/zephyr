import {Component, Input, OnChanges, AfterViewInit, OnDestroy} from '@angular/core';
//import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';

declare var $;
import {ZephyrStore} from '../../../store/zephyr.store';
import {TestcaseAction} from '../../../actions/testcase.action';

// Constants
import {TESTCASE_ATTACHMENTS} from './testcase.constant';

@Component({
	selector: TESTCASE_ATTACHMENTS,
	templateUrl: 'testcase_attachments.html'
})
export class TestcaseAttachmentsComponent implements OnChanges, AfterViewInit, OnDestroy {
    @Input() editable;
    @Input() testcaseId;
    @Input() isExpanded;
    action: string = 'zee-collapse';
    attachments = [];
    zephyrStore;
    testid : number;
    unsubscribe;
    private _prevTestcaseId;
    constructor(private _testcaseAction: TestcaseAction) {
        this.zephyrStore = ZephyrStore.getZephyrStore();
		this.unsubscribe = this.zephyrStore.subscribe((x) => {
            this.setAttachmentDetails(this.zephyrStore.getState().testcase);
		});
    }
    setAttachmentDetails(testcase) {
        this.attachments = testcase.attachments;
        this.testid = testcase.testcase.testcase.id;
    }
    ngAfterViewInit() {
        this.action = this.isExpanded ? 'zee-expand': 'zee-collapse';
        if(this.isExpanded) {
            this._prevTestcaseId = this.testid;
            this.attachments = [];
            this.zephyrStore.dispatch(this._testcaseAction.fetchAttachments(this.testid));
        }
    }
	ngOnChanges(changedNode) {
        if(this.testid != this._prevTestcaseId) {
            this.isExpanded = false;
        }
        if(this.isExpanded  && this.testid != this._prevTestcaseId) {
            this._prevTestcaseId = this.testid;
            this.attachments = [];
            this.zephyrStore.dispatch(this._testcaseAction.fetchAttachments(this.testid));
        }
        let _prevAction = this.isExpanded ? 'zee-collapse': 'zee-expand';
        this.action = this.isExpanded ? 'zee-expand': 'zee-collapse';
        $('#zee-testcase-attachment-details-module').removeClass(_prevAction).addClass(this.action);
    }
    ngOnDestroy() {
        this.unsubscribe();
    }
    onPanelToggle(ev) {
        if(ev.action == 'zee-expand') {
            this.isExpanded = true;
            if(this.testid && this.testid != this._prevTestcaseId) {
                this._prevTestcaseId = this.testid;
                this.attachments = [];
                this.zephyrStore.dispatch(this._testcaseAction.fetchAttachments(this.testid));
            }
        } else {
            this.isExpanded = false;
        }
    }
}
