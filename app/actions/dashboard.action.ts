import {Injectable, Inject} from '@angular/core';
import {Http} from '@angular/http';

import {DashboardService} from '../services/dashboard/dashboard.service';
// Constants
import * as types from '../utils/constants/action.types';
import * as messageTypes from '../utils/constants/messages.types';
import {I18N_MESSAGES} from '../utils/messages/messages.en';
import {Router} from "@angular/router";

@Injectable()
export class DashboardAction {
    _dashboardService;
    constructor(@Inject(Http) private _http: any, public router: Router) {
        this._dashboardService = new DashboardService(<any>_http);
    }

    fetchAllDashboards(pageInfo = {offset : 0, pageSize: 10, currentPage : 1, fetchAll: true, searchTerm: ''}): any {
      if (pageInfo.fetchAll) {
        return (dispatch: any) => {
          return this._dashboardService.getAllDashboards(pageInfo)
            .subscribe((dashboards) => {
              dispatch(this._onFetchAllDashboards({dashboards, pageInfo}));
            }, (error) => {
              dispatch(this.onError(error));
            });
        };
      } else {
        return this._paginateOffline({pageInfo});
      }
    }

    _paginateOffline(data) {
      return { type: types.PAGINATE_DASHBOARDS_OFFLINE, data };
    }


    searchOffline(term) {
      return { type: types.SEARCH_DASHBOARDS, data : term };
    }

    _onFetchAllDashboards(data) {
        return { type: types.FETCH_ALL_DASHBOARDS, data };
    }

    getDashboardById(id) {
      return (dispatch: any) => {
        return this._dashboardService.getDashboardById(id)
          .subscribe((dashboard) => {
            dispatch(this._onFetchDashboard(dashboard));
          }, (error) => {
            dispatch(this.onInfo(error));
            this.router.navigate(['dashboards']);
          });
      };
    }
    _onFetchDashboard(data) {
      return { type: types.FETCH_DASHBOARD, data };
    }

    fetchAllGadgets() {
      return (dispatch: any) => {
        return this._dashboardService.getAllGadgets()
          .subscribe((gadgets) => {
            dispatch(this._onFetchAllGadgets(gadgets));
          }, (error) => {
            dispatch(this.onError(error));
          });
      };
    }

    dispatchAllGadgetsEvent(gadgetsIn) {
      return (dispatch: any) => {
        return this._dashboardService.dispatchAllGadgets(gadgetsIn)
          .then((gadgets) => {
            dispatch(this._onFetchAllGadgets(gadgets));
          }, (error) => {
            dispatch(this.onError(error));
          });
      };
    }
    _onFetchAllGadgets(data) {
      return { type: types.FETCH_ALL_GADGETS, data };
    }

    saveDashboard(dashboard) {
        return (dispatch: any) => {
            return this._dashboardService.saveDashboard(dashboard)
            .subscribe((response) => {
                dispatch(this._onSaveDashboard(response));
                // dispatch(this.onSuccess(I18N_MESSAGES['zephyr.dashboard.setup.add.success']));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };

        // return (dispatch) => {
        //     var response = this._dashboardService.saveDashboard(dashboard);
        //     dispatch(this._onSaveDashboard(response));
        // };
    }
    _onSaveDashboard(data) {
        return { type: types.CREATE_DASHBOARD, data };
    }
    updateDashboardById(dashboard) {
        return (dispatch: any) => {
          return this._dashboardService.updateDashboardById(dashboard)
            .subscribe((response) => {
              dispatch(this._onUpdateDashboard(response));
            }, (error) => {
              dispatch(this.onError(error));
            });
        };

      // return (dispatch) => {
        //     var response = this._dashboardService.updateDashboardById(dashboard);
        //     dispatch(this._onUpdateDashboard(response));
        // };
    }
    _onUpdateDashboard(data) {
        return { type: types.UPDATE_DASHBOARD, data };
    }
    deleteDashboardById(dashboard) {
        return (dispatch) => {
          return this._dashboardService.deleteDashboardById(dashboard)
            .subscribe((response) => {
              dispatch(this._onDeleteDashboard(dashboard));
            }, (error) => {
              dispatch(this.onError(error));
            });
        };
    }
    _onDeleteDashboard(data) {
        return { type: types.DELETE_DASHBOARD, data };
    }
    /**
     * This code will eventually make a call to update the dashboard itself
     */
    createGadget(gadget) {
        // return (dispatch) => {
        //     var response = this._dashboardService.createGadget(dashboard);
        //     dispatch(this._onUpdateDashboard(response));
        // };
        return (dispatch) => {
          return this._dashboardService.createGadget(gadget)
            .subscribe((response) => {
              dispatch(this._onCreateGadget(response));
            }, (error) => {
              dispatch(this.onError(error));
            });
        };

    }

    _onCreateGadget(data) {
      return { type: types.CREATE_GADGET, data };
    }

    updateGadget(gadget, dashboard) {
      let dashboardID = gadget.dashboardId;

      return (dispatch) => {
        return this._dashboardService.updateGadget(gadget)
          .subscribe((response) => {
            response.dashboardId = dashboardID;
            dispatch(this._onUpdateGadget(response));
          }, (error) => {
            dispatch(this.onError(error));
          });
      };
    }

    _onUpdateGadget(data) {
      return { type: types.UPDATE_GADGET, data };
    }

    deleteGadgetById(gadget) {
      return (dispatch) => {
        return this._dashboardService.deleteGadgetById(gadget)
          .subscribe((response) => {
            dispatch(this._onDeleteGadget(gadget));
          }, (error) => {
            dispatch(this.onError(error));
          });
      };
    }

    _onDeleteGadget(data) {
      return { type: types.DELETE_GADGET, data };
    }
    /**
     * Clear dashboard event
     */
    clearDashboardEvent() {
        return { type: types.CLEAR_DASHBOARD_EVENTS};
    }
    /**
     * On error action
     */

    onSuccess(data) {
        return {
            type: types.SHOW_TOAST,
            data: ({type: messageTypes.SUCCESS, data})
        };
    }

    onError(data) {
        return {
            type: types.SHOW_TOAST,
            data: ({type: messageTypes.ERROR, data})
        };
    }

  onInfo(data) {
    return {
      type: types.SHOW_TOAST,
      data: ({type: messageTypes.INFO, data})
    };
  }
}
