import {ViewChild, Component, AfterViewInit, OnDestroy, OnInit, Inject} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

import {DashboardFormComponent} from './dashboard_form/dashboard_form.component';

declare var $, _;
import {ZephyrStore} from '../../../store/zephyr.store';
import {DashboardAction} from '../../../actions/dashboard.action';
// import {GridComponent} from '../grid/grid.component';
import {GridAction} from '../../../actions/grid.action';
// Constants
import {I18N_MESSAGES} from '../../../utils/messages/messages.en';
import {DASHBOARD_INITIAL_STATE, DASHBOARDS_INITIAL_STATE} from './dashboard.constant';
import {DASHBOARD_GRID_COLUMNS,  DASHBOARD_GRID_TYPE, DASHBOARD_GRID_PAGINATION} from './dashboard_grid.constant';
import {
  FETCH_ALL_DASHBOARDS_SUCCESS, CREATE_DASHBOARD_SUCCESS, UPDATE_DASHBOARD_SUCCESS,
  DELETE_DASHBOARD_SUCCESS, SORT_DASHBOARD_DATA_SUCCESS, FETCH_GADGET_DATA_SUCCESS
} from '../../../utils/constants/action.events';
import {ToastrService} from "../../../services/toastr.service";
import {GridComponent} from "../grid/grid.component";

@Component({
	selector: 'zui-dashboard',
	templateUrl: 'dashboards.html',
  viewProviders: [DashboardAction, GridAction]
})

export class DashboardsComponent implements OnDestroy {
    @ViewChild(DashboardFormComponent) dashboardForm: DashboardFormComponent;
    @ViewChild(GridComponent) gridComponent: GridComponent;

    dashboardGridColumns: Array<Object> = DASHBOARD_GRID_COLUMNS;
    users;
    dashboardToBeDeleted = null;
    lastEvent = null;
    showDirtyCheckModal = false;
    unsubscribe;
    paramSub;
    inputSearch = "";
    selectedCategory = 1;

    eventType = {
      'ROW_CLICK' : 'ROW_CLICK',
      'EDIT_CLICK' : 'EDIT_CLICK'
    };

    addedDashboardIndex = 0;

    currentAction = '';

    form: FormGroup;
    _gridSize;
    dashboardName: '';
    paginationOptions = DASHBOARD_GRID_PAGINATION;
    _rows = [];
    _dashboardGridType = DASHBOARD_GRID_TYPE;
    _dashboard = null;
    i18nMessages = I18N_MESSAGES;
    private _dashboards = DASHBOARDS_INITIAL_STATE;
    private _userId;
    private _zephyrStore;

    constructor(private _dashboardAction: DashboardAction, private _gridAction: GridAction, public router: Router,
                private route: ActivatedRoute, private fb: FormBuilder, @Inject(ToastrService) private toastrService:ToastrService) {

        this._zephyrStore = ZephyrStore.getZephyrStore();
        this._gridSize = DASHBOARD_GRID_PAGINATION.size;

      this.paramSub = this.route.params.subscribe(params => {
       // console.log(params);
      });

      this._userId = this._zephyrStore.getState().loggedInUser.id;

      this.unsubscribe = this._zephyrStore.subscribe(() => {
            let state = this._zephyrStore.getState();
            this.setUsers(state.global.users);

            if(state.dashboards && state.dashboards.event) {
                switch(state.dashboards.event) {
                  case FETCH_ALL_DASHBOARDS_SUCCESS :
                    this.setDashboards(state.dashboards);
                    break;

                  case CREATE_DASHBOARD_SUCCESS :
                    this.setDashboards(state.dashboards);
                    this.onClickClearDashboardState();

                    setTimeout(() => {
                      $(".flex-bar:last").find(".edit").click();
                      $(".selected-row").removeClass('selected-row');
                      $(".flex-bar:last").addClass('selected-row');

                      this.addedDashboardIndex = $(".flex-bar:last").index();

                      this.toastrService.success("Dashboard created successfully");
                      let grid_row = $('.dashboard-new-grid-table .flex-bar');
                      grid_row.parent().scrollTop(grid_row.height() * grid_row.length);
                    }, 10);
                    break;

                  case UPDATE_DASHBOARD_SUCCESS :
                    this.toastrService.success("Dashboard updated successfully");
                    this.setDashboards(state.dashboards);
                    this.onClickClearDashboardState();
                    break;

                  case DELETE_DASHBOARD_SUCCESS :
                    this.toastrService.success("Dashboard deleted successfully");
                    this.setDashboards(state.dashboards);
                    this.onClickClearDashboardState();
                    break;

                  case SORT_DASHBOARD_DATA_SUCCESS :
                    this.setDashboards(state.dashboards);
                    this.clearActionEvents();
                    break;

                  case FETCH_GADGET_DATA_SUCCESS :
                    this.setDashboard(state.dashboards.selectedDashboard);
                    this.clearActionEvents();
                    break;
                };

            }
        });

        this.getAllDashboards();
        //this.getAllGadgets();
    }

