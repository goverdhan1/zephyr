import {Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, Inject} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';

import {ZephyrStore} from '../../../../store/zephyr.store';

import {TCRAction} from '../../../../actions/tcr.action';
import {TestcaseAction} from '../../../../actions/testcase.action';

import { ADMIN_PREFERENCES } from '../../../components/admin/admin.constant';
import { CUSTOM_FIELD_TYPES } from '../../../../utils/constants/application.constants';
import * as TestcaseInlineEdit from '../../testcase/testcase_inline_edit.util';
import {getI18nText} from '../../../../utils/messages/messages.en';
import { ToastrService } from '../../../../services/toastr.service';
import { UtililtyFunctions as UtilityFunctions } from '../../../../utils/scripts/utils';

declare var jQuery: any, _: any, moment: any;

@Component({
    selector: 'tcr-bulk-edit',
    templateUrl: 'tcr_bulk_edit.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TCRAction, UtilityFunctions]
})
export class TcrBulkEditComponent {
    @Input() testcaseIds;
    @Input() fieldOptions;
    zephyrStore;
    selectedTestCaseIds = [];
    commentsValidation: '^(.|[\n\r]){0,2048}$';
    altIdValidation: '^.{0,255}$';
    bulkEditForm : FormGroup;
    automationStateToggleFlag = false;
    priorities = [];
    tagItems = [];
    tagActive = [];
    tagEditOptions = TestcaseInlineEdit.TAG_SELECT_OPTIONS;
    tags = {
        token: [',', ' '],
        createTag: tag => ({
            id: tag.term,
            text: tag.term,
            isNew : true
        })
    };
    customField = {
        customFields: [],
        customProperties: {},
        customFieldTypes: []
    };
    entityCustomFields;
    areCustomFieldsAvailable = false;
    areUniqueCustomFieldAvailable = false;
    customFieldTypes;
    CUSTOM_FIELD_TYPES = CUSTOM_FIELD_TYPES;
    validations = {};
    previousValue = {};
    showDirtyCheckModal = false;
    tagId = 'tcr-bulk-tag';
    priorityId = 'tcr-bulk-priority';
    estimatedTime = 0;
    textValues;
    private _datePipe;
    private date = {};
    private enableField = {};
    private formValues;
    private priority = '';
    private isPriorityChanged = false;

