import {Component, Input, Output, EventEmitter} from '@angular/core';

//import {InlineEditComponent} from '../../inline_edit/inline_edit.component';

@Component({
	selector: 'field-textarea',
    template: `
        <zephyr-inline-edit
            [placeholder]="'Enter text'"
            [validationPattern]="pattern"
            [field]="field.value"
            [editType]="'textarea'"
            (onSubmit)="saveCustomfield($event)"
        ></zephyr-inline-edit>
    `
    //directives: [InlineEditComponent]
})
export class TextareaFieldComponent {
    @Input() field;
    @Output() onSaveField: EventEmitter<any> = new EventEmitter();
    pattern;

    constructor() {
        this.pattern = '^(.|[\n\r]){0,32000}$';
    }
    saveCustomfield(value) {
        let _field = {
            [this.field.name]: value
        };
        this.onSaveField.emit(_field);
    }
}
