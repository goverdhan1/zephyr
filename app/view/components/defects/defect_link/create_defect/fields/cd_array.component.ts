import {Component, AfterViewInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';

declare var jQuery: any, _;

@Component({
    selector: 'cd-array',
    templateUrl: 'cd_array.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CDArrayComponent implements AfterViewInit {
    @Input() field;
    @Input() formkey;
    @Input() projectkey;
    @Output() optionChange: EventEmitter<any> = new EventEmitter();
    @Output() onSetUser: EventEmitter<any> = new EventEmitter();
    @Output() multiOptionUnSelect: EventEmitter<any> = new EventEmitter();
    @Output() onUserUnselect: EventEmitter<any> = new EventEmitter();
    @Output() onMultiUserUnselect: EventEmitter<any> = new EventEmitter();
    @Output() multiOptionChange: EventEmitter<any> = new EventEmitter();
    fieldOptions;
    fieldSubType;
    fieldSystemValue;
    changeDetectionDebounce;
    constructor(private cdr: ChangeDetectorRef) {

    }
    ngAfterViewInit() {
        this.fieldOptions = this.field.allowedValues;
        this.fieldSystemValue = this.field.schema.system;
        if(this.field.schema && this.field.schema.custom) {
            this.fieldSubType = this.field.schema.custom.split(':')[1];
        }
        let fieldKey = this.field.fieldKey;
        if(fieldKey === 'multiComponents' || fieldKey === 'multiVersions' || fieldKey === 'fixVersions') {
            this.fieldSubType = 'multiversion';
        }
        this.fieldOptions = this.fieldOptions && this.fieldOptions.map(field => ({
            id: field.id,
            name: field.name || field.value,
            text: field.name || field.value
        }));
        if(this.fieldSubType !== 'multiversion' && this.fieldSubType !== 'version') {
            if(fieldKey === 'priority' || fieldKey.indexOf('customfield') > -1) {
                this.fieldOptions = this.fieldOptions && this.fieldOptions.map(field => ({
                    id: field.name || field.value,
                    name: field.name || field.value,
                    text: field.name || field.value
                }));
            }
        }
        this.triggerChange();
    }
    hasDefaultValue(value, index) {
        return (value && index === 0) ? 'selected': false;
    }
    onOptionChange(selectedVal, field) {
        let option = jQuery('#' + field + '-field').find('option[value="'+ selectedVal.id +'"]');
        if(option && option.length && option[0]) {
            option[0].selected = true;
        }
        this.optionChange.emit({formValue: selectedVal.id, formKey: this.field.fieldKey});
    }
    onMultiOptionChange(selectedVal, field) {
        let option = jQuery('#' + field + '-field').find('option[value="'+ selectedVal.id +'"]');
        if(option && option.length && option[0]) {
            option[0].selected = true;
        }
        this.multiOptionChange.emit({formValue: selectedVal.id, formKey: this.field.fieldKey});
    }
    // onOptionUnSelect(selectedVal, field) {
    //     let option = jQuery('#' + field + '-field').find('option[value='+ selectedVal.id +']');
    //     if(option && option.length && option[0]) {
    //         option[0].selected = false;
    //     }
    //     if(!jQuery('#' + field + '-field').val()) {
    //         this.onOptionUnselect.emit(field);
    //     }
    // }
    onMultiOptionUnSelect(selectedVal, field) {
        let option = jQuery('#' + field + '-field').find('option[value="'+ selectedVal.id +'"]');
        if(option && option.length && option[0]) {
            option[0].selected = false;
        }
        if(!jQuery('#' + field + '-field').val()) {
            this.multiOptionUnSelect.emit(this.field.fieldKey);
        }
    }
    setUser(value) {
        this.onSetUser.emit(value);
    }
    multiUserUnselect(value, formKey) {
        this.onMultiUserUnselect.emit({'field': formKey, 'value': value.value});
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
