import {Injectable, Inject} from '@angular/core';
import * as types from '../utils/constants/action.types';

import {Http} from '@angular/http';

import * as messageTypes from '../utils/constants/messages.types';
import {EventHttpService} from '../services/event-http.service';
import * as Observable from 'rxjs/Observable';
import {PouchDBPrefsServices} from "../services/pouch.db.service";
import {ZpadService} from "../services/zpad.service";

declare var _;

@Injectable()
export class AutomationQualityAction {
  _zpadService;

  constructor(@Inject(Http) private _http: EventHttpService, @Inject(PouchDBPrefsServices) private pouchDBSercvice: PouchDBPrefsServices, ) {
    this._zpadService = new ZpadService(<any>_http);
  }

  zpadAutomationQuality(projectId) {
    return (dispatch) => {
      return this._zpadService.zpadAutomationQuality(projectId).subscribe((data) => {
        dispatch(this._zpadAutomationQuality(data));
      }, (error) => {
        let errorMsg = {
          zeeErrorCode: error.status,
          errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
        };
        dispatch(this.onError(errorMsg));
      });
    };
  }

  _zpadAutomationQuality (data) {
    return { type: types.AUTOMATION_QUALITY, data };
  }

  onError(data) {
    return {
      type: types.SHOW_TOAST,
      data: ({type: messageTypes.ERROR, data})
    };
  }
}
