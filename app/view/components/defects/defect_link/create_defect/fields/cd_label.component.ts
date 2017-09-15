import {Component, AfterViewInit, Input} from '@angular/core';
import {Router} from '@angular/router';

declare var jQuery: any, _;

@Component({
    selector: 'cd-label',
    templateUrl: 'cd_label.html'
})

export class CDLabelComponent {
    @Input() field;
    @Input() fieldValue;
}
