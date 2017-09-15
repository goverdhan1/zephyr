import {Inject, OnDestroy, AfterViewChecked, Component, Input, AfterViewInit,
  Injector, Output, EventEmitter, ViewChild, ViewContainerRef,
  ChangeDetectionStrategy, ComponentRef, ComponentFactoryResolver, ChangeDetectorRef} from '@angular/core';

import {Router, ActivatedRoute} from '@angular/router';
import {Http, Headers} from '@angular/http';

import {DashboardGadgetComponent} from './dashboard_gadget.component';

import { Subscription }   from 'rxjs/Subscription';
import { EventHttpService } from '../../../services/event-http.service';

declare var $, _;
import {ZephyrStore} from '../../../store/zephyr.store';
import {DashboardAction} from '../../../actions/dashboard.action';
// Constants
import {I18N_MESSAGES} from '../../../utils/messages/messages.en';
import {
  FETCH_ALL_DASHBOARDS_SUCCESS, FETCH_ALL_GADGETS_SUCCESS,  CREATE_GADGET_SUCCESS, UPDATE_GADGET_SUCCESS, UPDATE_DASHBOARD_SUCCESS,
  DELETE_GADGET_SUCCESS, FETCH_DASHBOARD_SUCCESS
} from '../../../utils/constants/action.events';

import * as DASHBOARD_CONSTANTS from './dashboard.constant';
import {UserAction} from "../../../actions/user.action";
import {ToastrService} from "../../../services/toastr.service";

declare var jQuery: any;

const SYSTEM_TYPE_4 = '4';
const SYSTEM_TYPE_1 = '1';

