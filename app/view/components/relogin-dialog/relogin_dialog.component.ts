import {Component, EventEmitter, Output, Input, OnChanges, AfterViewInit} from '@angular/core';
import {I18N_MESSAGES} from '../../../utils/messages/messages.en';
/**
 * Created by Prateek on 06/01/17.
 */
declare var jQuery:any;

@Component({
  selector: 'zui-form-relogin',
  templateUrl: 'relogin_dialog.html',
  providers : []
})

export class ReloginDialogComponent implements OnChanges, AfterViewInit {
  @Input() show: boolean = false;
  @Output() performLogout: EventEmitter<any> = new EventEmitter();
  issueType=0;

  i18nMessages = I18N_MESSAGES;
  constructor() {
    //console.log('nothing');
  }

  ngAfterViewInit(){
    jQuery('#zui-relogin-prompt').on('show.bs.modal',() => {
      let type = jQuery('#zui-relogin-prompt').data('issue-type');
      this.issueType = type || 0;
    });
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
    jQuery('#zui-relogin-prompt').modal('show');
  }

  hideModal(url='') {
    jQuery('#zui-relogin-prompt').modal('hide');
    this.performLogout.emit();

    setTimeout(() => {
      jQuery('.modal-backdrop').remove();
        window.location.href = url;
    },10);
  }

  emitDismissNavigation() {
    let _nextURL = window.location.pathname.replace('/flex/html5','');
    let _href = '<%= APP_BASE %>login';
    this.hideModal(_href);
  }

  emitContinueNavigation() {
    let _nextURL = window.location.pathname.replace('/flex/html5','');
    let _href = '<%= APP_BASE %>login';
    if(_nextURL && _nextURL.indexOf('login') < 0) {
      _href += '?next_url=' + encodeURIComponent(_nextURL);
    }
    this.hideModal(_href);
  }
}
