import { Directive, ElementRef, AfterViewInit } from '@angular/core';

declare var jQuery: any;

@Directive({ selector: '[zui-position-calendar]' })

export class PositionCalendarDirective implements AfterViewInit {
    private elSelector:any;
    constructor(el: ElementRef) {
        this.elSelector = el.nativeElement;
    }
    ngAfterViewInit() {
            let
            pageX = jQuery(this.elSelector).offset().left,
            pageY = jQuery(this.elSelector).offset().top,
            dialogWidth = jQuery(this.elSelector).width(),
            dialogHeight = jQuery(this.elSelector).height();
            if(jQuery(window).height() <= (pageY + dialogHeight)) {
              jQuery(this.elSelector).css({'top': -dialogHeight});
            }
            if(jQuery(window).width() <= (pageX + dialogWidth)) {
              jQuery(this.elSelector).css({'right': -dialogWidth});
            }
    }

}
