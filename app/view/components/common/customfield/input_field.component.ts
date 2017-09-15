import {Component, Input, Output, EventEmitter, OnChanges, AfterViewInit, ElementRef, Inject} from '@angular/core';
declare var moment: any, jQuery: any, _: any;

@Component({
	selector: 'field-input',
    template: `
        <input #fieldChx (change)="saveCustomfield(fieldChx.checked)"
            *ngIf="field.type == 'checkbox'" type="checkbox" />
        <zephyr-inline-edit
            *ngIf="field.type != 'checkbox'"
            [validationPattern]="pattern"
            [placeholder]="'None'"
            [field]="field.value"
            [editType]="field.dataType"
            (onSubmit)="saveCustomfield($event)"
        ></zephyr-inline-edit>
    `
    //directives: [InlineEditComponent]
})
export class InputFieldComponent implements OnChanges, AfterViewInit {
    @Input() field;
    @Output() onSaveField: EventEmitter<any> = new EventEmitter();
	private pattern = '^(.|[\n\r]){0,1024}$';
	private elementRef: ElementRef;

	constructor(@Inject(ElementRef) elementRef: ElementRef) {
		this.elementRef = elementRef;
	}
	ngOnChanges(changedNode) {
		if (!_.isEqual(changedNode.field.currentValue, changedNode.field.previousValue)) {
			if ('checkbox' === this.field.type) {
				jQuery(this.elementRef.nativeElement).children().prop('checked', this.field.value);
			}
		}
	}
	ngAfterViewInit() {
		if ('checkbox' === this.field.type) {
			jQuery(this.elementRef.nativeElement).children().prop('checked', this.field.value);
		}
	}
    saveCustomfield(value) {
        // if (this.field.dataType === 'date') {
        //     value = value.length ? moment(value, 'YYYY-MM-DD').valueOf() : null;
        // }

        let _field = {
            [this.field.name]: value
        };

        this.onSaveField.emit(_field);
    }
}