    /*ngOnInit() {
      this.route.params.subscribe(params => {
        let dashboardId = params['id'];
        if(dashboardId) {
          this._zephyrStore.dispatch(this._dashboardAction.getDashboardById(dashboardId));
          //this.getDashboardById(dashboardId);
        }
      });
    }*/


    onClickSearch() {

    }

    inputSearchKeyPress(event) {
      setTimeout(() => {
        this.inputSearch = event.target.value;
        this.fetchAllDashboards(false);
      });
    }

    ngOnDestroy() {
      this.unsubscribe();
    }

    /**
     *
     */
    dashboardGridRowClick(ev, forceRouteChange = false) {
        this.currentAction = this.eventType['ROW_CLICK'];

        if (this.checkFormState(ev) || forceRouteChange) {
          if(ev && $(ev).length && $(ev).data('id')) {
            this.lastEvent = null;
            this.router.navigateByUrl('/dashboard/' + $(ev).data('id'));
            setTimeout(() => {
              $('.modal-backdrop').remove();
            }, 100);
          }
        }
    }

    dismissNavigation(ev) {
      this.showDirtyCheckModal = false;
      this.addedDashboardIndex = $(".selected-row").index();
    }

    continueNavigation(ev) {
      switch (this.currentAction) {
        case 'ROW_CLICK' :
          this.dashboardGridRowClick(this.lastEvent, true);
          break;

        case 'EDIT_CLICK' :
          $(".selected-row").removeClass("selected-row");
          $(`.flex-bar:nth-child(${this.addedDashboardIndex + 1})`).addClass("selected-row");
          this.dashboardGridIconClick(this.lastEvent, true);
          break;

        default :
          break;
      }

      this.showDirtyCheckModal = false;
    }
    /**
     * On prev, decriment the currentPage and set the offset;
     */
    dashboardGridPrevClick(ev) {
        this._dashboards.currentPage = (this._dashboards.currentPage > 1) ? this._dashboards.currentPage - 1 : 1;
        this._dashboards.offset = (this._dashboards.currentPage - 1) * this._dashboards.size;
        this.fetchAllDashboards(false);
    }

    fetchAllDashboards(fetchAll=true) {
      this._zephyrStore.dispatch(this._dashboardAction.fetchAllDashboards({
        'offset' : this._dashboards.offset,
        pageSize: this._gridSize,
        currentPage : this._dashboards.currentPage,
        fetchAll,
        searchTerm: this.inputSearch
      }));
    }
    /**
     * On next, increment the currentPage and set the offset
     */
    dashboardGridNextClick(ev) {
      this._dashboards.currentPage =  this._dashboards.currentPage + 1;
        this._dashboards.offset = (this._dashboards.currentPage - 1) * this._dashboards.size;
        this.fetchAllDashboards(false);
    }

    dashboardGridPageSizeChange(size) {
      this._gridSize = size;
      this._dashboards.offset = 0;
      this._dashboards.currentPage = 1;
      this.fetchAllDashboards(false);
    }

    dashboardGridPaginate(event) {
      this._dashboards.currentPage =  event;
      this._dashboards.offset = (this._dashboards.currentPage - 1) * this._dashboards.size;
      this.fetchAllDashboards(false);
    }

    setUrlParams() {

    }

    getURLQueryParams() {
      let _qParams = {};

      // if (this.)

      return _qParams;
    }

    updateTCRURL() {
      let _urlParams = this.getURLQueryParams();

      this.router.navigate(['dashboards', _urlParams]);
    }

    checkFormState(event) {
      this.lastEvent = event;

      if (this.dashboardForm && !this.dashboardForm.checkFormStatus()) {
        this.showDirtyCheckModal = true;

        $(".selected-row").removeClass("selected-row");
        $(`.flex-bar:nth-child(${this.addedDashboardIndex + 1})`).addClass("selected-row");
        this.addedDashboardIndex = $(event.target).parents(".flex-bar").index();

        return false;
      } else {
        return true;
      }
    }

