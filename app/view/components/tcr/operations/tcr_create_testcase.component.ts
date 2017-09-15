import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';

import {ZephyrStore} from '../../../../store/zephyr.store';
import {TestcaseAction} from '../../../../actions/testcase.action';

import { CUSTOM_FIELD_TYPES } from '../../../../utils/constants/application.constants';
import {NOTIFICATION_APP_CONSTANTS} from '../../../../utils/constants/notification.constants';
import { ADMIN_PREFERENCES } from '../../../components/admin/admin.constant';

declare var jQuery: any, _: any, moment: any;

@Component({
    selector: 'tcr-create-testcase',
    templateUrl: 'tcr_create_testcase.html'
})
export class TcrCreateTestcaseComponent implements OnInit {
    @Input() testcase;
    @Input() tcrCatalogTreeId;
    @Input() releaseId;
    @Input() fieldOptions;
    testcaseId;
    zephyrStore;
    unsubscribe;
    createTestcaseForm: FormGroup;
    priorities = [];
    teststepFields = [];
    action: string = 'zee-expand';
    customField = {
        customFields: [],
        customProperties: {},
        customFieldTypes: []
    };
    mandatoryFields;
    entityCustomFields;
    areCustomFieldsAvailable = false;
    CUSTOM_FIELD_TYPES = CUSTOM_FIELD_TYPES;
    estimatedTime = 600;
    _previousForm;
    appId = NOTIFICATION_APP_CONSTANTS.TCR_APP.name;

    private _datePipe;
    private enableField = {};
    private date = {};
    private validation = {
        name: '',
        description: '',
        priority: '',
        externalId: '',
        tags: '',
        comments: '',
        automated: false,
        scriptName: '',
        scriptId: '',
        scriptPath: ''
    };

    constructor(private formBuilder: FormBuilder, private testcaseAction: TestcaseAction) {
        this._datePipe = new DatePipe('en-US');

        this.zephyrStore = ZephyrStore.getZephyrStore();

        this.unsubscribe = this.zephyrStore.subscribe(() => {
            let _state = this.zephyrStore.getState();
            if(_state.tcr.newTestcase.status) {
                this.testcaseId = _state.tcr.newTestcase.id;
                this.saveTeststepDetails();
                this.zephyrStore.dispatch(this.testcaseAction.clearTestcaseStatus());
            }
        });
    }

    ngOnInit() {
        this.createTestcaseForm = this.formBuilder.group(this.validation);
    }

    onBeforeOpen() {
        this.createTestcaseForm = this.formBuilder.group(this.validation);

        this.setPriorities(this.zephyrStore.getState().adminPref);
        this.setCustomFieldsDetails(this.zephyrStore.getState());

        this._previousForm = _.cloneDeep(this.createTestcaseForm);
    }
    onOpen() {
        jQuery('#tc-name').focus();
    }

    setPriorities(preferences) {
        if(preferences && preferences[ADMIN_PREFERENCES.TESTCASE_TESTCASE_PRIORITY_LOV]) {
            try {
                this.priorities =  JSON.parse(preferences[ADMIN_PREFERENCES.TESTCASE_TESTCASE_PRIORITY_LOV]);
            } catch (e) {
//                console.log(e);
            }
        }
    }

    setCustomFieldsDetails(state) {
        this.testcase = state.testcase.testcase;
        this.customField = {
            customFields: state.customField.customFields['testcase'].filter(item => item.allProject || ~item.projectIds.indexOf(state.project.id)),
            customFieldTypes: state.customField.customFieldTypes,
            customProperties: this.testcase.testcase.customProperties || {}
        };

        let cProp = this.testcase.testcase.customProperties;
        if (cProp) {
            this.customField.customFields.forEach(field => {
                let fval = Array.isArray(field.fieldValues) ? field.fieldValues : [];
                let fname = field.fieldName;
                let valObj = fval.filter(item => cProp.hasOwnProperty(fname) && String(item.id || '') === String(cProp[fname] || ''));
                if (Array.isArray(valObj) && valObj.length) {
                    field.entityValue = valObj[0].value;
                }
            });
        }

        let mandatoryFields = this.customField.customFields.filter(item=>item.mandatory);
        if (Array.isArray(mandatoryFields) && mandatoryFields.length) {
            this.mandatoryFields = mandatoryFields;
        }
        this.entityCustomFields = this._parseCustomFields(cProp);
        this.populateCustomFields();
    }

