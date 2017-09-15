import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';

declare var jQuery: any, _;

@Component({
    selector: 'cd-date',
    templateUrl: 'cd_date.html'
})

export class CDDateComponent {
    @Input() field;
    @Input() formkey;
    @Output() dateChange: EventEmitter<any> = new EventEmitter();
    onDateChange() {
        this.dateChange.emit([this.formkey.value, this.field.fieldKey]);
    }
}
