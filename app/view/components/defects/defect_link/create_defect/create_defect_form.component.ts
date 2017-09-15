import {Component, AfterViewInit, Input, Output, EventEmitter, OnChanges, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {I18N_MESSAGES} from '../../../../../utils/messages/messages.en';
import {ZephyrStore} from '../../../../../store/zephyr.store';
import {DefectsAction} from '../../../../../actions/defects.action';

// Constants
import {CREATE_DEFECT_FIELDS_ORDER, DEFECT_KEY_MAPPING} from './create_defect.constants';

declare var jQuery: any, _;

@Component({
    selector: 'create-defect-form',
    templateUrl: 'create_defect_form.html',
    viewProviders: [DefectsAction],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CreateDefectFormComponent implements AfterViewInit, OnChanges {
    @Input() isUpdate;
    @Input() disableCopyTestStep;
    @Input() selectedDefect;
    @Input() issueMetaData;
    @Input() selectedProject;
    @Input() selectedIssueType;
    @Input() selectedIssueTypeName;
    @Input() parentIssueKey;
    @Input() casCadeSelectDefault;
    @Output() triggerChangeDetection: EventEmitter<any> = new EventEmitter();
    isFirst = true;
    hideDefectForm = true;
    fieldsArray = [];
    selectedFieldValues = {};
    selectChanges = [];
    customFieldSelectChanges = [];
    selectedReporter;
    changeDetectionDebounce;
    debounceIssueMetaData;
    public createDefectForm: FormGroup;

    i18nMessages = I18N_MESSAGES;
    private _zephyrStore;
    constructor(public fb: FormBuilder, private _defectsAction: DefectsAction, private cdr: ChangeDetectorRef) {
        this.createDefectForm = this.fb.group({});
        this._zephyrStore = ZephyrStore.getZephyrStore();
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.hideDefectForm = false;
            this.triggerChangeDetection.emit();
            this.triggerChange();
        }, 100);
        this.debounceInitIssueMetaData();
    }
    ngOnChanges(changedKey) {
        setTimeout(() => {
            this.hideDefectForm = false;
            this.triggerChangeDetection.emit();
            this.triggerChange();
        }, 100);
        this.debounceInitIssueMetaData();
    }
    debounceInitIssueMetaData() {
        if(this.debounceIssueMetaData) {
            clearTimeout(this.debounceIssueMetaData);
        }
        this.debounceIssueMetaData = setTimeout(() => {
            this.initIssueMetaData();
            this.debounceIssueMetaData = null;
        },100);
    }
    initIssueMetaData() {
        let _fieldsArray = [];
        let metadata = _.cloneDeep(this.issueMetaData);
        if(!metadata) {
            return;
        }
        //remove attachment field
        if(metadata.hasOwnProperty('attachment')) {
            delete metadata['attachment'];
        }
        if(Object.keys(metadata).length) {
            CREATE_DEFECT_FIELDS_ORDER.forEach((fieldName) => {
                let mappedFieldName = DEFECT_KEY_MAPPING[fieldName] || fieldName;
                if(metadata[fieldName]) {
                    metadata[fieldName]['fieldKey'] = mappedFieldName;
                    _fieldsArray.push(metadata[fieldName]);
                    delete metadata[fieldName];
                }
            });
            Object.keys(metadata).forEach((key) => {
                let mappedKey = DEFECT_KEY_MAPPING[key] || key;
                if(metadata[key]) {
                    metadata[key]['fieldKey'] = mappedKey;
                    _fieldsArray.push(metadata[key]);
                }
            });
        }

        this.setFormFields(_fieldsArray);

        this.fieldsArray = _fieldsArray;

        let arrayFieldsKey = [];
        this.fieldsArray.forEach((field) => {

            if(this.isUpdate) {
                let that = this;
                (function(key) {
                    setTimeout(() => {
                        that.updateFormFields(key);
                        that.triggerChange();
                    }, 1000);
                })(field.fieldKey);
            }

            if(field.schema && (field.schema.type=='array' || field.schema.type=='version')) {
                arrayFieldsKey.push(field.fieldKey);
            }
        });
        this._zephyrStore.dispatch(this._defectsAction.updateArrayFieldsKey(arrayFieldsKey));
    }
    updateFormFields(fieldKey) {
        if(((Object.keys(this.selectedDefect).indexOf(fieldKey) > -1 ||
            Object.keys(this.selectedDefect.customProperties).indexOf(fieldKey) > -1) &&
            (this.selectedDefect[fieldKey] || this.selectedDefect.customProperties[fieldKey]))
            || (fieldKey === 'labels' && this.selectedDefect.additionalProperties != null)) {

            let fieldVal = this.selectedDefect[fieldKey] || this.selectedDefect.customProperties[fieldKey] || this.selectedDefect.additionalProperties[fieldKey];
            if(this.createDefectForm.controls[fieldKey]) {
                let selectEl = jQuery('defect-advanced-detail').find('select#' + fieldKey + '-field');
                let selectE2 = jQuery('defect-advanced-detail').find('select#' + fieldKey + '-field-child');
                let dateEl = jQuery('defect-advanced-detail').find('#' + fieldKey + '-field.defect-datepicker');
                let chkBoxEl = jQuery('defect-advanced-detail').find('#' + fieldKey + '-field').find('input[type="checkbox"]');
                if(chkBoxEl.length) {
                    let chkBoxParent = jQuery('defect-advanced-detail').find('#' + fieldKey + '-field');
                    fieldVal.forEach(val => {
                        chkBoxParent.find('input[value="'+ val +'"]').prop('checked', true);
                    });
                } else {
                    this.createDefectForm.controls[fieldKey].setValue(fieldVal);
                }
                if(selectEl.prop('tagName') === 'SELECT') {
                    if (selectEl.hasClass('zui-multiselect-picker')) {
                        fieldVal = Array.isArray(fieldVal) ? fieldVal : [fieldVal];
                        fieldVal.forEach(optVal => {
                            if (!selectEl.children(`option[value="${optVal}"]`).length) {
                                selectEl.append('<option value='+ optVal +'>' + optVal + '</option>');
                            }
                        });
                    }
                    if((jQuery('.zui-cascade-select2').find('#'+ selectE2.prop('id'))).length > 0) {
                        if(fieldVal.length > 0) {
                            if(this.isUpdate) {
                                this.casCadeSelectDefault = fieldVal;
                            }
                        }
                    }
                    setTimeout(() => {
                        selectEl.val(fieldVal).trigger('change');
                    }, 301);
                }
                if(selectEl.hasClass(fieldKey + '-autocomplete')) {
                    if(selectEl.prop('multiple')) {
                        if(!this.isFirst) {
                            return;
                        }
                        this.isFirst = false;
                        fieldVal.forEach(optVal => {
                            selectEl.append('<option selected="selected" value='+ optVal +'>' + optVal + '</option>');
                        });
                        selectEl.trigger('change');
                        // this.setUser({'field': fieldKey, 'value': fieldVal});
                    } else {
                        selectEl.append(jQuery('<option>', {value: fieldVal, text: fieldVal}));
                        setTimeout(() => {
                            selectEl.val(fieldVal).trigger('change');
                        }, 301);
                        this.setUser({'field': fieldKey, 'value': fieldVal});
                    }
                }
                // add logic for updating edit form


                if(dateEl.length) {
                    this.dateChange([fieldVal, fieldKey]);
                }
            }
        }
    }
    setFormFields(_fieldsArray) {

        let validator = {};
        _fieldsArray.forEach((field) => {
            let fieldKey = field.fieldKey;

            if(field.schema.type === 'app-release-select' || ( field.schema.custom && field.schema.custom.indexOf('cascadingselect')>0) ) {
              // check hasdefault value field.hasDefaultValue and required  for option-with-child
              field.schema.type = 'option-with-child';
            }

            if(field.schema && field.schema.type === 'array') {
                this.selectedFieldValues[fieldKey] = [];
            } else {
                this.selectedFieldValues[fieldKey] = '';
            }
            if(fieldKey === 'product') {
                this.selectedFieldValues[fieldKey] = this.selectedProject;
            }
            if(fieldKey === 'issueType') {
                this.selectedFieldValues[fieldKey] = this.selectedIssueType;
            }
            if(fieldKey === 'parentKey' && this.parentIssueKey) {
                field.name = 'Parent Issue';
                this.selectedFieldValues[fieldKey] = this.parentIssueKey;
            }
            if(fieldKey === 'reporter') {
                let defectUserState = this._zephyrStore.getState().defectUser;
                this.selectedReporter = defectUserState && defectUserState.user && defectUserState.user.userName;
                this.selectedFieldValues[fieldKey] =  this.selectedReporter;
            }
            // making priority and description as required field.
            if(fieldKey === 'longDesc') {
                field.required = true;
            }

            validator[fieldKey] = (field.required) ?
                [this.selectedFieldValues[fieldKey], Validators.required] : [this.selectedFieldValues[fieldKey]];
        });
        this.createDefectForm = this.fb.group(validator);
    }
    getMonthText(month) {
        let monthsMap = {
            '0': 'Jan',
            '1': 'Feb',
            '2': 'Mar',
            '3': 'Apr',
            '4': 'May',
            '5': 'Jun',
            '6': 'Jul',
            '7': 'Aug',
            '8': 'Sep',
            '9': 'Oct',
            '10': 'Nov',
            '11': 'Dec'
        };
        return monthsMap[month];
    }
    setUser(value) {
        this.createDefectForm.controls[value.field].setValue(value.value);
    }
    dateChange(args) {
        let dateObj = new Date(args[0]);
        let key = args[1];
        let year = dateObj.getFullYear().toString();
        let dateString = dateObj.getDate() + '/' + this.getMonthText(dateObj.getMonth()) + '/' + year.slice(year.length - 2, year.length);
        this.createDefectForm.value[key] = dateString;
        this.createDefectForm.controls[key].setValue(dateString);
    }
    optionChange(args) {
        this.createDefectForm.controls[args.formKey].setValue(args.formValue);
        let _selectChanges = this.selectChanges;
        if(_selectChanges.length && _selectChanges.indexOf(args.formKey) > -1) {
            _selectChanges.splice(_selectChanges.indexOf(args.formKey), 1);
        }
    }
    onMultiOptionChange(args) {
        let _selectChanges = this.selectChanges;
        if(_selectChanges.length && _selectChanges.indexOf(args.formKey) > -1) {
            _selectChanges.splice(_selectChanges.indexOf(args.formKey), 1);
        }
    }
    listOptionChange(args) {
        let val = args.formValue && args.formValue.toString();
        this.createDefectForm.controls[args.formKey].setValue([val]);
        let _customFieldSelectChanges = this.customFieldSelectChanges;
        if(_customFieldSelectChanges.length && _customFieldSelectChanges.indexOf(args.formKey) > -1) {
            _customFieldSelectChanges.splice(_customFieldSelectChanges.indexOf(args.formKey), 1);
        }
    }
    descStepsParsing(obj) {
        let stepsString = obj.steps;
        let key = obj.field;
        this.createDefectForm.controls[key].setValue(stepsString);
    }
    getFormValue() {
        let cdForm = this.createDefectForm;
        let formValue = _.cloneDeep(cdForm.value);
        let linkNewDefectState = this._zephyrStore.getState().linkNewDefect;
        let arrayFieldsKey = linkNewDefectState.arrayFieldsKey;
        arrayFieldsKey.forEach(field => {
            if(field === 'labels' ) {
                //let labels = (formValue['labels'] && formValue['labels'].split(' ')) || [];
                let labels = formValue['labels'];
                formValue['additionalProperties'] = {};
                formValue['additionalProperties']['labels'] = labels;
                delete formValue[field];
            } else {
                //cases for multiselects
                let fieldVal;
                if(jQuery('#' + field + '-field').hasClass(field + '-autocomplete') && this.isUpdate) {
                    fieldVal = jQuery('defect-advanced-detail').find('#' + field + '-field').val();
                    if(!fieldVal && jQuery('#' + field + '-field').prop('multiple')) {
                        fieldVal = [];
                    }
                } else {
                    fieldVal = jQuery('#' + field + '-field').val();
                }
                if(fieldVal) {
                    //inputs being converted to array
                    formValue[field] = (fieldVal instanceof Array) ? fieldVal : fieldVal.split(' ');
                } else if(typeof formValue[field] == 'boolean') {
                    //radio and checkboxes
                    let checkedInput = [];
                    if(this.isUpdate) {
                        checkedInput = jQuery('defect-advanced-detail').find('#' + field + '-field').find('input:checked').toArray();
                    } else {
                        checkedInput = jQuery('#' + field + '-field').find('input:checked').toArray();
                    }
                    formValue[field] = checkedInput.map(input => jQuery(input).val());
                } else {
                    if(this.selectChanges.length && this.selectChanges.indexOf(field) > -1) {
                        formValue[field] = [];
                    } else {
                        delete formValue[field];
                    }
                }
            }
        });
        formValue['customProperties'] = {};
        for(let formKey in formValue) {
            if(formKey.indexOf('customfield') > -1) {
                if(this.selectChanges.length && this.selectChanges.indexOf(formKey) > -1) {
                    formValue[formKey] = [];
                }
                let customFieldObj = _.find(this.fieldsArray, {fieldKey: formKey});

                if(customFieldObj.schema.type === "option-with-child" || customFieldObj.schema.custom.indexOf('cascadingselect')> 0){
                  if(typeof(formValue[formKey]) != 'object'){
                   formValue['customProperties'][formKey] = [];
                    formValue['customProperties'][formKey].push(formValue[formKey]);
                    formValue['customProperties'][formKey].push("");
                  }else {
                    formValue['customProperties'][formKey] = formValue[formKey];
                  }
                }else{
                  formValue['customProperties'][formKey] = formValue[formKey];
                }


                if(this.customFieldSelectChanges.length && this.customFieldSelectChanges.indexOf(formKey) > -1) {
                    formValue['customProperties'][formKey] = [];
                }
                delete formValue[formKey];
            }
        }
        this.selectChanges = [];
        this.customFieldSelectChanges = [];
        return formValue;
    }

    onMultiOptionUnSelect(formKey) {
        this.selectChanges.push(formKey);
        // let clearedValue = obj.clearedValue;
        // let formKey = obj.formKey;
        // let allValues = jQuery('#' + formKey + '-field').val();
        // let option = jQuery('#' + field + '-field').find('option[value='+ selectedVal.id +']');
        // if(option && option.length && option[0]) {
        //     option[0].selected = false;
        // }
    }
    onSingleListUnselect(formKey) {
        let cdForm = this.createDefectForm;
        cdForm.value[formKey]=null;
        this.customFieldSelectChanges.push(formKey);
    }
    onUserUnselect(obj) {
        this.createDefectForm.controls[obj.field].setValue('');
    }
    onMultiUserUnselect(obj) {
        let clearedValue = obj.value;
        let formKey = obj.field;
        let formValue = this.createDefectForm.value;
        let selectValues = formValue[formKey];
        if(selectValues.indexOf(clearedValue) > -1) {
            selectValues.splice(selectValues.indexOf(clearedValue), 1);
        }
    }
    triggerChange() {
        if (this.changeDetectionDebounce) {
            clearTimeout(this.changeDetectionDebounce);
        }
        let firstDetection = !this.changeDetectionDebounce;
        this.changeDetectionDebounce = setTimeout(() => {
            this.changeDetectionDebounce = null;
            if(this.cdr) { this.cdr.markForCheck(); }
        }, firstDetection ? 200 : 300);
    }
}
