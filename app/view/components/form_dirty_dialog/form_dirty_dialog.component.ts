import {Component, EventEmitter, Output, Input, OnChanges} from '@angular/core';
import {I18N_MESSAGES} from '../../../utils/messages/messages.en';
/**
 * Created by Prateek on 06/01/17.
 */
declare var jQuery:any;

@Component({
  selector: 'zui-form-dirty-dialog',
  templateUrl: 'form_dirty_dialog.html',
  providers : []
})

export class FormDirtyDialogComponent implements OnChanges {
  @Input() show: boolean = false;
  @Input() identifier = "";
  @Output() dismissNavigation: EventEmitter<any> = new EventEmitter();
  @Output() continueNavigation: EventEmitter<any> = new EventEmitter();

  i18nMessages = I18N_MESSAGES;
  constructor() {
    //console.log('nothing');
  }

  ngOnChanges(changedNode) {
//    console.log(this.show);
    if(this.show) {
      this.showModal();
    }

    if(!this.show) {
      this.hideModal();
    }
  }

  showModal() {
    jQuery(`#zui-unsaved-changes-prompt-dirty-${this.identifier}`).modal('show');
  }

  hideModal() {
    jQuery(`#zui-unsaved-changes-prompt-dirty-${this.identifier}`).modal('hide');

    /*setTimeout(() => {
      jQuery('.modal-backdrop').remove();
    });*/
  }

  emitDismissNavigation() {
    this.dismissNavigation.emit();
  }

  emitContinueNavigation() {
    this.continueNavigation.emit();
  }
}