@Component({
	selector: 'zui-dashboard',
	templateUrl: 'dashboard.html',
  viewProviders: [DashboardAction],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DashboardComponent implements AfterViewInit, OnDestroy {
    unsubscribe;
    @ViewChild('target', {read: ViewContainerRef}) target;
    httpStartSubscriber: Subscription;
    httpEndSubscriber: Subscription;
    _dashboard : any = null;
    masonryRef: any;
    testVariable: any;
    _dashboardId;
    _predefinedGadgets = [];
    dashboardGadgetComponents : any = [];
    _userId;
    _zephyrStore;
    defectTrackingEnabled;
    _DASHBOARD_CONSTANTS = DASHBOARD_CONSTANTS;
    i18nMessages = I18N_MESSAGES;
    changeDetectionDebounce;
    constructor(private router: Router, private _dashboardAction: DashboardAction, private route: ActivatedRoute,
                @Inject(Http) private _http : any, private _userAction: UserAction,
                private vcRef: ViewContainerRef, private resolver: ComponentFactoryResolver, @Inject(ToastrService) private toastrService:ToastrService, private cdr: ChangeDetectorRef) {


        this._zephyrStore = ZephyrStore.getZephyrStore();

        /*if (!this._zephyrStore.getState().projects.userAllocatedProjects.length) {
          this._zephyrStore.dispatch(this._userAction.fetchUserAllocatedProjects());
        }*/

        this._userId = this._zephyrStore.getState().loggedInUser.id;

        this.route.params.subscribe(params => {
            this._dashboardId = params['id'];
            this.initDashboard();
        });

        this.httpEndSubscriber = this._http.httpCallCompletedObservable.subscribe(
          () => {
              this.refreshMasonry();
          });


      this.unsubscribe = this._zephyrStore.subscribe(() => {

          let state = this._zephyrStore.getState();

          this.checkDefectTrackingEnabled();

          if([FETCH_ALL_DASHBOARDS_SUCCESS, FETCH_DASHBOARD_SUCCESS, UPDATE_DASHBOARD_SUCCESS, CREATE_GADGET_SUCCESS,
                UPDATE_GADGET_SUCCESS, DELETE_GADGET_SUCCESS].indexOf(state.dashboards.event) !== -1) {

              if (state.dashboards.event === FETCH_ALL_DASHBOARDS_SUCCESS) {
                let dashboard = _.cloneDeep(this.getDashboardById(state.dashboards.rows));
                this.setDashboardById(dashboard);
              }

              if (state.dashboards.event === CREATE_GADGET_SUCCESS) {
                jQuery('#zui-gadget-modal-add').modal('hide');
                this.toastrService.success("Gadget created successfully");
                this.addGadget(state.dashboards.gadget);
              }

              if (state.dashboards.event === UPDATE_DASHBOARD_SUCCESS) {
                this.toastrService.success("Dashboard layout changed successfully");
                this.setDashboardLayoutForGadgets(state.dashboards.layout);
              }

              if (state.dashboards.event === UPDATE_GADGET_SUCCESS) {
                this.toastrService.success("Gadget updated successfully");
                this.updateGadgetConfig(state.dashboards.gadget);
              }

              if (state.dashboards.event === DELETE_GADGET_SUCCESS) {
                this.clearActionEvents();
                this.toastrService.success("Gadget deleted successfully");
                this.removeGadget(state.dashboards.gadget);
              }

              if(state.dashboards.event === FETCH_DASHBOARD_SUCCESS) {
                this.setDashboardById(state.dashboards.selectedDashboard);
              }

              this.clearActionEvents();
          }

          if (state.dashboards.gadgets.length) {
            this.processGadgets(state.dashboards.gadgets);
          }
          this.triggerChange();
      });

      let state = this._zephyrStore.getState();

      if (state.dashboards.gadgets.length) {
        this.processGadgets(state.dashboards.gadgets);
        // this._zephyrStore.dispatch(this._dashboardAction.dispatchAllGadgetsEvent(this._predefinedGadgets));
      } else {
        this._zephyrStore.dispatch(this._dashboardAction.fetchAllGadgets());
      }

      // this.initDashboard();
    }

    addGadget(gadget) {
      this.createGadget(gadget, true);
    }

    removeGadget(gadget) {
      this.dashboardGadgetComponents = this.dashboardGadgetComponents.filter((component) => {

        if (component.instance.gadget.id === gadget.id) {
          component.destroy();
        } else {
          return component;
        }

      });

      this.refreshMasonry();
    }

    updateGadgetConfig(gadget) {
      this.dashboardGadgetComponents = this.dashboardGadgetComponents.map((component) => {

        if (component.instance.gadget.id === gadget.id) {
          component.instance.gadget = gadget;
          component.instance.setGadgetConfig();
        }

        return component;
      });

      this.refreshMasonry();
    }

    refreshMasonry() {
      if (this.dashboardGadgetComponents.length && this.dashboardGadgetComponents[0].instance) {
        setTimeout(() => {
          this.dashboardGadgetComponents[0].instance.initializeMasonry();
        }, 100);
      }
    }

    setDashboardLayoutForGadgets(layout) {
      this._dashboard.layout = layout;
      this.dashboardGadgetComponents.map((component) => {
        component.instance.changeLayout(layout);
      });
    }

    processGadgets(gadgets) {

      if (this.defectTrackingEnabled === undefined || this.defectTrackingEnabled === null) {
        this.checkDefectTrackingEnabled();
      }

      this._predefinedGadgets = _.filter(gadgets, (gadget) => {
        if((gadget.component === 'ReleaseDefectsStatusGadgetComponent' || gadget.component === 'ReleaseStatusOpenDefectsGadgetComponent')
          && !this.defectTrackingEnabled) {
          return false;
        }
        return true;
      });

      this._predefinedGadgets = _.sortBy(this._predefinedGadgets, ['name']);
    }
    ngAfterViewInit() {
        let instance = this,
            _placehoderClassName = this.getPlaceHolderClassName();

        // $('#zui-gadget-sortable').masonry({
        //   itemSelector: '.zui-row-column-padding',
        //   columnWidth: '.zui-row-column-padding',
        //   percentPosition: true
        // });

        // /**
        //  * Attach sortable ui
        //  */
        // $('#zui-gadget-sortable').sortable({
        //     placeholder: this.getPlaceHolderClassName(),
        //     update: function( event, ui ) {
        //         instance.reorderGadgets();
        //     },
        //     start: function (event, ui) {
        //         // Set the placeholder class, in case the layout changes
        //         $(ui.placeholder).attr('class', instance.getPlaceHolderClassName());
        //     },
        // });

        $('#zui-gadget-sortable').disableSelection();
    }
    ngOnDestroy() {
        this.unsubscribe();
    }

    initDashboard() {
        if(this._dashboardId) {
            let _dashboards = this._zephyrStore.getState().dashboards;

            if(_dashboards && _dashboards.rows && _dashboards.rows.length) {
              let dashboard = _.cloneDeep(this.getDashboardById(_dashboards.rows));

              this.setDashboardById(dashboard);
            } else {
              this._zephyrStore.dispatch(this._dashboardAction.getDashboardById(this._dashboardId));
            }

        }
    }

    checkDefectTrackingEnabled() {
      let defectsystem = this._zephyrStore.getState().global.defectSystem;

      if(!defectsystem || (!_.isEqual(SYSTEM_TYPE_4, defectsystem['systemType']))) {
        this.defectTrackingEnabled = false;
      } else {
        this.defectTrackingEnabled = true;
      }
    }

    clearActionEvents() {
        this._zephyrStore.dispatch(this._dashboardAction.clearDashboardEvent());
    }

    reorderGadgets() {
        let $sortableEl = $('#zui-gadget-sortable').find('.zui-sortable-ui-state');
        let _gadgets = _.map($sortableEl, ($el) => {
            let _id = $($el).data('id');
            let _gadget = _.filter(this._dashboard['gadgets'], (gadget) => {return gadget.id === _id;});
            return _gadget[0];
        });
        this._dashboard['gadgets'] = _gadgets;
        this._zephyrStore.dispatch(this._dashboardAction.updateDashboardById(this._dashboard));
    }

    getGadgetClass() {
        if (this._dashboard) {
          let _dashboardLayout = this._dashboard.properties['style'].layout || DASHBOARD_CONSTANTS.DASHBOARD_LAYOUT_TWO_COLUMN;
          return DASHBOARD_CONSTANTS.DASHBOARD_LAYOUT_GADGETS_CLASS[_dashboardLayout] || '';
        }

        return '';
    }

    // return sortable placeholder classname
    getPlaceHolderClassName() {
        return 'ui-state-highlight ' + this.getGadgetClass();
    }

    setDashboardLayout(value) {
      if (parseInt(this._dashboard.layout) !== value) {
        let dashboard = _.cloneDeep(this._dashboard);
        dashboard.layout = value;
        dashboard.properties['style'].layout = value;
        this._zephyrStore.dispatch(this._dashboardAction.updateDashboardById(dashboard));
      }
    }
    /**
     * set the dashboard
     */
    setDashboardById(dashboard) {
      if (this.defectTrackingEnabled === undefined || this.defectTrackingEnabled === null) {
        this.checkDefectTrackingEnabled();
      }
      dashboard.gadgets = _.filter(dashboard.gadgets, (gadget) => {

        if (this.defectTrackingEnabled) {
          return gadget;
        } else if (gadget.component !== 'ReleaseDefectsStatusGadgetComponent' &&
            gadget.component !== 'ReleaseStatusOpenDefectsGadgetComponent') {
          return gadget;
        }

      });

      _.forEach(dashboard.gadgets, (gadget, key) => {
        if (gadget.properties.length) {
          gadget.properties = JSON.parse(gadget.properties);
        }
      });

      this._dashboard = dashboard;
      this.createGadgetsInDOM();

      if (parseInt(dashboard.layout) === 3) {
        this.setDashboardLayout(2);
      }
    }

    createGadgetsInDOM() {
      if (this.target) {

        _.forEachRight(this._dashboard.gadgets, (gadget, key) => {
          this.createGadget(gadget);
        });

      } else {
        setTimeout(() => {
          this.createGadgetsInDOM();
        }, 1000);
      }

    }

    createGadget(gadget, shouldRefreshMasonry = false) {
      let lastGadgetId = `gadget-${gadget.id}`;

      if (gadget.properties.length) {
        gadget.properties = JSON.parse(gadget.properties);
      }

      let componentFactory = this.resolver.resolveComponentFactory(DashboardGadgetComponent);
      let cmpRef = this.target.createComponent(componentFactory);

      cmpRef.instance.gadget = gadget;
      cmpRef.instance.layout  = this._dashboard.layout;
      cmpRef.instance._userId = this._userId;
      cmpRef.instance.createdBy = this._dashboard.createdBy;

      cmpRef.instance.onDeleteGadget.subscribe((event) => {
        this.onDeleteGadget(event);
      });

      cmpRef.instance.onUpdateGadget.subscribe((event) => {
        this.onUpdateGadget(event);
      });

      this.dashboardGadgetComponents.push(cmpRef);

      if (shouldRefreshMasonry) {
        this._dashboard.gadgets.push(gadget);

        setTimeout(() => {
          this.refreshMasonry();

          setTimeout(() => {
            if (this.dashboardGadgetComponents.length && this.dashboardGadgetComponents[0].instance) {
              setTimeout(() => {
                this.dashboardGadgetComponents[0].instance.destroyMasonry();
              }, 100);
            }

            let gadgetIds = _.map($('.gadget-component'), "id");

            if (gadgetIds.length > 1) {
              _.forEachRight(gadgetIds, (gadgetId) => {
                  $(`#${gadgetId}`).before($(`#${lastGadgetId}`));
              });
            }

            this.refreshMasonry();
          }, 100);

        }, 100);
      }

    }

    /**
     * Parse the dashboard rows and set the selected dashboard by ID
     */
    getDashboardById(dashboards) {
        let _dashboard = _.filter(dashboards, (dashboard) => {
            return (dashboard.id == parseInt(this._dashboardId));
        });

        return _dashboard[0] || {};
    }
    /**
     * Add gadget to the dashboard by passing the component name
     */
    addGadgetToDashboard(gadget) {
        let _gadget = _.cloneDeep(DASHBOARD_CONSTANTS.DASHBOARD_GADGET_INITIAL_STATE);
        // Set gadget parameters
        // _gadget.id += gadget.id + '-' + this._userId + '-' + _.now();
        _gadget.name = gadget.name;
        _gadget.component = gadget.component;
        _gadget.description = gadget.description;
        // _gadget.creatorId = this._userId;
        _gadget.createdOn = _.now();
        _gadget.gadgetMetaDataId = gadget.id;
        // Set gadget component parameters
        // _gadget.component.id += this._userId + '-' + _.now();
        _gadget.properties.component.name = gadget.component;
        _gadget.dashboardId = this._dashboardId;

        // this._dashboard['gadgets'].push(_gadget);

        this._zephyrStore.dispatch(this._dashboardAction.createGadget(_gadget));

        setTimeout(() => {
          $('#zui-gadget-trigger-add').modal('hide');
        }, 10);
    }
    /**
     * On gadget delete remove it from dashboard
     *
     */
    onDeleteGadget(ev) {
        this._zephyrStore.dispatch(this._dashboardAction.deleteGadgetById(ev));
    }
    /**
     * On gadget delete remove it from dashboard
     */
    onUpdateGadget(ev) {
        this._zephyrStore.dispatch(this._dashboardAction.updateGadget(ev, _.cloneDeep(this._dashboard)));
    }

    goToDashboardDetailList() {
        this.router.navigate(['/dashboards']);
    }

    triggerChange() {
        if (this.changeDetectionDebounce) {
            clearTimeout(this.changeDetectionDebounce);
        }
        let firstDetection = !this.changeDetectionDebounce;
        this.changeDetectionDebounce = setTimeout(() => {
            let that = this;
            this.changeDetectionDebounce = null;
            if(this.cdr) { this.cdr.markForCheck(); }
        }, firstDetection ? 200 : 300);
    }
}