    populateCustomFields() {

        (this.entityCustomFields || []).forEach(customField => {
            if (this.CUSTOM_FIELD_TYPES.DATE === customField.typeMetaData.dataType) {
                this.date[customField.fieldName] = '';
                this.validation[customField.fieldName] = [{'value': '', 'disabled': false}];
                this.enableField[customField.fieldName] = false;
            } else {
                this.validation[customField.fieldName] = [''];
            }
        });

        this.createTestcaseForm = this.formBuilder.group(this.validation);
    }

    isDateicker(field) {
        return this.enableField[field];
    }
    getDateField(fieldName) {
        let fval = this.date[fieldName];
        if (fval instanceof Date) {
            return this._datePipe.transform(fval);
        }

        if (_.isNumber(fval)) {
            return this._datePipe.transform(moment(fval).format('YYYY-MM-DD'));
        }

        return fval && String(fval).length ? this._datePipe.transform(fval) : '';
    }
    enableDate(field) {
        this.createTestcaseForm.controls[field].disable();
        this.enableField[field] = true;
    }
    saveDate(value, field) {
        this.date[field] = moment(value).valueOf();
        this.createTestcaseForm.controls[field].enable();
        this.enableField[field] = false;
    }
    onClickCancel(field) {
        this.createTestcaseForm.controls[field].enable();
        this.enableField[field] = false;
    }

    onDurationUpdate(value) {
        this.estimatedTime = value;
    }

    mapTestcaseDetails(formValues) {
        let testcase = this.testcase.testcase;
        testcase.name = formValues.name;
        testcase.priority = formValues.priority;
        testcase.externalId = formValues.externalId;
        testcase.comments = formValues.comments;
        testcase.automated = formValues.automated;
        testcase.scriptName = formValues.scriptName;
        testcase.scriptId = formValues.scriptId;
        testcase.scriptPath = formValues.scriptPath;
        testcase.estimatedTime = this.estimatedTime;
    }

    createTestcase() {
        this.testcase['tcrCatalogTreeId'] = this.tcrCatalogTreeId;
        this.testcase['testcase'].releaseId = this.releaseId;
        this.zephyrStore.dispatch(this.testcaseAction.createCompleteTestcase(this.testcase));
    }

    getTeststepFields(fields) {
        this.teststepFields = fields;
    }

    saveTeststepDetails() {
        if(!(this.teststepFields && this.teststepFields.length)) {
            return;
        }

        let stepData = {
            'releaseId': this.releaseId,
            'tcId': this.testcaseId
        };

        stepData['maxId'] = this.teststepFields[0].orderId;
        stepData['steps'] = this.teststepFields;

        this.zephyrStore.dispatch(this.testcaseAction.createTestcaseTestStep(stepData.tcId, stepData));
    }

    onCreateTestcaseFormSubmit(formValues) {
        this.mapTestcaseDetails(formValues);
        this.createTestcase();
    }

    private _parseCustomFields(customProperties) {
        /**
         * For every customfield of the entity map the type and entity properties
         */
        let _mappedCustomFieldProperties = (this.customField.customFields || []).map(_customfield => {
            let _fieldTypeMetadata = _customfield.fieldTypeMetadata;
            let _customFieldType = _.pickBy(this.customField.customFieldTypes, fieldtype => fieldtype.id === _fieldTypeMetadata);
            _customfield.typeMetaData = _.values(_customFieldType)[0];

            if (customProperties && !_customfield.entityValue) {
                let entityValue;
                if ('Picklist' === (_customfield.typeMetaData || {}).dataType) {
                    if (Array.isArray(_customfield.fieldValues)) {
                        let entityArrayValue = _customfield.fieldValues.filter((value) => {
                            return value.id === customProperties[_customfield.fieldName] ||
                                 value.id === String(customProperties[_customfield.fieldName]);
                        });
                        if (Array.isArray(entityArrayValue) && entityArrayValue.length) {
                            entityValue = entityArrayValue[0].value;
                        }
                    }
                } else {
                    entityValue = customProperties[_customfield.fieldName];
                }
                _customfield.entityValue = entityValue;
            }
            return _customfield;
        });

        this.areCustomFieldsAvailable = Array.isArray(_mappedCustomFieldProperties) && _mappedCustomFieldProperties.length > 0;

        return _mappedCustomFieldProperties || [];
    }
}