    constructor( private fb: FormBuilder, private _tcrAction: TCRAction, private _testcaseAction: TestcaseAction,
                 private cdr: ChangeDetectorRef, @Inject(ToastrService) private toastrService:ToastrService,  private utils: UtilityFunctions) {
        this._datePipe = new DatePipe('en-US');
        this.zephyrStore = ZephyrStore.getZephyrStore();

        this.validations = {
            'scriptName'     : [{'value': '', 'disabled': true}],
            'scriptId'       : [{'value': '', 'disabled': true}],
            'scriptPath'     : [{'value': '', 'disabled': true}],
            'externalId'     : ['', Validators.pattern('^.{0,255}$')],
            'priority'       : [''],
            'tag'            : [''],
            'comments'       : [''],
            'automated'      : [false],
            'estimatedTime'  : ['']
        };

        this.bulkEditForm = fb.group(this.validations);
    }
    onBeforeOpen() {
        let state = this.zephyrStore.getState();
        try {
            if (state.adminPref && state.adminPref[ADMIN_PREFERENCES.TESTCASE_TESTCASE_PRIORITY_LOV]) {
                this.priorities = JSON.parse(state.adminPref[ADMIN_PREFERENCES.TESTCASE_TESTCASE_PRIORITY_LOV]).map(item => ({id: item.id, text: item.value}));
            }
        } catch(e) {
        }
        this.setCustomFieldsDetails(state);
        this.previousValue = this.removeDateFields();
    }
    removeDateFields() {
        let formValues = JSON.parse(JSON.stringify(this.bulkEditForm.value));
        let dateFields = this.customField.customFields.filter(item => item.typeMetaData.dataType === this.CUSTOM_FIELD_TYPES.DATE);
        dateFields.forEach(item => {
            delete formValues[item.fieldName];
        });
        return formValues;
    }
    resetAutomationState() {
        this.validations['automated'] = [false];
        this.validations['scriptName'] = [{'value': '', 'disabled': true}];
        this.validations['scriptId'] = [{'value': '', 'disabled': true}];
        this.validations['scriptPath'] = [{'value': '', 'disabled': true}];
        this.bulkEditForm = this.fb.group(this.validations);
    }
    saveDate(value, field) {
        this.date[field] = moment(value).valueOf();
        this.bulkEditForm.controls[field].enable();
        this.enableField[field] = false;
    }
    onClickCancel(field) {
        this.bulkEditForm.controls[field].enable();
        this.enableField[field] = false;
    }
    enableDate(field) {
        this.bulkEditForm.controls[field].disable();
        this.enableField[field] = true;
    }
    isDateicker(field) {
        return this.enableField[field];
    }
    getDateField(fieldName) {
        let fval = this.date[fieldName];
        if (fval instanceof Date) {
          return this.utils.parseDate(fval);
        }

        if (_.isNumber(fval)) {
            return this.utils.parseDate(fval);
        }

        return fval && String(fval).length ? this.utils.parseDate(fval) : '';
    }
    checkFormValidity(formValues) {
        let isValid = false;
        Object.keys(formValues).forEach(key => {
            if (!_.isBoolean(formValues[key]) && formValues[key].length) {
                isValid = true;
            }
            if (_.isNumber(formValues[key]) && formValues[key] > 0) {
                isValid = true;
            }
            if (_.isBoolean(formValues[key])) {
                if ('automated' === key) {
                    if(this.automationStateToggleFlag) {
                        isValid = true;
                    }
                } else {
                    isValid = true;
                }
            }
            if (this.date[key]) {
                formValues[key] = this.date[key];
                isValid = true;
            }
        });
        return isValid;
    }
    resetFormFields() {

        this.estimatedTime = 0;
        this.date = {};
        this.tagActive = [];

        jQuery('.bulk-edit-form').find('input, textarea').val('');
        jQuery('.bulk-edit-form').find('input:checkbox').prop('checked', false);
        jQuery('.bulk-edit-form').find('select').each((index, elem) => {
            elem.selectedIndex = -1;
        });

        jQuery(`#${this.priorityId}`).val('').trigger('change');
        jQuery(`#${this.tagId}`).val('').trigger('change');
        this.isPriorityChanged = false;
        jQuery('.bulk-edit-error').hide();
        this.resetAutomationState();
        this.populateCustomFields();
    }
    onDurationUpdate(value) {
        this.estimatedTime = value;
    }
    onEditFormSubmit(formValues) {
        formValues = JSON.parse(JSON.stringify(formValues));
        formValues.tag = this.tagActive.map(item => item.text).join(' ');
        formValues.estimatedTime = this.estimatedTime;
        formValues.priority = this.priority;

        if(this.checkFormValidity(formValues)) {
            let customFields = this.customField.customFields.map(item => item.fieldName);
            let customFieldObject = {};
            Object.keys(formValues).forEach(key => {
                if (-1 !== customFields.indexOf(key)) {
                    if (formValues[key] || _.isBoolean(formValues[key])) {
                        customFieldObject[key] = formValues[key];
                    }
                    delete formValues[key];
                }
            });
            this.saveForm(formValues, customFieldObject);
        } else {
            jQuery('.bulk-edit-error').show();
        }
    }
    saveForm(formValues, customFieldObject) {
        jQuery('.bulk-edit-error').hide();

        formValues['ids'] = this.testcaseIds;
        if(!_.isEmpty(customFieldObject)) {
            formValues['customFields'] = customFieldObject;
        } else {
            delete formValues['customFields'];
        }
        for(let item in formValues) {
            let automationDelCheck = _.isBoolean(formValues[item]) && !this.automationStateToggleFlag;
            let itemsDelCheck = (_.isString(formValues[item]) && formValues[item] === '') || (_.isNumber(formValues[item]) && formValues[item] === 0);

            if(formValues.hasOwnProperty(item) && (automationDelCheck || itemsDelCheck)) {
                delete formValues[item];
            }
        }
        this.textValues = this.getValues(formValues);
        this.formValues = formValues;
        jQuery('#bulk-confirm-modal').modal('show');
    }
    getValues(values) {
        let text = '';
        Object.keys(values).forEach(key => {
            // filter out the id list as they are not values
            if ('ids' !== key) {
                // filter out the custom fields as they need to be dealt separately
              if ('customFields' !== key) {
                    let value = values[key];
                    if ('priority' === key) {
                        let priority = this.priorities.filter(item => values[key] === item.id)[0];
                        if (priority) {
                            value = priority.text || '';
                        }
                    }

                    if ('estimatedTime' === key) {
                        key = 'Estimated time';
                        value = this.convertSecondsToDuration(value);
                    }

                    key = _.capitalize(key);

                    if ('Externalid' === key) {
                      key = 'Alt ID';
                    }

                    text += `<div class="bulk-edit-confirmation-text"><b title="${key}">${key}</b><span>&nbsp;:&nbsp;</span><span title="${value}">${value}</span></div>`;
                } else {
                    Object.keys(values.customFields).forEach(cKey => {
                        let cField = this.customField.customFields.filter(item => cKey === item.fieldName)[0];
                        if (cField) {
                            let cText = CUSTOM_FIELD_TYPES.DATE === cField.typeMetaData.dataType ? this.getDateField(cKey) : values.customFields[cKey];

                            if (CUSTOM_FIELD_TYPES.PICKLIST === cField.typeMetaData.dataType) {
                              cText = _.find(cField.fieldValues, {id: cText}).text;
                            }

                            text += `<div class="bulk-edit-confirmation-text"><b title="${cField.displayName}">${cField.displayName}</b><span>&nbsp;:&nbsp;</span><span title="${cText}">${cText}</span></div>`;
                        }
                    });
                }
            }
        });
        return text;
    }
    saveBulk() {
        if (this.formValues.automated && !this.formValues.scriptPath) {
          this.toastrService.info(`An automated testcase must have a path for it's execution.`, {
            'showDuration': '3000',
            'hideDuration': '1000',
            'timeOut': '5000'
          });
        }
        if(this.customField && this.customField.customFields) {
          let dateFields = this.customField.customFields.filter(item => item.typeMetaData.dataType === this.CUSTOM_FIELD_TYPES.DATE);
          if(this.formValues && this.formValues.customFields && dateFields && dateFields.length) {
            this.formValues['customProcessedFields'] = {};
            dateFields.forEach(item => {
              this.formValues['customProcessedFields'][item.fieldName] = moment(this.formValues['customFields'][item.fieldName]).format('MM/DD/YYYY');
            });
          }
        }
        this.zephyrStore.dispatch(this._tcrAction.updateBulkTestcaseDetailsById(this.formValues));
        this.automationStateToggleFlag = false;
        this.resetFormFields();
        jQuery('#zee-create-edit-modal-tcr_3').modal('hide');
        jQuery('#bulk-confirm-modal').modal('hide');
    }
    cancelConfirm() {
        jQuery('#bulk-confirm-modal').modal('hide');
    }
    onCloseBulk() {
        this.textValues = '';
    }
    cancelEditForm() {
      if(!this.isFormValid()) {
        this.showDirtyCheckModal = true;
      } else {
        this.cancelChanges();
      }
    }
    cancelChanges() {
        this.resetFormFields();
        jQuery('#zee-create-edit-modal-tcr_3').modal('hide');
    }
    continueNavigation() {
      this.showDirtyCheckModal = false;
      this.cancelChanges();
    }

