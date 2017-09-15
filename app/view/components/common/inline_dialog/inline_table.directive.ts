import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';

declare var jQuery: any;

@Directive({ selector: '[zui-inline-table]' })

export class InlineTableDirective implements AfterViewInit {
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
        jQuery(this.elSelector).find('.inline-table-trigger').mouseenter(event => {
          this.showDialog(event);
        }).mouseleave(event => {
          this.clearDialogTimeout = setTimeout(() => {
            this.forceHideDialog();
          },3000);
        });
        jQuery(this.elSelector).find('.inline-table-content').mouseenter(event => {
          clearTimeout(this.clearDialogTimeout);
        }).mouseleave(event => {
          this.forceHideDialog();
        });
        jQuery('body').mouseleave(event => {
          this.forceHideDialog();
        });
        return;
      default:
        jQuery(this.elSelector).find('.inline-table-trigger').on('click', event => {
          this.showDialog(event);
        });
        jQuery('.inline-table-body').on('click', event => {
          this.hideDialog(event);
        }).on('mousewheel', event => {
          this.hideDialog(event);
        });
        break;
    }
  }
  showDialog(event) {
    if(jQuery(this.elSelector).find('.inline-table-content').length === 0) {
      return;
    }
    let dialogWidth, dialogHeight, changedX, changedY,
      pageX = event.clientX,
      pageY = event.clientY;
    changedX = pageX;
    changedY = pageY + 10;

    jQuery(this.elSelector).find('.inline-table-body').appendTo('body').each((index, element) => {
      this.dialogContentRef = jQuery(element);
      let el = jQuery(element).find('.inline-table-content');
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

    jQuery('.inline-table-content:before').css({'left': pageX - changedX});

    if (changedY < 0) {
      changedY = 50;
    }

    this.dialogContentRef.find('.inline-table-content').css({'display': 'block', 'left': changedX, 'top': changedY});

    this.dialogContentRef.css({'display': 'block'});
    if (this.dialogContentRef.find('.inline-table-content').hasClass("zui-inline-table")) {
      this.dialogContentRef.find('.inline-table-content').css("padding-left", "0px !important");
      this.dialogContentRef.find('.inline-table-content').css("padding-right", "0px !important");
    }

    if (jQuery(this.elSelector).parents('.modal').length) {
      this.dialogContentRef.css('z-index', 1050);
    }
  }
  hideDialog(event) {
    if(jQuery(event.target).hasClass('inline-table-body')) {
      this.dialogContentRef.appendTo(this.elSelector);
      this.dialogContentRef.css({'display': 'none'});
    }
  }

  forceHideDialog() {
    this.dialogContentRef.appendTo(this.elSelector);
  }

}
