import { Component, ElementRef, Input, Output, EventEmitter, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import {Resizable} from '../../../../utils/scripts/resizable';

declare var jQuery: any;


@Component({
    selector: 'zui-tabs',
    templateUrl: 'tabs.html'
})

export class TabsComponent implements AfterViewInit {
    @Output() onTabSwitch: EventEmitter<any> = new EventEmitter();
    @Output() onBeforeTabSwitch: EventEmitter<any> = new EventEmitter();

    constructor(private el: ElementRef, private cdr: ChangeDetectorRef) {}

    ngAfterViewInit(){
        let tabs = this.el.nativeElement.querySelector('.zui-tabs');
        jQuery(tabs).find('a[data-toggle="tab"]').on('shown.bs.tab', ev => {
            this.onTabSwitch.emit({
                'current-tab-id': jQuery(ev.target).attr('href'),
                'prev-tab-id': jQuery(ev.relatedTarget).attr('href')
            });
        });

        jQuery(tabs).find('a[data-toggle="tab"]').on('show.bs.tab', ev => {
            this.onBeforeTabSwitch.emit({
                'current-tab-id': jQuery(ev.target).attr('href'),
                'prev-tab-id': jQuery(ev.relatedTarget).attr('href')
            });
        });
    }
}
