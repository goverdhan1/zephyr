import {Directive, ElementRef, Inject, Input,
    AfterViewInit, Output, EventEmitter} from '@angular/core';
import {ACTION_EXPAND, ACTION_COLLAPSE} from '../../../utils/constants/application.constants';
declare var $: any; // Declaring $ as global

@Directive({
  selector:   'zee-expander'
})

export class ExpanderDirective implements AfterViewInit {
    el: ElementRef;
    @Input() action: string;
    @Output() onPanelToggle = new EventEmitter();
    constructor(
        @Inject(ElementRef) elementRef: ElementRef) {
        this.el = elementRef.nativeElement;
    }
    ngAfterViewInit() {
        $(this.el).find('#zee-testcase-details-module-heading')
            .bind('click', $.proxy(this.toggleExpander, this));
        this.initExpander();
    }
    initExpander() {
        let action = this.action === ACTION_EXPAND ? ACTION_COLLAPSE : ACTION_EXPAND;
        $(this.el).addClass(this.action).removeClass(action);
        this.onPanelToggle.emit({action: this.action});
    }
    toggleExpander() {
        if($(this.el).hasClass(ACTION_EXPAND)) {
            $(this.el).removeClass(ACTION_EXPAND).addClass(ACTION_COLLAPSE);
            this.action = ACTION_COLLAPSE;
        } else {
            $(this.el).removeClass(ACTION_COLLAPSE).addClass(ACTION_EXPAND);
            this.action = ACTION_EXPAND;
        }
        this.onPanelToggle.emit({action: this.action});
    }
}
