import { Component, ElementRef, Input, Output,EventEmitter, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import {Resizable} from '../../../../utils/scripts/resizable';

declare var jQuery: any, Draggable, document;


@Component({
    selector: 'zui-modal',
    templateUrl: 'modal.html'
})

export class ModalComponent implements AfterViewInit {
    @Input() hideCloseIcon;
    @Input() title: String = '';
    @Input() description: String = '';
    @Input() modalId: String;
    @Input() modalClass: String = '';
    @Input() modalBodyClass: String = '';
    @Input() modalSize: String = 'medium';
    @Input() preLaunch: Boolean = false;
    @Input() hideFooter: Boolean = false;
    @Input() isResizable: Boolean = false;
    @Input() isDraggable: Boolean = true;
    @Input() backgroundBlur: Boolean = true;
    @Input() dataKeyboard: Boolean = true;
    @Output() onClose: EventEmitter<any> = new EventEmitter();
    @Output() onBeforeClose: EventEmitter<any> = new EventEmitter();
    @Output() onOpen: EventEmitter<any> = new EventEmitter();
    @Output() onBeforeOpen: EventEmitter<any> = new EventEmitter();
    resizable;
    headerDraggable;
    footerDraggable;

    constructor(private el: ElementRef, private cdr: ChangeDetectorRef) {}

    ngAfterViewInit() {
        // To refactor

        // ZEPHYR-16137 - added stopPropagation on all modal events to prevent events from inside modal to trigger on outside modal
        let modal = jQuery(this.el.nativeElement.querySelector('.modal'));
        modal.off('shown.bs.modal.zee').on('shown.bs.modal.zee', ev => {
            if (ev && ev.stopPropagation instanceof Function) {
                ev.stopPropagation();
            }
            this.onOpen.emit(modal);
        }).off('show.bs.modal.zee').on('show.bs.modal.zee', ev => {
            if (ev && ev.stopPropagation instanceof Function) {
                ev.stopPropagation();
            }
            this.onBeforeOpen.emit(modal);
        }).off('hide.bs.modal.zee').on('hide.bs.modal.zee', ev => {
            if (ev && ev.stopPropagation instanceof Function) {
                ev.stopPropagation();
            }
        }).off('hidden.bs.modal.zee').on('hidden.bs.modal.zee', ev => {
            if (ev && ev.stopPropagation instanceof Function) {
                ev.stopPropagation();
            }
        });
        if(this.preLaunch) {
            modal.modal('show');
        }

        if (this.isDraggable) {
          this.headerDraggable = new Draggable(this.el.nativeElement.querySelector('.modal-content'), {
            handle: this.el.nativeElement.querySelector('.modal-header'),
          });

          this.footerDraggable = new Draggable(this.el.nativeElement.querySelector('.modal-content'), {
            handle: this.el.nativeElement.querySelector('.modal-footer'),
          });
        }

        if(this.isResizable) {
            this.resizable = new Resizable();
            this.resizable.attachDefaultResizable(jQuery(this.el.nativeElement.querySelector('.modal-content')));
        }

    }

    // to trigger ngAfterViewInit explicitly because dynamc components do not trigger life cyce hooks.
    forceShow(initData) {
        this.title = initData.title || '';
        this.description = initData.description || '';
        this.modalId = initData.modalId;
        this.modalSize = initData.modalSize || 'medium';
        this.preLaunch = initData.preLaunch || false;
        this.hideFooter = initData.hideFooter || false;
        this.isResizable = initData.isResizable || false;
        this.isDraggable = initData.hasOwnProperty('isDraggable') ? initData.isDraggable : true;
        if(this.cdr) { this.cdr.markForCheck(); }
        setTimeout(() => {
            this.ngAfterViewInit();
        });

    }
    closeModal() {
      if (this.onBeforeClose.observers.length > 0) {
          this.onBeforeClose.emit({});
       } else {
         jQuery(this.el.nativeElement.querySelector('.modal')).modal('hide');
         if (this.onClose.observers.length > 0) {
           this.onClose.emit({
             closeModal : true,
             el : jQuery(this.el.nativeElement.querySelector('.modal'))
           });
         }
       }
    }
}
