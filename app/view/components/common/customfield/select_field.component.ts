import {Component, Input, Output, EventEmitter} from '@angular/core';

//import {InlineEditComponent} from '../../inline_edit/inline_edit.component';

@Component({
	selector: 'field-select',
    template: `
        <zephyr-inline-edit
            [placeholder]="'None'"
            [field]="field.value"
            [selectedOption]="getSelectedValue(field.value)"
            [fieldOptions]="field.fieldValues"
            [editType]="'singleselect'"
            [editOptions]="getSelect2Options()"
            (onSubmit)="saveCustomfield($event)"
        ></zephyr-inline-edit>
    `
    //directives: [InlineEditComponent]
})
export class SelectFieldComponent {
    @Input() field;
    @Output() onSaveField: EventEmitter<any> = new EventEmitter();;
    saveCustomfield(value) {
        let _field = {
            [this.field.name]: value
        };
        this.onSaveField.emit(_field);
    }
	getSelectedValue(value) {
		let values = Array.isArray(this.field.fieldValues) ? this.field.fieldValues : [];
		let valObj = values.filter(item => item.text === value);
		if (Array.isArray(valObj) && valObj.length) {
			return valObj[0].id || value;
		}
		return value;
	}
    getSelect2Options() {
        return {
            width: 150
        };
    }
}
