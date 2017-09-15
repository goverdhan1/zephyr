import {Component, Input, Output, EventEmitter} from '@angular/core';

import {NEXT_RECORD, PREV_RECORD} from './paginator.constant';

@Component({
    selector: 'paginator',
    templateUrl: 'paginator.html'
})

export class PaginatorComponent {

    @Input() currentRecord: number = 1;
    @Input() totalRecords: number = 1;

    @Output() recordChange : EventEmitter<any>;

    constructor() {
        this.recordChange = new EventEmitter();
    }

    goToNextRecord() {
        if (this.currentRecord < this.totalRecords) {
            this.currentRecord++;
            this.recordChange.emit({
                type: NEXT_RECORD,
                currentRecord: this.currentRecord
            });
        }
    }

    goToPrevRecord() {
        if (this.currentRecord > 1) {
            this.currentRecord--;
            this.recordChange.emit({
                type: PREV_RECORD,
                currentRecord: this.currentRecord
            });
        }
    }
}
