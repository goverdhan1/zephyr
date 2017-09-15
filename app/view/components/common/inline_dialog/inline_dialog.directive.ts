import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';

declare var jQuery: any;

@Directive({ selector: '[zui-inline-dialog]' })

export class InlineDialogDirective implements AfterViewInit {
    @Input() interactionHandler;
    clearDialogTimeout;
    widthOffset=76;
    private elSelector:any;
    private dialogContentRef: any;
    constructor(el: ElementRef) {
        this.elSelector = el.nativeElement;
    }
    ngAfterViewInit() {
        this.dialogContentRef = jQuery(null);
        switch (this.interactionHandler) {
            case 'hover':
              this.widthOffset = 54;
                jQuery(this.elSelector).find('.inline-dialog-trigger').mouseenter(event => {
                  this.showDialog(event);
                }).mouseleave(event => {
                  this.clearDialogTimeout = setTimeout(() => {
                    this.forceHideDialog();
                  },3000);
                });
              jQuery(this.elSelector).find('.inline-dialog-content').mouseenter(event => {
                clearTimeout(this.clearDialogTimeout);
              }).mouseleave(event => {
                this.forceHideDialog();
              });
              // jQuery('body').mouseleave(event => {
              //   this.forceHideDialog();
              // });
              jQuery('body').on('onNotificationCompletion', (arg) => {
                  this.forceHideDialog();
              });
              return;
            default:
              jQuery(this.elSelector).find('.inline-dialog-trigger').on('click', event => {
                this.showDialog(event);
              });
              jQuery('.inline-dialog-body').on('click', event => {
                this.hideDialog(event);
              }).on('mousewheel', event => {
                this.hideDialog(event);
              });
              break;
        }
    }
    showDialog(event) {
        if(jQuery(this.elSelector).find('.inline-dialog-content').length === 0) {
            return;
        }
        let dialogWidth, dialogHeight, changedX, changedY,
            pageX = event.clientX,
            pageY = event.clientY;
        changedX = pageX;
        changedY = pageY + 10;

        jQuery(this.elSelector).find('.inline-dialog-body').appendTo('body').each((index, element) => {
            this.dialogContentRef = jQuery(element);
            let el = jQuery(element).find('.inline-dialog-content');
            dialogWidth = jQuery(el).width();
            dialogHeight = jQuery(el).height();
        });

        this.dialogContentRef.removeClass('top-left-arrow top-right-arrow');

        //Adjusting position if dialog lies beyond boundaries
        if(jQuery(window).width() <= (pageX + dialogWidth)) {
            changedX = jQuery(window).width() - dialogWidth - this.widthOffset;
            this.dialogContentRef.addClass('top-right-arrow');
        }
        if(jQuery(window).height() <= (pageY + dialogHeight)) {
            changedY = pageY - dialogHeight;
        }
        jQuery('.inline-dialog-content:before').css({'left': pageX - changedX});
        this.dialogContentRef.find('.inline-dialog-content').css({'display': 'block', 'left': changedX, 'top': changedY});
        if (this.dialogContentRef.find('.inline-dialog-content').hasClass("zui-inline-table")) {
          this.dialogContentRef.find('.inline-dialog-content').css("padding-left", "0px !important");
          this.dialogContentRef.find('.inline-dialog-content').css("padding-right", "0px !important");
        }

        if (jQuery(this.elSelector).parents('.modal').length) {
            this.dialogContentRef.css('z-index', 1050);
        }
    }
    hideDialog(event) {
        if(jQuery(event.target).hasClass('inline-dialog-body')) {
            this.dialogContentRef.appendTo(this.elSelector);
        }
    }

    forceHideDialog() {
        if(this.dialogContentRef.prev('.inline-dialog-body').length && !this.dialogContentRef.closest('.zui-inline-dialog').length) {
            this.dialogContentRef.prev('.inline-dialog-body').remove();
        }
        this.dialogContentRef.appendTo(this.elSelector);
    }

}
