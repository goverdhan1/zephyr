import {Component, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {ACTION_EXPAND, ACTION_COLLAPSE} from '../../../../../../utils/constants/application.constants';

declare var jQuery: any, _;

@Component({
    selector: 'cd-comments',
    templateUrl: 'cd_comments.html'
})

export class CDCommentsComponent implements AfterViewInit {
    @Input() comments;
    @Input() defectSystemUrl;
    expanded: string = ACTION_EXPAND;
    collapsed: string = ACTION_COLLAPSE;
    ngAfterViewInit() {
        //
    }
}
