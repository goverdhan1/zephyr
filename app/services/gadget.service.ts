import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {getRequestHeader} from '../utils/api/api.utils';
// Constants
import {API_PATH, getApiPath} from '../utils/constants/api.constants';

declare var jQuery: any;

@Injectable()
export class GadgetService {
    constructor(public http: any) {
        // console.log('Gadget service');
    }
    /**
     * Get Drill Down Data
     * @param type
     */
    getDrillDownData(query) {
      let getDrillDownURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
        + getApiPath('GET_DRILL_DOWN_DATA', [query]);
      return this.http.get(getDrillDownURL, {
        headers: getRequestHeader({'includeAcceptType': true})
      })
        .map(response => response.json());
    }

    getGadgetData(gadgetId, queryString="") {
      let getDrillDownURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
        + getApiPath('GET_GADGET_DATA', [gadgetId]);

      if (queryString.length) {
        getDrillDownURL = getDrillDownURL + "?" + queryString;
      }

      return this.http.get(getDrillDownURL, {
        headers: getRequestHeader({'includeAcceptType': true})
      })
        .map(response => response.json());
    }
}
