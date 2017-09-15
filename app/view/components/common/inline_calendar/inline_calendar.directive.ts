import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';

declare var jQuery: any;

@Directive({ selector: '[zui-inline-calendar]'})

export class InlineCalendarDirective implements AfterViewInit {
    clearDialogTimeout;
    widthOffset=76;
    isOpen = false;
    private elSelector:any;
    private dialogContentRef: any;
    constructor(el: ElementRef) {
        this.elSelector = el.nativeElement;
    }
    ngAfterViewInit() {
        this.dialogContentRef = jQuery(null);
              jQuery(this.elSelector).find('.inline-calendar-trigger').on('click', event => {
                if(!this.isOpen) {
                  event.stopPropagation();
                  jQuery('body').trigger('click');
                  this.showDialog(event);
                } else {
                  this.hideDialog(event);
                }
              });
              jQuery('body').on('click', event => {
                if(this.isOpen) {
                  this.hideDialog(event);
                }
              }).on('mousewheel', event => {
                if(this.isOpen) {
                  this.hideDialog(event);
                }
              });
              jQuery(this.elSelector).find('.inline-calendar-content').on('click', event=> {
                event.stopPropagation();
              });
    }
    showDialog(event) {
        if(jQuery(this.elSelector).find('.inline-calendar-content').length === 0) {
            return;
        }
        // setTimeout((event) => {}, 10);
        let dialogWidth, dialogHeight, changedX, changedY,
            pageX = jQuery(event.currentTarget).offset().left,
            pageY = jQuery(event.currentTarget).offset().top + jQuery(event.currentTarget).height();

        changedX = pageX;
        changedY = pageY;

        jQuery(this.elSelector).find('.inline-calendar-body').appendTo('body').each((index, element) => {
            this.dialogContentRef = jQuery(element);
            let el = jQuery(element).find('datepicker');
            dialogWidth = jQuery(el).width();
            dialogHeight = jQuery(el).height();
        });

        this.dialogContentRef.removeClass('top-left-arrow top-right-arrow');

        //Adjusting position if dialog lies beyond boundaries
        if(jQuery(window).width() <= (pageX + dialogWidth)) {
            changedX = jQuery(window).width() - dialogWidth - this.widthOffset;
            this.dialogContentRef.addClass('top-right-arrow');
        } else if(jQuery(window).height() <= (pageY + dialogHeight)) {
            changedY = jQuery(window).height() - dialogHeight;
        }
        jQuery('.inline-calendar-content:before').css({'left': pageX - changedX});
        this.dialogContentRef.css({'display': 'block','position': 'absolute','top': 0, 'z-index': 1050});
        this.dialogContentRef.find('.inline-calendar-content').css({'position': 'relative', 'left': changedX, 'top': changedY + 10});
        this.isOpen = true;
    }
    hideDialog(event) {
        this.dialogContentRef.attr('style', '');
        this.dialogContentRef.find('.inline-calendar-content').attr('style', '');
        this.dialogContentRef.appendTo(this.elSelector);
        this.isOpen = false;
    }

}
