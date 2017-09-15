import {Component, Input, Output, EventEmitter, OnDestroy} from '@angular/core';

import {ZephyrStore} from '../../../store/zephyr.store';
import {TestcaseAction} from '../../../actions/testcase.action';

// Constants
import {TESTCASE_CUSTOMFIELD} from './testcase.constant';
declare var _:any;
declare var moment: any;

@Component({
	selector: TESTCASE_CUSTOMFIELD,
	templateUrl: 'testcase_customfield.html'
})
export class TestcaseCustomFieldComponent implements OnDestroy {
    @Input() editable;
	@Output() updateTestCase: EventEmitter<any> = new EventEmitter();
	@Output() setMandatoryField: EventEmitter<any> = new EventEmitter();
    customField = {
        customFields: [],
        customProperties: {},
        customFieldTypes: []
    };
    action: string = 'zee-collapse';
    zephyrStore;
    unsubscribe;
    private _testcase = {
        testcase: {
			projectId: 0,
            customProperties: {}
        }
    };
    constructor(private testcaseAction: TestcaseAction) {
        this.zephyrStore = ZephyrStore.getZephyrStore();
		this.unsubscribe = this.zephyrStore.subscribe(() => {
            this.setCustomFieldsDetails(this.zephyrStore.getState());
		});
    }
    ngOnDestroy() {
        this.unsubscribe();
    }
    setCustomFieldsDetails(state) {
        this._testcase = state.testcase.testcase;
        this.customField = {
            customFields: _.cloneDeep(state.customField.customFields['testcase'].filter(item => item.allProject || ~item.projectIds.indexOf(this._testcase.testcase.projectId || state.project.id))),
            customFieldTypes: _.cloneDeep(state.customField.customFieldTypes),
            customProperties: _.cloneDeep(this._testcase.testcase.customProperties) || {}
        };

		let mandatoryFields = this.customField.customFields.filter(item => item.mandatory);
		if (Array.isArray(mandatoryFields) && mandatoryFields.length) {
			this.setMandatoryField.emit(mandatoryFields);
		}
    }
    saveCFFieldValue(value) {
		let _customProperties = this.customField.customProperties;
		let tempList = Object.keys(value);
		if(tempList && tempList.length > 0 && this.customField.customFields) {
			tempList.forEach((key) => {
				let tempList1 = this.customField.customFields.filter((cf) => (cf.fieldName == key && 5 == cf.fieldTypeMetadata));
				if(tempList1 && tempList1.length > 0) {
					this._testcase.testcase['customProcessedProperties'] = this._testcase.testcase['customProcessedProperties'] || {};
					this._testcase.testcase['customProcessedProperties'][key] = moment(value[key]).format('MM/DD/YYYY');
				}
			});
		}
		Object.assign(_customProperties, value);
		this._testcase.testcase['customProperties'] = _customProperties;
		this.updateTestCase.emit();
    }
}
