import {Component, Input, Output, EventEmitter, ViewChild, AfterViewInit} from '@angular/core';
import { InlineDialogDirective } from '../inline_dialog/inline_dialog.directive';

/**
 * Calendar configuration
 * ------------------
 * formkey : formControl Element
 * model: model
 * minDate: minimum date
 * maxDate: maximum date
 * __________________
 * Markup for calendar
  <div class="datepicker-wrap">
    <calendar
      [formkey]= "form.controls['startDate']"
      [model]= "dt1"
      [minDate]="minDate"
      [maxDate]="maxDate">
    </calendar>
  </div>
 */


@Component({
  selector: 'custom-context-menu',
  template: `
    <div class="zui-inline-dialog" zui-inline-dialog>
        <a class="inline-dialog-trigger">
            <span [class]="'fa fa-gear'"></span>
        </a>
        <div class="inline-dialog-body" (contextmenu)="preventDefaultMenu($event)">
            <div class="inline-dialog-content contextmenu">
                <ul>
                    <li *ngFor="let item of items">
                        <a (click)="contextAction($event, item.label)">{{item.label}}</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  `
})

export class CustomContextMenuComponent {
  @Input() contextMenuItems :any = [];
  @Output() onClickContextAction: EventEmitter<any> = new EventEmitter();
  @ViewChild(InlineDialogDirective) idd: InlineDialogDirective;

  items: any;
  private nodeData;

  preventDefaultMenu($event) {
    $event.preventDefault();
    this.idd.forceHideDialog();
  }
  contextAction(event, label) {
    this.onClickContextAction.emit({label: label, node: this.nodeData.node, isCycle: this.nodeData.isCycle});
    this.idd.forceHideDialog();

  }
  showContextMenu(event, nodeData) {
    event.preventDefault();
    this.nodeData = nodeData;
    let contextMenuObj = this.contextMenuItems(nodeData.node);
    this.items = Object.keys(contextMenuObj).map(function (key) { return contextMenuObj[key]; });
    this.idd.showDialog(event);
  }

}