    dismissNavigation() {
      this.showDirtyCheckModal = false;
    }
    toggleAutomationFields(e) {
        this.automationStateToggleFlag = true;

        this.addControlValidation(e.target.checked);
    }
    addControlValidation(check) {
        this.validations['automated'] = [check];
        this.bulkEditForm.controls['scriptId'].setValue('');
        this.bulkEditForm.controls['scriptName'].setValue('');
        this.bulkEditForm.controls['scriptPath'].setValue('');
        if(check) {
            this.bulkEditForm.controls['scriptName'].setValidators(Validators.compose([Validators.required,
               Validators.pattern('^(?=.{0,255}$)(?=^[\\s]*)(?=.*[\\s]*$)(?=.*[\\S]+).*$')]));

            this.bulkEditForm.controls['scriptName'].enable();
            this.bulkEditForm.controls['scriptId'].enable();
            this.bulkEditForm.controls['scriptPath'].enable();
        } else {
            this.bulkEditForm.controls['scriptName'].clearValidators();

            this.bulkEditForm.controls['scriptName'].disable();
            this.bulkEditForm.controls['scriptId'].disable();
            this.bulkEditForm.controls['scriptPath'].disable();
        }
    }

    setCustomFieldsDetails(state) {
        let cProp = state.testcase.testcase.testcase.customProperties;
        this.customField = {
            customFields: state.customField.customFields['testcase'].filter(item => item.allProject || ~item.projectIds.indexOf(state.project.id)),
            customFieldTypes: state.customField.customFieldTypes,
            customProperties: cProp || {}
        };

        if (cProp) {
			this.customField.customFields.forEach(field => {
                let fval = Array.isArray(field.fieldValues) ? field.fieldValues : [];
                let fname = field.fieldName;
                let valObj = fval.filter(item => cProp.hasOwnProperty(fname) && String(item.id || '') === String(cProp[fname] || ''))[0];
                if (valObj) {
                    field.entityValue = valObj.value;
                }
			});
        }

        this.entityCustomFields = this._parseCustomFields(cProp);
        this.populateCustomFields();
    }

