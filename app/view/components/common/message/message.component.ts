import {Component} from '@angular/core';
declare var AJS:any, _: any;
import {ZephyrStore} from '../../../../store/zephyr.store';
import * as types from '../../../../utils/constants/action.types';
import * as messageTypes from '../../../../utils/constants/messages.types';
// import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import {ToastrService} from '../../../../services/toastr.service';

declare var jQuery: any;
@Component({
    selector: 'zee-message-bar',
    template: `
        <div [class]="'zee-message-bar'" id="zee-message-bar"></div>
    `,
    styles: [
    `
        .zee-message-bar {
            right: 10px;
            position: fixed;
            top: 59px;
            width: calc(100% - 260px);
            z-index: 10000;
            left: 260px;
        }
    `
    ]
})
export class MessageComponent {
    _zephyrStore;
    hasMessage = false;
    message = {
        type: '',
        title: '',
        description: '',
    };
    private messageIndex: number = -1;
    private _toastrService;
    constructor() {
        this._zephyrStore = ZephyrStore.getZephyrStore();

        this._zephyrStore.subscribe(() => {
            let messages = this._zephyrStore.getState().global.messages;
            if(messages && messages.length) {
              this.messageIndex = messages.length - 1;
              this._setMessage(messages[messages.length - 1]);
            }
        });

        this._toastrService = new ToastrService();
    }
    private resetMessage() {
        this.message = {
            type: '',
            title: '',
            description: ''
        };
    }
    private _setMessage(message) {
        if (message  && !message.processed) {
            this.message = message;
            this._displayMessage();
        }
    }
    private _displayMessage() {
        if (this.message) {

            switch (this.message.type) {
                case messageTypes.SUCCESS:
                    this._toastrService.success(this.message);
                    // this._toastrService.success(`
                    //     <p class="title">
                    //         <strong>${this.message.title}</strong>
                    //     </p>
                    //     <h1>Hello</h1>
                    //     ${this.message.description}
                    // `);
                    break;

                case messageTypes.INFO:
                    this._toastrService.info(this.message);
                    break;
              case messageTypes.ERROR:
                    //TODO: move to global handler
                    if(!this.message && !this.message['data']) {
                      //why show empty error!!
                      break;
                    }
                    let status = (this.message['data'] && this.message['data'].status) ||
                      (this.message['data'] && this.message['data'].zeeErrorCode) || -1;
                    console.log('status in message', status, this.message);
                    if(this.message['data'] && this.message['data']._body) {
                      if (typeof(this.message['data']._body) == 'object') {
                        this.message['data']._body = JSON.stringify(this.message['data']._body);
                      }
                    }
                    let msg = (this.message['data'] && this.message['data']._body
                        && JSON.parse(this.message['data']._body)['errno']) || '';
                    if(status == 401 || status == 404 || status == 0 || msg == 'ECONNREFUSED') {
                      break;
                    }
                    this._toastrService.error(this.message);
                    break;
                case messageTypes.WARNING:
                    this._toastrService.warning(this.message);
                    break;
            }
        }

        this._zephyrStore.dispatch({ type: types.CLEAR_MESSAGE, data: {index: this.messageIndex}});

        // if(this.message.generic.length) {
        //     this._showGenericMessage(this.message.generic);
        // } else if(this.message.error.length) {
        //     this._showErrorMessage(this.message.error);
        // } else if(this.message.warning.length) {
        //     this._showWarningMessage(this.message.warning);
        // } else if(this.message.success.length) {
        //     this._showSuccessMessage(this.message.success);
        // } else if(this.message.info.length) {
        //     this._showInfoMessage(this.message.info);
        // } else if(this.message.hint.length) {
        //     this._showHintMessage(this.message.hint);
        // }
    }
    private _showGenericMessage(genericList) {
        _.each(genericList, (generic, i) => {
            this._createMessage('#zee-message-bar', {
                type: 'alert-info',
                title: generic.title,
                body: generic.description,
                fadeout: generic.fadeout || true,
                delay: generic.delay || 5000
            });
            let data = {type: 'generic', response: generic} ;
            this._zephyrStore.dispatch({ type: types.CLEAR_MESSAGE, data});
        });
    }
    private _showErrorMessage(errorList) {
        _.each(errorList, (error, i) => {
            this._createMessage('#zee-message-bar', {
                type: 'alert-danger',
                title: error.title,
                body: error.description,
                fadeout: error.fadeout || true,
                delay: error.delay || 5000
            });
            let data = {type: 'error', response: error} ;
            this._zephyrStore.dispatch({ type: types.CLEAR_MESSAGE, data});
        });
    }
    private _showWarningMessage(warningList) {
        _.each(warningList, (warning, i) => {
            this._createMessage('#zee-message-bar', {
                type: 'alert-warning',
                title: warning.title,
                body: warning.description,
                fadeout: warning.fadeout || true,
                delay: warning.delay || 5000
            });
            let data = {type: 'warning', response: warning} ;
            this._zephyrStore.dispatch( { type: types.CLEAR_MESSAGE, data});
        });
    }
    private _showSuccessMessage(successList) {
        _.each(successList, (success, i) => {
            this._createMessage('#zee-message-bar', {
                type: 'alert-success',
                title: success.title,
                body: success.description,
                fadeout: success.fadeout || true,
                delay: success.delay || 5000
            });
            let data = {type: 'success', response: success} ;
            this._zephyrStore.dispatch( { type: types.CLEAR_MESSAGE, data});
        });
    }
    private _showInfoMessage(infoList) {
        _.each(infoList, (info, i) => {
            this._createMessage('#zee-message-bar', {
                type: 'alert-info',
                title: info.title,
                body: info.description,
                fadeout: info.fadeout || true,
                delay: info.delay || 5000
            });
            let data = {type: 'info', response: info} ;
            this._zephyrStore.dispatch( { type: types.CLEAR_MESSAGE, data});
        });
    }
    private _showHintMessage(hintList) {
        _.each(hintList, (hint, i) => {
            this._createMessage('#zee-message-bar', {
                type: 'alert-info',
                title: hint.title,
                body: hint.description,
                fadeout: hint.fadeout || true,
                delay: hint.delay || 5000
            });
            let data = {type: 'hint', response: hint} ;
            this._zephyrStore.dispatch( { type: types.CLEAR_MESSAGE, data});
        });
    }
    private _getMessageTypeTemplate(type, title, body) {
        return '<div class="alert '+ type +'">\
                  <div class="alert-icon"></div>\
                  <div class="alert-content">\
                  <strong>' + title + '</strong><p> ' + body + '</p>\
                  <a href="#" class="close" data-dismiss="alert" aria-label="close" title="close">×</a></div>\
                </div>\
                ';
    }
    private _createMessage(element, params) {
        let messageTemplate = this._getMessageTypeTemplate(params.type, params.title, params.body);
        jQuery(element).prepend(messageTemplate);
        let messageElement = jQuery(element).find('.alert').first();
        messageElement.fadeIn(500);
        setTimeout(() => {
            messageElement.fadeOut(params.fadeout,function () {
              jQuery(this).remove();
            });
        },params.delay);
    }
}
