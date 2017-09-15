import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
declare var _, $;
// Constants
import {LOCAL_STORAGE} from '../../utils/constants/local-storage.constants';
// import {ZephyrLocalStorage} from '../../utils/localstorage/local-storage.util';
import {API_PATH, getApiPath} from '../../utils/constants/api.constants';
import {getRequestHeader} from '../../utils/api/api.utils';

@Injectable()
export class DashboardService {
    private _dashboards = [];
    constructor(public http: any) {
        // this._dashboards = ZephyrLocalStorage.getParsedItem(LOCAL_STORAGE.ZEPHYR_DASHBORAD_LIST);
    }
    getDashboardById(id) {
      let getDashboardUrl = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 +
        API_PATH.GET_DASHBOARD + '/' + id;


      return this.http.get(getDashboardUrl, {
        headers: getRequestHeader({'includeAcceptType': true})
      })
        .map((response) => response.json());
    }
    getAllDashboards(pageInfo) {
        let getDashboardUrl = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 +
             API_PATH.GET_DASHBOARD + '?' + $.param(pageInfo);


        return this.http.get(getDashboardUrl, {
            headers: getRequestHeader({'includeAcceptType': true})
        })
        .map((response) => response.json());
    }
    getAllGadgets() {
      let getGadgetUrl = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 +
        API_PATH.GET_GADGET_METADATA;
      return this.http.get(getGadgetUrl, {
        headers: getRequestHeader({'includeAcceptType': true})
      })
        .map((response) => response.json());
    }

    dispatchAllGadgets(gadgets) {
      return Promise.resolve(gadgets);
    }
  saveDashboard(dashboard) {
        let saveDashboardUrl = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 +
             API_PATH.GET_DASHBOARD + `?layout=${dashboard.properties.style.layout}`;

        dashboard.properties = JSON.stringify(dashboard.properties);

        return this.http.post(saveDashboardUrl, JSON.stringify(dashboard), {
            headers: getRequestHeader({'includeAcceptType': true})
        })
        .map(response => response.json());
    }
    updateDashboardById(dashboard) {
      let saveDashboardUrl = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 +
        API_PATH.GET_DASHBOARD;

      dashboard.properties = JSON.stringify(dashboard.properties);
      delete dashboard.propertiesAsString;

      return this.http.put(saveDashboardUrl, JSON.stringify(dashboard), {
        headers: getRequestHeader({'includeAcceptType': true})
      })
      .map(response => response.json());
    }
    deleteDashboardById(dashboard) {
      let deleteDashboard = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
        + API_PATH.GET_DASHBOARD + '/' + `${dashboard.id}`;

        return this.http.delete(deleteDashboard, {
          headers: getRequestHeader({'includeAcceptType': true})
        })
          .map(response => response.json());
    }
    createGadget(gadget) {
        let addGadgetUrl = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 +
          API_PATH.GET_GADGETS + `?id=${gadget.dashboardId}`;

        delete gadget.dashboardId;
        delete gadget.id;

        // gadget.projectId = gadget.config.project.id;

        // if (gadget.config.release) {
        //   gadget.releaseId = gadget.config.release.id;
        // }

        // delete gadget.config.project;
        // delete gadget.config.release;

        // delete gadget.component;
        gadget.properties = JSON.stringify(gadget.properties);
        return this.http.post(addGadgetUrl, JSON.stringify(gadget), {
          headers: getRequestHeader({'includeAcceptType': true})
        }).map(response => response.json());
    }
    updateGadget(gadget) {
      let addGadgetUrl = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 +
        API_PATH.GET_GADGETS + `?id=${gadget.dashboardId}`;

      delete gadget.dashboardId;
      // delete gadget.id;
      // delete gadget.component;
      gadget.properties = JSON.stringify(gadget.properties);

      return this.http.put(addGadgetUrl, JSON.stringify(gadget), {
        headers: getRequestHeader({'includeAcceptType': true})
      }).map(response => response.json());
    }

    deleteGadgetById(gadget) {
      let deleteGadget = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
        + API_PATH.GET_GADGETS + `${gadget.id}`;

      return this.http.delete(deleteGadget, {
        headers: getRequestHeader({'includeAcceptType': true})
      }).map(response => response.json());
    }
}