    populateCustomFields() {

        (this.entityCustomFields || []).forEach(customField => {
            if (this.CUSTOM_FIELD_TYPES.DATE === customField.typeMetaData.dataType) {
                this.date[customField.fieldName] = '';
                this.validations[customField.fieldName] = [{'value': '', 'disabled': false}];
                this.enableField[customField.fieldName] = false;
            } else {
                this.validations[customField.fieldName] = [''];
            }
        });

        this.bulkEditForm = this.fb.group(this.validations);
    }
    hasChanges() {
        let previousValue = this.previousValue;
        let currentValue = this.removeDateFields();

        let isChanged = Object.keys(currentValue).some(key => currentValue[key] !== previousValue[key] && currentValue[key] !== null);

        let date = Object.keys(this.date).filter(key => this.date[key]);

        return isChanged || this.automationStateToggleFlag || this.tagActive.length || date.length || this.estimatedTime || this.isPriorityChanged;

    }
    onTagSelect(ev) {
        this.tagActive.push(ev);
    }
    onTagUnselect(ev) {
        this.tagActive = this.tagActive.filter(item => item.id !== ev.id);
    }
    onPrioritySelect(ev) {
        this.isPriorityChanged = true;
        this.priority = String(ev.id);
    }
    onPriorityUnselect(ev) {
        this.isPriorityChanged = true;
        this.priority = '';
    }
    isFormValid() {
        return !this.hasChanges() || this.bulkEditForm.invalid;
    }
    convertSecondsToDuration(value) {
        let day = 0,
            hour = 0,
            minute = 0,
            dayText = '00',
            hourText = '00',
            minuteText = '00';

        let seconds = Number(value);

        if (isNaN(seconds) || seconds <= 0) {
            return '00:00:00';
        } else {
            hour = Math.floor(seconds / 3600);
            minute = Math.floor((seconds - (hour * 3600)) / 60);
            day = Math.floor(hour / 24);
            hour = Math.floor(hour % 24);
            dayText = day.toString();
            hourText = hour.toString();
            minuteText = minute.toString();
            if(!day) {
                dayText = '00';
            }
            if(!hour) {
                hourText = '00';
            }
            if(!minute) {
                minuteText = '00';
            }
        }
        return `${dayText}:${hourText}:${minuteText}`;
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

        this.areUniqueCustomFieldAvailable = Array.isArray(_mappedCustomFieldProperties) && _mappedCustomFieldProperties.filter(item => item.unique).length > 0;

        return _mappedCustomFieldProperties || [];
    }
}