    /**
     * On click of the grid icon perform the action
     */
    dashboardGridIconClick(ev, forceRouteChange = false) {
      let tr = $(ev.target).closest('.flex-bar')[0],
        _actionType  = ev.target.dataset.action;

      let row =  _.cloneDeep(this._rows[tr.dataset.index]);

      if(_actionType == 'delete') {
        this.dashboardToBeDeleted = row;
        $('#zui-dashboard-modal-delete').modal();
      } else if(_actionType == 'edit') {
        this.currentAction = this.eventType['EDIT_CLICK'];

        if (this.checkFormState(ev) || forceRouteChange) {
          row.layout = row.properties.style.layout;
          this._dashboard = row;
          $('#zui-dashboard-modal-add').modal();
        }
      } else if(_actionType == 'star-unselected' || _actionType == 'star-selected') {
        // this._dashboard.settings.favorite = !this._dashboard.settings.favorite;
        // this._zephyrStore.dispatch(this._dashboardAction.updateDashboardById(this._dashboard));
      }

    }

    /**
     * On click of delete confirmation, delete the dashboard
     */
    onClickDeleteDashboard() {
        $('#zui-dashboard-modal-delete').modal('hide');
        this._zephyrStore.dispatch(this._dashboardAction.deleteDashboardById(this.dashboardToBeDeleted));
    }

    onClickCreateDashboard() {
      this._dashboard= _.cloneDeep(DASHBOARD_INITIAL_STATE);
      // this.onClickClearDashboardState();
    }

    /**
     * on click of the cancel button in Add/Edit/Delete modal,
     * clear previous dashboard state
     */
    onClickClearDashboardState() {
        this._dashboard = null;
    }

    getDashboardById(id) {
        let _dashboard = _.filter(this._dashboards.rows, (dashboard) => {
            return dashboard.id === id;
        })[0];
        return _.cloneDeep(_dashboard);
    }

    /**
     * Get all the dashboards
     */
    getAllDashboards() {
        this.fetchAllDashboards();
    }

    getAllGadgets() {
      this._zephyrStore.dispatch(this._dashboardAction.fetchAllGadgets());
    }

  /**
     * set user map
     */
    setUsers(users) {
        this.users = users.map((user) => {
            return {id: user.id, text: user.fullName};
        });
    }

    setGridRows(dashboards) {
        // let size = dashboards.size,
        //     offset = dashboards.offset,
        //     rows = dashboards.rows.slice(offset, size + offset);
        this._rows = dashboards.rows;
    }
    /**
     * Set the dashboard contents
     */
    setDashboards(dashboards) {
        // this._dashboard = _.cloneDeep(DASHBOARD_INITIAL_STATE);
        // if(dashboards && dashboards.rows && !dashboards.rows.length) {
        //     // this._dashboard.name = 'System Dashboard';
        //     // this._dashboard.description = 'System Dashboard';
        //     // // this._dashboard.settings.editable = false;
        //     // this.saveDashboard(this._dashboard);
        // } else {

        let userInfo = localStorage.getItem(`userInfo`) ? JSON.parse(localStorage.getItem(`userInfo`)).id : undefined;

        if (userInfo) {
          let hasManagerApp = _.filter(JSON.parse(localStorage.getItem(`userInfo`)).roles, (role) => {
            return role.hasManagerApp > 0;
          });

          dashboards.rows.forEach(row => {

            row.hideActions = [];
            if (row.createdBy === userInfo) {
              row.hideActions = [];
            } else {
              if (hasManagerApp.length > 0) {
                row.hideActions = ['edit'];
              } else {
                row.hideActions = ['edit','delete'];
              }
            }
            // if (row.createdBy !== userInfo && userInfo !== 1) {
            //   row.hideActions = [];
            // } else if (userInfo === 1 && row.createdBy !== 1) {
            //   row.hideActions = ['edit'];
            // }

          });

          this.setCreator(dashboards);
          this.setGridRows(dashboards);
          this._dashboards = dashboards;
        } else {
          setTimeout(() => {
            this.setDashboards(dashboards);
          }, 1000);
        }

        this._zephyrStore.dispatch(this._dashboardAction.clearDashboardEvent());
    }
    setDashboard(dashboard) {
        this._dashboard = dashboard;
        this._zephyrStore.dispatch(this._dashboardAction.clearDashboardEvent());
    }
    setCreator(dashboards) {
        let state = this._zephyrStore.getState();
        let users = state.global.users;
        let userIdVsNameMap = {};
        users.forEach(user => {
          userIdVsNameMap[user['id']] = user['fullName'];
        });
        dashboards.sortedRows.forEach(dashboard => {
          dashboard['creatorName'] = userIdVsNameMap[dashboard['createdBy']];
        });
        dashboards.rows.forEach(dashboard => {
          dashboard['creatorName'] = userIdVsNameMap[dashboard['createdBy']];
        });
    }
    clearActionEvents() {
      this._zephyrStore.dispatch(this._dashboardAction.clearDashboardEvent());
    }
}
