import {ErrorHandler} from '@angular/core';
declare var mixpanel, $;

export class ZephyrErrorHandler implements ErrorHandler {
  constructor() {
    let sendError = this.sendError;

    window.onerror = function(errorMsg, url, lineNumber, column, errorObj: any) {
      sendError(errorObj, errorMsg, errorObj.stack.substring(0, 300));
    };

  }

  handleError(error) {
    this.sendError(error, error.rejection ? error.rejection.message : error.message, (error.stack || '').substr(0, 300));
  }

  sendError(error, message, stack) {
    try {
      mixpanel.track('error', {
        message : message,
        stack : stack
      });
    } catch(e) {
      //console.log(e);
    }

    console.error(error);
  }
}
