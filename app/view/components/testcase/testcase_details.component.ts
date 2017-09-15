import {Component, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

import {ZephyrStore} from '../../../store/zephyr.store';
import * as TestcaseInlineEdit from './testcase_inline_edit.util';
import {TestcaseAction} from '../../../actions/testcase.action';

// Constants
import {TESTCASE_TEST_DETAILS} from './testcase.constant';

@Component({
	selector: TESTCASE_TEST_DETAILS,
	templateUrl: 'testcase_details.html'
})
export class TestcaseDetailsComponent implements OnDestroy {
    @Input() editable;
  	@Input() allowRequirementMapping = false;
  	@Output() updateTestCase: EventEmitter<any> = new EventEmitter();

    commentsValidation: '^(.|[\n\r]){0,2048}$';
    altIdValidation: '^.{0,255}$';
    testcase = {
        id: null,
        externalId: null,
        priority: '',
        priorities: [],
        tags: [],
		tagOptions: [],
        comments: ''
    };
    action: string = 'zee-expand';
    zephyrStore;
    unsubscribe;
    private _testcase = {
        testcase: this.testcase
    };
    constructor(private testcaseAction: TestcaseAction, private domSanitizer : DomSanitizer) {
        this.zephyrStore = ZephyrStore.getZephyrStore();
		this.unsubscribe = this.zephyrStore.subscribe(() => {
            let _state = this.zephyrStore.getState();
            this.setPriorities(_state.adminPref);
            this.setTestcaseDetails(_state.testcase);
		});
    }
    ngOnDestroy() {
        this.unsubscribe();
    }
    setPriorities(preferences) {
        let _priorities = [];
        if(preferences && preferences['testcase.testcasePriority.LOV']) {
            try {
                _priorities =  JSON.parse(preferences['testcase.testcasePriority.LOV']);
            } catch (e) {
//                console.log(e);
            }
        }
        this.testcase.priorities = _priorities.map(item => ({id: item.id, text: item.value}));
    }
    setTestcaseDetails(testcase) {
        this._testcase = testcase.testcase;
        let _testcase = this._testcase.testcase;
        this.testcase.id = _testcase.id;
        this.testcase.externalId = _testcase.externalId;
        this.testcase.priority = _testcase.priority;
        this.testcase.tags = this.parseTagsToList(_testcase['tag']);
	    this.testcase.tagOptions = this.testcase.tags.map(item => ({id: item, text: item}));
        this.testcase.comments = _testcase.comments || '';
    }
    parseTagsToList(tags) {
        if(typeof tags === 'string' && tags.length) {
			let tagList = tags.split(',');
			tagList = tagList.length > 1 ? tagList : tags.split(' ');
            return tagList.sort((a, b) => {
                var alc = a.toLowerCase(), blc = b.toLowerCase();
                return alc > blc ? 1 : alc < blc ? -1 : 0;
            });
        }
        return [];
    }
    getSelectedPriorityName() {
        if(Array.isArray(this.testcase.priority) && this.testcase.priorities.length) {
			return (this.testcase.priorities.filter(priority => priority.id === this.testcase.priority)[0] || {}).text || '';
        }
		return '';
    }
    getSelect2Options(field) {
        if(field === 'tags') {
            return TestcaseInlineEdit.TAG_SELECT_OPTIONS;
        } else if (field === 'priority') {
            return TestcaseInlineEdit.PRIORITY_SELECT_OPTIONS;
        }
        return {};
    }
    saveTags(value) {
        this._testcase.testcase['tag'] = value.split(',').join(' ');
        this.emitTestCaseUpdate();
    }
    savePriority(value) {
        this._testcase.testcase['priority'] = value;
        this.emitTestCaseUpdate();
    }
    saveExternalId(value) {
        this._testcase.testcase['externalId'] = value;
        this.emitTestCaseUpdate();
    }
    saveComment(value) {
        this._testcase.testcase['comments'] = value;
        this.emitTestCaseUpdate();
    }

    emitTestCaseUpdate() {
        this.updateTestCase.emit();
    }
}
